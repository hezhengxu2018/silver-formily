<script setup lang="tsx">
import { createForm, isArrayField } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import {
  createSchemaField,
  FormProvider,
  RecursionField,
  useField,
  useFieldSchema,
} from '@silver-formily/vue'
import { ElButton, ElInput, ElSpace } from 'element-plus'
import { defineComponent } from 'vue'

const ArrayItems = observer(
  defineComponent({
    name: 'ArrayItems',
    setup() {
      const fieldRef = useField()
      const schemaRef = useFieldSchema()

      function handleAdd() {
        if (isArrayField(fieldRef.value)) {
          fieldRef.value.value?.push({ id: Date.now() })
        }
      }

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const items = isArrayField(field) && Array.isArray(field.value)
          ? field.value.map((item, index) => (
              <div key={item.id ?? index} style={{ marginBottom: '10px' }}>
                <ElSpace>
                  <RecursionField schema={schema?.items} name={index} />
                  <ElButton onClick={() => field?.remove(index)}>
                    Remove
                  </ElButton>
                </ElSpace>
              </div>
            ))
          : null

        return (
          <div>
            {items}
            <ElButton onClick={handleAdd}>Add</ElButton>
          </div>
        )
      }
    },
  }),
)

const { SchemaField, SchemaStringField, SchemaArrayField, SchemaObjectField }
  = createSchemaField({
    components: {
      ArrayItems,
      ElInput,
    },
  })

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField name="custom" x-component="ArrayItems">
        <SchemaObjectField>
          <SchemaStringField name="input" x-component="ElInput" />
        </SchemaObjectField>
      </SchemaArrayField>
    </SchemaField>
  </FormProvider>
</template>
