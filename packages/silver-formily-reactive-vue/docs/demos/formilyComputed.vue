<script setup lang="ts">
import { observable } from '@formily/reactive'
import { formilyComputed } from '@silver-formily/reactive-vue'

const obs = observable({
  value: 'Hello formilyComputed',
})

const uppercaseValue = formilyComputed(() => obs.value.toUpperCase())
const charCount = formilyComputed(() => obs.value.length)

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
    <div>原始：{{ obs.value }}</div>
    <div>formilyComputed（大写）：{{ uppercaseValue }}</div>
    <div>formilyComputed（长度）：{{ charCount }}</div>
  </div>
</template>
