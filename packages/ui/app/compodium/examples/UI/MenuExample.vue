<script setup lang="ts">
import type { MenuListEntry } from '@/components/Menu/index.vue'

const toolbarVisible = ref(true)
const statusBarVisible = ref(false)
const sortBy = ref('date')
const selectedAction = ref<string | null>(null)
const controlledOpen = ref(false)

function logAction(name: string, payload?: unknown) {
  console.log(`[menu-example] ${name}`, payload)
}

function handleSelect(source: string, event: { value: string }) {
  selectedAction.value = event.value
  logAction(source, event.value)
}

function onFileMenuSelect(event: { value: string }) {
  handleSelect('file-select', event)
}

function onContextMenuSelect(event: { value: string }) {
  handleSelect('context-select', event)
}

function onControlledMenuSelect(event: { value: string }) {
  handleSelect('controlled-select', event)
}

function onMultipleTriggerMenuSelect(event: { value: string }) {
  handleSelect('multiple-trigger-select', event)
}

function logControlledMenuOpen(open: boolean) {
  logAction('controlled-open', open)
  controlledOpen.value = open
}

const actionItems = computed<MenuListEntry[]>(() => [
  { type: 'item', value: 'new-file', label: 'New File', onSelect: () => logAction('new-file') },
  { type: 'item', value: 'open', label: 'Open...', onSelect: () => logAction('open') },
  { type: 'item', value: 'save', label: 'Save', onSelect: () => logAction('save') },
  { type: 'item', value: 'save-as', label: 'Save As...', onSelect: () => logAction('save-as') },
  {
    type: 'item',
    value: 'delete',
    label: 'Delete',
    customClass:
      'text-error-text-default data-[highlighted]:bg-error-fill-subtle-hover data-[disabled]:text-error-text-subtle',
    onSelect: () => logAction('delete'),
  },
  { type: 'separator' },
  {
    type: 'group',
    label: 'Export',
    items: [
      {
        type: 'item',
        value: 'export-pdf',
        label: 'PDF',
        onSelect: () => logAction('export-pdf'),
      },
      { type: 'item', value: 'export-png', label: 'PNG', onSelect: () => logAction('export-png') },
      { type: 'item', value: 'export-svg', label: 'SVG', onSelect: () => logAction('export-svg') },
    ],
  },
  {
    type: 'submenu',
    label: 'Share',
    items: [
      {
        type: 'item',
        value: 'share-email',
        label: 'Email',
        onSelect: () => logAction('share-email'),
      },
      {
        type: 'item',
        value: 'share-message',
        label: 'Message',
        onSelect: () => logAction('share-message'),
      },
      {
        type: 'item',
        value: 'share-airdrop',
        label: 'AirDrop',
        onSelect: () => logAction('share-airdrop'),
      },
      {
        type: 'submenu',
        label: 'Advanced',
        items: [
          {
            type: 'item',
            value: 'share-link',
            label: 'Copy share link',
            onSelect: () => logAction('share-link'),
          },
          {
            type: 'submenu',
            label: 'Permissions',
            items: [
              {
                type: 'item',
                value: 'permission-view',
                label: 'Can view',
                onSelect: () => logAction('permission-view'),
              },
              {
                type: 'submenu',
                label: 'Grant temporary access',
                items: [
                  {
                    type: 'item',
                    value: 'grant-1h',
                    label: '1 hour',
                    onSelect: () => logAction('grant-1h'),
                  },
                  {
                    type: 'item',
                    value: 'grant-24h',
                    label: '24 hours',
                    onSelect: () => logAction('grant-24h'),
                  },
                  {
                    type: 'item',
                    value: 'grant-7d',
                    label: '7 days',
                    onSelect: () => logAction('grant-7d'),
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      {
        type: 'radio-group',
        label: 'Visibility',
        value: 'team',
        onValueChange: (value: string) => logAction('share-visibility', value),
        items: [
          { value: 'team', label: 'Team' },
          { value: 'private', label: 'Private' },
        ],
      },
    ],
  },
  {
    type: 'group',
    label: 'Links',
    items: [
      {
        type: 'item',
        value: 'docs',
        label: 'Documentation',
        href: 'https://ark-ui.com',
        onSelect: () => logAction('open-docs'),
      },
      {
        type: 'item',
        value: 'github',
        label: 'GitHub',
        href: 'https://github.com/chakra-ui/ark',
        target: '_blank',
        onSelect: () => logAction('open-github'),
      },
    ],
  },
  { type: 'separator' },
  {
    type: 'checkbox',
    value: 'toolbar',
    label: 'Show Toolbar',
    checked: toolbarVisible.value,
    onCheckedChange: (checked: boolean) => {
      toolbarVisible.value = checked
      logAction('toolbar-visibility', checked)
    },
  },
  {
    type: 'checkbox',
    value: 'status-bar',
    label: 'Show Status Bar',
    checked: statusBarVisible.value,
    onCheckedChange: (checked: boolean) => {
      statusBarVisible.value = checked
      logAction('statusbar-visibility', checked)
    },
  },
  { type: 'separator' },
  {
    type: 'radio-group',
    label: 'Sort By',
    value: sortBy.value,
    onValueChange: (value: string) => {
      sortBy.value = value
      logAction('sort-by', value)
    },
    items: [
      { value: 'name', label: 'Name' },
      { value: 'date', label: 'Date Modified' },
      { value: 'size', label: 'Size', disabled: true },
    ],
  },
])

const multipleTriggerItems = computed<Record<string, MenuListEntry[]>>(() => ({
  'msg-1': [
    {
      type: 'item',
      value: 'msg-1-reply',
      label: 'Reply',
      onSelect: () => logAction('msg-1-reply'),
    },
    { type: 'item', value: 'msg-1-pin', label: 'Pin', onSelect: () => logAction('msg-1-pin') },
  ],
  'msg-2': [
    {
      type: 'item',
      value: 'msg-2-forward',
      label: 'Forward',
      onSelect: () => logAction('msg-2-forward'),
    },
    {
      type: 'radio-group',
      label: 'Priority',
      value: 'normal',
      onValueChange: (value: string) => logAction('msg-2-priority', value),
      items: [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
      ],
    },
  ],
  'msg-3': [
    {
      type: 'item',
      value: 'msg-3-archive',
      label: 'Archive',
      onSelect: () => logAction('msg-3-archive'),
    },
    {
      type: 'item',
      value: 'msg-3-delete',
      label: 'Delete',
      onSelect: () => logAction('msg-3-delete'),
    },
  ],
}))

function getMultipleTriggerItems(triggerValue: string | null): MenuListEntry[] {
  if (!triggerValue) {
    return actionItems.value
  }
  return multipleTriggerItems.value[triggerValue] ?? actionItems.value
}
</script>

<template>
  <div class="flex w-fit flex-col gap-5">
    <UIMenu trigger-text="File" :items="actionItems" @select="onFileMenuSelect" />

    <UIMenu :items="actionItems" @select="onContextMenuSelect">
      <template #context-trigger="{ contextTrigger: ContextTrigger }">
        <component
          :is="ContextTrigger"
          class="menuContextTrigger rounded-none border border-dashed border-neutral-border-subtle px-3 py-2 txt-caption"
        >
          Right click here
        </component>
      </template>
    </UIMenu>

    <div class="flex items-center gap-2">
      <UIButton
        v-if="!controlledOpen"
        type="button"
        variant="subtle"
        intent="neutral"
        text="Open controlled menu"
        @click="logControlledMenuOpen(true)"
      />
      <UIButton
        v-else
        type="button"
        variant="ghost"
        intent="neutral"
        text="Close controlled menu"
        @click="logControlledMenuOpen(false)"
      />
      <UIMenu
        v-model:open="controlledOpen"
        trigger-text="Controlled"
        :items="actionItems"
        intent="primary"
        @update:open="logAction('controlled-update-open', $event)"
        @select="onControlledMenuSelect"
      />
    </div>

    <UIMenu
      trigger-text="Multiple triggers"
      :positioning="{ placement: 'right-start' }"
      @select="onMultipleTriggerMenuSelect"
    >
      <template #triggers="{ trigger: Trigger }">
        <div class="flex join">
          <component
            :is="Trigger"
            v-for="id in ['msg-1', 'msg-2', 'msg-3']"
            :key="id"
            :value="id"
            class="join-item"
          >
            <span
              class="inline-flex h-8 min-w-16 items-center justify-center border border-neutral-border-subtle bg-neutral-fill-subtle px-2 txt-caption text-neutral-text-default"
            >
              {{ id }}
            </span>
          </component>
        </div>
      </template>
      <template #content="{ triggerValue }">
        <UIMenuEntryRenderer :items="getMultipleTriggerItems(triggerValue)" />
      </template>
    </UIMenu>

    <UIMenu trigger-text="Nested (advanced)">
      <template
        #content="{
          item: Item,
          separator: Separator,
          root: Root,
          triggerItem: TriggerItem,
          contentPart: ContentPart,
          positioner: Positioner,
        }"
      >
        <component :is="Item" value="new" class="menuItem" @select="logAction('nested-new-file')">
          New File
        </component>
        <component :is="Item" value="open" class="menuItem" @select="logAction('nested-open')">
          Open...
        </component>
        <component :is="Separator" class="menuSeparator" />
        <component :is="Root">
          <component :is="TriggerItem" class="menuTriggerItem">Share</component>
          <Teleport to="body">
            <component :is="Positioner">
              <component
                :is="ContentPart"
                class="menuContent border border-neutral-border-subtle bg-neutral-fill-subtle p-1 txt-label"
              >
                <component
                  :is="Item"
                  value="email"
                  class="menuItem"
                  @select="logAction('nested-share-email')"
                >
                  Email
                </component>
                <component
                  :is="Item"
                  value="message"
                  class="menuItem"
                  @select="logAction('nested-share-message')"
                >
                  Message
                </component>
              </component>
            </component>
          </Teleport>
        </component>
      </template>
    </UIMenu>

    <UIMenu trigger-text="Links only">
      <template #content="{ item: Item, separator: Separator }">
        <component
          :is="Item"
          value="docs"
          as-child
          class="menuItem"
          @select="logAction('links-docs')"
        >
          <a href="https://ark-ui.com">Documentation</a>
        </component>
        <component
          :is="Item"
          value="repo"
          as-child
          class="menuItem"
          @select="logAction('links-repo')"
        >
          <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </component>
        <component :is="Separator" class="menuSeparator" />
        <component
          :is="Item"
          value="changelog"
          as-child
          class="menuItem"
          @select="logAction('links-changelog')"
        >
          <a
            href="https://github.com/chakra-ui/ark/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            Changelog
          </a>
        </component>
      </template>
    </UIMenu>

    <p class="txt-caption text-neutral-text-subtle">
      Selected: {{ selectedAction ?? 'none' }} | toolbar={{ toolbarVisible }} | statusBar={{
        statusBarVisible
      }}
      | sortBy={{ sortBy }}
    </p>
  </div>
</template>
