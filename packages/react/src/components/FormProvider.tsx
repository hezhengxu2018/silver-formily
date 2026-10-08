import type { IProviderProps } from '../types'
import { useAttach } from '../hooks/useAttach'
import { ContextCleaner, FormContext } from '../shared'

export function FormProvider(props: IProviderProps) {
  const form = useAttach(props.form)
  return (
    <ContextCleaner>
      <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
    </ContextCleaner>
  )
}

FormProvider.displayName = 'FormProvider'
