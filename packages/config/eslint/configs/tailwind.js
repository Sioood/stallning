import tseslint from 'typescript-eslint'
import base from '../eslint.config.js'
import tailwind from 'eslint-plugin-tailwindcss'

export default tseslint.config([
  ...base,
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
])
