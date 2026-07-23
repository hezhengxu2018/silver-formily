<script setup lang="ts">
import BaseTheme from '@silver-formily/docs-toolkit/theme'
import { ElConfigProvider } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout } = BaseTheme
const { lang } = useData()
const locale = computed(() => lang.value.toLowerCase().startsWith('zh') ? zhCn : en)
</script>

<template>
  <ElConfigProvider :locale="locale">
    <Layout />
  </ElConfigProvider>
</template>
