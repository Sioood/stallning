export const getMessagesWithNamespace = async (translations: Record<string, () => Promise<unknown>>) => {
  let messages: Record<string, string> = {}

  for (const path in translations) {
    const file = await translations[path]?.()
    const content = (file as { default: Record<string, string> })?.default ?? {}

    const namespace = path.split('/')[1]?.split('.')[0]
    if (!namespace || namespace === 'translations' || namespace === 'index') {
      messages = { ...messages, ...content }
      continue
    }

    for (const key in content) {
      messages[`${namespace}:${key}`] = content[key] || key
    }
  }

  return messages
}
