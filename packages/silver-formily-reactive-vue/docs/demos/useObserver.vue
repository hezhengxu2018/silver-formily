<script setup lang="ts">
import { observable } from '@formily/reactive'
import { useObserver } from '@silver-formily/reactive-vue'

useObserver()

const obs = observable({
  value: 'Hello world',
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (target) {
    obs.value = target.value
  }
}
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
        @input="handleInput"
      >
    </div>
    <div>{{ obs.value }}</div>
  </div>
</template>
