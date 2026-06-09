import { describe, expect, it, vi } from 'vitest'
import { autorun, batch, observable, reaction } from '..'
import { define } from '../model'

describe('normal batch', () => {
  it('no batch', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = vi.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)

    obs.aa.bb = 333
    obs.aa.bb = 444

    expect(handler).toBeCalledTimes(5)
  })

  it('batch', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = vi.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(222)
    batch(() => {
      obs.aa.bb = 333
      obs.aa.bb = 444
    })
    batch(() => {})
    batch()
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(444)
  })

  it('batch track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = vi.fn()
    autorun(() => {
      batch(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.bound', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
    })
    const handler = vi.fn()
    const setData = batch.bound(() => {
      obs.aa.bb = 333
      obs.aa.bb = 444
    })
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(222)
    setData()
    batch(() => {})
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(444)
  })

  it('batch.bound track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = vi.fn()
    autorun(() => {
      batch.bound(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.scope', () => {
    const obs = observable<any>({})

    const handler = vi.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    batch(() => {
      batch.scope(() => {
        obs.aa = 123
      })
      batch.scope(() => {
        obs.cc = 'ccccc'
      })
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
    expect(handler).nthCalledWith(1, undefined, undefined, undefined, undefined)
    expect(handler).nthCalledWith(2, 123, undefined, undefined, undefined)
    expect(handler).nthCalledWith(3, 123, undefined, 'ccccc', undefined)
    expect(handler).nthCalledWith(4, 123, 321, 'ccccc', 'ddddd')
  })

  it('batch.scope bound', () => {
    const obs = observable<any>({})

    const handler = vi.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    const scope1 = batch.scope.bound(() => {
      obs.aa = 123
    })
    batch(() => {
      scope1()
      batch.scope.bound(() => {
        obs.cc = 'ccccc'
      })()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
    expect(handler).nthCalledWith(1, undefined, undefined, undefined, undefined)
    expect(handler).nthCalledWith(2, 123, undefined, undefined, undefined)
    expect(handler).nthCalledWith(3, 123, undefined, 'ccccc', undefined)
    expect(handler).nthCalledWith(4, 123, 321, 'ccccc', 'ddddd')
  })

  it('batch.scope track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = vi.fn()
    autorun(() => {
      batch.scope(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.scope bound track', () => {
    const obs = observable({
      aa: {
        bb: 123,
      },
      cc: 1,
    })
    const handler = vi.fn()
    autorun(() => {
      batch.scope.bound(() => {
        if (obs.cc > 0) {
          handler(obs.aa.bb)
          obs.cc = obs.cc + 20
        }
      })()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch error', () => {
    let error = null
    try {
      batch(() => {
        throw new Error('123')
      })
    }
    catch (e) {
      error = e
    }
    expect(error).toEqual(new Error('123'))
  })
})

describe('annotation batch', () => {
  it('batch', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        setData() {
          this.aa.bb = 333
          this.aa.bb = 444
        },
      },
      {
        aa: observable,
        setData: batch,
      },
    )
    const handler = vi.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(222)
    obs.setData()
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(444)
  })

  it('batch track', () => {
    const handler = vi.fn()
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        setData() {
          if (obs.cc > 0) {
            handler(obs.aa.bb)
            obs.cc = obs.cc + 20
          }
        },
      },
      {
        aa: observable,
        setData: batch,
      },
    )
    autorun(() => {
      obs.setData()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.bound', () => {
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        setData() {
          this.aa.bb = 333
          this.aa.bb = 444
        },
      },
      {
        aa: observable,
        setData: batch.bound,
      },
    )
    const handler = vi.fn()
    autorun(() => {
      handler(obs.aa.bb)
    })
    obs.aa.bb = 111
    obs.aa.bb = 222
    expect(handler).toBeCalledTimes(3)
    expect(handler).lastCalledWith(222)
    obs.setData()
    expect(handler).toBeCalledTimes(4)
    expect(handler).lastCalledWith(444)
  })

  it('batch.bound track', () => {
    const handler = vi.fn()
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        setData() {
          if (obs.cc > 0) {
            handler(obs.aa.bb)
            obs.cc = obs.cc + 20
          }
        },
      },
      {
        aa: observable,
        setData: batch.bound,
      },
    )
    autorun(() => {
      obs.setData()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.scope', () => {
    const obs = define(
      {
        aa: null,
        bb: null,
        cc: null,
        dd: null,
        scope1() {
          this.aa = 123
        },
        scope2() {
          this.cc = 'ccccc'
        },
      },
      {
        aa: observable,
        bb: observable,
        cc: observable,
        dd: observable,
        scope1: batch.scope,
        scope2: batch.scope,
      },
    )

    const handler = vi.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    batch(() => {
      obs.scope1()
      obs.scope2()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
    expect(handler).nthCalledWith(1, null, null, null, null)
    expect(handler).nthCalledWith(2, 123, null, null, null)
    expect(handler).nthCalledWith(3, 123, null, 'ccccc', null)
    expect(handler).nthCalledWith(4, 123, 321, 'ccccc', 'ddddd')
  })

  it('batch.scope bound', () => {
    const obs = define(
      {
        aa: null,
        bb: null,
        cc: null,
        dd: null,
        scope1() {
          this.aa = 123
        },
        scope2() {
          this.cc = 'ccccc'
        },
      },
      {
        aa: observable,
        bb: observable,
        cc: observable,
        dd: observable,
        scope1: batch.scope.bound,
        scope2: batch.scope.bound,
      },
    )

    const handler = vi.fn()

    autorun(() => {
      handler(obs.aa, obs.bb, obs.cc, obs.dd)
    })

    batch(() => {
      obs.scope1()
      obs.scope2()
      obs.bb = 321
      obs.dd = 'ddddd'
    })

    expect(handler).toBeCalledTimes(4)
    expect(handler).nthCalledWith(1, null, null, null, null)
    expect(handler).nthCalledWith(2, 123, null, null, null)
    expect(handler).nthCalledWith(3, 123, null, 'ccccc', null)
    expect(handler).nthCalledWith(4, 123, 321, 'ccccc', 'ddddd')
  })

  it('batch.scope track', () => {
    const handler = vi.fn()
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        scope() {
          if (this.cc > 0) {
            handler(this.aa.bb)
            this.cc = this.cc + 20
          }
        },
      },
      {
        aa: observable,
        cc: observable,
        scope: batch.scope,
      },
    )
    autorun(() => {
      obs.scope()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })

  it('batch.scope bound track', () => {
    const handler = vi.fn()
    const obs = define(
      {
        aa: {
          bb: 123,
        },
        cc: 1,
        scope() {
          if (this.cc > 0) {
            handler(this.aa.bb)
            this.cc = this.cc + 20
          }
        },
      },
      {
        aa: observable,
        cc: observable,
        scope: batch.scope.bound,
      },
    )
    autorun(() => {
      obs.scope()
    })
    expect(handler).toBeCalledTimes(1)
    expect(obs.cc).toEqual(21)
    obs.aa.bb = 321
    expect(handler).toBeCalledTimes(2)
    expect(obs.cc).toEqual(41)
  })
})

describe('batch endpoint', () => {
  it('normal endpoint', () => {
    const tokens = []
    const inner = batch.bound(() => {
      batch.endpoint(() => {
        tokens.push('endpoint')
      })
      tokens.push('inner')
    })
    const wrapper = batch.bound(() => {
      inner()
      tokens.push('wrapper')
    })
    wrapper()
    expect(tokens).toEqual(['inner', 'wrapper', 'endpoint'])
  })

  it('unexpect endpoint', () => {
    const tokens = []
    const inner = batch.bound(() => {
      batch.endpoint()
      tokens.push('inner')
    })
    const wrapper = batch.bound(() => {
      inner()
      tokens.push('wrapper')
    })
    wrapper()
    expect(tokens).toEqual(['inner', 'wrapper'])
  })

  it('no wrapper endpoint', () => {
    const tokens = []
    batch.endpoint(() => {
      tokens.push('endpoint')
    })
    expect(tokens).toEqual(['endpoint'])
  })
})

it('reaction collect in batch valid', () => {
  const obs = observable({
    aa: 11,
    bb: 22,
    cc: 33,
  })
  reaction(
    () => obs.aa,
    () => {
      void obs.cc
    },
  )
  const fn = vi.fn()

  autorun(() => {
    batch.scope(() => {
      obs.aa = obs.bb
    })
    fn()
  })

  obs.bb = 44
  expect(fn).toBeCalledTimes(2)
})

it('reaction collect in batch invalid', () => {
  const obs = observable({
    aa: 11,
    bb: 22,
    cc: 33,
  })
  reaction(
    () => obs.aa,
    () => {
      void obs.cc
    },
  )
  const fn = vi.fn()

  autorun(() => {
    batch.scope(() => {
      obs.aa = obs.bb
    })
    fn()
  })

  obs.bb = 44
  obs.cc = 55
  expect(fn).toBeCalledTimes(3)
})
