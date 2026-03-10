<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { formatValue, pushLog, useAutorunEffect } from '../observable/shared'

const logs = ref<string[]>([])
const rawValue = ref(111)
const trackedValue = ref(111)
const rawSnapshot = ref('')
const trackedSnapshot = ref('')
const runCount = ref(0)

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
})

function syncRawState() {
  rawValue.value = obs.aa.bb
  rawSnapshot.value = formatValue(obs)
}

useAutorunEffect(() => {
  runCount.value += 1
  trackedValue.value = obs.aa.bb
  trackedSnapshot.value = formatValue(obs)
  pushLog(logs, `autorun #${runCount.value}: aa.bb = ${obs.aa.bb}`)
})

syncRawState()

function increaseNested() {
  obs.aa.bb += 1
  syncRawState()
}

function replaceParent() {
  obs.aa = { bb: obs.aa.bb + 10 }
  syncRawState()
}

function reset() {
  obs.aa = { bb: 111 }
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      Shallow mode only tracks first-level properties. Mutating <code>aa.bb</code> changes the raw
      value, but it does not rerun <code>autorun</code>; replacing <code>aa</code> does.
    </p>

    <div class="toolbar">
      <button class="btn" @click="increaseNested">
        obs.aa.bb += 1
      </button>
      <button class="btn" @click="replaceParent">
        obs.aa = { bb: ... }
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

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Raw Snapshot
        </div>
        <pre>{{ rawSnapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Last Tracked Snapshot
        </div>
        <pre>{{ trackedSnapshot }}</pre>
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
