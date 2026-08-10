import { intentArgType, orientationArgType, sizeArgType, variantArgType } from './argTypes.ts'

import type { ArgTypesEnhancer, InputType } from 'storybook/internal/types'

/**
 * Normalizes the argTypes Storybook derives from `__docgenInfo` so every prop gets a control that
 * matches its real type.
 *
 * ## Why controls need a second pass at all
 *
 * Core's `inferControls` runs *after* the enhancers registered here and merges with
 * `combineParameters(inferred, ours)` — ours wins. Three consequences drive this file:
 *
 * - A control **must** be emitted in object form (`{ type: 'select' }`). A bare string
 *   (`control: 'select'`) overwrites the inferred object, and nothing can read `control.type` off
 *   a string — the Controls panel and the Autodocs table render the row as a dead `-`.
 * - A `select` **must** carry `options`. Without them the control logs
 *   `Select with no options` and renders `-`.
 * - `inferControls` only handles `array | boolean | string | number | enum`. Everything else hits
 *   its `default:` branch and becomes a JSON object editor, which is wrong for a DS token prop:
 *   typing in it feeds the component an object where a string was expected, no CVA branch
 *   matches, and the element renders with no classes (transparent background).
 *
 * So the job here is to turn what docgen resolved into a shape `inferControls` already agrees
 * with — a literal `enum`, or a plain primitive — and to switch off only the rows that are not
 * args at all.
 */

/**
 * Widest DS token lists, used **only** when a prop's type could not be resolved at all.
 *
 * These are a fallback, never a default. Applied unconditionally (as they once were) they break
 * the Controls: each component narrows these unions differently — `UIButton.variant` is
 * `default | subtle | ghost`, `UITabs.variant` is `line | pill | pill-subtle`,
 * `UICollapsible.intent` is `neutral` alone — so offering the widest list lets you pick a value
 * the component's CVA has no branch for. Real options come from the SFC's types; see `docgen.ts`.
 */
const FALLBACK_ARG_TYPES = {
  intent: intentArgType,
  mode: { options: ['leading', 'trailing', 'leadingAndTrailing'] },
  orientation: orientationArgType,
  size: sizeArgType,
  state: { options: ['default', 'loading', 'success', 'error', 'warning'] },
  sticky: { options: ['header', 'footer', true, false] },
  variant: variantArgType,
} satisfies Record<string, { options: OptionValue[] }>

/**
 * Props with no useful Controls editor, matched by name.
 *
 * Deliberately short: anything whose type resolves now gets a real control, so the only entries
 * left are event handlers and the class/chrome maps (`ui`) whose JSON editor is pure noise.
 * `elementIntent`, `indicatorVariant`, `sticky`, `width` … are all inferred like any other prop.
 */
const DISABLED_CONTROL_PATTERN = /^(on[A-Z]|ui$|cardBaseUi$)/u

/** Categories that describe the component's API rather than editable inputs. */
const NON_EDITABLE_CATEGORIES = new Set(['slots', 'events', 'exposed'])

/** `() => void`, `(() => HTMLElement | null)` — a signature, not a value. */
const FUNCTION_SIGNATURE = /=>/u

/** Unresolved aliases and generics that carry no editable value. */
const OPAQUE_TS_TYPE =
  /^(TS[A-Za-z]+|MenuListEntry|NumericAccessor<.*>|ColorAccessor<.*>|StringAccessor<.*>)$/u

const NULLISH_TYPE_NAMES = new Set(['null', 'undefined', 'void'])

/** Storybook's `normalizeOptions` keys options by `String(value)` and hands the value back, so
 * non-string members (a `boolean` arm of a union) can be offered as themselves. */
type OptionValue = string | number | boolean

type PrimitiveName = 'string' | 'number' | 'boolean'

/**
 * `InputType['type']` is either a scalar shorthand (`'string'`) or an `SBType` node, and union
 * members follow the same rule — so both shapes are read through this one view.
 */
type TypeNode = { name: string; value?: unknown }

function asTypeNode(type: unknown): TypeNode | undefined {
  if (typeof type === 'string') return { name: type }
  if (!type || typeof type !== 'object') return undefined
  const node = type as { name?: unknown; value?: unknown }
  return typeof node.name === 'string' ? { name: node.name, value: node.value } : undefined
}

function memberNodes(type: TypeNode): TypeNode[] {
  if (!Array.isArray(type.value)) return []
  return type.value.map(asTypeNode).filter((node): node is TypeNode => Boolean(node))
}

function isPrimitiveName(name: string): name is PrimitiveName {
  return name === 'string' || name === 'number' || name === 'boolean'
}

