<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { parseNumber, pushLog, useAutorunEffect } from '../observable/shared'

const logs = ref<string[]>([])
const rawValue = ref(1)
const trackedValue = ref(1)
const runCount = ref(0)

const numberBox = observable.box(1)

function syncRawState() {
  rawValue.value = numberBox.get()
}

useAutorunEffect(() => {
  runCount.value += 1
  trackedValue.value = numberBox.get()
  pushLog(logs, `autorun #${runCount.value}: box.get() = ${numberBox.get()}`)
})

syncRawState()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  numberBox.set(parseNumber(target?.value, numberBox.get()))
  syncRawState()
}

function increment() {
  numberBox.set(numberBox.get() + 1)
  syncRawState()
}

function reset() {
  numberBox.set(1)
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>observable.box</code> behaves like <code>ref</code>, except reads and writes go through
      <code>get</code> and <code>set</code>.
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="observable-box-value-en">box.get()</label>
        <input
          id="observable-box-value-en"
          class="input"
          type="number"
          :value="rawValue"
          @input="handleInput"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="increment">
        box.set(box.get() + 1)
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
