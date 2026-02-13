import { useObserver } from '@silver-formily/reactive-vue'
import { defineComponent } from 'vue'
import { useForm } from '../hooks'

export default defineComponent({
  name: 'FormConsumer',
  inheritAttrs: false,
  setup(_, { slots }) {
    useObserver({
      scheduler: update => Promise.resolve().then(update),
    })

    const form = useForm()

    return () => slots.default?.({ form: form.value }) ?? null
  },
})
