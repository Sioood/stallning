<script setup lang="ts">
import { h } from 'vue'
import { z } from 'zod'

import UIButton from '~ui/app/components/Button.vue'
import UIFormCheckbox from '~ui/app/components/Form/Checkbox.vue'
import UIFormInput from '~ui/app/components/Form/Input.vue'
import UIFormNumberInput from '~ui/app/components/Form/NumberInput.vue'
import UIFormPhoneInput from '~ui/app/components/Form/PhoneInput.vue'
import UIFormPinInput from '~ui/app/components/Form/PinInput.vue'
import UIFormRadioGroup from '~ui/app/components/Form/RadioGroup.vue'
import UIFormSlider from '~ui/app/components/Form/Slider/index.vue'
import UIFormTextarea from '~ui/app/components/Form/Textarea.vue'
import UISwitch from '~ui/app/components/Switch.vue'

import type {
  InferSchemaValues,
  SchemaFieldsMap,
  SchemaFormLayout,
} from '~/utils/Components/Form/schema'

const schema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  age: z.string().trim().min(1).optional(),
  code: z.string().trim().min(1).optional(),
  domain: z.string().trim().optional(),
  website: z.string().trim().optional(),
  price: z.string().trim().optional(),
  newsletter: z.string().trim().optional(),
  phone: z.string().trim().min(1, 'Phone number is required'),
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
  bio: '',
  age: '18',
  code: '',
  domain: '',
  website: '',
  price: '',
  newsletter: '',
  phone: '+46 ',
  checkbox: false,
  switch: false,
  framework: null,
  volume: [50],
}

const countryItems = [
  { label: '+46 Sweden', value: '+46' },
  { label: '+1 US', value: '+1' },
  { label: '+44 UK', value: '+44' },
  { label: '+33 France', value: '+33' },
  { label: '+49 Germany', value: '+49' },
]

function domainTrailing() {
  return h(
    'span',
    {
      class:
        'flex w-auto shrink-0 items-center border border-l-0 border-neutral-border-default bg-neutral-fill-subtle px-3 txt-label text-neutral-text-subtle',
    },
    '.com',
  )
}
function websiteLeading() {
  return h(
    'span',
    {
      class:
        'flex w-auto shrink-0 items-center border border-r-0 border-neutral-border-default bg-neutral-fill-subtle px-3 txt-label text-neutral-text-subtle',
    },
    'https://',
  )
}
function priceInnerLeading() {
  return h('span', { class: 'txt-label text-neutral-text-subtle' }, '$')
}
function newsletterTrailing() {
  return h(UIButton, { variant: 'subtle', intent: 'primary', text: 'Subscribe' })
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
  bio: {
    as: UIFormTextarea,
    props: {
      label: 'Bio',
      placeholder: 'Tell us about yourself…',
      autoresize: true,
    },
  },
  age: {
    as: UIFormNumberInput,
    props: {
      label: 'Age',
      placeholder: '18',
      min: 0,
      max: 150,
      step: 1,
    },
  },
  code: {
    as: UIFormPinInput,
    props: {
      label: 'Verification code',
      helperText: 'Enter the 5-digit code',
      count: 5,
    },
  },
  domain: {
    as: UIFormInput,
    props: {
      label: 'Domain',
      placeholder: 'mywebsite',
    },
    suffix: '.com',
    slots: { trailing: domainTrailing },
  },
  website: {
    as: UIFormInput,
    props: {
      label: 'Website',
      placeholder: 'example.com',
    },
    prefix: 'https://',
    slots: { leading: websiteLeading },
  },
  price: {
    as: UIFormInput,
    props: {
      label: 'Price',
      placeholder: '0.00',
      type: 'number',
    },
    prefix: '$',
    slots: { 'inner-leading': priceInnerLeading },
  },
  newsletter: {
    as: UIFormInput,
    props: {
      label: 'Newsletter',
      placeholder: 'you@example.com',
      type: 'email',
    },
    slots: { trailing: newsletterTrailing },
  },
  phone: {
    as: UIFormPhoneInput,
    props: {
      label: 'Phone',
      placeholder: '0701234567',
      items: countryItems,
      required: true,
    },
    validators: {
      onChange: ({ value }: { value: string }) => {
        if (!value || value.trim().length === 0) return 'Phone number is required'
        const parts = value.trim().split(' ')
        if (parts.length < 2 || !parts[0] || !parts[1]) {
          return 'Please select a country code and enter a phone number'
        }
        return undefined
      },
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
  'age',
  'bio',
  'code',
  'domain',
  'website',
  'price',
  'newsletter',
  'phone',
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

    <p v-if="submitted" class="txt-caption wrap-break-words w-full text-primary-text-subtle">
      Submitted: {{ submitted }}
    </p>
  </div>
</template>
