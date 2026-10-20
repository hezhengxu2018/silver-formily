import { FormGrid } from '@silver-formily/antd-mobile'

const cards = [
  { title: '新品上架', description: '本周推荐 12 款人气单品' },
  { title: '订单跟踪', description: '查看物流与签收状态' },
  { title: '优惠券', description: '3 张即将到期，记得使用' },
  { title: '地址管理', description: '收货地址与发票信息' },
]

export default function FormGridBasic() {
  return (
    <FormGrid minColumns={2} maxColumns={2} columnGap={8} rowGap={8} style={{ padding: 16 }}>
      {cards.map(card => (
        <article key={card.title} style={{ padding: 12, borderRadius: 12, background: 'var(--adm-color-box)' }}>
          <strong>{card.title}</strong>
          <p style={{ marginBottom: 0, fontSize: 12, color: 'var(--adm-color-text-secondary)' }}>{card.description}</p>
        </article>
      ))}
    </FormGrid>
  )
}