/** `'"multicolor"'` → `'multicolor'`; anything unquoted (an alias, an object shape) → undefined. */
function unquoteLiteral(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  if (!/^(['"]).*\1$/u.test(value)) return undefined
  const inner = value.slice(1, -1)
  return inner.length > 0 ? inner : undefined
}

function isNullishMember(member: TypeNode): boolean {
  if (NULLISH_TYPE_NAMES.has(member.name)) return true
  // Nullish members of a mixed union arrive as `{ name: 'other', value: 'null' }`.
  return typeof member.value === 'string' && NULLISH_TYPE_NAMES.has(member.value)
}

function controlType(argType: InputType | undefined): string | undefined {
  if (!argType?.control) return undefined
  if (typeof argType.control === 'string') return argType.control
  return argType.control.type
}

/** Printed type of a prop, from whichever of the two places docgen recorded it. */
function typeSummary(argType: InputType): string | undefined {
  const summary = argType.table?.type?.summary ?? asTypeNode(argType.type)?.value
  return typeof summary === 'string' ? summary : undefined
}

/** What kind of editor a prop's type supports, once resolved. */
type Editable =
  | { kind: 'options'; options: OptionValue[] }
  | { kind: 'primitive'; primitive: PrimitiveName }

/** Members of a union, split into what can and cannot be offered as a value. */
type UnionParts = { literals: string[]; primitives: Set<PrimitiveName> }

function collectUnionParts(
  node: TypeNode,
  into: UnionParts = { literals: [], primitives: new Set() },
) {
  const members = node.name === 'enum' ? enumLiteralNodes(node) : memberNodes(node)

  for (const member of members) {
    if (isNullishMember(member)) continue
    if (member.name === 'enum' || member.name === 'union') {
      collectUnionParts(member, into)
      continue
    }
    if (isPrimitiveName(member.name)) {
      into.primitives.add(member.name)
      continue
    }
    // Everything else is an `other` member holding its quoted source text — or a shape we skip.
    const literal = unquoteLiteral(member.value)
    if (literal !== undefined) into.literals.push(literal)
  }

  return into
}

/**
 * `enum` nodes hold already-unquoted strings in `value`. `'true'` / `'false'` mean the union had a
 * boolean arm, which belongs on a switch rather than in a list of strings.
 */
function enumLiteralNodes(node: TypeNode): TypeNode[] {
  if (!Array.isArray(node.value)) return []
  return node.value.flatMap((value) => {
    if (typeof value !== 'string') return []
    if (NULLISH_TYPE_NAMES.has(value)) return []
    if (value === 'true' || value === 'false') return [{ name: 'boolean' }]
    return [{ name: 'other', value: JSON.stringify(value) }]
  })
}

/**
 * Resolve what a prop can actually be edited as.
 *
 * Handles the four shapes docgen produces for one TS union:
 * - `enum` — the clean case, `'sm' | 'md' | 'lg'`.
 * - `union` of quoted literals — what a nullable variant becomes, since CVA's `VariantProps` adds
 *   `| null`. Members arrive as `{ name: 'other', value: '"md"' }`.
 * - `union` mixing literals with a boolean (`TableSticky` = `boolean | 'header' | 'footer'`) or
 *   with a callback (`'left' | 'center' | ((tick) => string)`): the values are still offerable.
 * - `union` of primitives only (`Numberish` = `string | number`, `string | null`).
 */
function resolveEditable(argType: InputType): Editable | undefined {
  const node = asTypeNode(argType.type)

  if (node && isPrimitiveName(node.name)) {
    return { kind: 'primitive', primitive: node.name }
  }

  const { literals, primitives } = node
    ? collectUnionParts(node)
    : { literals: [], primitives: new Set<PrimitiveName>() }

  // A printed union can still carry literals when the node itself resolved to an opaque alias.
  const fromSummary = literals.length === 0 ? literalsFromSummary(typeSummary(argType)) : []
  const values = [...new Set([...literals, ...fromSummary])]

  if (values.length > 0) {
    const options: OptionValue[] = [...values]
    // Keep the boolean arm reachable instead of silently dropping it.
    if (primitives.has('boolean')) options.push(true, false)
    return { kind: 'options', options }
  }

  if (primitives.size === 1) {
    const [only] = [...primitives]
    return { kind: 'primitive', primitive: only }
  }
  // `string | number` (Ark's `Numberish`) is typed, not picked — one text field takes both.
  if (primitives.size > 1 && !primitives.has('boolean')) {
    return { kind: 'primitive', primitive: 'string' }
  }

  return undefined
}

/**
 * Parse quoted literals out of a printed union (`"info" | "success" | undefined`).
 *
 * Only quoted members count: `string | undefined` must stay a text control, and an unresolved
 * alias (`TextAlign`, `{ data: … }`) must not become a selectable value.
 */
function literalsFromSummary(summary: string | undefined): string[] {
  if (!summary?.includes('|')) return []

  return [
    ...new Set(
      summary
        .split('|')
        .map((part) => part.trim())
        .map((part) => unquoteLiteral(part))
        .filter((part): part is string => part !== undefined),
    ),
  ]
}

/** Rows that are part of the component's API but never editable as an arg. */
function isNonEditable(name: string, argType: InputType): boolean {
  if (DISABLED_CONTROL_PATTERN.test(name)) return true
  // Slots render as content, events fire, exposed members are called — none are args.
  if (NON_EDITABLE_CATEGORIES.has(argType.table?.category ?? '')) return true
  return asTypeNode(argType.type)?.name === 'function'
}

/** Rows with nothing left to offer once resolution has failed: callbacks and opaque generics. */
function isUneditableType(name: string, argType: InputType): boolean {
  const summary = typeSummary(argType)
  if (summary && FUNCTION_SIGNATURE.test(summary)) return true
  if (summary && OPAQUE_TS_TYPE.test(summary)) return true
  return controlType(argType) === 'object' && name.endsWith('Props')
}

function summarizeOptions(options: OptionValue[]): string {
  return options
    .map((option) => (typeof option === 'string' ? `"${option}"` : String(option)))
    .join(' | ')
}

/**
 * Present a resolved union the same way everywhere: as an `enum` whose members are the accepted
 * values.
 *
 * The `type` rewrite is what makes `inferControls` agree with us instead of falling through to a
 * JSON editor, and rewriting `table.type.summary` is what stops the Autodocs table from printing
 * an opaque alias (`AccordionIntent`) for some components and expanded literals for others.
 */
function isRequired(argType: InputType): boolean {
  const node = argType.type
  if (!node || typeof node !== 'object') return false
  return (node as { required?: boolean }).required ?? false
}

function asEnum(argType: InputType, options: OptionValue[]): InputType {
  return {
    ...argType,
    control: { type: 'select' },
    // `options` is what the control reads, and it keeps the original values (a real `true`, not
    // the string `"true"`). `type.value` only feeds `inferControls`, whose result we override.
    options,
    table: {
      ...argType.table,
      type: { ...argType.table?.type, summary: summarizeOptions(options) },
    },
    type: { name: 'enum', required: isRequired(argType), value: options.map(String) },
  }
}

function asPrimitive(argType: InputType, primitive: PrimitiveName): InputType {
  return {
    ...argType,
    control: { type: primitive === 'string' ? 'text' : primitive },
    type: { name: primitive, required: isRequired(argType) },
  }
}

function normalizeArgType(name: string, argType: InputType): InputType {
  // 1. Slots, events, handlers and chrome maps: nothing to edit, whatever their type says.
  if (isNonEditable(name, argType)) {
    return { ...argType, control: false }
  }

  // 2. Options a story declared explicitly always win.
  const declared = Array.isArray(argType.options)
    ? argType.options.filter(
        (option): option is OptionValue =>
          typeof option === 'string' || typeof option === 'number' || typeof option === 'boolean',
      )
    : undefined
  if (declared && declared.length > 0) {
    return asEnum(argType, declared)
  }

  // 3. What the resolved type actually accepts — the per-component source of truth. Attempted
  //    before the callback checks below, so a `boolean | ((d) => boolean)` prop still gets a
  //    switch instead of being written off as a function.
  const editable = resolveEditable(argType)
  if (editable?.kind === 'options') {
    return asEnum(argType, editable.options)
  }
  if (editable?.kind === 'primitive') {
    return asPrimitive(argType, editable.primitive)
  }

  // 4. Nothing resolved. For known DS props offer the widest list rather than a dead control —
  //    a value the CVA does not implement renders unstyled, which flags a type that is not
  //    reachable from `tsconfig.docgen.json`.
  const fallback = FALLBACK_ARG_TYPES[name as keyof typeof FALLBACK_ARG_TYPES]
  if (fallback) {
    return asEnum(argType, [...fallback.options])
  }

  // 5. Callbacks and opaque generics have no value to edit.
  if (isUneditableType(name, argType)) {
    return { ...argType, control: false }
  }

  // 6. Arrays and real object shapes keep the JSON editor — that is the right widget for them.
  return argType
}

export const enhanceStorybookArgTypes: ArgTypesEnhancer = (context) => {
  // Enhancers run after normalization, so every entry already carries the strict fields.
  type StrictArgTypes = ReturnType<ArgTypesEnhancer>
  const normalized = {} as StrictArgTypes

  for (const [name, argType] of Object.entries(context.argTypes ?? {})) {
    if (!argType) continue
    normalized[name] = normalizeArgType(name, argType) as StrictArgTypes[string]
  }

  return normalized
}
