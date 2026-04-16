import type { PropType } from 'vue'
import type { FieldRule } from './utils'
import { Cell as VanCell, Icon as VanIcon } from 'vant'
import { computed, createVNode, defineComponent, mergeProps, nextTick, onMounted, provide, reactive, ref, useId, watch } from 'vue'
import {
  addUnit,
  clamp,
  createNamespace,
  CUSTOM_FIELD_INJECTION_KEY,
  cutString,
  endComposing,
  extend,
  formatNumber,
  getRuleMessage,
  getStringLength,
  isDef,
  isEmptyValue,
  makeNumericProp,
  makeStringProp,
  mapInputType,
  numericProp,
  preventDefault,
  resetScroll,
  resizeTextarea,
  runRuleValidator,
  runSyncRule,
  startComposing,
  toArray,
  unknownProp,
  useEventListener,
  useParent,
} from './utils'

const [, bem] = createNamespace('field')
const FORM_KEY = Symbol('van-form')

const cellSharedProps = {
  tag: makeStringProp('div'),
  icon: String,
  size: String,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: {
    type: Boolean,
    default: true,
  },
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  required: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: null,
  },
  clickable: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
}

export const vanFieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  max: Number,
  min: Number,
  formatter: Function as PropType<(value: string) => string>,
  clearIcon: makeStringProp('clear'),
  modelValue: makeNumericProp(''),
  inputAlign: String,
  placeholder: String,
  autocomplete: String,
  autocapitalize: String,
  autocorrect: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: makeStringProp('focus'),
  formatTrigger: makeStringProp('onChange'),
  spellcheck: {
    type: Boolean,
    default: null,
  },
  error: {
    type: Boolean,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: null,
  },
  inputmode: String,
}

export const vanFieldProps = extend({}, cellSharedProps, vanFieldSharedProps, {
  rows: numericProp,
  type: makeStringProp('text'),
  rules: Array,
  autosize: [Boolean, Object],
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String,
  showWordLimit: Boolean,
  errorMessageAlign: String,
  colon: {
    type: Boolean,
    default: null,
  },
})

