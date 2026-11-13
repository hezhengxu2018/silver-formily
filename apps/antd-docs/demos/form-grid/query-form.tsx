import type { FormProps } from '@silver-formily/antd'
import type { PropsWithChildren } from 'react'
import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormGrid,
  FormItem,
  Input,
  Reset,
  Select,
  Submit,
} from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { observer } from '@silver-formily/reactive-react'
import { Fragment, useMemo } from 'react'

function useCollapseGrid(maxRows: number) {
  const grid = useMemo(
    () =>
      FormGrid.createFormGrid({
        maxColumns: 4,
        maxWidth: 240,
        maxRows,
        shouldVisible: (node, grid) => {
          if (node.index === grid.childSize - 1)
            return true
          if (grid.maxRows === Infinity)
            return true
          return (node.shadowRow ?? 1) < maxRows + 1
        },
      }),
    [],
  )
  const expanded = grid.maxRows === Infinity
  const realRows = grid.shadowRows
  const computeRows = grid.fullnessLastColumn
    ? grid.shadowRows - 1
    : grid.shadowRows

  const toggle = () => {
    if (grid.maxRows === Infinity) {
      grid.maxRows = maxRows
    }
    else {
      grid.maxRows = Infinity
    }
  }
  const takeType = () => {
    if (realRows < maxRows + 1)
      return 'incomplete-wrap'
    if (computeRows > maxRows)
      return 'collapsible'
    return 'complete-wrap'
  }
  return {
    grid,
    expanded,
    toggle,
    type: takeType(),
  }
}

const QueryForm = observer((props: PropsWithChildren<FormProps>) => {
  const { grid, expanded, toggle, type } = useCollapseGrid(1)

  const renderActions = () => {
    return (
      <Fragment>
        <Submit onSubmit={console.log} onSubmitFailed={console.log}>查询</Submit>
        <Reset>重置</Reset>
      </Fragment>
    )
  }

  const renderButtonGroup = () => {
    if (type === 'incomplete-wrap') {
      return (
        <FormButtonGroup.FormItem>
          <FormButtonGroup>{renderActions()}</FormButtonGroup>
        </FormButtonGroup.FormItem>
      )
    }
    if (type === 'collapsible') {
      return (
        <Fragment>
          <FormButtonGroup>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault()
                toggle()
              }}
            >
              {expanded ? '收起' : '展开'}
            </a>
          </FormButtonGroup>
          <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
        </Fragment>
      )
    }
    return (
      <FormButtonGroup align="right" style={{ display: 'flex', width: '100%' }}>
        {renderActions()}
      </FormButtonGroup>
    )
  }

  return (
    <Form {...props} layout="vertical" feedbackLayout="terse">
      <FormGrid grid={grid}>
        {props.children}
        <FormGrid.GridColumn
          gridSpan={-1}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {renderButtonGroup()}
        </FormGrid.GridColumn>
      </FormGrid>
    </Form>
  )
})

const SchemaField = createSchemaField({
  components: {
    QueryForm,
    Input,
    DatePicker,
    Select,
    FormItem,
  },
})

const form = createForm()

export default function Example() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="QueryForm">
          <SchemaField.String
            name="input1"
            title="Input 1"
            x-component="Input"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="input2"
            title="Input 2"
            x-component="Input"
            x-decorator="FormItem"
          />

          <SchemaField.String
            name="select1"
            title="Select 1"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="select2"
            title="Select 2"
            x-component="Select"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="date"
            title="日期"
            x-component="DatePicker"
            x-decorator="FormItem"
          />
          <SchemaField.String
            name="dateRange"
            title="日期范围"
            x-component="DatePicker.RangePicker"
            x-decorator="FormItem"
            x-decorator-props={{
              gridSpan: 2,
            }}
          />
          <SchemaField.String
            name="select3"
            title="Select 3"
            x-component="Select"
            x-decorator="FormItem"
          />
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>
  )
}
