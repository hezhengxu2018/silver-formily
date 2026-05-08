export interface InputProps {
  formatter?: (value: string) => string
  formatTrigger?: 'onBlur' | 'onChange'
  modelValue?: string | number | null
  type?: string
}
