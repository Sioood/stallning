import {
  createChecker,
  TypeMeta,
  type ComponentMeta,
  type MetaCheckerOptions,
} from 'vue-component-meta'

import type { Plugin } from 'vite'

/**
 * `vue-component-meta` docgen for the DS SFCs, replacing the framework's built-in one.
 *
 * Two things the built-in `@storybook/vue3-vite` plugin gets wrong for this design system:
 *
 * 1. `checker.getExportNames()` also returns *type-only* exports (every SFC here exports its
 *    `…Props` / `UI…Slots` interfaces). The built-in plugin maps `getComponentMeta()` over all
 *    of them, the first type export throws `Export '…' not found`, and its single try/catch
 *    swallows the whole file — so those components ship with **no** `__docgenInfo` at all and
 *    Controls silently fall back to nothing. Here each export is resolved on its own.
 * 2. It leaves `MetaCheckerOptions.schema` at `false`, so a prop typed through a DS alias
 *    (`AccordionIntent`, `SegmentedVariant`, `VariantProps<typeof cva>['intent']`) is reported
 *    as the opaque string `"AccordionIntent | undefined"` instead of its literal members. That
 *    is what forced hand-written global option lists — which then offered values the component's
 *    CVA has no branch for (`variant: 'strong'` on `UIButton` → no classes, transparent
 *    background). Schema resolution is enabled below, narrowed to literal unions so it stays cheap.
 */

/** `ts.TypeFlags` members that make a type a literal we want expanded into select options. */
const LITERAL_TYPE_FLAGS =
  1024 | // EnumLiteral
  128 | // StringLiteral
  256 | // NumberLiteral
  512 | // BooleanLiteral
  32_768 | // Undefined
  65_536 // Null

type TsType = {
  flags: number
  isUnion?: () => boolean
  types?: TsType[]
}

function isLiteralLike(type: TsType): boolean {
  return Boolean(type.flags & LITERAL_TYPE_FLAGS)
}

/** `ts.TypeFlags` for the primitives Storybook has a dedicated control for. */
const PRIMITIVE_TYPE_FLAGS =
  4 | // String
  8 | // Number
  16 // Boolean

/**
 * Resolve a schema for unions and primitives, skip everything else.
 *
 * Unions are what carry the information Controls need, and resolving one is cheap because each
 * member is passed back through this predicate: `'sm' | 'md' | 'lg'` expands to its literals,
 * `string | undefined` collapses to a text control, and the object member of
 * `Partial<UISelectSlots> | undefined` is skipped right away. Interfaces, functions and arrays
 * are never expanded — that costs a lot of TS work and Storybook renders them as a JSON or
 * disabled control either way.
 *
 * Without this, every prop schema stays the flat string `"string | undefined"`, which Storybook
 * cannot match to a known type — so a plain `string` prop gets a JSON object editor and typing
 * in it feeds the component an object where a string was expected (no CVA branch matches, and
 * the element renders with no intent classes at all).
 */
function shouldResolveSchema(_name: string, type: TsType): boolean {
  if (isLiteralLike(type)) return false
  if (type.flags & PRIMITIVE_TYPE_FLAGS) return false
  if (typeof type.isUnion === 'function' && type.isUnion()) return false
  return true
}

const CHECKER_OPTIONS: MetaCheckerOptions = {
  forceUseTs: true,
  noDeclarations: true,
  printer: { newLine: 1 },
  schema: {
    ignore: [shouldResolveSchema as NonNullable<MetaCheckerOptions['schema']>],
  },
} as MetaCheckerOptions

function isDocumentable(meta: ComponentMeta): boolean {
  if (meta.type === TypeMeta.Unknown) return false
  return Boolean(
    meta.props.length || meta.events.length || meta.slots.length || meta.exposed.length,
  )
}

/** Drop nested schemas Storybook does not read, keeping enum members (the select options). */
function pruneSchemas(meta: ComponentMeta): void {
  const prune = (schema: unknown): void => {
    if (typeof schema !== 'object' || schema === null) return
    const node = schema as { kind?: string; schema?: unknown }
    if (node.kind === 'enum') {
      if (Array.isArray(node.schema)) {
        for (const member of node.schema) prune(member)
      }
      return
    }
    delete node.schema
  }

  for (const key of ['props', 'events', 'slots', 'exposed'] as const) {
    for (const entry of meta[key] as Array<{ schema?: unknown }>) {
      if (Array.isArray(entry.schema)) {
        for (const member of entry.schema) prune(member)
      } else {
        prune(entry.schema)
      }
    }
  }
}

export type StallningVueDocgenOptions = {
  /** Absolute path to the tsconfig whose program contains the UI SFCs. */
  tsconfigPath: string
}

export function stallningVueDocgen(options: StallningVueDocgenOptions): Plugin {
  const checker = createChecker(options.tsconfigPath, CHECKER_OPTIONS)

  return {
    enforce: 'post',
    name: 'stallning-vue-component-meta-docgen',
    transform(code, id) {
      const [path = ''] = id.split('?')
      if (!path.endsWith('.vue')) return null
      if (path.includes('node_modules')) return null
      // `_sfc_main` is what `@vitejs/plugin-vue` names the component object.
      if (!code.includes('_sfc_main')) return null

      let meta: ComponentMeta | undefined
      try {
        for (const exportName of checker.getExportNames(path)) {
          let candidate: ComponentMeta
          try {
            // Type-only exports throw here; they are not components, so just skip them.
            candidate = checker.getComponentMeta(path, exportName)
          } catch {
            continue
          }
          if (!isDocumentable(candidate)) continue
          if (exportName === 'default') {
            meta = candidate
            break
          }
          meta ??= candidate
        }
      } catch {
        return null
      }

      if (!meta) return null
      pruneSchemas(meta)

      const docgen = JSON.stringify({
        ...meta,
        exposed: meta.exposed.filter((expose) => !expose.name.startsWith('on')),
        sourceFiles: path,
      })

      // `Object.defineProperty` rather than a plain assignment: nothing in the bundle ever
      // *reads* `__docgenInfo` (the docs addon looks it up at runtime), so Rollup tree-shakes a
      // bare `_sfc_main.__docgenInfo = …` out of the production build and Controls come back
      // empty in `storybook build`. A call expression it cannot prove pure survives.
      return {
        code:
          `${code}\n;Object.defineProperty(_sfc_main, '__docgenInfo', { configurable: true, ` +
          `value: Object.assign({ displayName: _sfc_main.name ?? _sfc_main.__name }, ${docgen}) });`,
        map: null,
      }
    },
  }
}
