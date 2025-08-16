import { createConfigForNuxt } from '@nuxt/eslint-config'
import baseVue from '@stallning/eslint/configs/vue'

export default createConfigForNuxt().append(baseVue)
