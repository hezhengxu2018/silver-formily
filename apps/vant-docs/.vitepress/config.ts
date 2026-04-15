import type { UserConfig } from 'vitepress'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '@silver-formily/vant/package.json' with { type: 'json' }
import vueJsx from '@vitejs/plugin-vue-jsx'

const currentDir = dirname(fileURLToPath(import.meta.url))
const vantSource = `${path.resolve(currentDir, '../../../packages/vant/src')}/`
type DocsPluginOption = NonNullable<NonNullable<UserConfig['vite']>['plugins']>[number]

export default createDocsConfig({
  pkg,
  alias: {
    '@silver-formily/vant': vantSource,
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Silver Formily Vant',
      description: 'Vant 的 Formily 封装骨架',
      themeConfig: {
        nav: [
          { text: '组件', link: '/component/quick-start', activeMatch: '/component/' },
        ],
        sidebar: {
          '/component/': [
            {
              text: 'Overview 总览',
              items: [
                { text: 'Quick Start 快速开始', link: '/component/quick-start' },
              ],
            },
            {
              text: 'Layout 布局组件',
              items: [
                { text: 'Form 表单', link: '/component/form' },
                { text: 'FormItem 表单项', link: '/component/form-item' },
                { text: 'Grid 宫格', link: '/component/grid' },
                { text: 'FormButtonGroup 按钮布局', link: '/component/form-button-group' },
                { text: 'Submit 提交按钮', link: '/component/submit' },
                { text: 'Reset 重置按钮', link: '/component/reset' },
              ],
            },
            {
              text: 'Input 输入组件',
              items: [
                { text: 'Input 输入框', link: '/component/input' },
                { text: 'PasswordInput 密码框', link: '/component/password-input' },
                { text: 'Checkbox 复选框', link: '/component/checkbox' },
                { text: 'Radio 单选框', link: '/component/radio' },
                { text: 'Switch 开关', link: '/component/switch' },
                { text: 'Stepper 步进器', link: '/component/stepper' },
                { text: 'Rate 评分', link: '/component/rate' },
                { text: 'Slider 滑块', link: '/component/slider' },
                { text: 'Signature 签名', link: '/component/signature' },
                { text: 'Upload 上传', link: '/component/upload' },
                { text: 'Cascader 级联选择', link: '/component/cascader' },
                { text: 'Picker 选择器', link: '/component/picker' },
                { text: 'DatePicker 日期滚轮', link: '/component/date-picker' },
                { text: 'TimePicker 时间滚轮', link: '/component/time-picker' },
                { text: 'PickerGroup 分步选择器', link: '/component/picker-group' },
                { text: 'Calendar 日期选择', link: '/component/calendar' },
              ],
            },
            {
              text: 'Scenario 场景组件',
              items: [
                { text: 'FormStep 分步表单', link: '/component/form-step' },
                { text: 'FormPopup 表单弹层', link: '/component/form-popup' },
              ],
            },
          ],
        },
      },
    },
  },
  footer: {
    message: 'Released under the MIT License.',
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/hezhengxu2018/silver-formily' },
  ],
  head: [['script', { src: 'https://cdn.jsdelivr.net/npm/prompts-js' }]],
  themeConfig: {
    outline: [2, 4],
    mobilePreview: {
      previewPath: 'preview/',
      deviceWidth: 375,
      deviceHeight: 700,
      demoRoot: 'zh/demos/',
    },
  },
  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    },
    plugins: [vueJsx() as unknown as DocsPluginOption],
    ssr: {
      noExternal: ['@silver-formily/vue'],
    },
    optimizeDeps: {
      include: [
        '@formily/core',
        '@formily/reactive',
        '@formily/shared',
        '@silver-formily/grid',
        '@silver-formily/reactive-vue',
        '@silver-formily/vue',
        'dayjs',
        'dayjs/plugin/customParseFormat',
        'vant',
      ],
    },
  },
  extra: {
    rewrites: {
      'zh/:slug*': ':slug*',
    },
    title: 'Silver Formily Vant',
    description: 'Formily bindings for Vant',
  },
})
