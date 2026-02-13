import type { LocaleConfig } from 'vitepress'
import type { EPThemeConfig } from 'vitepress-theme-element-plus'

export const zhSidebar: EPThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/guide/' },
      ],
    },
  ],
  '/api/': [
    {
      text: 'Components',
      items: [
        { text: 'Field', link: '/api/components/field' },
        { text: 'ArrayField', link: '/api/components/array-field' },
        { text: 'ObjectField', link: '/api/components/object-field' },
        { text: 'VoidField', link: '/api/components/void-field' },
        { text: 'SchemaField', link: '/api/components/schema-field' },
        { text: 'RecursionField', link: '/api/components/recursion-field' },
        { text: 'FormProvider', link: '/api/components/form-provider' },
        { text: 'FormConsumer', link: '/api/components/form-consumer' },
        { text: 'ExpressionScope', link: '/api/components/expression-scope' },
      ],
    },
    {
      text: 'Hooks',
      items: [
        { text: 'useField', link: '/api/hooks/use-field' },
        { text: 'useFieldSchema', link: '/api/hooks/use-field-schema' },
        { text: 'useForm', link: '/api/hooks/use-form' },
        { text: 'useFormEffects', link: '/api/hooks/use-form-effects' },
        { text: 'useParentForm', link: '/api/hooks/use-parent-form' },
      ],
    },
    {
      text: 'Shared',
      items: [
        { text: 'connect', link: '/api/shared/connect' },
        { text: 'injections', link: '/api/shared/injections' },
        { text: 'mapProps', link: '/api/shared/map-props' },
        { text: 'mapReadPretty', link: '/api/shared/map-read-pretty' },
        { text: 'observer', link: '/api/shared/observer' },
        { text: 'schema', link: '/api/shared/schema' },
      ],
    },
  ],
  '/types/': [
    {
      text: '类型声明',
      items: [
        { text: 'Field', link: '/types/field' },
        { text: 'Path', link: '/types/path' },
        { text: 'FieldValidator', link: '/types/validator#fieldvalidator' },
      ],
    },
  ],
}

export const zhLocale: LocaleConfig<EPThemeConfig>['root'] = {
  label: '简体中文',
  lang: 'zh-CN',
  title: 'Silver Formily Vue',
  description: 'Formily 的 Vue3 封装',
  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/guide/',
        activeMatch: '^/guide/',
      },
      {
        text: 'API',
        link: '/api/components/field',
        activeMatch: '^/api/',
      },
      {
        text: '类型声明',
        link: '/types/',
        activeMatch: '^/types/',
      },
      {
        text: 'Q&A',
        link: '/questions/',
        activeMatch: '^/questions/',
      },
    ],
    sidebar: zhSidebar,
  },
}
