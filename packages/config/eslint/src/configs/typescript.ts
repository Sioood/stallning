import { configs as tseslintConfigs } from 'typescript-eslint'

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
      ],
      languageOptions: {
        parserOptions: {
          projectService: false,
          ...(tsconfigRootDir ? { tsconfigRootDir } : {}),
        },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
  ])
}
