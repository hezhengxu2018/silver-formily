import type { ReactNode } from 'react'

interface DemoSectionProps {
  title: string
  description?: string
  children: ReactNode
}

/**
 * 移动端预览整页（`zh/demos/<component>/index.tsx`）内的分节容器，
 * 样式对齐 vant-docs 的 MobileDemoSection（见 demo-page.css）。
 */
export function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <section className="demo-section">
      <header className="demo-section__header">
        <h2 className="demo-section__title">
          {title}
        </h2>
        {description && (
          <p className="demo-section__description">
            {description}
          </p>
        )}
      </header>
      <div className="demo-section__body">
        {children}
      </div>
    </section>
  )
}
