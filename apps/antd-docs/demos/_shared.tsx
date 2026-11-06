import type { PropsWithChildren } from 'react'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export function DemoConfig({ children }: PropsWithChildren) {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setDark(root.classList.contains('dark'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return <ConfigProvider locale={zhCN} theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>{children}</ConfigProvider>
}
export function Result({ value }: { value: unknown }) {
  return <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{JSON.stringify(value, null, 2)}</pre>
}
