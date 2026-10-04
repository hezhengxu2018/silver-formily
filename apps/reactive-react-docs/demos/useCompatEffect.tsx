import { useCompatEffect } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

function Subscription(
  { onStatusChange }: { onStatusChange: (status: string) => void },
) {
  useCompatEffect(() => {
    onStatusChange('订阅已建立')
    return () => {
      onStatusChange('订阅已清理（组件真实卸载）')
    }
  }, [])

  return <div className="demoText">子组件挂载中</div>
}

// useCompatEffect 在 StrictMode 重放 effect 时不会误清理订阅，
// 只有依赖真实变化或组件卸载时才执行 dispose
export default function CompatEffectDemo() {
  const [active, setActive] = useState(true)
  const [status, setStatus] = useState('尚未建立订阅')

  return (
    <div>
      <div className="demoToolbar">
        <button
          className="demoButton"
          onClick={() => {
            setActive(value => !value)
          }}
        >
          {active ? '卸载子组件' : '重新挂载子组件'}
        </button>
      </div>
      <div>
        当前状态：
        {status}
      </div>
      {active && <Subscription onStatusChange={setStatus} />}
    </div>
  )
}
