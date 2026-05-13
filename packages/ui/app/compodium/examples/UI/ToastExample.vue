<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const toaster = useToast()

const showPromiseToast = () => {
  toaster.value?.promise(
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve('Process finished successfully!')
        } else {
          reject(new Error('Network error occurred'))
        }
      }, 2000),
    ),
    {
      loading: { title: 'Uploading...', description: 'Please wait while we process your request.' },
      success: { title: 'Upload Complete', description: 'Your file has been saved.' },
      error: { title: 'Upload Failed', description: 'Could not connect to the server.' },
    },
  )
}

const showActionToast = () => {
  toaster.value?.create({
    title: 'Deployment Started',
    description: 'Your changes are being deployed to production.',
    type: 'info',
    action: {
      label: 'View Logs',
      onClick: () => {
        console.log('Viewing logs...')
      },
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-10 p-6 max-w-2xl mx-auto">
    <section class="flex flex-col gap-4">
      <h3 class="text-xl font-bold">Standard Notifications</h3>
      <div
        class="flex flex-wrap gap-3 p-6 bg-neutral-fill-subtle/10 rounded-xl border border-neutral-border-subtle"
      >
        <UIButton
          v-for="type in ['info', 'success', 'warning', 'error'] as const"
          :key="type"
          :intent="type"
          variant="subtle"
          class="capitalize min-w-[120px]"
          @click="
            toaster?.[type]({
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
              description: `System message for ${type} level.`,
              closable: true,
            })
          "
        >
          <Icon
            :name="
              type === 'info'
                ? 'tabler:info-circle'
                : type === 'success'
                  ? 'tabler:check'
                  : type === 'warning'
                    ? 'tabler:alert-triangle'
                    : 'tabler:alert-circle'
            "
            class="mr-2"
          />
          {{ type }}
        </UIButton>
      </div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Promise Tracking</h3>
        <p class="text-sm text-neutral-text-subtle">
          Automatically handles loading, success, and error states.
        </p>
        <UIButton intent="primary" variant="solid" class="w-full py-6" @click="showPromiseToast">
          <Icon name="tabler:upload" class="mr-2" />
          Start Upload Simulation
        </UIButton>
      </section>

      <section class="flex flex-col gap-4">
        <h3 class="text-xl font-bold">Interactive Actions</h3>
        <p class="text-sm text-neutral-text-subtle">Toasts that require user interaction.</p>
        <UIButton intent="secondary" variant="solid" class="w-full py-6" @click="showActionToast">
          <Icon name="tabler:rocket" class="mr-2" />
          Trigger Action Toast
        </UIButton>
      </section>
    </div>

    <UIToast v-if="toaster" />
  </div>
</template>
