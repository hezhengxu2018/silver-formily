const currencySymbols = new Set([
  '$',
  '¢',
  '£',
  '¤',
  '€',
  '¥',
  '₱',
  '₹',
  '￥',
])

const hostnameLabelPattern = /^[\w\u00A1-\uFFFF]+(?:-[\w\u00A1-\uFFFF]+)*$/
const topLevelDomainPattern = /^[a-z\u00A1-\uFFFF_]{2,}$/i
const ipv4SegmentPattern = /^\d{1,3}$/

function isIPv4Segment(value: string) {
  return ipv4SegmentPattern.test(value) && Number(value) <= 255
}

function isValidIPv4Address(value: string) {
  const segments = value.split('.')
  return segments.length === 4 && segments.every(isIPv4Segment)
}

function isPrivateIPv4Address(value: string) {
  if (!isValidIPv4Address(value)) {
    return false
  }

  const [first, second, , fourth] = value.split('.').map(Number)

  if (first === 10 || first === 127) {
    return true
  }

  if (first === 169 && second === 254) {
    return true
  }

  if (first === 192 && second === 168) {
    return true
  }

  if (first === 172 && second >= 16 && second <= 31) {
    return true
  }

  return first === 0 || first >= 224 || fourth === 0 || fourth === 255
}

function isValidHostname(value: string) {
  const segments = value.split('.')

  if (segments.length < 2) {
    return false
  }

  const topLevelDomain = segments.at(-1)
  if (!topLevelDomain || !topLevelDomainPattern.test(topLevelDomain)) {
    return false
  }

  return segments.slice(0, -1).every(segment => !!segment && hostnameLabelPattern.test(segment))
}

function isValidUrl(value: any) {
  if (typeof value !== 'string') {
    return false
  }

  const input = value.trim()
  if (!input || /\s/.test(input)) {
    return false
  }

  const normalized = /^[a-z][a-z\d+.-]*:\/\//i.test(input)
    ? input
    : input.startsWith('//')
      ? `https:${input}`
      : ''

  if (!normalized) {
    return false
  }

  try {
    const parsed = new URL(normalized)
    if (!['http:', 'https:', 'ftp:', 'rtmp:'].includes(parsed.protocol)) {
      return false
    }

    const hostname = parsed.hostname
    if (!hostname) {
      return false
    }

    if (isValidIPv4Address(hostname)) {
      return !isPrivateIPv4Address(hostname)
    }

    return isValidHostname(hostname)
  }
  catch {
    return false
  }
}

function countIPv6Groups(groups: string[]) {
  return groups.reduce((count, group, index) => {
    if (!group) {
      return count
    }

    if (group.includes('.')) {
      return index === groups.length - 1 && isValidIPv4Address(group) ? count + 2 : Number.NaN
    }

    return /^[0-9A-F]{1,4}$/i.test(group) ? count + 1 : Number.NaN
  }, 0)
}

function isValidIPv6(value: any) {
  if (typeof value !== 'string') {
    return false
  }

  const input = value.trim()
  if (!input) {
    return false
  }

  const [address, zone, ...rest] = input.split('%')
  if (rest.length > 0 || !address || zone === '') {
    return false
  }

  if (address.includes(':::')) {
    return false
  }

  const compressionIndex = address.indexOf('::')
  const hasCompression = compressionIndex >= 0
  if (hasCompression && compressionIndex !== address.lastIndexOf('::')) {
    return false
  }

  const [left = '', right = ''] = hasCompression ? address.split('::') : [address]
  const leftGroups = left ? left.split(':') : []
  const rightGroups = right ? right.split(':') : []

  if ([...leftGroups, ...rightGroups].includes('')) {
    return false
  }

  const totalGroups = countIPv6Groups(leftGroups) + countIPv6Groups(rightGroups)
  if (Number.isNaN(totalGroups)) {
    return false
  }

  return hasCompression ? totalGroups < 8 : totalGroups === 8
}

function isValidMoney(value: any) {
  if (typeof value !== 'string') {
    return false
  }

  let input = value.trim()
  if (!input) {
    return false
  }

  if (currencySymbols.has(input[0])) {
    input = input.slice(1).trimStart()
  }

  return /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(input)
}

function isValidDate(value: any) {
  if (typeof value !== 'string') {
    return false
  }

  const input = value.trim()
  if (!input) {
    return false
  }

  const [datePart, ...rest] = input.split(/\s+/)
  if (!datePart || rest.length > 1) {
    return false
  }

  const dateSegments = datePart.split(/[./-]/)
  if (
    dateSegments.length !== 3
    || dateSegments.some(segment => !segment || !/^\d{1,4}$/.test(segment))
  ) {
    return false
  }

  const timePart = rest[0]
  if (!timePart) {
    return true
  }

  const timeSegments = timePart.split(':')
  return timeSegments.length === 3
    && timeSegments.every(segment => /^\d{1,2}$/.test(segment.trim()))
}

export default {
  url: isValidUrl,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  ipv6: isValidIPv6,

  ipv4: /^((25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})\.){3}(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})$/,

  number: /^[+-]?\d+(\.\d+)?$/,

  integer: /^[+-]?\d+$/,

  qq: /^(\+?[1-9]\d*|0)$/,

  phone: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,

  idcard: /^\d{15}$|^\d{17}([\dx])$/i,

  money: isValidMoney,

  zh: /^[\u4E00-\u9FA5]+$/,

  date: isValidDate,

  zip: /^\d{6}$/,
}
