import { FormGrid } from '@silver-formily/antd-mobile'

const cardStyle = {
  padding: 16,
  borderRadius: 12,
  background: 'var(--adm-color-box)',
}

export default function FormGridItem() {
  return (
    <FormGrid minColumns={2} maxColumns={2} columnGap={8} rowGap={8} style={{ padding: 16 }}>
      {['待支付', '待发货', '待收货', '售后中'].map(title => (
        <div key={title} style={cardStyle}>{title}</div>
      ))}
      <FormGrid.GridColumn gridSpan={2} style={{ ...cardStyle, background: 'var(--adm-color-primary)', color: '#fff' }}>
        GridColumn 可以跨越两列
      </FormGrid.GridColumn>
      <div style={cardStyle}>当前行第一列</div>
      <div style={cardStyle} data-grid-span="-1">填满当前行剩余列</div>
      <div style={cardStyle} data-grid-span="-1">位于新行时，填满整行</div>
    </FormGrid>
  )
}
