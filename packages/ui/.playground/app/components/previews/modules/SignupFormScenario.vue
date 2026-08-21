<script setup lang="ts">
import { z } from 'zod'

import UIFormCombobox from '~ui/app/components/Form/Combobox/index.vue'
import UIFormInput from '~ui/app/components/Form/Input.vue'
import UIFormNumberInput from '~ui/app/components/Form/NumberInput.vue'
import UIFormPhoneInput from '~ui/app/components/Form/PhoneInput.vue'
import UIFormRadioGroup from '~ui/app/components/Form/RadioGroup.vue'
import UIFormTextarea from '~ui/app/components/Form/Textarea.vue'
import type {
  InferSchemaValues,
  SchemaFieldsMap,
  SchemaFormLayout,
} from '~ui/app/utils/Components/Form/schema'

/**
 * The Zod-bound `<UIForm>` — validation, layout and submission driven entirely by a
 * schema plus a field map. This is the package's headline feature and had no playground
 * presence at all before.
 */

const schema = z.object({
  company: z.string().trim().min(2, 'Au moins 2 caractères'),
  email: z.string().trim().email('Adresse e-mail invalide'),
  notes: z.string().trim().optional(),
  phone: z.string().trim().min(6, 'Numéro requis'),
  plan: z.string().trim().min(1, 'Choisissez une formule'),
  seats: z.string().trim().min(1, 'Requis'),
  stack: z.array(z.string()).optional(),
})

type FormValues = InferSchemaValues<typeof schema>

const defaultValues: FormValues = {
  company: '',
  email: '',
  notes: '',
  phone: '',
  plan: 'team',
  seats: '5',
  stack: [],
}

const fields: SchemaFieldsMap<FormValues> = {
  company: {
    as: UIFormInput,
    props: { label: 'Organisation', placeholder: 'Acme SAS', required: true },
  },
  email: {
    as: UIFormInput,
    props: {
      label: 'E-mail professionnel',
      placeholder: 'vous@acme.fr',
      required: true,
      type: 'email',
    },
  },
  notes: {
    as: UIFormTextarea,
    props: { autoresize: true, label: 'Contexte', placeholder: 'Ce que vous cherchez à faire…' },
  },
  phone: {
    as: UIFormPhoneInput,
    props: { label: 'Téléphone', required: true },
  },
  plan: {
    as: UIFormRadioGroup,
    props: {
      items: [
        { label: 'Team — 5 sièges minimum', value: 'team' },
        { label: 'Business — SSO inclus', value: 'business' },
        { label: 'Entreprise — sur devis', value: 'enterprise' },
      ],
      label: 'Formule',
    },
  },
  seats: {
    as: UIFormNumberInput,
    props: { label: 'Sièges', max: 500, min: 1, step: 1 },
  },
  stack: {
    as: UIFormCombobox,
    props: {
      items: [
        { label: 'Nuxt', value: 'nuxt' },
        { label: 'Next.js', value: 'next' },
        { label: 'SvelteKit', value: 'sveltekit' },
        { label: 'Astro', value: 'astro' },
        { label: 'Autre', value: 'other' },
      ],
      label: 'Stack principale',
      placeholder: 'Rechercher…',
    },
  },
}

const layout: SchemaFormLayout<keyof FormValues & string>[] = [
  'company',
  'email',
  'phone',
  ['plan', 'seats'],
  'stack',
  'notes',
]

const submitted = ref<string | null>(null)

function onSubmit(values: FormValues) {
  submitted.value = `${values.company} · ${values.plan} · ${values.seats} sièges`
}
</script>

<template>
  <div class="flex flex-col gap-4">
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
          intent="primary"
          text="Demander un accès"
          class="w-full"
          :disabled="!canSubmit || isSubmitting"
        />
      </template>
    </UIForm>

    <UIAlert
      v-if="submitted"
      type="success"
      title="Demande envoyée"
      :description="submitted"
      closable
    />
  </div>
</template>