export default defineComponent({
  name: 'VanField',
  props: vanFieldProps,
  emits: ['blur', 'focus', 'clear', 'keypress', 'clickInput', 'endValidate', 'startValidate', 'clickLeftIcon', 'clickRightIcon', 'update:modelValue'],
  setup(props, { emit, slots, expose }) {
    const id = useId()
    const state = reactive({
      status: 'unvalidated',
      focused: false,
      validateMessage: '',
    })
    const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>()
    const clearIconRef = ref<InstanceType<typeof VanIcon>>()
    const customValue = ref<undefined | (() => unknown)>()
    const { parent: form } = useParent<{ props: Record<string, any> }>(FORM_KEY)

    const getModelValue = () => String(props.modelValue ?? '')
    const getProp = (key: keyof typeof props) => {
      if (isDef(props[key])) {
        return props[key]
      }

      if (form && isDef(form.props[key])) {
        return form.props[key]
      }

      return undefined
    }

    const showClear = computed(() => {
      const readonly = getProp('readonly')
      if (props.clearable && !readonly) {
        const hasValue = getModelValue() !== ''
        const trigger = props.clearTrigger === 'always' || (props.clearTrigger === 'focus' && state.focused)
        return hasValue && trigger
      }

      return false
    })

    const formValue = computed(() => {
      if (customValue.value && slots.input) {
        return customValue.value()
      }

      return props.modelValue
    })

    const showRequiredMark = computed(() => {
      const required = getProp('required')
      if (required === 'auto') {
        return props.rules?.some((rule: FieldRule) => rule.required)
      }

      return required
    })

    const runRules = (rules: FieldRule[]) => rules.reduce((promise, rule) => promise.then(() => {
      if (state.status === 'failed') {
        return
      }

      let value = formValue.value
      if (rule.formatter) {
        value = rule.formatter(value, rule)
      }

      if (!runSyncRule(value, rule)) {
        state.status = 'failed'
        state.validateMessage = getRuleMessage(value, rule)
        return
      }

      if (rule.validator) {
        if (isEmptyValue(value) && rule.validateEmpty === false) {
          return
        }

        return runRuleValidator(value, rule).then((result) => {
          if (result && typeof result === 'string') {
            state.status = 'failed'
            state.validateMessage = result
          }
          else if (result === false) {
            state.status = 'failed'
            state.validateMessage = getRuleMessage(value, rule)
          }
        })
      }

      return undefined
    }), Promise.resolve())

    const resetValidation = () => {
      state.status = 'unvalidated'
      state.validateMessage = ''
    }

    const endValidate = () => emit('endValidate', {
      status: state.status,
      message: state.validateMessage,
    })

    const validate = (rules = props.rules) => new Promise<{ name?: string, message?: string } | void>((resolve) => {
      resetValidation()

      if (rules) {
        emit('startValidate')
        runRules(rules).then(() => {
          if (state.status === 'failed') {
            resolve({
              name: props.name,
              message: state.validateMessage,
            })
            endValidate()
          }
          else {
            state.status = 'passed'
            resolve()
            endValidate()
          }
        })
      }
      else {
        resolve()
      }
    })

    const validateWithTrigger = (trigger: string) => {
      if (form && props.rules) {
        const { validateTrigger } = form.props
        const defaultTrigger = toArray(validateTrigger).includes(trigger)
        const rules = props.rules.filter((rule: FieldRule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger)
          }

          return defaultTrigger
        })

        if (rules.length) {
          validate(rules)
        }
      }
    }

    const limitValueLength = (value: string) => {
      const { maxlength } = props
      if (isDef(maxlength) && getStringLength(value) > +maxlength) {
        const modelValue = getModelValue()
        if (modelValue && getStringLength(modelValue) === +maxlength) {
          return modelValue
        }

        const selectionEnd = inputRef.value?.selectionEnd
        if (state.focused && selectionEnd) {
          const valueArr = [...value]
          const exceededLength = valueArr.length - +maxlength
          valueArr.splice(selectionEnd - exceededLength, exceededLength)
          return valueArr.join('')
        }

        return cutString(value, +maxlength)
      }

      return value
    }

    const updateValue = (value: string, trigger = 'onChange') => {
      const originalValue = value
      value = limitValueLength(value)
      const limitDiffLen = originalValue.length - value.length

      if (props.type === 'number' || props.type === 'digit') {
        const isNumber = props.type === 'number'
        value = formatNumber(value, isNumber, isNumber)

        if (trigger === 'onBlur' && value !== '' && (props.min !== undefined || props.max !== undefined)) {
          const adjustedValue = clamp(+value, props.min ?? -Infinity, props.max ?? Infinity)
          if (+value !== adjustedValue) {
            value = adjustedValue.toString()
          }
        }
      }

      let formatterDiffLen = 0
      if (props.formatter && trigger === props.formatTrigger) {
        const { formatter, maxlength } = props
        value = formatter(value)

        if (isDef(maxlength) && getStringLength(value) > +maxlength) {
          value = cutString(value, +maxlength)
        }

        if (inputRef.value && state.focused) {
          const { selectionEnd } = inputRef.value
          const bcoVal = cutString(originalValue, selectionEnd ?? 0)
          formatterDiffLen = formatter(bcoVal).length - bcoVal.length
        }
      }

      if (inputRef.value && inputRef.value.value !== value) {
        if (state.focused) {
          let { selectionStart, selectionEnd } = inputRef.value
          inputRef.value.value = value

          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = value.length
            if (limitDiffLen) {
              selectionStart -= limitDiffLen
              selectionEnd -= limitDiffLen
            }
            else if (formatterDiffLen) {
              selectionStart += formatterDiffLen
              selectionEnd += formatterDiffLen
            }

            inputRef.value.setSelectionRange(
              Math.min(selectionStart, valueLen),
              Math.min(selectionEnd, valueLen),
            )
          }
        }
        else {
          inputRef.value.value = value
        }
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    }

    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement & { composing?: boolean }
      if (!target.composing) {
        updateValue(target.value)
      }
    }

    const blur = () => inputRef.value?.blur()
    const focus = () => inputRef.value?.focus()

    const adjustTextareaSize = () => {
      const input = inputRef.value
      if (props.type === 'textarea' && props.autosize && input) {
        resizeTextarea(input as HTMLTextAreaElement, props.autosize)
      }
    }

    const onFocus = (event: Event) => {
      state.focused = true
      emit('focus', event)
      nextTick(adjustTextareaSize)
      if (getProp('readonly')) {
        blur()
      }
    }

    const onBlur = (event: Event) => {
      state.focused = false
      updateValue(getModelValue(), 'onBlur')
      emit('blur', event)

      if (getProp('readonly')) {
        return
      }

      validateWithTrigger('onBlur')
      nextTick(adjustTextareaSize)
      resetScroll()
    }

    const onClickInput = (event: MouseEvent) => emit('clickInput', event)
    const onClickLeftIcon = (event: MouseEvent) => emit('clickLeftIcon', event)
    const onClickRightIcon = (event: MouseEvent) => emit('clickRightIcon', event)
    const onClear = (event: Event) => {
      preventDefault(event)
      emit('update:modelValue', '')
      emit('clear', event)
    }

    const showError = computed(() => {
      if (typeof props.error === 'boolean') {
        return props.error
      }

      if (form && form.props.showError && state.status === 'failed') {
        return true
      }

      return false
    })

    const labelStyle = computed(() => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      if (labelWidth && labelAlign !== 'top') {
        return {
          width: addUnit(labelWidth),
        }
      }

      return undefined
    })

    const onKeypress = (event: KeyboardEvent) => {
      const ENTER_CODE = 13
      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter
        if (!submitOnEnter && props.type !== 'textarea') {
          preventDefault(event)
        }

        if (props.type === 'search') {
          blur()
        }
      }

      emit('keypress', event)
    }

    const getInputId = () => props.id || `${id}-input`
    const getValidationStatus = () => state.status

    const renderInput = () => {
      const controlClass = bem('control', [getProp('inputAlign') as string, {
        'error': showError.value,
        'custom': !!slots.input,
        'min-height': props.type === 'textarea' && !props.autosize,
      }])

      if (slots.input) {
        return createVNode('div', {
          class: controlClass,
          onClick: onClickInput,
        }, [slots.input()])
      }

      const inputAttrs = {
        'id': getInputId(),
        'ref': inputRef,
        'name': props.name,
        'rows': props.rows !== undefined ? +props.rows : undefined,
        'class': controlClass,
        'disabled': getProp('disabled'),
        'readonly': getProp('readonly'),
        'autofocus': props.autofocus,
        'placeholder': props.placeholder,
        'autocomplete': props.autocomplete,
        'autocapitalize': props.autocapitalize,
        'autocorrect': props.autocorrect,
        'enterkeyhint': props.enterkeyhint,
        'spellcheck': props.spellcheck,
        'aria-labelledby': props.label ? `${id}-label` : undefined,
        'data-allow-mismatch': 'attribute',
        onBlur,
        onFocus,
        onInput,
        'onClick': onClickInput,
        'onChange': endComposing,
        onKeypress,
        'onCompositionend': endComposing,
        'onCompositionstart': startComposing,
      }

      if (props.type === 'textarea') {
        return createVNode('textarea', mergeProps(inputAttrs, { inputmode: props.inputmode }), null)
      }

      return createVNode('input', mergeProps(mapInputType(props.type, props.inputmode), inputAttrs), null)
    }

    const renderLeftIcon = () => {
      const leftIconSlot = slots['left-icon']
      if (props.leftIcon || leftIconSlot) {
        return createVNode('div', {
          class: bem('left-icon'),
          onClick: onClickLeftIcon,
        }, [leftIconSlot
          ? leftIconSlot()
          : createVNode(VanIcon, {
              name: props.leftIcon,
              classPrefix: props.iconPrefix,
            }, null)])
      }

      return undefined
    }

    const renderRightIcon = () => {
      const rightIconSlot = slots['right-icon']
      if (props.rightIcon || rightIconSlot) {
        return createVNode('div', {
          class: bem('right-icon'),
          onClick: onClickRightIcon,
        }, [rightIconSlot
          ? rightIconSlot()
          : createVNode(VanIcon, {
              name: props.rightIcon,
              classPrefix: props.iconPrefix,
            }, null)])
      }

      return undefined
    }

    const renderWordLimit = () => {
      if (props.showWordLimit && props.maxlength) {
        const count = getStringLength(getModelValue())
        return createVNode('div', { class: bem('word-limit') }, [
          createVNode('span', { class: bem('word-num') }, [count]),
          '/',
          props.maxlength,
        ])
      }

      return undefined
    }

    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return undefined
      }

      const message = props.errorMessage || state.validateMessage
      if (message) {
        const slot = slots['error-message']
        const errorMessageAlign = getProp('errorMessageAlign') as string
        return createVNode('div', {
          class: bem('error-message', errorMessageAlign),
        }, [slot ? slot({ message }) : message])
      }

      return undefined
    }

    const renderLabel = () => {
      const labelWidth = getProp('labelWidth')
      const labelAlign = getProp('labelAlign')
      const colon = getProp('colon') ? ':' : ''
      if (slots.label) {
        return [slots.label(), colon]
      }

      if (props.label) {
        return createVNode('label', {
          'id': `${id}-label`,
          'for': slots.input ? undefined : getInputId(),
          'data-allow-mismatch': 'attribute',
          'onClick': (event: Event) => {
            preventDefault(event)
            focus()
          },
          'style': labelAlign === 'top' && labelWidth
            ? { width: addUnit(labelWidth) }
            : undefined,
        }, [props.label + colon])
      }

      return undefined
    }

    const renderFieldBody = () => [
      createVNode('div', { class: bem('body') }, [
        renderInput(),
        showClear.value && createVNode(VanIcon, {
          ref: clearIconRef,
          name: props.clearIcon,
          class: bem('clear'),
        }, null),
        renderRightIcon(),
        slots.button && createVNode('div', { class: bem('button') }, [slots.button()]),
      ]),
      renderWordLimit(),
      renderMessage(),
    ]

    expose({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus,
    })

    provide(CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger,
    })

    watch(() => props.modelValue, () => {
      updateValue(getModelValue())
      resetValidation()
      validateWithTrigger('onChange')
      nextTick(adjustTextareaSize)
    })

    onMounted(() => {
      updateValue(getModelValue(), props.formatTrigger)
      nextTick(adjustTextareaSize)
    })

    useEventListener('touchstart', onClear, {
      target: computed(() => clearIconRef.value?.$el),
    })

    return () => {
      const disabled = getProp('disabled')
      const labelAlign = getProp('labelAlign') as string
      const leftIcon = renderLeftIcon()
      const renderTitle = () => {
        const label = renderLabel()
        if (labelAlign === 'top') {
          return [leftIcon, label].filter(Boolean)
        }

        return label || []
      }

      return createVNode(VanCell, {
        size: props.size,
        class: bem({
          error: showError.value,
          disabled,
          [`label-${labelAlign}`]: labelAlign,
        }),
        center: props.center,
        border: props.border,
        isLink: props.isLink,
        clickable: props.clickable,
        titleStyle: labelStyle.value,
        valueClass: bem('value'),
        titleClass: [bem('label', [labelAlign, { required: showRequiredMark.value }]), props.labelClass],
        arrowDirection: props.arrowDirection,
      }, {
        icon: leftIcon && labelAlign !== 'top' ? () => leftIcon : null,
        title: renderTitle,
        value: renderFieldBody,
        extra: slots.extra,
      })
    }
  },
})
