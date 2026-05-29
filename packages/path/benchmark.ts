import { times } from 'es-toolkit/compat'
import { bench, do_not_optimize, run } from 'mitata'
import { Parser } from './src/parser'

const str
  = 'aakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.bbmmmmmmmmmmmmmmmmmmmmmmmmmmm.cceeeeeeeeeeeeeeeeeee'

bench('Path parse', () => {
  times(1e3, () => {
    do_not_optimize(new Parser(str).parse())
  })
})

bench('Normal foreach', () => {
  times(1e3, () => {
    if (!/[()*[\]]/.test(str)) {
      do_not_optimize(str.replace(/\s+/g, '').split('.'))
    }
  })
})

bench('charCodeAt foreach', () => {
  times(1e3, () => {
    const res: number[] = []
    for (let i = 0; i < str.length; i++) {
      res.push(str.charCodeAt(i))
    }
    do_not_optimize(res)
  })
})

// eslint-disable-next-line antfu/no-top-level-await
await run()
