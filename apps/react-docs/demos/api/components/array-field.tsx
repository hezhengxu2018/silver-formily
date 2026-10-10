import { createForm } from '@silver-formily/core'
import { ArrayField, Field, FormProvider } from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      className="demoInput"
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <ArrayField name="list">
        {field => (
          <div>
            {field.value?.map((_, index) => (
              <div className="demoFormRow" key={index}>
                <Field name={`${index}`} component={[Input]} />
                <button className="demoButton secondary" onClick={() => field.remove(index)}>
                  删除
                </button>
              </div>
            ))}
            <div className="demoToolbar">
              <button className="demoButton" onClick={() => field.push('')}>新增一行</button>
              <button className="demoButton secondary" onClick={() => field.pop()}>pop</button>
            </div>
          </div>
        )}
      </ArrayField>
    </FormProvider>
  )
}
