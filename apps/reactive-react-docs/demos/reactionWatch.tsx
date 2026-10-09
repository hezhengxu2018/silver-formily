import { observable } from '@silver-formily/reactive'
import { reactionWatch } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

const obs = observable({ keyword: '' })

function KeywordWatcher({ onLog }: { onLog: (message: string) => void }) {
  // 只在 tracker 返回值变化时通知，组件卸载时自动销毁
  reactionWatch(
    () => obs.keyword,
    (value, oldValue) => {
      onLog(`keyword：${oldValue || '（空）'} → ${value || '（空）'}`)
    },
  )

  return <div className="demoText">reactionWatch 挂载中</div>
}

export default function ReactionWatchDemo() {
  const [active, setActive] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const log = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  return (
    <div>
      <div className="demoToolbar">
        <input
          className="demoInput"
          value={obs.keyword}
          placeholder="输入关键词"
          onChange={(event) => {
            obs.keyword = event.target.value
          }}
        />
        <button
          className="demoButton"
          onClick={() => {
            setActive(value => !value)
          }}
        >
          {active ? '卸载子组件' : '重新挂载子组件'}
        </button>
      </div>
      {active && <KeywordWatcher onLog={log} />}
      <div>
        {logs.slice(-5).map((log, index) => (
          <div key={index} className="demoText secondary">{log}</div>
        ))}
      </div>
    </div>
  )
}
