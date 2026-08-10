import { Icon as IconifyIcon } from '@iconify/vue'
import { defineComponent, h, type PropType } from 'vue'

/** Storybook stand-in for Nuxt `<ClientOnly>` — always render the default slot. */
export const ClientOnly = defineComponent({
  name: 'ClientOnly',
  props: {
    fallbackTag: {
      default: undefined,
      type: String,
    },
  },
  setup(_props, { slots }) {
    return () => slots.default?.()
  },
})

/** Storybook stand-in for `@nuxt/icon`'s `<Icon name="tabler:…" />`. */
export const Icon = defineComponent({
  name: 'Icon',
  props: {
    class: {
      default: undefined,
      type: [String, Object, Array] as PropType<unknown>,
    },
    name: {
      default: '',
      type: String,
    },
  },
  setup(props) {
    return () =>
      h(IconifyIcon, {
        class: props.class as never,
        icon: props.name || 'tabler:circle',
      })
  },
})

/** Minimal `<NuxtLink>` for Storybook (no Vue Router required). */
export const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    class: {
      default: undefined,
      type: [String, Object, Array] as PropType<unknown>,
    },
    href: {
      default: undefined,
      type: [String, Object] as PropType<string | Record<string, unknown>>,
    },
    to: {
      default: undefined,
      type: [String, Object] as PropType<string | Record<string, unknown>>,
    },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const target = props.to ?? props.href ?? '#'
      const href = typeof target === 'string' ? target : '#'
      return h('a', { ...attrs, class: props.class, href }, slots.default?.())
    }
  },
})

/** Minimal `<NuxtImg>` for Storybook. */
export const NuxtImg = defineComponent({
  name: 'NuxtImg',
  props: {
    alt: {
      default: '',
      type: String,
    },
    class: {
      default: undefined,
      type: [String, Object, Array] as PropType<unknown>,
    },
    src: {
      default: '',
      type: String,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('img', {
        ...attrs,
        alt: props.alt,
        class: props.class,
        src: props.src,
      })
  },
})
