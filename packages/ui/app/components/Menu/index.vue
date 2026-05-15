<script setup lang="ts">
import {
  Menu as ArkMenu,
  type MenuRootBaseProps as ArkMenuRootBaseProps,
  type MenuRootProviderBaseProps as ArkMenuRootProviderBaseProps,
  type UseMenuReturn,
} from '@ark-ui/vue/menu'

import { buttonCVA } from '~ui/app/utils/Button/variants'
import {
  menuArrowCVA,
  menuArrowTipCVA,
  menuContentCVA,
  menuIndicatorCVA,
  menuPositionerCVA,
} from '~ui/app/utils/Menu/variants'

import type { ClassValue } from 'vue'
import type { MenuIntent, MenuSize, UIMenuSlots } from '~ui/app/utils/Menu/context'

export type { MenuIntent, MenuSize, UIMenuSlots } from '~ui/app/utils/Menu/context'

type MenuTriggerValueSource = { triggerValue?: string | null }

function menuTriggerValue(menu: unknown): string | null {
  return (menu as MenuTriggerValueSource).triggerValue ?? null
}

defineOptions({ inheritAttrs: false })
const slots = useSlots()

interface MenuBaseItem {
  disabled?: boolean
  customClass?: ClassValue
}

export interface MenuItemEntry extends MenuBaseItem {
  /** Explicit `'item'` or omitted (defaults to `'item'` at runtime). */
  type?: 'item'
  label: string
  value: string
  closeOnSelect?: boolean
  valueText?: string
  onSelect?: () => void
  href?: string
  target?: string
}

/**
 * Narrowed variant requiring a literal `type` discriminant.
 * Use in switch/if-chains that need exhaustive checking via `assertNever`.
 */
export type MenuListEntryStrict =
  | (MenuItemEntry & { type: 'item' })
  | MenuCheckboxEntry
  | MenuRadioGroupEntry
  | MenuGroupEntry
  | MenuSubmenuEntry
  | MenuSeparatorEntry

export interface MenuCheckboxEntry extends MenuBaseItem {
  type: 'checkbox'
  label: string
  value: string
  checked: boolean
  closeOnSelect?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export interface MenuRadioGroupEntry {
  type: 'radio-group'
  label?: string
  value?: string
  customClass?: ClassValue
  onValueChange?: (value: string) => void
  items: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
}

export interface MenuSeparatorEntry {
  type: 'separator'
  customClass?: ClassValue
}

export interface MenuSubmenuEntry {
  type: 'submenu'
  label: string
  customClass?: ClassValue
  items: MenuListEntry[]
}

export interface MenuGroupEntry {
  type: 'group'
  label?: string
  customClass?: ClassValue
  items: MenuListEntry[]
}

export type MenuListEntry =
  | MenuItemEntry
  | MenuCheckboxEntry
  | MenuRadioGroupEntry
  | MenuGroupEntry
  | MenuSubmenuEntry
  | MenuSeparatorEntry

export interface MenuProps
  extends ArkMenuRootBaseProps, Omit<ArkMenuRootProviderBaseProps, 'value'> {
  /**
   * Pass the return value of `useMenu()` to enable **RootProvider** mode —
   * the component will be controlled entirely from outside via the Ark API object.
   * Omit (or leave `undefined`) to use the default **Root** mode with `v-model:open`.
   */
  value?: UseMenuReturn
  triggerText?: string
  contextTriggerText?: string
  intent?: MenuIntent
  size?: MenuSize
  showIndicator?: boolean
  showArrow?: boolean
  portalled?: boolean
  teleportTo?: string
  indicatorIcon?: string
  items?: MenuListEntry[]
  ui?: Partial<UIMenuSlots>
}

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<MenuProps>(), {
  contextTriggerText: '',
  indicatorIcon: 'tabler:chevron-down',
  intent: 'neutral',
  items: () => [],
  portalled: true,
  showArrow: false,
  showIndicator: true,
  size: 'md',
  teleportTo: 'body',
  triggerText: 'Actions',
  value: undefined,
  ui: undefined,
})

const isProvider = computed(() => props.value !== undefined)

const rootComponent = computed(() => (isProvider.value ? ArkMenu.RootProvider : ArkMenu.Root))

