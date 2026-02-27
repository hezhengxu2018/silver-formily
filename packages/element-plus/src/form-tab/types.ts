export interface IFormTab {
  name: string
  activeKey: string
  setActiveKey: (key: string) => void
}

export interface IFormTabProps {
  formTab?: IFormTab
  modelValue?: string | number
}

export interface IFormTabPaneProps {
  key: string | number
}
