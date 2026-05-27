import {
  braceContext,
  bracketArrayContext,
  bracketContext,
  bracketDContext,
  destructorContext,
  parenContext,
} from './contexts'

interface ITokenProps {
  expectNext?: (next?: Token) => boolean
  expectPrev?: (prev?: Token) => boolean
  updateContext?: (prev?: Token) => void
}

export type Token = ITokenProps & {
  flag: string
}

function TokenType(flag: string, props?: ITokenProps): Token {
  return {
    flag,
    ...props,
  }
}

export const nameTok = TokenType('name')
export const starTok = TokenType('*')
export const dbStarTok = TokenType('**')
export const dotTok = TokenType('.')
export const bangTok = TokenType('!')
export const colonTok = TokenType(':')
export const braceLTok = TokenType('{')
export const braceRTok = TokenType('}')
export const bracketLTok = TokenType('[')
export const bracketRTok = TokenType(']')
export const bracketDLTok = TokenType('[[')
export const bracketDRTok = TokenType(']]')
export const parenLTok = TokenType('(')
export const parenRTok = TokenType(')')
export const commaTok = TokenType(',')
export const ignoreTok = TokenType('ignore')
export const expandTok = TokenType('expandTok')
export const eofTok = TokenType('eof')

Object.assign(nameTok, {
  expectNext(next?: Token) {
    if (this.includesContext(destructorContext)) {
      return (
        next === nameTok
        || next === commaTok
        || next === bracketRTok
        || next === braceRTok
        || next === colonTok
      )
    }
    return (
      next === dotTok
      || next === commaTok
      || next === eofTok
      || next === bracketRTok
      || next === parenRTok
      || next === colonTok
      || next === expandTok
      || next === bracketLTok
    )
  },
})

Object.assign(starTok, {
  expectNext(next?: Token) {
    return (
      next === dotTok
      || next === parenLTok
      || next === bracketLTok
      || next === eofTok
      || next === commaTok
      || next === parenRTok
    )
  },
})

Object.assign(dbStarTok, {
  expectNext(next?: Token) {
    return (
      next === dotTok
      || next === bracketLTok
      || next === eofTok
      || next === commaTok
      || next === parenRTok
    )
  },
})

Object.assign(dotTok, {
  expectNext(next?: Token) {
    return (
      next === dotTok
      || next === nameTok
      || next === bracketDLTok
      || next === starTok
      || next === dbStarTok
      || next === bracketLTok
      || next === braceLTok
      || next === eofTok
    )
  },
  expectPrev(prev?: Token) {
    return (
      prev === dotTok
      || prev === nameTok
      || prev === bracketDRTok
      || prev === starTok
      || prev === parenRTok
      || prev === bracketRTok
      || prev === expandTok
      || prev === braceRTok
    )
  },
})

Object.assign(bangTok, {
  expectNext(next?: Token) {
    return next === nameTok || next === bracketDLTok
  },
})

Object.assign(colonTok, {
  expectNext(next?: Token) {
    if (this.includesContext(destructorContext)) {
      return next === nameTok || next === braceLTok || next === bracketLTok
    }
    return next === nameTok || next === bracketDLTok || next === bracketRTok
  },
})

Object.assign(braceLTok, {
  expectNext(next?: Token) {
    return next === nameTok
  },
  expectPrev(prev?: Token) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok
    }
    return prev === dotTok || prev === colonTok || prev === parenLTok
  },
  updateContext() {
    this.state.context.push(braceContext)
  },
})

Object.assign(braceRTok, {
  expectNext(next?: Token) {
    if (this.includesContext(destructorContext)) {
      return (
        next === commaTok
        || next === braceRTok
        || next === eofTok
        || next === bracketRTok
      )
    }
    return next === dotTok || next === eofTok || next === commaTok
  },
  expectPrev(prev?: Token) {
    return prev === nameTok || prev === braceRTok || prev === bracketRTok
  },
  updateContext() {
    this.state.context.pop()
  },
})

Object.assign(bracketLTok, {
  expectNext(next?: Token) {
    if (this.includesContext(destructorContext)) {
      return (
        next === nameTok
        || next === bracketLTok
        || next === braceLTok
        || next === bracketRTok
      )
    }
    return (
      next === nameTok
      || next === bracketDLTok
      || next === colonTok
      || next === bracketLTok
      || next === ignoreTok
      || next === bracketRTok
    )
  },
  expectPrev(prev?: Token) {
    if (this.includesContext(destructorContext)) {
      return prev === colonTok || prev === commaTok || prev === bracketLTok
    }
    return (
      prev === starTok
      || prev === bracketLTok
      || prev === dotTok
      || prev === nameTok
      || prev === parenLTok
      || prev === commaTok
    )
  },
  updateContext() {
    this.state.context.push(bracketContext)
  },
})

Object.assign(bracketRTok, {
  expectNext(next?: Token) {
    if (this.includesContext(destructorContext)) {
      return (
        next === commaTok
        || next === braceRTok
        || next === bracketRTok
        || next === eofTok
      )
    }
    return (
      next === dotTok
      || next === eofTok
      || next === commaTok
      || next === parenRTok
      || next === bracketRTok
    )
  },
  updateContext() {
    if (this.includesContext(bracketArrayContext))
      return
    if (!this.includesContext(bracketContext))
      throw this.unexpect()
    this.state.context.pop()
  },
})

Object.assign(bracketDLTok, {
  updateContext() {
    this.state.context.push(bracketDContext)
  },
})

Object.assign(bracketDRTok, {
  updateContext() {
    if (this.curContext() !== bracketDContext)
      throw this.unexpect()
    this.state.context.pop()
  },
})

Object.assign(parenLTok, {
  expectNext(next?: Token) {
    return (
      next === nameTok
      || next === bracketDLTok
      || next === braceLTok
      || next === bangTok
      || next === bracketLTok
    )
  },
  expectPrev(prev?: Token) {
    return prev === starTok
  },
  updateContext() {
    this.state.context.push(parenContext)
  },
})

Object.assign(parenRTok, {
  expectNext(next?: Token) {
    return (
      next === dotTok
      || next === eofTok
      || next === commaTok
      || next === parenRTok
    )
  },
  updateContext() {
    if (this.curContext() !== parenContext)
      throw this.unexpect()
    this.state.context.pop()
  },
})

Object.assign(commaTok, {
  expectNext(next?: Token) {
    return (
      next === nameTok
      || next === bracketDLTok
      || next === bracketLTok
      || next === braceLTok
    )
  },
})

Object.assign(ignoreTok, {
  expectNext(next?: Token) {
    return next === bracketDRTok
  },
  expectPrev(prev?: Token) {
    return prev === bracketDLTok
  },
})

Object.assign(expandTok, {
  expectNext(next?: Token) {
    return (
      next === dotTok
      || next === eofTok
      || next === commaTok
      || next === parenRTok
    )
  },
})
