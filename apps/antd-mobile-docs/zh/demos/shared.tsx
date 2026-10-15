import { Dialog } from 'antd-mobile'

/**
 * 统一以 Dialog.alert 展示提交结果，替代 FormConsumer / pre 实时值区块，
 * 保证不同 demo 的交互风格一致（见本工程 AGENTS.md）。
 */
export function showDemoResult(values: any): void {
  Dialog.alert({
    title: '提交结果',
    content: <pre className="demo-result">{JSON.stringify(values, null, 2)}</pre>,
  })
}
