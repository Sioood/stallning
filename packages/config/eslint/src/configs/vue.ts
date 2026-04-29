import { GLOB_VUE } from '../globs.ts'
import { parserTs, parserVue, pluginVue } from '../plugins.ts'
import { defineConfig } from '../types.ts'

import type { OptionsHasTypeScript } from '../types.ts'

export function vue(options: OptionsHasTypeScript = {}) {
  const { hasTypescript = true, tsconfigRootDir } = options

  return defineConfig([
    ...pluginVue.configs['flat/recommended'],
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: hasTypescript ? parserTs : undefined,
          sourceType: 'module',
          ...(tsconfigRootDir ? { tsconfigRootDir } : {}),
        },
      },
      rules: {
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/html-self-closing': [
          'error',
          { html: { void: 'always', normal: 'always', component: 'always' } },
        ],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/singleline-html-element-content-newline': 'off',
      },
    },
  ])
}
