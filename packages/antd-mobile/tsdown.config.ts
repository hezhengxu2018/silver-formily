import { defineConfig } from 'tsdown'

export default defineConfig({
  // src/*/style.ts 透传 antd-mobile 组件样式 + 本地 less 覆盖样式，
  // 供消费者按需引入：import '@silver-formily/antd-mobile/esm/<component>/style'
  entry: ['src/index.ts', 'src/*/style.ts'],
  format: ['esm'],
  outDir: 'esm',
  platform: 'neutral',
  unbundle: true,
  clean: true,
  sourcemap: true,
  dts: true,
  css: {
    inject: true,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
