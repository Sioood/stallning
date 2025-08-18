import { createConfigForNuxt } from '@nuxt/eslint-config'
import baseVue from '@stallning/eslint/configs/vue'
import baseTailwind from '@stallning/eslint/configs/tailwind'

export default createConfigForNuxt().append(baseTailwind, baseVue)
