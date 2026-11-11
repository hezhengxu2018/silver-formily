import type { PropsWithChildren } from 'react'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export function DemoConfig({ children }: PropsWithChildren) {
  // React demos mount on the client; initialize before Ant Design creates its styles.
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
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
