<script setup lang="ts">
import { autorun, batch, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

const obs = observable<Record<string, unknown>>({})

const runCount = ref(0)
const snapshot = ref('{}')
const logs = ref<string[]>([])

let disposeCurrent: null | (() => void) = null

function syncSnapshot() {
  snapshot.value = formatValue({
    aa: obs.aa,
    bb: obs.bb,
    cc: obs.cc,
    dd: obs.dd,
  })
}

function start() {
  disposeCurrent = autorun(() => {
    runCount.value += 1
    syncSnapshot()
    pushLog(logs, `autorun #${runCount.value}: ${snapshot.value.replace(/\s+/g, ' ')}`)
  })
}

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
}

function runExample() {
  batch(() => {
    batch.scope(() => {
      obs.aa = 123
    })
    batch.scope(() => {
      obs.cc = 'ccccc'
    })
    obs.bb = 321
    obs.dd = 'dddd'
  })
  syncSnapshot()
}

function reset() {
  stop()
  obs.aa = undefined
  obs.bb = undefined
  obs.cc = undefined
  obs.dd = undefined
  runCount.value = 0
  logs.value = []
  snapshot.value = '{}'
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      This reproduces the <code>batch</code> + <code>batch.scope</code> example from the docs.
      Even though several writes happen inside, only one update is flushed outward.
    </p>

    <div class="toolbar">
      <button class="btn" @click="runExample">
        run batch example
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
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Current Values
        </div>
        <pre>{{ snapshot }}</pre>
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
