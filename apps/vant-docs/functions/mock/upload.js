function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
      'content-type': 'application/json; charset=utf-8',
    },
    status,
  })
}

export function onRequestOptions() {
  return new Response(null, {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
    },
    status: 204,
  })
}

export async function onRequestPost(context) {
  const contentType = context.request.headers.get('content-type') || ''

  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return json({
      code: 400,
      message: 'Expected multipart/form-data upload request',
    }, 400)
  }

  const formData = await context.request.formData()
  const maybeFile = formData.get('file')
  const fileName = maybeFile && typeof maybeFile === 'object' && 'name' in maybeFile
    ? maybeFile.name
    : 'unknown-file'

  const safeName = encodeURIComponent(String(fileName))
  const timestamp = Date.now()

  // Demo endpoint: return a stable mock URL without persisting files.
  return json({
    code: 0,
    data: {
      fileName,
      url: `https://demo-upload.invalid/${timestamp}-${safeName}`,
    },
    message: 'ok',
  })
}
