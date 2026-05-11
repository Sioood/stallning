<script setup lang="ts">
import { Menu as ArkMenu, type MenuRootBaseProps as ArkMenuRootBaseProps } from '@ark-ui/vue/menu'

import {
  menuArrowCVA,
  menuArrowTipCVA,
  menuContentCVA,
  menuContextTriggerCVA,
  menuIndicatorCVA,
  menuPositionerCVA,
} from './variants'

import type { MenuIntent, MenuSize, UIMenuSlots } from './context'
import type { ClassValue } from 'vue'

export type { MenuIntent, MenuSize, UIMenuSlots } from './context'

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

export interface MenuProps extends ArkMenuRootBaseProps {
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
  ui: undefined,
})

const rootProps = computed(() =>
  pick(props, [
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
    'open',
    'positioning',
    'typeahead',
    'unmountOnExit',
  ]),
)

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
    buttonVariants({
      variant: 'subtle',
      intent: props.intent,
      size: 'sm',
      disabled: false,
    }),
    'menuTrigger transition-colors',
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
  <ArkMenu.Root v-bind="{ ...rootProps, ...$attrs }" v-model:open="open">
    <ArkMenu.Context v-slot="menu">
      <slot
        name="context-trigger"
        :context-trigger="ArkMenu.ContextTrigger"
        :menu="menu"
        :trigger-value="menuTriggerValue(menu)"
      >
        <ArkMenu.ContextTrigger
          v-if="contextTriggerText"
          :class="cn(menuContextTriggerCVA(), ui?.contextTrigger)"
        >
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

      <Teleport v-if="portalled" :to="teleportTo" :disabled="!portalled">
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

      <ArkMenu.Positioner v-else :class="cn(menuPositionerCVA(), ui?.positioner)">
        <ArkMenu.Content :class="cn(menuContentCVA({ intent, size }), ui?.content)">
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
    </ArkMenu.Context>
  </ArkMenu.Root>
</template>
