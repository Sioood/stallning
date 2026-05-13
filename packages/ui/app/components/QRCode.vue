<script setup lang="ts">
import {
  QrCode as ArkQrCode,
  type QrCodeRootProps as ArkQrCodeRootProps,
  type QrCodeDownloadTriggerProps as ArkQrCodeDownloadTriggerProps,
} from '@ark-ui/vue/qr-code'
import { cva, type VariantProps } from 'class-variance-authority'

import type { ClassValue } from 'vue'

type QrCodeIntent = 'neutral' | 'primary' | 'secondary' | 'accent' | 'blackAndWhite'
type QrCodeSize = 'md'

const qrCodeRootCVA = cva(['qrCodeRoot', 'flex size-full flex-col items-center justify-center'], {
  variants: {
    intent: {
      neutral: 'text-neutral-surface-default',
      primary: 'text-primary-surface-default',
      secondary: 'text-secondary-surface-default',
      accent: 'text-accent-surface-default',
      blackAndWhite: 'text-black',
    } satisfies Record<QrCodeIntent, string>,
    size: {
      md: 'gap-2',
    } satisfies Record<QrCodeSize, string>,
  },
})

type QrCodeRootCVAProps = VariantProps<typeof qrCodeRootCVA>

const qrCodeFrameCVA = cva(['qrCodeFrame', 'size-full'], {
  variants: {
    intent: {
      neutral: 'bg-neutral-fill-subtle fill-neutral-surface-strong',
      primary: 'bg-primary-fill-subtle fill-primary-surface-strong',
      secondary: 'bg-secondary-fill-subtle fill-secondary-surface-strong',
      accent: 'bg-accent-fill-subtle fill-accent-surface-strong',
      blackAndWhite: 'bg-white fill-black',
    } satisfies Record<QrCodeIntent, string>,
  },
})

interface UIQrCodeSlots {
  root?: ClassValue
  frame?: ClassValue
  pattern?: ClassValue
  overlay?: ClassValue
  downloadTrigger?: ClassValue
}

interface QrCodeProps extends ArkQrCodeRootProps, ArkQrCodeDownloadTriggerProps {
  downloadable?: boolean
  downloadLabel?: string
  intent?: QrCodeRootCVAProps['intent']
  size?: QrCodeRootCVAProps['size']
  ui?: Partial<UIQrCodeSlots>
}

const modelValue = defineModel<string>({ default: 'https://theodupont.fr' })

const props = withDefaults(defineProps<QrCodeProps>(), {
  defaultValue: 'https://theodupont.fr',
  encoding: () => ({ ecc: 'M', boostEcc: true }),
  downloadable: false,
  downloadLabel: 'downloadQRCode',
  fileName: 'qr-code.png',
  mimeType: 'image/png',
  quality: 1,
  intent: 'neutral',
  size: 'md',
  ui: undefined,
})

const rootProps = computed(() => ({
  ...pick(props, ['asChild', 'defaultValue', 'encoding', 'id', 'ids', 'pixelSize']),
}))

const downloadTriggerProps = computed(() => ({
  ...pick(props, ['fileName', 'mimeType', 'quality']),
}))
</script>

<template>
  <ArkQrCode.Root
    v-bind="rootProps"
    v-model:model-value="modelValue"
    :class="cn(qrCodeRootCVA({ intent, size }), ui?.root)"
  >
    <div class="relative size-full">
      <ArkQrCode.Frame :class="cn(qrCodeFrameCVA({ intent }), ui?.frame)">
        <ArkQrCode.Pattern :class="cn(ui?.pattern)" />
      </ArkQrCode.Frame>
      <ArkQrCode.Overlay
        :class="cn('flex size-full items-center justify-center overflow-hidden', ui?.overlay)"
      >
        <slot name="overlay" />
      </ArkQrCode.Overlay>
    </div>
    <ArkQrCode.DownloadTrigger
      v-if="downloadable"
      as-child
      v-bind="downloadTriggerProps"
      :class="cn('w-full', ui?.downloadTrigger)"
    >
      <slot name="downloadTrigger">
        <UIButton :intent="intent === 'blackAndWhite' ? 'primary' : intent" :size>
          {{ $t(downloadLabel || 'downloadQRCode') }}
        </UIButton>
      </slot>
    </ArkQrCode.DownloadTrigger>
  </ArkQrCode.Root>
</template>
