import { FormButtonGroup, FormItem, Picker, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

const dataSource = [
  [{ label: '热饮', value: 'hot' }, { label: '冷饮', value: 'cold' }],
  [{ label: '咖啡', value: 'coffee' }, { label: '茶', value: 'tea' }],
]

export default function ColumnsDemo() {
  const form = useMemo(() => createForm({ initialValues: { drink: ['hot', 'tea'] } }), [])
  return (
    <FormProvider form={form}>
      <Field name="drink" title="饮品" dataSource={dataSource} decorator={[FormItem]} component={[Picker, { title: '选择饮品' }]} />
      <FormButtonGroup><Submit onSubmit={showDemoResult}>提交</Submit></FormButtonGroup>
    </FormProvider>
  )
}
