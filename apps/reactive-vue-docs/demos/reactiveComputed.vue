<script setup lang="ts">
import { observable } from '@silver-formily/reactive'
import { reactiveComputed } from '@silver-formily/reactive-vue'

const obs = observable({
  value: 'Hello reactiveComputed',
})

const uppercaseValue = reactiveComputed(() => obs.value.toUpperCase())
const charCount = reactiveComputed(() => obs.value.length)

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
    <div>reactiveComputed（大写）：{{ uppercaseValue }}</div>
    <div>reactiveComputed（长度）：{{ charCount }}</div>
  </div>
</template>
