import { observable, Tracker } from '@silver-formily/reactive'
import { useCompatFactory, useForceUpdate } from '@silver-formily/reactive-react'
import './demoStyles.css'

const obs = observable({
  count: 0,
})

// useCompatFactory 是 useObserver 的内部实现：组件真实卸载时自动 dispose
// 出去的实例，StrictMode 重放渲染不会销毁它
function TrackerCounter() {
  const forceUpdate = useForceUpdate()
  const tracker = useCompatFactory(() => new Tracker(forceUpdate))

  // 每次渲染时收集 view 函数读取的响应式字段
  const value = tracker.track(() => obs.count)

  return (
    <div>
      <div className="demoToolbar">
        <button className="demoButton" onClick={() => obs.count++}>
          count + 1
        </button>
      </div>
      <div>
        track 读取值：
        {value}
      </div>
    </div>
  )
}

export default TrackerCounter
