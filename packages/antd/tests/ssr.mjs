import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const code = `
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import dayjs from 'dayjs'
import * as controls from '${root}/src/index.ts'
export function run() {
  const names = ['OTP', 'Password', 'Checkbox', 'Radio', 'Switch', 'Cascader', 'TreeSelect', 'Transfer', 'DatePicker', 'TimePicker', 'Upload', 'Slider', 'Rate']
  const form = createForm({ initialValues: { DatePicker: dayjs('2026-11-06'), TimePicker: dayjs('2026-11-06') } })
  const element = React.createElement(controls.Form, { form }, names.map(name => React.createElement(Field, { key: name, name, component: [controls[name]] })))
  const editable = renderToString(element)
  form.setPattern('readPretty')
  const preview = renderToString(element)
  if (!editable.includes('2026-11-06') || !preview.includes('2026-11-06')) throw new Error('Date SSR failed')
  return { components: names.length, editableBytes: editable.length, previewBytes: preview.length, hasDOM: typeof document !== 'undefined' }
}`
const outDir = `${root}/node_modules/.cache/ssr-check`
async function main() {
  await build({
    root,
    configFile: false,
    logLevel: 'warn',
    ssr: { noExternal: ['antd', /^@rc-component\//, /^@ant-design\//] },
    build: {
      ssr: true,
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: 'virtual:ssr-check',
        output: { entryFileNames: 'entry.mjs' },
      },
    },
    plugins: [{
      name: 'ssr-check',
      resolveId(id) {
        if (id === 'virtual:ssr-check')
          return '\0ssr-check'
      },
      load(id) {
        if (id === '\0ssr-check')
          return code
      },
    }],
  })
  console.log((await import(`${outDir}/entry.mjs`)).run())
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
