import { configs as tseslintConfigs } from 'typescript-eslint'

import { GLOB_VUE } from '../globs.ts'
import { defineConfig, type FlatConfigs } from '../types.ts'

export function typescript(tsconfigRootDir?: string) {
  return defineConfig([
    ...(tseslintConfigs.recommended as FlatConfigs),
    {
      files: [
        '**/*.ts',
        '**/*.tsx',
        '**/*.mts',
        '**/*.cts',
        '**/*.js',
        '**/*.jsx',
        '**/*.mjs',
        '**/*.cjs',
        GLOB_VUE,
      ],
      languageOptions: {
        parserOptions: {
          projectService: false,
          ...(tsconfigRootDir ? { tsconfigRootDir } : {}),
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
  ])
}
