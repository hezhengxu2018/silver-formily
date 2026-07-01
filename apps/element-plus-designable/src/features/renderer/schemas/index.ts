export const AllSchemas = {
  CSSStyle: {
    type: 'object',
    properties: {},
  },
  Field: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: 'Title',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
      required: {
        type: 'boolean',
        title: 'Required',
      },
    },
  },
  Form: {
    type: 'object',
    properties: {
      labelCol: {
        type: 'number',
        title: 'Label Column',
      },
      wrapperCol: {
        type: 'number',
        title: 'Wrapper Column',
      },
      layout: {
        type: 'string',
        title: 'Layout',
      },
    },
  },
}
