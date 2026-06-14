<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  ArrayItems,
  DatePicker,
  FormButtonGroup,
  FormItem,
  Input,
  Select,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const {
  SchemaField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaVoidField,
  SchemaStringField,
} = createSchemaField({
  components: {
    FormItem,
    Space,
    Input,
    Select,
    DatePicker,
    ArrayItems,
  },
})
const form = createForm()

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="string_array"
        title="String Array"
        x-decorator="FormItem"
        x-component="ArrayItems"
      >
        <SchemaVoidField x-component="Space">
          <SchemaVoidField
            x-decorator="FormItem"
            x-component="ArrayItems.SortHandle"
          />
          <SchemaStringField
            x-decorator="FormItem"
            required
            name="input"
            x-component="Input"
            :x-component-props="{
              style: {
                width: '160px',
              },
            }"
          />
          <SchemaVoidField
            x-decorator="FormItem"
            x-component="ArrayItems.Remove"
          />
        </SchemaVoidField>
        <SchemaVoidField x-component="ArrayItems.Addition" title="Add Item" />
      </SchemaArrayField>
      <SchemaArrayField
        name="array"
        title="Object Array"
        x-decorator="FormItem"
        x-component="ArrayItems"
      >
        <SchemaObjectField>
          <SchemaVoidField x-component="Space">
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaStringField
              x-decorator="FormItem"
              required
              title="Date"
              name="date"
              x-component="DatePicker"
              :x-component-props="{
                type: 'daterange',
                style: {
                  width: '160px',
                },
              }"
            />
            <SchemaStringField
              x-decorator="FormItem"
              required
              title="Input"
              name="input"
              x-component="Input"
            />
            <SchemaStringField
              x-decorator="FormItem"
              required
              title="Select"
              name="select"
              :enum="[
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
              ]"
              x-component="Select"
              :x-component-props="{
                style: {
                  width: 160,
                },
              }"
            />
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayItems.Remove"
            />
          </SchemaVoidField>
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayItems.Addition" title="Add Item" />
      </SchemaArrayField>
      <SchemaArrayField
        name="array2"
        title="Object Array"
        x-decorator="FormItem"
        x-component="ArrayItems"
        :x-component-props="{ style: { width: '600px' } }"
      >
        <SchemaObjectField x-decorator="ArrayItems.Item">
          <SchemaVoidField x-component="Space" :x-component-props="{ style: { paddingTop: '18px' } }">
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayItems.SortHandle"
            />
            <SchemaStringField
              x-decorator="FormItem"
              required
              title="Date"
              name="date"
              x-component="DatePicker"
              :x-component-props="{
                type: 'daterange',
                style: {
                  width: '250px',
                },
              }"
            />
            <SchemaStringField
              x-decorator="FormItem"
              required
              title="Input"
              name="input"
              x-component="Input"
            />
            <SchemaVoidField
              x-decorator="FormItem"
              x-component="ArrayItems.Remove"
            />
          </SchemaVoidField>
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayItems.Addition" title="Add Item" />
      </SchemaArrayField>
    </SchemaField>
    <FormButtonGroup>
      <Submit @submit="log">
        Submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>