const rootProps = computed(() => {
  if (isProvider.value) {
    return pick(props, ['asChild', 'lazyMount', 'unmountOnExit', 'value'] as const)
  }
  return {
    ...pick(props, [
      'anchorPoint',
      'aria-label',
      'asChild',
      'closeOnSelect',
      'composite',
      'defaultHighlightedValue',
      'defaultOpen',
      'highlightedValue',
      'id',
      'ids',
      'lazyMount',
      'loopFocus',
      'navigate',
      'positioning',
      'typeahead',
      'unmountOnExit',
    ] as const),
    open: open.value,
    'onUpdate:open': (v: boolean) => {
      open.value = v
    },
  }
})

const itemUiProps = computed(() => ({
  item: props.ui?.item,
  itemGroup: props.ui?.itemGroup,
  itemGroupLabel: props.ui?.itemGroupLabel,
  separator: props.ui?.separator,
  itemIndicator: props.ui?.itemIndicator,
  itemText: props.ui?.itemText,
}))

const triggerClass = computed(() =>
  cn(
    buttonCVA({
      variant: 'subtle',
      intent: props.intent,
      size: 'sm',
      disabled: false,
    }),
    'transition-colors',
    props.ui?.trigger,
  ),
)

const hasCustomTriggers = computed(() => Boolean(slots.triggers))
const hasContextTrigger = computed(
  () => Boolean(slots['context-trigger']) || Boolean(props.contextTriggerText),
)
const showDefaultTrigger = computed(() => !hasCustomTriggers.value && !hasContextTrigger.value)

extendCompodiumMeta<MenuProps>({
  defaultProps: {
    triggerText: 'Actions',
    showIndicator: true,
    showArrow: false,
    intent: 'neutral',
    size: 'md',
  },
})
</script>

<template>
  <component :is="rootComponent" v-bind="{ ...rootProps, ...$attrs }">
    <ArkMenu.Context v-slot="menu">
      <slot
        name="context-trigger"
        :context-trigger="ArkMenu.ContextTrigger"
        :menu="menu"
        :trigger-value="menuTriggerValue(menu)"
      >
        <ArkMenu.ContextTrigger v-if="contextTriggerText" :class="cn(ui?.contextTrigger)">
          {{ contextTriggerText }}
        </ArkMenu.ContextTrigger>
      </slot>

      <slot
        name="triggers"
        :trigger="ArkMenu.Trigger"
        :menu="menu"
        :trigger-value="menuTriggerValue(menu)"
      >
        <ArkMenu.Trigger v-if="showDefaultTrigger" :class="triggerClass">
          <slot name="trigger">{{ triggerText }}</slot>
          <ArkMenu.Indicator v-if="showIndicator" :class="cn(menuIndicatorCVA(), ui?.indicator)">
            <slot name="indicator">
              <Icon :name="indicatorIcon" />
            </slot>
          </ArkMenu.Indicator>
        </ArkMenu.Trigger>
      </slot>

      <Teleport :to="teleportTo" :disabled="!portalled">
        <ArkMenu.Positioner :class="cn(menuPositionerCVA(), ui?.positioner)">
          <ArkMenu.Content :class="cn(menuContentCVA({ intent, size }), ui?.content)">
            <ArkMenu.Arrow v-if="showArrow" :class="cn(menuArrowCVA({ intent, size }), ui?.arrow)">
              <ArkMenu.ArrowTip :class="cn(menuArrowTipCVA(), ui?.arrowTip)" />
            </ArkMenu.Arrow>

            <slot
              name="content"
              :menu="menu"
              :root="ArkMenu.Root"
              :trigger="ArkMenu.Trigger"
              :trigger-item="ArkMenu.TriggerItem"
              :positioner="ArkMenu.Positioner"
              :content-part="ArkMenu.Content"
              :item="ArkMenu.Item"
              :checkbox-item="ArkMenu.CheckboxItem"
              :radio-item-group="ArkMenu.RadioItemGroup"
              :radio-item="ArkMenu.RadioItem"
              :item-group="ArkMenu.ItemGroup"
              :item-group-label="ArkMenu.ItemGroupLabel"
              :separator="ArkMenu.Separator"
              :item-indicator="ArkMenu.ItemIndicator"
              :item-text="ArkMenu.ItemText"
              :context-trigger="ArkMenu.ContextTrigger"
              :trigger-value="menuTriggerValue(menu)"
            >
              <UIMenuEntryRenderer
                :items="items"
                :intent="intent"
                :size="size"
                v-bind="itemUiProps"
              />
            </slot>
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </Teleport>
    </ArkMenu.Context>
  </component>
</template>

<style scoped>
:deep([data-part='content'][data-state='open']) {
  animation: scale-fade-in 100ms ease-out;
}

:deep([data-part='content'][data-state='closed']) {
  animation: scale-fade-out 50ms ease-in;
}

@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>
