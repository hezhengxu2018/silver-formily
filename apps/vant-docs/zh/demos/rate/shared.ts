export async function showRateDemoResult(values: Record<string, any>) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
