function serializeDemoPayload(payload: unknown) {
  return JSON.stringify(payload, (_key, value) => {
    if (value instanceof File) {
      return {
        kind: 'File',
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    }

    if (value instanceof Blob) {
      return {
        kind: 'Blob',
        size: value.size,
        type: value.type,
      }
    }

    return value
  }, 2)
}

export async function showDemoResult(payload: unknown, title = '提交结果') {
  await Prompts.alert(`${title}\n\n${serializeDemoPayload(payload)}`)
}
