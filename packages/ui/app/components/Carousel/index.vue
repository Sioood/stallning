<script setup lang="ts">
import {
  type CarouselIndicatorVariant,
  type CarouselIntent,
  type CarouselSize,
} from '~/utils/Components/Carousel/context'
import {
  carouselOverlayTriggerCVA,
  carouselViewportCVA,
} from '~/utils/Components/Carousel/variants'

import type { UICarouselRootSlots } from './Root.vue'
import type {
  CarouselRootBaseProps,
  CarouselRootProviderBaseProps,
  UseCarouselReturn,
} from '@ark-ui/vue/carousel'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

export interface UICarouselSlide {
  src?: string
  alt?: string
  label?: string
}

type CarouselContextApi = {
  pause: () => void
  play: () => void
  pageSnapPoints: number[]
}

/**
 * High-level Carousel component.
 *
 * Automates rendering of hover overlay triggers, item group, and page indicators.
 * Pass `items` for image/text slides, or use the default slot for custom content
 * (requires explicit `slide-count`).
 *
 * For full control, compose manually with `<UICarouselRoot>` and sub-components.
 */
export interface UICarouselProps
  extends
    Omit<CarouselRootBaseProps, 'page' | 'allowMouseDrag' | 'slideCount'>,
    Omit<CarouselRootProviderBaseProps, 'value'> {
  /** Total slides. Inferred from `items` when omitted. */
  slideCount?: number
  value?: UseCarouselReturn['value']
  /** Slide data used to auto-render items and optional thumbnail indicators. */
  items?: (UICarouselSlide | string)[]
  /** Whether mouse drag scrolling is enabled. @default true */
  allowMouseDrag?: boolean
  intent?: CarouselIntent
  size?: CarouselSize
  /** Dot or thumbnail indicator styling. @default 'dot' */
  indicatorVariant?: CarouselIndicatorVariant
  /** Show prev/next triggers as hover overlay on the slide area. @default true */
  showTriggers?: boolean
  /** Show page indicators. @default true */
  showIndicators?: boolean
  /** Show autoplay play/pause controls when `autoplay` is enabled. @default true */
  showAutoplayControls?: boolean
  /** Show progress text (e.g. "1 / 5"). @default false */
  showProgress?: boolean
  /** Pause autoplay while hovering the slide area. @default false */
  pauseOnHover?: boolean
  ui?: Partial<UICarouselRootSlots>
}

const props = withDefaults(defineProps<UICarouselProps>(), {
  slideCount: undefined,
  items: () => [],
  allowMouseDrag: true,
  intent: 'primary',
  size: 'md',
  indicatorVariant: 'dot',
  showTriggers: true,
  showIndicators: true,
  showAutoplayControls: true,
  showProgress: false,
  pauseOnHover: false,
  value: undefined,
  ui: undefined,
})

const page = defineModel<number>('page', { required: false })

const normalizedItems = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { label: item } : item)),
)

const resolvedSlideCount = computed(
  () => props.slideCount ?? (normalizedItems.value.length > 0 ? normalizedItems.value.length : 0),
)

const hasAutoplay = computed(() => Boolean(props.autoplay))

const orientation = computed(() => props.orientation ?? 'horizontal')

const overlayPrevClass = computed(() =>
  carouselOverlayTriggerCVA({ position: 'prev', orientation: orientation.value }),
)
const overlayNextClass = computed(() =>
  carouselOverlayTriggerCVA({ position: 'next', orientation: orientation.value }),
)

const thumbnailImageSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return { width: 112, height: 80 }
    case 'lg':
      return { width: 176, height: 112 }
    default:
      return { width: 144, height: 96 }
  }
})

const rootPassthrough = computed(() => {
  const {
    items: _items,
    showTriggers: _showTriggers,
    showIndicators: _showIndicators,
    showAutoplayControls: _showAutoplayControls,
    showProgress: _showProgress,
    indicatorVariant: _indicatorVariant,
    pauseOnHover: _pauseOnHover,
    ...rest
  } = props
  return {
    ...rest,
    slideCount: resolvedSlideCount.value,
  }
})

function handleViewportEnter(carousel: CarouselContextApi) {
  if (props.pauseOnHover && hasAutoplay.value) {
    carousel.pause()
  }
}

function handleViewportLeave(carousel: CarouselContextApi) {
  if (props.pauseOnHover && hasAutoplay.value) {
    carousel.play()
  }
}

extendCompodiumMeta<UICarouselProps>({
  defaultProps: {
    intent: 'primary',
    size: 'md',
    allowMouseDrag: true,
    showTriggers: true,
    showIndicators: true,
  },
})
</script>

<template>
  <UICarouselRoot
    v-bind="{ ...rootPassthrough, ...attrs }"
    v-model:page="page"
    :indicator-variant="indicatorVariant"
  >
    <div v-if="showAutoplayControls && hasAutoplay" class="flex items-center justify-end gap-2">
      <UICarouselAutoplayIndicator />
      <UICarouselAutoplayTrigger />
    </div>

    <UICarouselContext v-slot="api">
      <div
        :class="cn(showTriggers ? carouselViewportCVA() : 'relative w-full')"
        @mouseenter="handleViewportEnter(api)"
        @mouseleave="handleViewportLeave(api)"
      >
        <UICarouselItemGroup>
          <template v-if="normalizedItems.length > 0">
            <UICarouselItem v-for="(item, index) in normalizedItems" :key="index" :index="index">
              <slot name="item" :item="item" :index="index">
                <NuxtImg
                  v-if="item.src"
                  :src="item.src"
                  :alt="item.alt ?? item.label ?? `Slide ${index + 1}`"
                  class="size-full object-cover"
                  width="500"
                  height="300"
                />
                <div
                  v-else
                  class="txt-h3 flex h-48 w-full items-center justify-center border border-neutral-border-subtle bg-neutral-fill-subtle"
                >
                  {{ item.label ?? `Slide ${index + 1}` }}
                </div>
              </slot>
            </UICarouselItem>
          </template>
          <slot v-else />
        </UICarouselItemGroup>

        <UICarouselPrevTrigger v-if="showTriggers" :ui="{ root: overlayPrevClass }" />
        <UICarouselNextTrigger v-if="showTriggers" :ui="{ root: overlayNextClass }" />
      </div>

      <div v-if="showProgress" class="flex justify-center">
        <UICarouselProgressText />
      </div>

      <UICarouselIndicatorGroup v-if="showIndicators" :variant="indicatorVariant">
        <UICarouselIndicator
          v-for="(_, index) in api.pageSnapPoints"
          :key="index"
          :index="index"
          :variant="indicatorVariant"
        >
          <template
            v-if="
              indicatorVariant === 'thumbnail' &&
              normalizedItems[index]?.src &&
              (slidesPerPage ?? 1) === 1
            "
          >
            <NuxtImg
              :src="normalizedItems[index]!.src!"
              :alt="normalizedItems[index]!.alt ?? normalizedItems[index]!.label"
              class="block h-full w-full object-cover"
              :width="thumbnailImageSize.width"
              :height="thumbnailImageSize.height"
            />
          </template>
          <slot name="indicator" :index="index" :item="normalizedItems[index]" :carousel="api" />
        </UICarouselIndicator>
      </UICarouselIndicatorGroup>
    </UICarouselContext>

    <slot name="after" />
  </UICarouselRoot>
</template>
