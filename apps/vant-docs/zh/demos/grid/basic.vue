<script setup lang="ts">
import { Grid } from '@silver-formily/vant'

const cards = [
  {
    title: '新品上架',
    description: '本周推荐 12 款人气单品',
  },
  {
    title: '订单跟踪',
    description: '查看物流与签收状态',
  },
  {
    title: '优惠券',
    description: '3 张即将到期，记得使用',
  },
  {
    title: '地址管理',
    description: '收货地址与发票信息',
  },
]
</script>

<template>
  <Grid :min-columns="2" :max-columns="2" :column-gap="8" :row-gap="8">
    <article v-for="card in cards" :key="card.title" class="feature-card">
      <strong>{{ card.title }}</strong>
      <p>{{ card.description }}</p>
    </article>
  </Grid>
</template>

<style scoped>
.feature-card {
  display: grid;
  gap: 6px;
  min-height: 100%;
  padding: 14px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--van-primary-color) 8%, #fff);
  color: var(--van-text-color);
}

.feature-card p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--van-text-color-2);
}
</style>
