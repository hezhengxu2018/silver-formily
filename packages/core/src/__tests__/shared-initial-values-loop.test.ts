import { expect, it } from 'vitest'
import { createForm } from '../'

// 回归测试：FormDialog.applyOpenPayload 会对 forOpen 传入的 initialValues
// 先后执行 setInitialValues(X, 'overwrite') 与 setValues(X, 'overwrite')。
// 若两个 overwrite 分支按引用赋值，form.values 与 form.initialValues 会共享
// 同一原始对象，此后任何"数组值"字段的写入都会让 Form 的深度 observe 误判为
// initialValues 变更（contains 为 true），进入 patchFormValues 回写，
// 每次 update 写入 clone 产生的新数组引用，形成同步无限递归直至爆栈。
// 现在 overwrite 分支对入参做深拷贝，切断共享引用；同时断言对外部对象
// 的后续修改不会反向泄漏进表单值。

function setupDialogLikeForm(initialValues: any) {
  const form = createForm()
  form.setInitialValues(initialValues, 'overwrite')
  form.setValues(initialValues, 'overwrite')
  return form
}

function withLoopGuard<T>(work: () => T): Promise<T | 'LOOP'> {
  return Promise.race([
    Promise.resolve().then(work),
    new Promise<'LOOP'>(resolve =>
      setTimeout(resolve, 500, 'LOOP'),
    ),
  ])
}

it('primitive field write after overwrite initialValues', async () => {
  const form = setupDialogLikeForm({ name: 'hello' })
  const result = await withLoopGuard(() => {
    form.setValuesIn('name', 'changed')
    return 'done'
  })
  expect(result).toBe('done')
})

it('nested object write after overwrite initialValues', async () => {
  const form = setupDialogLikeForm({ obj: { a: 1, b: { c: 2 } } })
  const result = await withLoopGuard(() => {
    form.setValuesIn('obj', { a: 2, b: { c: 3 } })
    return 'done'
  })
  expect(result).toBe('done')
})

it('primitive array field write after overwrite initialValues', async () => {
  const form = setupDialogLikeForm({ tags: ['a', 'b'] })
  const result = await withLoopGuard(() => {
    form.setValuesIn('tags', ['a', 'b', 'c'])
    return 'done'
  })
  expect(result).toBe('done')
})

it('object array field write after overwrite initialValues', async () => {
  const form = setupDialogLikeForm({ treeSelect: [{ value: 1 }] })
  const result = await withLoopGuard(() => {
    form.setValuesIn('treeSelect', [{ value: 1 }, { value: 2 }])
    return 'done'
  })
  expect(result).toBe('done')
})

it('overwrite breaks reference sharing with the caller object', () => {
  const initialValues = { tags: ['a'] }
  const form = createForm()
  form.setInitialValues(initialValues, 'overwrite')
  form.setValues(initialValues, 'overwrite')

  expect(form.values).not.toBe(initialValues)
  expect(form.initialValues).not.toBe(initialValues)
  expect(form.values).toEqual(initialValues)

  initialValues.tags.push('leaked')
  expect(form.values.tags).toEqual(['a'])
})
