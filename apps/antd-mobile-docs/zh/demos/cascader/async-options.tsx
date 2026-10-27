import type { CascaderOption } from 'antd-mobile'
import { Cascader, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Cascader as AntCascader } from 'antd-mobile'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { showDemoResult } from '../shared'

// undefined: not loaded; null: a leaf node; array: cached children.
type OptionsCache = Record<string, CascaderOption[] | null>

export default function Demo() {
  const form = useMemo(() => createForm({ initialValues: { region: [] } }), [])
  const [cache, setCache] = useState<OptionsCache>({})
  const requested = useRef(new Set<string>())
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())

  const fetchOptions = useCallback((value: string, level: number) => {
    // The request boundary also enforces the maximum depth. Field callbacks
    // must not depend on a React render's snapshot of the cache.
    if (level >= 3)
      return
    if (requested.current.has(value))
      return
    requested.current.add(value)
    // Simulate an API request. Each node's value is its unique full path.
    const timer = setTimeout(() => {
      timers.current.delete(timer)
      const children = Array.from({ length: 3 }, (_, index) => ({
        value: value ? `${value}-${index + 1}` : `${index + 1}`,
        label: value ? `${value}-${index + 1}` : `选项 ${index + 1}`,
      }))
      setCache(previous => ({
        ...previous,
        [value]: children,
        // This example has three levels. Mark the last level as leaves.
        ...(level === 2
          ? Object.fromEntries(children.map(child => [child.value, null]))
          : {}),
      }))
    }, 800)
    timers.current.add(timer)
  }, [])

  useEffect(() => {
    fetchOptions('', 0)
    const activeTimers = timers.current
    const activeRequests = requested.current
    return () => {
      activeTimers.forEach(clearTimeout)
      activeTimers.clear()
      activeRequests.clear()
    }
  }, [fetchOptions])

  const options = useMemo(() => {
    function generate(value: string): CascaderOption[] | undefined {
      const children = cache[value]
      if (children === null)
        return undefined
      if (children === undefined)
        return AntCascader.optionSkeleton
      return children.map(child => ({ ...child, children: generate(child.value) }))
    }
    return generate('') ?? []
  }, [cache])

  useEffect(() => {
    form.setFieldState('region', { dataSource: options })
  }, [form, options])

  return (
    <FormProvider form={form}>
      <Field
        name="region"
        title="异步级联"
        decorator={[FormItem]}
        dataSource={options}
        component={[Cascader, {
          title: '逐级加载选项',
          onSelect: (value) => {
            value.forEach((item, index) => {
              if (typeof item === 'string')
                fetchOptions(item, index + 1)
            })
          },
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
