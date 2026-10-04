import { observable } from '@silver-formily/reactive'
import { Observer } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

const obs = observable({
  count: 0,
})

// Observer 只订阅 children 区域：obs.count 变化只重渲染 Observer 内部，
// 外层组件的渲染次数不会增加
export default function ObserverDemo() {
  const [outerRenders, setOuterRenders] = useState(1)

  return (
    <div>
      <div className="demoToolbar">
        <button className="demoButton" onClick={() => obs.count++}>
          count + 1
        </button>
        <button
          className="demoButton secondary"
          onClick={() => setOuterRenders(value => value + 1)}
        >
          强制重渲染外层
        </button>
      </div>
      <div>
        外层组件渲染次数：
        {outerRenders}
      </div>
      <div className="demoText">
        Observer 订阅值：
        <Observer>{() => <b>{obs.count}</b>}</Observer>
      </div>
    </div>
  )
}
