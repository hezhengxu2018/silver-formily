/*
 * @Author: Hezhengxu
 * @Date: 2024-08-28 11:15:56
 * @LastEditors: Hezhengxu
 * @Description: 加载现有项目中的element-plus配置项
 */
import type { ConfigProviderProps } from 'element-plus'
import type { App } from 'vue'
import { useGlobalConfig, useZIndex } from 'element-plus'

export const loadElConfigProvider: () => Partial<ConfigProviderProps> = () => {
  const _appInstance = (
    document.querySelector('[data-v-app]') as Element & { __vue_app__: App }
  )?.__vue_app__
  if (!_appInstance || !_appInstance.runWithContext) {
    return {}
  }
  const elConfig = _appInstance.runWithContext(() => {
    return useGlobalConfig().value
  })
  const zIndex = _appInstance.runWithContext(() => {
    return useZIndex().nextZIndex()
  })

  return { ...elConfig, zIndex }
}
