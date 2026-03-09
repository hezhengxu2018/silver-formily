<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { formatValue, parseNumber, pushLog, useAutorunEffect } from '../observable/shared'

const logs = ref<string[]>([])
const rawSnapshot = ref('')
const aaValue = ref(11)
const bbValue = ref(22)
const getterRuns = ref(0)
const autorunRuns = ref(0)
const totalValue = ref(0)
let getterSeed = 0

const obs = observable({
  aa: 11,
  bb: 22,
})

const total = observable.computed(() => {
  getterSeed += 1
  getterRuns.value = getterSeed
  return obs.aa + obs.bb
})

function syncRawState() {
  aaValue.value = obs.aa
  bbValue.value = obs.bb
  rawSnapshot.value = formatValue(obs)
}

useAutorunEffect(() => {
  autorunRuns.value += 1
  const nextTotal = total.value
  totalValue.value = nextTotal
  pushLog(logs, `autorun #${autorunRuns.value}: sum = ${nextTotal}`)
})

syncRawState()

function setAa(event: Event) {
  const target = event.target as HTMLInputElement | null
  obs.aa = parseNumber(target?.value, obs.aa)
  syncRawState()
}

function setBb(event: Event) {
  const target = event.target as HTMLInputElement | null
  obs.bb = parseNumber(target?.value, obs.bb)
  syncRawState()
}

function readTwice() {
  const first = total.value
  const second = total.value
  pushLog(logs, `read computed twice: ${first} / ${second}`)
}

function reset() {
  obs.aa = 11
  obs.bb = 22
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      The getter recalculates when its dependencies change. If <code>aa</code> and <code>bb</code>
      stay the same, reading <code>computed.value</code> repeatedly will hit the cache.
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="observable-computed-aa-en">aa</label>
        <input
          id="observable-computed-aa-en"
          class="input"
          type="number"
          :value="aaValue"
          @input="setAa"
        >
      </div>
      <div class="inputGroup">
        <label for="observable-computed-bb-en">bb</label>
        <input
          id="observable-computed-bb-en"
          class="input"
          type="number"
          :value="bbValue"
          @input="setBb"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="readTwice">
        read computed twice
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          current sum
        </div>
        <div class="value">
          {{ totalValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          getter runs
        </div>
        <div class="value">
          {{ getterRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          autorun runs
        </div>
        <div class="value">
          {{ autorunRuns }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Raw Snapshot
        </div>
        <pre>{{ rawSnapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Cache Hint
        </div>
        <pre>If the dependencies do not change, repeated reads reuse the cached value.</pre>
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
