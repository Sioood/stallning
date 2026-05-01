<script setup lang="ts">
import { useToast } from '~ui/app/composables/useToast'

const toaster = useToast()

const showPromiseToast = () => {
  toaster.value?.promise(
    new Promise<string>((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Done!')
        } else {
          reject(new Error('Failed'))
        }
      }, 2000),
    ),
    {
      loading: { title: 'Loading...', description: 'Please wait' },
      success: { title: 'Success!', description: 'Operation completed' },
      error: { title: 'Error', description: 'Something went wrong' },
    },
  )
}

const showActionToast = () => {
  toaster.value?.create({
    title: 'Invitation sent',
    description: 'Your team invitation has been sent. Click undo to cancel.',
    type: 'info',
    action: {
      label: 'Undo',
      onClick: () => {
        console.log('Undo clicked')
      },
    },

  })
}
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <UIButton
      v-for="type in ['info', 'success', 'warning', 'error'] as const"
      :key="type"
      :intent="type"
      @click="
        toaster?.[type]({ title: type, description: `This is a ${type} toast`, closable: true })
      "
    >
      Show {{ type }} toast
    </UIButton>
    <UIButton intent="primary" @click="showPromiseToast">Show promise toast</UIButton>
    <UIButton intent="secondary" @click="showActionToast">Show action toast</UIButton>
    <UIToast />
  </div>
</template>
