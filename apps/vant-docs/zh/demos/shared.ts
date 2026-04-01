export async function showDemoResult(payload: unknown, title = '提交结果') {
  await Prompts.alert(`${title}\n\n${JSON.stringify(payload, null, 2)}`)
}
