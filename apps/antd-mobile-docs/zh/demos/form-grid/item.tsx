import { FormGrid } from '@silver-formily/antd-mobile'

const cardStyle = {
  padding: 16,
  borderRadius: 12,
  background: 'var(--adm-color-box)',
}

export default function FormGridItem() {
  return (
    <FormGrid columns={2} columnGap={8} rowGap={8} style={{ padding: 16 }}>
      {['待支付', '待发货', '待收货', '售后中'].map(title => (
        <div key={title} style={cardStyle}>{title}</div>
      ))}
      <FormGrid.GridColumn gridSpan={2} style={{ ...cardStyle, background: 'var(--adm-color-primary)', color: '#fff' }}>
        GridColumn 可以跨越两列
      </FormGrid.GridColumn>
      <div style={cardStyle}>当前行第一列</div>
      <div style={cardStyle} data-grid-span="-1">另起一行，填满整行</div>
      <div style={cardStyle} data-grid-span="-1">始终独占整行</div>
    </FormGrid>
  )
}
