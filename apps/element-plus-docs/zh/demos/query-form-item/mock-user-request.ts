export interface UserRecord {
  id: string
  name: string
  department: string
}

export interface PermissionRecord {
  key: string
  label: string
  module: string
}

export const userSource: UserRecord[] = Array.from({ length: 80 }, (_, index) => ({
  id: `${index + 1}`,
  name: `User-${index + 1}`,
  department: index % 2 === 0 ? 'R&D' : 'Product',
}))

export const permissionSource: PermissionRecord[] = [
  { key: 'user:read', label: '查看用户', module: 'user' },
  { key: 'user:edit', label: '编辑用户', module: 'user' },
  { key: 'order:read', label: '查看订单', module: 'order' },
  { key: 'order:refund', label: '订单退款', module: 'order' },
  { key: 'finance:read', label: '查看账单', module: 'finance' },
  { key: 'finance:export', label: '导出账单', module: 'finance' },
]

export function createUserRequest(delay = 200) {
  return async function request(params: Record<string, any>) {
    await new Promise(resolve => setTimeout(resolve, delay))

    const keyword = `${params.keyword ?? ''}`.trim().toLowerCase()
    const department = `${params.department ?? ''}`.trim()

    const filtered = userSource.filter((item) => {
      const keywordMatched = keyword ? item.name.toLowerCase().includes(keyword) : true
      const departmentMatched = department ? item.department === department : true
      return keywordMatched && departmentMatched
    })

    const current = Number(params.current) || 1
    const pageSize = Number(params.pageSize) || 10
    const start = (current - 1) * pageSize
    const end = current * pageSize

    return {
      data: filtered.slice(start, end),
      success: true,
      total: filtered.length,
    }
  }
}

export function createPermissionRequest(delay = 150) {
  return async function request(params: Record<string, any>) {
    await new Promise(resolve => setTimeout(resolve, delay))

    const keyword = `${params.keyword ?? ''}`.trim().toLowerCase()
    const module = `${params.module ?? ''}`.trim()

    const filtered = permissionSource.filter((item) => {
      const keywordMatched = !keyword
        || item.label.toLowerCase().includes(keyword)
        || item.key.includes(keyword)
      const moduleMatched = !module || item.module === module
      return keywordMatched && moduleMatched
    })

    return {
      data: filtered,
      success: true,
      total: filtered.length,
    }
  }
}
