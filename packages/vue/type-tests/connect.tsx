import { defineComponent } from 'vue'
import { connect } from '../src'

const Source = defineComponent({
  props: {
    sourceOnly: String,
  },
  emits: {
    'update:modelValue': (value: string) => Boolean(value),
  },
  setup(_, { slots }) {
    return () => slots.default?.()
  },
})

const Connected = connect<typeof Source, {
  sourceOnly?: string
  extra?: number
}>(Source)

const valid = <Connected sourceOnly="source" extra={1} />

type ConnectedPublicProps = InstanceType<typeof Connected>['$props']
type ConnectedSlots = InstanceType<typeof Connected>['$slots']

const updateHandler: ConnectedPublicProps['onUpdate:modelValue'] = (value) => {
  value.toUpperCase()
}
const defaultSlot: ConnectedSlots['default'] = () => []

// @ts-expect-error Unknown props must still be rejected.
const invalid = <Connected notARealProp />

void [valid, updateHandler, defaultSlot, invalid]
