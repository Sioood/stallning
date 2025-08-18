import tseslint from 'typescript-eslint'
import base from '../eslint.config.js'
import pluginVue from 'eslint-plugin-vue'

export default tseslint.config([
  ...base,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // NOTE if solution is found, handle this rule for better experience with attributes
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
])
