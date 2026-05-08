<script setup lang="ts">
import { Grid } from '@silver-formily/vant'

const shortcuts = [
  '待支付',
  '待发货',
  '待收货',
  '售后中',
]
const GridColumn = Grid.GridColumn
</script>

<template>
  <Grid :columns="2" :column-gap="8" :row-gap="8">
    <div v-for="shortcut in shortcuts" :key="shortcut" class="shortcut-card">
      {{ shortcut }}
    </div>
    <GridColumn :grid-span="2">
      <div class="summary-card">
        <strong>Grid.GridColumn 可以跨列</strong>
        <p>需要某个区块占满两列时，直接包一层 GridColumn 即可。</p>
      </div>
    </GridColumn>
    <div class="summary-card summary-card--muted" data-grid-span="-1">
      普通节点也可以直接写 <code>data-grid-span="-1"</code> 让它自动铺满整行。
    </div>
  </Grid>
</template>

<style scoped>
.shortcut-card {
  display: grid;
  place-items: center;
  min-height: 84px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--van-success-color) 10%, #fff);
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 600;
}

.summary-card {
  display: grid;
  gap: 6px;
  min-height: 100%;
  padding: 12px;
  border-radius: 12px;
  background: var(--van-primary-color);
  color: #fff;
}

.summary-card p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.summary-card--muted {
  align-content: center;
  background: color-mix(in srgb, var(--van-primary-color) 10%, #fff);
  color: var(--van-text-color);
}

.summary-card--muted code {
  font-size: 12px;
}
</style>
