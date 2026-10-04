import { useForceUpdate } from '@silver-formily/reactive-react'
import { useRef } from 'react'
import './demoStyles.css'

// 普通对象（非 observable），React 感知不到它的变化
const plain = {
  value: 0,
}

export default function ForceUpdateDemo() {
  const forceUpdate = useForceUpdate()
  const renderCountRef = useRef(0)
  renderCountRef.current++

  return (
    <div>
      <div className="demoToolbar">
        <button
          className="demoButton"
          onClick={() => {
            plain.value++
            // 同一事件内多次调用只会排队一次更新
            forceUpdate()
            forceUpdate()
          }}
        >
          value + 1
        </button>
        <button className="demoButton secondary" onClick={() => forceUpdate()}>
          仅 forceUpdate
        </button>
      </div>
      <div>
        普通对象值：
        {plain.value}
      </div>
      <div>
        组件渲染次数：
        {renderCountRef.current}
      </div>
    </div>
  )
}
