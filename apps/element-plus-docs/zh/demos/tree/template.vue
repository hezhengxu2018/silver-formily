<script lang="ts" setup>
import { createForm } from '@formily/core'
import { autorun, toJS } from '@formily/reactive'
import { isPlainObj } from '@formily/shared'
import { FormItem, FormLayout, Select, Switch, Tree } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { omit } from 'lodash-es'
import { codeToHtml } from 'shiki'
import { ref } from 'vue'

const form = createForm()

const shikiTree = ref('')
const shikiTree2 = ref('')
autorun(async () => {
  if (!form.values.tree || !form.values.tree2)
    return
  const treeValue = toJS(form.values.tree)
  const treeStrValue = isPlainObj(treeValue?.[0]) ? JSON.stringify(treeValue, null, 2) : JSON.stringify(treeValue)
  shikiTree.value = await codeToHtml(treeStrValue, {
    lang: 'javascript',
    themes: {
      light: 'min-light',
      dark: 'nord',
    },
  })
  const tree2Value = toJS(form.values.tree2)
  const tree2StrValue = isPlainObj(tree2Value?.[0]) ? JSON.stringify(tree2Value, null, 2) : JSON.stringify(tree2Value)
  shikiTree2.value = await codeToHtml(tree2StrValue, {
    lang: 'javascript',
    themes: {
      light: 'min-light',
      dark: 'nord',
    },
  })
})

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="4" :wrapper-col="16">
      <Field
        name="valueType"
        title="Tree的值类型"
        :decorator="[FormItem]"
        :component="[Select]"
        initial-value="all"
        :data-source="
          [{
             label: '全部',
             value: 'all',
           },
           {
             label: '优先父节点',
             value: 'parent',
           },
           {
             label: '仅子节点',
             value: 'child',
           },
           {
             label: '路径',
             value: 'path',
           },
          ]"
        :reactions="field => {
          const tree = field.query('tree').take();
          if (tree) {
            tree.setComponentProps({ ...tree.componentProps, valueType: field.value })
          }
        }"
      />
      <Field
        name="optionAsValue"
        title="optionAsValue"
        :decorator="[FormItem]"
        :component="[Switch]"
        :initial-value="false"
        :reactions="field => {
          const tree = field.query('tree').take();
          if (tree) {
            tree.setComponentProps({ ...tree.componentProps, optionAsValue: field.value })
          }
        }"
      />
      <Field
        name="includeHalfChecked"
        title="包括半勾选节点"
        :decorator="[FormItem]"
        :component="[Switch]"
        :initial-value="false"
        :reactions="field => {
          const tree = field.query('tree').take();
          if (tree) {
            tree.setComponentProps({ ...tree.componentProps, includeHalfChecked: field.value })
          }
        }"
      />
      <Field
        name="tree"
        title="Tree"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          includeHalfChecked: true,
          maxHeight: 150,
        }]"
        :data-source="data"
        :initial-value="[9]"
      />
      <details>
        <summary>输出结果</summary>
        <div v-html="shikiTree" />
      </details>
      <Field
        name="optionAsValue2"
        title="optionAsValue"
        :decorator="[FormItem]"
        :component="[Switch]"
        :initial-value="true"
        :reactions="field => {
          const tree = field.query('tree2').take();
          if (tree) {
            tree.setComponentProps({ ...tree.componentProps, optionAsValue: field.value })
          }
        }"
      />
      <Field
        name="tree2"
        title="CheckStrictly"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          checkStrictly: true,
          optionFormatter: (node) => omit(node, 'children'),
        }]"
        :data-source="data"
        :initial-value="[
          {
            id: 1,
            label: 'Level one 1',
          },
        ]"
      />
      <details>
        <summary>筛除children的输出结果</summary>
        <div v-html="shikiTree2" />
      </details>
    </FormLayout>
  </FormProvider>
</template>
