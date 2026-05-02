<script setup lang="ts">
import { z } from 'zod'

import { useSchemaForm } from '~ui/app/composables/useSchemaForm'
import { formatFieldErrors } from '~ui/app/utils/form-field-errors'

const schema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(1),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
}

const submitted = ref('')

const { form } = useSchemaForm({
  schema,
  defaultValues,
  /** Example: also validate on blur; default in composable is change-only. */
  validateSchemaOn: ['change', 'blur'],
  onSubmit: ({ value }) => {
    submitted.value = JSON.stringify(value)
  },
})

const canSubmit = form.useStore((s) => s.canSubmit)
const isSubmitting = form.useStore((s) => s.isSubmitting)
</script>

<template>
  <div class="flex max-w-md flex-col gap-4">
    <form
      class="flex flex-col gap-4"
      novalidate
      :aria-busy="isSubmitting ? true : undefined"
      @submit.prevent="void form.handleSubmit()"
    >
      <form.Field name="firstName">
        <template #default="{ field, state }">
          <UIFormInput
            label="First name"
            placeholder="Jane"
            required
            :name="field.name"
            :model-value="state.value"
            :invalid="state.meta.errors.length > 0"
            :error="formatFieldErrors(state.meta.errors)"
            @update:model-value="field.handleChange($event)"
            @blur="field.handleBlur()"
          />
        </template>
      </form.Field>

      <form.Field name="lastName">
        <template #default="{ field, state }">
          <UIFormInput
            label="Last name"
            placeholder="Doe"
            required
            :name="field.name"
            :model-value="state.value"
            :invalid="state.meta.errors.length > 0"
            :error="formatFieldErrors(state.meta.errors)"
            @update:model-value="field.handleChange($event)"
            @blur="field.handleBlur()"
          />
        </template>
      </form.Field>

      <UIButton
        type="submit"
        text="Submit"
        variant="subtle"
        intent="primary"
        :disabled="!canSubmit || isSubmitting"
      />
    </form>

    <p v-if="submitted" class="txt-caption text-primary-text-subtle">Submitted: {{ submitted }}</p>
  </div>
</template>
