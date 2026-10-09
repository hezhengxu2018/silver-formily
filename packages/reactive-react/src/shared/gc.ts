// React 18/19 的运行环境（现代浏览器与 Node >= 18）均原生支持 globalThis，
// 不再需要上游针对旧环境的 globalThisPolyfill 探测
interface Token {
  clean?: () => void
}

const registry: FinalizationRegistry<Token> | undefined
  = globalThis.FinalizationRegistry
    && new globalThis.FinalizationRegistry<Token>(token => token?.clean?.())

export class GarbageCollector<T extends object = object> {
  private expireTime: number
  private request?: ReturnType<typeof setTimeout>
  private token: Token
  constructor(clean?: () => void, expireTime = 10_000) {
    this.token = {
      clean,
    }
    this.expireTime = expireTime
  }

  open(target: T) {
    if (registry) {
      registry.register(target, this.token, this.token)
    }
    else {
      this.request = setTimeout(() => {
        this.token?.clean?.()
      }, this.expireTime)
    }
  }

  close() {
    if (registry) {
      registry.unregister(this.token)
    }
    else {
      clearTimeout(this.request)
    }
  }
}
