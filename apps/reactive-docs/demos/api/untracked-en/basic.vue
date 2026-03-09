<script setup lang="ts">
import { autorun, observable, untracked } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  aa: 11,
})

const normalRuns = ref(0)
const untrackedRuns = ref(0)
const normalValue = ref(obs.aa)
const untrackedValue = ref(obs.aa)
const rawValue = ref(obs.aa)
const logs = ref<string[]>([])

const disposeNormal = autorun(() => {
  normalRuns.value += 1
  normalValue.value = obs.aa
  pushLog(logs, `normal autorun #${normalRuns.value}: aa = ${obs.aa}`)
})

const disposeUntracked = autorun(() => {
  untrackedRuns.value += 1
  untrackedValue.value = untracked(() => obs.aa)
  pushLog(logs, `untracked autorun #${untrackedRuns.value}: aa = ${untrackedValue.value}`)
})

function increment() {
  obs.aa += 1
  rawValue.value = obs.aa
}

function reset() {
  obs.aa = 11
  rawValue.value = 11
  normalValue.value = 11
  untrackedValue.value = 11
  normalRuns.value = 0
  untrackedRuns.value = 0
  logs.value = []
}

onBeforeUnmount(() => {
  disposeNormal()
  disposeUntracked()
})
</script>

<template>
  <div class="playground">
    <p class="hint">
      The left side reads normally, while the right side uses
      <code>untracked(() =&gt; obs.aa)</code>. After changing <code>aa</code>, only the normal autorun
      keeps tracking that dependency.
    </p>

    <div class="toolbar">
      <button class="btn" @click="increment">
        obs.aa++
      </button>
      <button class="btn secondary" @click="reset">
        reset display
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          current aa
        </div>
        <div class="value">
          {{ rawValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          normal runs
        </div>
        <div class="value">
          {{ normalRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          untracked runs
        </div>
        <div class="value">
          {{ untrackedRuns }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          normal read
        </div>
        <pre>value: {{ normalValue }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          untracked read
        </div>
        <pre>value: {{ untrackedValue }}</pre>
      </div>
    </div>

    <div>
      <div class="sectionTitle">
        Run Log
      </div>
      <ul class="logs">
        <li v-for="(log, index) in logs" :key="`${index}-${log}`">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="../observable/shared.css"></style>
