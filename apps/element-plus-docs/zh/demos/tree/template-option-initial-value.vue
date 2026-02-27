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

const tree1InitialValue = [
  {
    id: 9,
    label: 'Level three 1-1-1',
  },
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
]

const tree2InitialValue = [
  {
    id: 9,
    label: 'Level three 1-1-1',
  },
]
const tree3InitialValue = [
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
]
const tree4InitialValue = [
  {
    id: 9,
    label: 'Level three 1-1-1',
  },
  {
    id: 6,
    label: 'Level two 2-2',
  },
]

const selectedTree1Code = ref('')
const selectedTree2Code = ref('')
const selectedTree3Code = ref('')
const selectedTree4Code = ref('')
codeToHtml(JSON.stringify(tree1InitialValue, null, 2), {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },

}).then((html) => {
  selectedTree1Code.value = html
})
codeToHtml(JSON.stringify(tree2InitialValue, null, 2), {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },

}).then((html) => {
  selectedTree2Code.value = html
})
codeToHtml(JSON.stringify(tree3InitialValue, null, 2), {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },

}).then((html) => {
  selectedTree3Code.value = html
})
codeToHtml(JSON.stringify(tree4InitialValue, null, 2), {
  lang: 'javascript',
  themes: {
    light: 'min-light',
    dark: 'nord',
  },

}).then((html) => {
  selectedTree4Code.value = html
})
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="4" :wrapper-col="16">
      <ElText>all，包括半勾选，初始值：</ElText>
      <details>
        <summary>展开</summary>
        <div v-html="selectedTree1Code" />
      </details>
      <Field
        name="tree1"
        title="Tree1"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          optionAsValue: true,
          includeHalfChecked: true,
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="tree1InitialValue"
      />
      <ElText>all，不包括半勾选，初始值：</ElText>
      <details>
        <summary>展开</summary>
        <div v-html="selectedTree2Code" />
      </details>
      <Field
        name="tree2"
        title="Tree2"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'all',
          optionAsValue: true,
          includeHalfChecked: true,
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="tree2InitialValue"
      />
      <ElText>parent，初始值：</ElText>
      <details>
        <summary>展开</summary>
        <div v-html="selectedTree3Code" />
      </details>
      <Field
        name="tree3"
        title="Tree3"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'parent',
          optionAsValue: true,
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="tree3InitialValue"
      />
      <ElText>child，初始值：</ElText>
      <details>
        <summary>展开</summary>
        <div v-html="selectedTree4Code" />
      </details>
      <Field
        name="tree4"
        title="Tree4"
        :decorator="[FormItem]"
        :component="[Tree, {
          nodeKey: 'id',
          valueType: 'child',
          optionAsValue: true,
          defaultExpandAll: true,
        }]"
        :data-source="data"
        :initial-value="tree4InitialValue"
      />
    </FormLayout>
  </FormProvider>
</template>
