function stripAnsi(input: unknown) {
  if (typeof input !== 'string') {
    return input
  }

  let result = ''
  let index = 0

  while (index < input.length) {
    if (input.charCodeAt(index) === 27 && input[index + 1] === '[') {
      index += 2
      while (index < input.length) {
        const code = input.charCodeAt(index)
        index += 1
        if (code >= 64 && code <= 126) {
          break
        }
      }
      continue
    }

    result += input[index]
    index += 1
  }

  return result
}

export function stringLength(input: string) {
  const normalized = stripAnsi(input)
  return typeof normalized === 'string' ? [...normalized].length : 0
}
