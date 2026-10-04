import { observable } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'
import './demoStyles.css'

const obs = observable({
  value: 'Hello world',
})

// observer 返回的组件在渲染时收集依赖，依赖变化只触发当前组件重渲染
const ObservedInput = observer(() => {
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

export default ObservedInput
