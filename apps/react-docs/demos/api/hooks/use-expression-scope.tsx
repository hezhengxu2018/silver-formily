import { ExpressionScope, useExpressionScope } from '@silver-formily/react'
import '../../demoStyles.css'

// 读取当前子树的表达式作用域，常用于自定义组件消费 scope 中的变量
function Custom() {
  const scope = useExpressionScope() as { text?: string } | undefined
  return (
    <div className="demoPreview">
      作用域中的 text：
      {scope?.text ?? '未注入'}
    </div>
  )
}

export default function Demo() {
  return (
    <div>
      <Custom />
      <ExpressionScope value={{ text: '来自 ExpressionScope 的值' }}>
        <Custom />
      </ExpressionScope>
    </div>
  )
}
