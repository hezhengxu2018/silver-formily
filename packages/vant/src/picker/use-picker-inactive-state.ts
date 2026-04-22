import { computed } from 'vue'

interface PickerInactiveStateProps {
  readonly?: boolean
  disabled?: boolean
  disableTriggerWhenInactive?: boolean
}

export function usePickerInactiveState(props: PickerInactiveStateProps) {
  const isReadonly = computed(() => Boolean(props.readonly))
  const isPopupReadonly = computed(() => {
    return Boolean(props.disabled || isReadonly.value)
  })
  const isTriggerDisabled = computed(() => {
    return Boolean(props.disableTriggerWhenInactive && isPopupReadonly.value)
  })

  return {
    isReadonly,
    isPopupReadonly,
    isTriggerDisabled,
  }
}
