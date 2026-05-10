/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  plugins: [import.meta.resolve('@stryker-mutator/vitest-runner')],
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.stryker.config.ts',
    dir: '.',
  },
  inPlace: true,
  incremental: true,
  incrementalFile: 'reports/stryker-incremental.json',
  mutate: [
    'app/utils/**/*.ts',
    'app/composables/**/*.ts',
    '!app/utils/button-variants.ts',
    '!app/**/*.d.ts',
  ],
  reporters: ['html', 'progress', 'clear-text'],
  htmlReporter: { fileName: 'reports/stryker-mutation.html' },
  thresholds: { high: 80, low: 60, break: null },
  tempDirName: '.stryker-tmp',
  cleanTempDir: 'always',
}
