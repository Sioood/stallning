import { pluginVue } from '../plugins.ts'
import { defineConfig } from '../types.ts'

export const vue = defineConfig([
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/html-self-closing': ['error', { html: { void: 'always', normal: 'always', component: 'always' } }],
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
])
