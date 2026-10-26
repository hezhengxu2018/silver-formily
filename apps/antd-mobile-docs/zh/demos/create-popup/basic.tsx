import type { PopupContentCallbacks } from '@silver-formily/antd-mobile'
import { createPopup, FormButtonGroup, Submit } from '@silver-formily/antd-mobile'
import { Button } from 'antd-mobile'
import { useMemo, useState } from 'react'
import { showDemoResult } from '../shared'

type Color = 'blue' | 'green'

interface ColorContentProps extends PopupContentCallbacks<Color> {
  options: { label: string, value: Color }[]
}

function ColorContent({ onConfirm, onCancel, options }: ColorContentProps) {
  return (
    <>
      {options.map(option => <Button key={option.value} block onClick={() => onConfirm(option.value)}>{option.label}</Button>)}
      <Button block onClick={onCancel}>取消</Button>
    </>
  )
}
export default function BasicDemo() {
  const [value, setValue] = useState<Color>('blue')
  const popup = useMemo(() => createPopup(ColorContent, { bodyStyle: { padding: 20 } }), [])
  return (
    <>
      <Button
        block
        onClick={() => popup.prompt({ options: [{ label: '蓝色', value: 'blue' }, { label: '绿色', value: 'green' }] }).then((result) => {
          if (result !== null)
            setValue(result)
        })}
      >
        选择主题色：
        {value === 'blue' ? '蓝色' : '绿色'}
      </Button>
      <FormButtonGroup><Submit onSubmit={() => showDemoResult({ color: value })}>提交</Submit></FormButtonGroup>
    </>
  )
}
