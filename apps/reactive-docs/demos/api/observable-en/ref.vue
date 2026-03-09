<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { parseNumber, pushLog, useAutorunEffect } from '../observable/shared'

const logs = ref<string[]>([])
const rawValue = ref(1)
const trackedValue = ref(1)
const runCount = ref(0)

const numberRef = observable.ref(1)

function syncRawState() {
  rawValue.value = numberRef.value
}

useAutorunEffect(() => {
  runCount.value += 1
  trackedValue.value = numberRef.value
  pushLog(logs, `autorun #${runCount.value}: ref.value = ${numberRef.value}`)
})

syncRawState()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  numberRef.value = parseNumber(target?.value, numberRef.value)
  syncRawState()
}

function increment() {
  numberRef.value += 1
  syncRawState()
}

function reset() {
  numberRef.value = 1
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>observable.ref</code> is useful for primitive values or whole-object references. Mutate
      <code>value</code> directly to trigger updates.
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="observable-ref-value-en">ref.value</label>
        <input
          id="observable-ref-value-en"
          class="input"
          type="number"
          :value="rawValue"
          @input="handleInput"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="increment">
        ref.value += 1
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          autorun runs
        </div>
        <div class="value">
          {{ runCount }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          current value
        </div>
        <div class="value">
          {{ rawValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          last tracked value
        </div>
        <div class="value">
          {{ trackedValue }}
        </div>
      </div>
    </div>

    <div>
      <div class="sectionTitle">
        Run Log
      </div>
      <ul class="logs">
        <li v-for="log in logs" :key="log">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="../observable/shared.css"></style>
