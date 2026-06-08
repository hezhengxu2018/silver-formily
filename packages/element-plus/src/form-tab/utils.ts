import { model } from '@silver-formily/reactive'

export function createFormTab(defaultActiveKey?: string) {
  const formTab = model({
    activeKey: defaultActiveKey,
    setActiveKey(key: string) {
      formTab.activeKey = key
    },
  })
  return formTab
}
