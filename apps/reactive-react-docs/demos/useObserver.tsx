import { observable } from '@silver-formily/reactive'
import { useObserver } from '@silver-formily/reactive-react'
import './demoStyles.css'

const obs = observable({
  value: 'Hello world',
})

// useObserver 是 observer 的内部实现，直接在组件内追踪 view 函数的依赖
function ObservedInput() {
  return useObserver(() => {
    return (
      <div>
        <input
          className="demoInput"
          value={obs.value}
          onChange={(event) => {
            obs.value = event.target.value
          }}
        />
        <div className="demoText">{obs.value}</div>
      </div>
    )
  })
}

export default ObservedInput
