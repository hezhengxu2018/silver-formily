export interface IFormTab {
  name: string
  activeKey: string
  setActiveKey: (key: string) => void
}

export interface FormTabProps {
  formTab?: IFormTab
  modelValue?: string | number
}

export interface FormTabPaneProps {
  key: string | number
}

/** @deprecated Use FormTabProps instead. */
export type IFormTabProps = FormTabProps

/** @deprecated Use FormTabPaneProps instead. */
export type IFormTabPaneProps = FormTabPaneProps
