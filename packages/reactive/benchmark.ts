import { reactive } from '@vue/reactivity'
import { times } from 'es-toolkit/compat'
import { bench, do_not_optimize, run } from 'mitata'
import * as mobx from 'mobx'
import { observable } from './src'

interface BenchmarkState {
  arr: number[]
  num: number
  obj: Record<string, number>
  str: string
}

function createState(): BenchmarkState {
  return {
    arr: [],
    num: 0,
    obj: {},
    str: '',
  }
}

function fillObservable(obs: BenchmarkState, count: number) {
  obs.arr = []
  obs.obj = {}

  times(count, (value) => {
    obs.num = value
    obs.str = `${value}`
    obs.arr.push(value)
    obs.obj[`${value}`] = value
  })
}

bench('Case MobX', () => {
  const obs = mobx.observable(createState())
  fillObservable(obs, 1e3)
  do_not_optimize(obs)
})

bench('Case @vue/reactivity', () => {
  const obs = reactive(createState())
  fillObservable(obs, 1e3)
  do_not_optimize(obs)
})

bench('Case @formily/reactive', () => {
  const obs = observable(createState())
  fillObservable(obs, 1e3)
  do_not_optimize(obs)
})

// eslint-disable-next-line antfu/no-top-level-await
await run()
