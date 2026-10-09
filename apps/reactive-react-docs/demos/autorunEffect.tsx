import { observable } from '@silver-formily/reactive'
import { autorunEffect } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

const obs = observable({ count: 0 })

function AutoRunner({ onLog }: { onLog: (message: string) => void }) {
  // 组件提交后自动运行，count 变化时重跑，组件卸载时自动销毁
  autorunEffect(() => {
    onLog(`autorun 执行，当前 count = ${obs.count}`)
  })

  return <div className="demoText">autorunEffect 挂载中</div>
}

export default function AutorunEffectDemo() {
  const [active, setActive] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const log = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  return (
    <div>
      <div className="demoToolbar">
        <button
          className="demoButton"
          onClick={() => {
            obs.count++
          }}
        >
          count +1
        </button>
        <button
          className="demoButton"
          onClick={() => {
            setActive(value => !value)
          }}
        >
          {active ? '卸载子组件' : '重新挂载子组件'}
        </button>
      </div>
      <div className="demoText">
        当前 count：
        {obs.count}
      </div>
      {active && <AutoRunner onLog={log} />}
      <div>
        {logs.slice(-5).map((log, index) => (
          <div key={index} className="demoText secondary">{log}</div>
        ))}
      </div>
    </div>
  )
}
