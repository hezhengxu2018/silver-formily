import type { DocsThemeConfig } from '@silver-formily/docs-toolkit'
import type { LocaleConfig } from 'vitepress'

export const enSidebar: DocsThemeConfig['sidebar'] = {
  '/en/guide/': [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/en/guide/' },
      ],
    },
  ],
  '/en/api/': [
    {
      text: 'Components',
      items: [
        { text: 'Field', link: '/en/api/components/field' },
        { text: 'ArrayField', link: '/en/api/components/array-field' },
        { text: 'ObjectField', link: '/en/api/components/object-field' },
        { text: 'VoidField', link: '/en/api/components/void-field' },
        { text: 'SchemaField', link: '/en/api/components/schema-field' },
        { text: 'RecursionField', link: '/en/api/components/recursion-field' },
        { text: 'FormProvider', link: '/en/api/components/form-provider' },
        { text: 'FormConsumer', link: '/en/api/components/form-consumer' },
        { text: 'ExpressionScope', link: '/en/api/components/expression-scope' },
        { text: 'RecordScope', link: '/en/api/components/record-scope' },
        { text: 'RecordsScope', link: '/en/api/components/records-scope' },
      ],
    },
    {
      text: 'Hooks',
      items: [
        { text: 'useField', link: '/en/api/hooks/use-field' },
        { text: 'useFieldSchema', link: '/en/api/hooks/use-field-schema' },
        { text: 'useForm', link: '/en/api/hooks/use-form' },
        { text: 'useFormEffects', link: '/en/api/hooks/use-form-effects' },
        { text: 'useParentForm', link: '/en/api/hooks/use-parent-form' },
        { text: 'useExpressionScope', link: '/en/api/hooks/use-expression-scope' },
      ],
    },
    {
      text: 'Shared',
      items: [
        { text: 'connect', link: '/en/api/shared/connect' },
        { text: 'mapProps', link: '/en/api/shared/map-props' },
        { text: 'mapReadPretty', link: '/en/api/shared/map-read-pretty' },
        { text: 'observer', link: '/en/api/shared/observer' },
        { text: 'context', link: '/en/api/shared/context' },
        { text: 'Schema', link: '/en/api/shared/schema' },
      ],
    },
  ],
  '/en/types/': [
    {
      text: 'Types',
      items: [
        { text: 'Overview', link: '/en/types/' },
        { text: 'Field', link: '/en/types/field' },
        { text: 'Path', link: '/en/types/path' },
        { text: 'Validator', link: '/en/types/validator' },
      ],
    },
  ],
}

export const enLocale: LocaleConfig<DocsThemeConfig>['root'] = {
  label: 'English',
  lang: 'en-US',
  link: '/en/',
  title: 'Silver Formily React',
  description: 'React 18/19 wrapper for Formily',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/en/guide/',
      },
      {
        text: 'API',
        link: '/en/api/components/field',
      },
      {
        text: 'Types',
        link: '/en/types/',
        activeMatch: '^/en/types/',
      },
    ],
    sidebar: enSidebar,
  },
}
