import type { PopupContentCallbacks } from '@silver-formily/antd-mobile'
import { createPopup } from '@silver-formily/antd-mobile'
import { Button, Input, Space, Toast } from 'antd-mobile'
import { useMemo, useState } from 'react'

interface ContentProps extends PopupContentCallbacks<string> {
  name: string
  dismiss: () => void
}

function Content({ name, dismiss, onConfirm, onCancel }: ContentProps) {
  return (
    <Space direction="vertical" block>
      <div>
        你好，
        {name}
      </div>
      <Button block color="primary" onClick={() => onConfirm(name)}>确认</Button>
      <Button block onClick={onCancel}>取消</Button>
      <Button block onClick={dismiss}>主动关闭</Button>
    </Space>
  )
}

export default function LifecycleDemo() {
  const [name, setName] = useState('小银')
  const popup = useMemo(() => createPopup(Content, {
    closeOnMaskClick: false,
    bodyStyle: { padding: 20 },
  }), [])

  async function open() {
    const result = await popup.prompt({
      name,
      dismiss: () => popup.close(),
      onCancel: () => Toast.show('已取消'),
    })
    if (result !== null)
      Toast.show(`已确认：${result}`)
  }

  return (
    <Space direction="vertical" block>
      <Input value={name} onChange={setName} placeholder="输入本次打开时的名字" />
      <Button block onClick={open}>传入当前名字</Button>
    </Space>
  )
}
