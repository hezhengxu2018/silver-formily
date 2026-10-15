import { observable } from '@silver-formily/reactive'
import { useAutorunEffect } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

const obs = observable({ count: 0 })

function AutoRunner({ onLog, multiplier }: { onLog: (message: string) => void, multiplier: number }) {
  // observable 变化自动重跑；props 改变表达式时通过 deps 重建追踪
  useAutorunEffect(() => {
    onLog(`autorun：${obs.count} × ${multiplier} = ${obs.count * multiplier}`)
  }, { name: 'count-times-multiplier', deps: [multiplier] })

  return <div className="demoText">useAutorunEffect 挂载中</div>
}

export default function AutorunEffectDemo() {
  const [active, setActive] = useState(true)
  const [multiplier, setMultiplier] = useState(1)
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
        <button className="demoButton" onClick={() => setMultiplier(value => value === 1 ? 2 : 1)}>
          切换倍数（当前
          {' '}
          {multiplier}
          ）
        </button>
      </div>
      <div className="demoText">
        当前 count：
        {obs.count}
      </div>
      {active && <AutoRunner onLog={log} multiplier={multiplier} />}
      <div>
        {logs.slice(-5).map((log, index) => (
          <div key={index} className="demoText secondary">{log}</div>
        ))}
      </div>
    </div>
  )
}
