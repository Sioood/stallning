<script setup lang="ts">
import { z } from 'zod'

import UIFormCheckbox from '~ui/app/components/Form/Checkbox.vue'
import UIFormInput from '~ui/app/components/Form/Input.vue'
import UIFormRadioGroup from '~ui/app/components/Form/RadioGroup.vue'
import UIFormSlider from '~ui/app/components/Form/Slider/index.vue'
import UISwitch from '~ui/app/components/Switch.vue'

import type {
  InferSchemaValues,
  SchemaFieldsMap,
  SchemaFormLayout,
} from '~ui/app/components/Form/schema'

const schema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().optional(),
  checkbox: z.union([z.literal(true), z.literal(false), z.literal('indeterminate')]),
  switch: z.boolean(),
  framework: z.string().nullable().optional(),
  volume: z.array(z.number()).min(1).max(2).default([50]),
})

type FormValues = InferSchemaValues<typeof schema>

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  checkbox: false,
  switch: false,
  framework: null,
  volume: [50],
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
  switch: {
    as: UISwitch,
    props: {
      label: 'Switch',
      helperText: 'Accept terms and conditions',
    },
  },
  framework: {
    as: UIFormRadioGroup,
    props: {
      label: 'Framework',
      helperText: 'Choose your preferred framework',
      orientation: 'horizontal',
      items: [
        { label: 'React', value: 'react' },
        { label: 'Solid', value: 'solid' },
        { label: 'Vue', value: 'vue' },
      ],
    },
  },
  volume: {
    as: UIFormSlider,
    props: {
      label: 'Volume',
      helperText: 'Adjust the volume range',
      min: 0,
      max: 100,
      step: 1,
      intent: 'primary',
    },
  },
}

const layout: SchemaFormLayout<keyof FormValues & string>[] = [
  ['firstName', 'lastName'],
  'email',
  'checkbox',
  'switch',
  'framework',
  'volume',
]

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
