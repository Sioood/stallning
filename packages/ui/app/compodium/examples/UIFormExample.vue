<script setup lang="ts">
import { z } from 'zod'

import UIFormCheckbox from '~ui/app/components/Form/Checkbox.vue'
import UIFormInput from '~ui/app/components/Form/Input.vue'

import type {
  InferSchemaValues,
  SchemaFieldsMap,
  SchemaFormLayout,
} from '~ui/app/components/Form/schema'

const schema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().optional(),
  email: z.string().trim().optional(),
  checkbox: z.union([z.literal(true), z.literal(false), z.literal('indeterminate')]),
})

type FormValues = InferSchemaValues<typeof schema>

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  checkbox: false,
}

const fields: SchemaFieldsMap<FormValues> = {
  firstName: {
    as: UIFormInput,
    props: {
      label: 'First name',
      placeholder: 'Jane',
      required: true,
    },
    validators: {
      onChangeAsyncDebounceMs: 400,
      onChangeAsync: async ({ value }: { value: string }) => {
        await new Promise((r) => setTimeout(r, 200))
        return value.includes('error') ? "Text must not contain 'error'" : undefined
      },
    },
  },
  lastName: {
    as: UIFormInput,
    props: {
      label: 'Last name',
      placeholder: 'Doe',
    },
  },
  email: {
    as: UIFormInput,
    props: {
      label: 'Email',
      placeholder: 'you@example.com',
      type: 'email',
    },
  },
  checkbox: {
    as: UIFormCheckbox,
    props: {
      label: 'Checkbox',
    },
  },
}

const layout: SchemaFormLayout<keyof FormValues & string>[] = [['firstName', 'lastName'], 'email', 'checkbox']

const submitted = ref('')

function onSubmit(value: FormValues) {
  submitted.value = JSON.stringify(value)
}
</script>

<template>
  <div class="flex max-w-md flex-col gap-4">
    <UIForm
      :schema="schema"
      :default-values="defaultValues"
      :fields="fields"
      :layout="layout"
      @submit="onSubmit"
    >
      <template #actions="{ canSubmit, isSubmitting }">
        <UIButton
          type="submit"
          text="Submit"
          variant="subtle"
          intent="primary"
          :disabled="!canSubmit || isSubmitting"
        />
      </template>
    </UIForm>

    <p v-if="submitted" class="txt-caption text-primary-text-subtle">Submitted: {{ submitted }}</p>
  </div>
</template>
