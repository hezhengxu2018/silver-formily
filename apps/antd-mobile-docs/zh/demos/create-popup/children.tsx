import type { PopupContentCallbacks } from '@silver-formily/antd-mobile'
import type { ReactNode } from 'react'
import { createPopup } from '@silver-formily/antd-mobile'
import { Button, Space, Toast } from 'antd-mobile'
import { useMemo } from 'react'

interface ContentProps extends PopupContentCallbacks<string> {
  children?: ReactNode
}

function Content({ children, onConfirm, onCancel }: ContentProps) {
  return (
    <Space direction="vertical" block>
      <h3>操作说明</h3>
      {children}
      <Button block color="primary" onClick={() => onConfirm('read')}>我已阅读</Button>
      <Button block onClick={onCancel}>取消</Button>
    </Space>
  )
}

export default function ChildrenDemo() {
  const popup = useMemo(() => createPopup(Content, {
    position: 'top',
    bodyStyle: { padding: 20 },
  }), [])

  return (
    <Button
      block
      onClick={async () => {
        const result = await popup.prompt({
          children: <p>这段说明通过 React children 传入。</p>,
        })
        Toast.show(result === null ? '已取消' : '已完成阅读')
      }}
    >
      顶部弹层与 children
    </Button>
  )
}
