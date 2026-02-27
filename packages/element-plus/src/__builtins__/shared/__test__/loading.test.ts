import { beforeEach, describe, expect, it } from 'vitest'
import { getTransitionDuration } from '../loading'

describe('getTransitionDuration', () => {
  beforeEach(() => {
    // 清理之前设置的 CSS 变量
    document.documentElement.style.removeProperty('--el-transition-duration')
    document.documentElement.style.removeProperty('--custom-duration')
  })

  it('应该正确解析毫秒单位的CSS变量', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '300ms')

    const result = getTransitionDuration()
    expect(result).toBe(300)
  })

  it('应该正确解析秒单位的CSS变量并转换为毫秒', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '0.5s')

    const result = getTransitionDuration()
    expect(result).toBe(500)
  })

  it('应该正确处理没有单位的数值（默认为毫秒）', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '250')

    const result = getTransitionDuration()
    expect(result).toBe(250)
  })

  it('应该正确处理小数值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '1.5s')

    const result = getTransitionDuration()
    expect(result).toBe(1500)
  })

  it('应该正确处理带空格的CSS值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '300 ms')

    const result = getTransitionDuration()
    expect(result).toBe(300)
  })

  it('应该在CSS变量未设置时返回默认值', () => {
    const result = getTransitionDuration()
    expect(result).toBe(200)
  })

  it('应该在CSS变量格式无效时返回默认值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', 'invalid-value')

    const result = getTransitionDuration()
    expect(result).toBe(200)
  })

  it('应该在数值为负数时返回默认值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '-100ms')

    const result = getTransitionDuration()
    expect(result).toBe(200)
  })

  it('应该支持自定义CSS变量名', () => {
    document.documentElement.style.setProperty('--custom-duration', '500ms')

    const result = getTransitionDuration('--custom-duration')
    expect(result).toBe(500)
  })

  it('应该支持自定义默认值', () => {
    const result = getTransitionDuration('--non-existent-var', 800)
    expect(result).toBe(800)
  })

  it('应该正确处理零值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '0s')

    const result = getTransitionDuration()
    expect(result).toBe(0)
  })

  it('应该正确处理大数值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '5s')

    const result = getTransitionDuration()
    expect(result).toBe(5000)
  })

  it('应该正确处理小数毫秒值', () => {
    document.documentElement.style.setProperty('--el-transition-duration', '150.5ms')

    const result = getTransitionDuration()
    expect(result).toBe(150.5)
  })
})
