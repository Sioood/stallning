/** Swallow known `@nuxtjs/i18n` / jiti false positives during `@nuxt/test-utils` config resolution. */
process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error && reason.code === 'ERR_INTERNAL_ASSERTION') {
    return
  }
})

process.on('uncaughtException', (error) => {
  if (error instanceof Error && 'code' in error && error.code === 'ERR_INTERNAL_ASSERTION') {
    return
  }

  throw error
})
