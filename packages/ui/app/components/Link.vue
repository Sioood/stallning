<script setup lang="ts">
import { cva } from 'class-variance-authority'

import type { NuxtLinkProps } from '#app'

type linkIntent = 'primary' | 'secondary' | 'accent' | 'info' | 'warning' | 'error' | 'neutral'
type linkVariant = 'default' | 'ghost'

const linkCVA = cva('w-fit', {
  variants: {
    intent: {
      primary:
        'text-primary-text-default hover:text-primary-text-default-hover active:text-primary-text-default-active',
      secondary:
        'text-secondary-text-default hover:text-secondary-text-default-hover active:text-secondary-text-default-active',
      accent:
        'text-accent-text-default hover:text-accent-text-default-hover active:text-accent-text-default-active',
      info: 'text-info-text-default hover:text-info-text-default-hover active:text-info-text-default-active',
      warning:
        'text-warning-text-default hover:text-warning-text-default-hover active:text-warning-text-default-active',
      error:
        'text-error-text-default hover:text-error-text-default-hover active:text-error-text-default-active',
      neutral:
        'text-neutral-text-default hover:text-neutral-text-default-hover active:text-neutral-text-default-active',
    } satisfies Record<linkIntent, string>,
    variant: {
      default: 'underline',
      ghost: 'hover:underline',
    } satisfies Record<linkVariant, string>,
  },
})

interface LinkProps extends /* @vue-ignore */ NuxtLinkProps {
  styled?: boolean
  intent?: linkIntent
  variant?: linkVariant
}

const props = withDefaults(defineProps<LinkProps>(), {
  styled: true,
  intent: 'accent',
  variant: 'default',
})
const config = useRuntimeConfig()

const isExternal = computed(() => {
  if (props.external) return true
  const url = props.to?.toString()
  const siteUrl = config.public.siteUrl
  if (url?.startsWith(siteUrl)) return false
  return url?.startsWith('http')
})

const target = computed(() => props.target || (isExternal.value ? '_blank' : undefined))
const rel = computed(() => props.rel || (isExternal.value ? 'noopener noreferrer' : undefined))
</script>

<template>
  <nuxt-link
    v-if="!custom"
    v-bind="{ ...props, target, rel, class: cn(styled ? linkCVA({ intent, variant }) : '') }"
  >
    <slot>
      {{ to }}
    </slot>
  </nuxt-link>
  <slot
    v-else
    v-bind="{ ...props, target, rel, class: cn(styled ? linkCVA({ intent, variant }) : '') }"
  >
    <span :class="cn(styled ? linkCVA({ intent, variant }) : '')">{{ to }}</span>
  </slot>
</template>
