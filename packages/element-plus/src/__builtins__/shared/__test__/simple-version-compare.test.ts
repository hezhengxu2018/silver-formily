import { describe, expect, it } from 'vitest'
import { lt, quickVersionCompare } from '../simple-version-compare'

describe('simple-version-compare', () => {
  describe('quickVersionCompare', () => {
    it('应该正确比较相同版本', () => {
      expect(quickVersionCompare('1.0.0', '1.0.0')).toBe(0)
      expect(quickVersionCompare('2.1.3', '2.1.3')).toBe(0)
      expect(quickVersionCompare('0.0.1', '0.0.1')).toBe(0)
    })

    it('应该正确比较不同的主版本号', () => {
      expect(quickVersionCompare('2.0.0', '1.0.0')).toBe(1)
      expect(quickVersionCompare('1.0.0', '2.0.0')).toBe(-1)
      expect(quickVersionCompare('10.0.0', '9.0.0')).toBe(1)
      expect(quickVersionCompare('1.0.0', '10.0.0')).toBe(-1)
    })

    it('应该正确比较不同的次版本号', () => {
      expect(quickVersionCompare('1.2.0', '1.1.0')).toBe(1)
      expect(quickVersionCompare('1.1.0', '1.2.0')).toBe(-1)
      expect(quickVersionCompare('1.10.0', '1.9.0')).toBe(1)
      expect(quickVersionCompare('1.1.0', '1.10.0')).toBe(-1)
    })

    it('应该正确比较不同的修订版本号', () => {
      expect(quickVersionCompare('1.0.2', '1.0.1')).toBe(1)
      expect(quickVersionCompare('1.0.1', '1.0.2')).toBe(-1)
      expect(quickVersionCompare('1.0.10', '1.0.9')).toBe(1)
      expect(quickVersionCompare('1.0.1', '1.0.10')).toBe(-1)
    })

    it('应该正确处理复杂的版本比较', () => {
      expect(quickVersionCompare('1.2.3', '1.2.2')).toBe(1)
      expect(quickVersionCompare('1.2.2', '1.2.3')).toBe(-1)
      expect(quickVersionCompare('2.0.0', '1.9.9')).toBe(1)
      expect(quickVersionCompare('1.9.9', '2.0.0')).toBe(-1)
      expect(quickVersionCompare('1.10.0', '1.2.0')).toBe(1)
      expect(quickVersionCompare('1.2.0', '1.10.0')).toBe(-1)
    })

    it('应该正确处理包含非数字字符的版本号', () => {
      // 非数字字符会被转换为 '0'
      expect(quickVersionCompare('1.0.0', '1.0.0-alpha')).toBe(0)
      expect(quickVersionCompare('1.0.1', '1.0.0-alpha')).toBe(1)
      expect(quickVersionCompare('1.0.0-alpha', '1.0.1')).toBe(-1)
      expect(quickVersionCompare('1.a.0', '1.0.0')).toBe(0)
      expect(quickVersionCompare('1.b.0', '1.a.0')).toBe(0)
    })

    it('应该正确处理大版本号', () => {
      expect(quickVersionCompare('100.200.300', '100.200.299')).toBe(1)
      expect(quickVersionCompare('100.200.299', '100.200.300')).toBe(-1)
      expect(quickVersionCompare('999.999.999', '1000.0.0')).toBe(-1)
      expect(quickVersionCompare('1000.0.0', '999.999.999')).toBe(1)
    })
  })

  describe('lt', () => {
    it('应该正确判断第一个版本是否小于第二个版本', () => {
      expect(lt('1.0.0', '2.0.0')).toBe(true)
      expect(lt('2.0.0', '1.0.0')).toBe(false)
      expect(lt('1.0.0', '1.0.0')).toBe(false)
    })

    it('应该正确处理次版本号比较', () => {
      expect(lt('1.1.0', '1.2.0')).toBe(true)
      expect(lt('1.2.0', '1.1.0')).toBe(false)
      expect(lt('1.9.0', '1.10.0')).toBe(true)
      expect(lt('1.10.0', '1.9.0')).toBe(false)
    })

    it('应该正确处理修订版本号比较', () => {
      expect(lt('1.0.1', '1.0.2')).toBe(true)
      expect(lt('1.0.2', '1.0.1')).toBe(false)
      expect(lt('1.0.9', '1.0.10')).toBe(true)
      expect(lt('1.0.10', '1.0.9')).toBe(false)
    })

    it('应该正确处理不同长度的版本号', () => {
      expect(lt('1.0', '1.0.1')).toBe(true)
      expect(lt('1.0.1', '1.0')).toBe(false)
      expect(lt('1', '1.0.1')).toBe(true)
      expect(lt('1.0.1', '1')).toBe(false)
      expect(lt('1', '2')).toBe(true)
      expect(lt('2', '1')).toBe(false)
    })

    it('应该正确处理复杂版本比较', () => {
      expect(lt('1.9.9', '2.0.0')).toBe(true)
      expect(lt('2.0.0', '1.9.9')).toBe(false)
      expect(lt('1.2.3', '1.10.1')).toBe(true)
      expect(lt('1.10.1', '1.2.3')).toBe(false)
    })

    it('应该正确处理边界情况', () => {
      expect(lt('0.0.0', '0.0.1')).toBe(true)
      expect(lt('0.0.1', '0.0.0')).toBe(false)
    })
  })

  describe('版本规范化测试', () => {
    it('应该正确处理版本号的数字填充', () => {
      expect(quickVersionCompare('1', '01')).toBe(0) // 都应该被规范化为相同格式
      expect(quickVersionCompare('1.2', '1.02')).toBe(0)
      expect(quickVersionCompare('1.2.3', '1.02.03')).toBe(0)
    })

    it('应该正确处理版本号中的前导零', () => {
      expect(quickVersionCompare('01.02.03', '1.2.3')).toBe(0)
      expect(quickVersionCompare('001.002.003', '1.2.3')).toBe(0)
      expect(quickVersionCompare('1.02.3', '1.2.03')).toBe(0)
    })
  })
})
