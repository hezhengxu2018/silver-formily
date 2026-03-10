<script setup lang="ts">
import { autorun, batch, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  aa: 0,
  bb: 0,
})

const rawAa = ref(obs.aa)
const rawBb = ref(obs.bb)
const runCount = ref(0)
const logs = ref<string[]>([])

let disposeCurrent: null | (() => void) = null

function syncRawState() {
  rawAa.value = obs.aa
  rawBb.value = obs.bb
}

function start() {
  disposeCurrent = autorun(() => {
    runCount.value += 1
    rawAa.value = obs.aa
    rawBb.value = obs.bb
    pushLog(logs, `autorun #${runCount.value}: aa = ${obs.aa}, bb = ${obs.bb}`)
  })
}

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
}

function handler() {
  obs.aa += 1
  obs.bb += 1
}

function runDirect() {
  handler()
  syncRawState()
}

function runBatched() {
  batch(() => {
    handler()
  })
  syncRawState()
}

function reset() {
  stop()
  obs.aa = 0
  obs.bb = 0
  rawAa.value = 0
  rawBb.value = 0
  runCount.value = 0
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      The same <code>handler()</code> writes two properties in sequence. Running it directly makes
      <code>autorun</code> rerun twice; wrapping it in <code>batch</code> produces only one extra
      rerun.
    </p>

    <div class="toolbar">
      <button class="btn" @click="runDirect">
        run handler()
      </button>
      <button class="btn" @click="runBatched">
        batch(handler)
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          aa / bb
        </div>
        <div class="value">
          {{ rawAa }} / {{ rawBb }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          autorun runs
        </div>
        <div class="value">
          {{ runCount }}
        </div>
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
