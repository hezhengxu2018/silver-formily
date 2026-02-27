<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, FormLayout, Tree } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'
import { ElText } from 'element-plus'
import { codeToHtml } from 'shiki'
import { ref } from 'vue'

const form = createForm()

const data = [
  {
    id: 1,
    label: 'Level one 1 ---- ID：1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1 ---- ID：4',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1 ---- ID：9',
          },
          {
            id: 10,
            label: 'Level three 1-1-2 ---- ID：10',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2 ---- ID：2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1 ---- ID：5',
      },
      {
        id: 6,
        label: 'Level two 2-2 ---- ID：6',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3 ---- ID：3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1 ---- ID：7',
      },
      {
        id: 8,
        label: 'Level two 3-2 ---- ID：8',
      },
    ],
  },
]

const selectedPathValue = [
  {
    id: 1,
    label: 'Level one 1 ---- ID：1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1 ---- ID：4',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1 ---- ID：9',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3 ---- ID：3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1 ---- ID：7',
      },
      {
        id: 8,
        label: 'Level two 3-2 ---- ID：8',
      },
    ],
  },
]
const selectedPathValueCode = ref('')
codeToHtml(JSON.stringify(selectedPathValue, null, 2), {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },

}).then((html) => {
  selectedPathValueCode.value = html
})
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="4" :wrapper-col="16">
      <ElText>all，包括半勾选，初始值：[1, 4, 9, 2, 5]</ElText>
      <Field
        name="tree1"
        title="Tree1"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          includeHalfChecked: true,
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="[1, 4, 9, 2, 5]"
      />
      <ElText>all，不包括半勾选，初始值：[9, 5]</ElText>
      <Field
        name="tree2"
        title="Tree2"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="[9, 5]"
      />
      <ElText>parent，初始值：[1]</ElText>
      <Field
        name="tree3"
        title="Tree3"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'parent',
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="[1]"
      />
      <ElText>child，初始值：[8, 9]</ElText>
      <Field
        name="tree4"
        title="Tree4"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'child',
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="[8, 9]"
      />
      <ElText>path，初始值：完整的选中路径</ElText>
      <details>
        <summary>展开</summary>
        <div v-html="selectedPathValueCode.toString()" />
      </details>
      <Field
        name="tree5"
        title="Tree5"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'path',
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="selectedPathValue"
      />
    </FormLayout>
  </FormProvider>
</template>
