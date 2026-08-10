import { setProjectAnnotations } from '@storybook/vue3'
import { beforeAll } from 'vitest'

import * as previewAnnotations from './preview'

beforeAll(() => {
  setProjectAnnotations([previewAnnotations])
})
