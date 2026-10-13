const defaultAntdMobilePrefix = 'adm'

export function getPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
  if (customizePrefixCls) {
    return customizePrefixCls
  }
  return suffixCls ? `${defaultAntdMobilePrefix}-`.concat(suffixCls) : defaultAntdMobilePrefix
}

export function usePrefixCls(tag?: string, props?: {
  prefixCls?: string
}) {
  return getPrefixCls(tag, props?.prefixCls)
}
