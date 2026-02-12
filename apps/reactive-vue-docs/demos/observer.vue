<script>
import { observable } from '@formily/reactive'
import { observer } from '@silver-formily/reactive-vue'

export default observer({
  data() {
    // 能与 vue 的响应系统共存
    const obs = observable({
      value: 'Hello world',
    })
    return {
      obs,
    }
  },
})
</script>

<template>
  <div>
    <div>
      <input
        :style="{
          height: 28,
          padding: '0 8px',
          border: '2px solid #888',
          borderRadius: 3,
        }"
        :value="obs.value"
        @input="(e) => {
          obs.value = e.target.value
        }"
      >
    </div>
    <div>{{ obs.value }}</div>
  </div>
</template>
