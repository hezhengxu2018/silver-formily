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

// 同步 StrictMode 重放复用同一份 setup 和 cleanup；
// 最终卸载的 cleanup 延迟一个微任务
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
