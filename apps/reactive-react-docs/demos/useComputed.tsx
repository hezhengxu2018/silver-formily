import { observable } from '@silver-formily/reactive'
import { useComputed } from '@silver-formily/reactive-react'
import { useState } from 'react'
import './demoStyles.css'

const obs = observable({ price: 100, count: 2 })

function Total({ discount }: { discount: number }) {
  // getter 只读 Formily observable；discount 来自 props，
  // 通过 deps 声明后变化时会用新 getter 重建追踪
  const total = useComputed(
    () => obs.price * obs.count * discount,
    { deps: [discount] },
  )

  return (
    <div className="demoText">
      合计：¥
      {total}
      <span className="secondary">
        （
        {discount}
        {' '}
        折）
      </span>
    </div>
  )
}

export default function ComputedDemo() {
  const [discount, setDiscount] = useState(1)

  return (
    <div>
      <div className="demoToolbar">
        <button
          className="demoButton"
          onClick={() => {
            obs.count++
          }}
        >
          数量 +1
        </button>
        <button
          className="demoButton"
          onClick={() => {
            setDiscount(value => (value === 1 ? 0.8 : 1))
          }}
        >
          切换折扣
        </button>
      </div>
      <div className="demoText">
        单价 ¥
        {obs.price}
        {' '}
        × 数量
        {' '}
        {obs.count}
      </div>
      <Total discount={discount} />
    </div>
  )
}
