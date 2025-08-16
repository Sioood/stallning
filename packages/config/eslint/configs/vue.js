import tseslint from 'typescript-eslint'
import base from '../eslint.config.js'
import pluginVue from 'eslint-plugin-vue'

// FIXME Different instances of plugin "@typescript-eslint" found in multiple configs:

export default tseslint.config([
  ...base,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
])
