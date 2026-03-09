<script setup lang="ts">
import { autorun, markRaw, observable, toJS } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

const obsValue = ref(123)
const plainValue = ref(123)
const obsRuns = ref(0)
const plainRuns = ref(0)
const markedSame = ref(false)
const logs = ref<string[]>([])

let obs: { aa: { bb: { cc: number } } }
let plain: { aa: { bb: { cc: number } } }
let disposeObs: null | (() => void) = null
let disposePlain: null | (() => void) = null

function stop() {
  disposeObs?.()
  disposePlain?.()
  disposeObs = null
  disposePlain = null
}

function start() {
  const marked = observable(markRaw({
    aa: {
      bb: 1,
    },
  }))
  markedSame.value = toJS(marked) === marked

  obs = observable({
    aa: {
      bb: {
        cc: 123,
      },
    },
  })
  plain = toJS(obs)

  disposeObs = autorun(() => {
    obsRuns.value += 1
    obsValue.value = obs.aa.bb.cc
    pushLog(logs, `observable autorun #${obsRuns.value}: cc = ${obs.aa.bb.cc}`)
  })

  disposePlain = autorun(() => {
    plainRuns.value += 1
    plainValue.value = plain.aa.bb.cc
    pushLog(logs, `plain autorun #${plainRuns.value}: cc = ${plain.aa.bb.cc}`)
  })
}

function mutateObservable() {
  obs.aa.bb.cc += 1
}

function mutatePlain() {
  plain.aa.bb.cc += 1
  plainValue.value = plain.aa.bb.cc
  pushLog(logs, `manual plain mutation: cc = ${plain.aa.bb.cc}`)
}

function reset() {
  stop()
  obsValue.value = 123
  plainValue.value = 123
  obsRuns.value = 0
  plainRuns.value = 0
  markedSame.value = false
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>toJS</code> creates a plain JS snapshot. The observable on the left is still reactive;
      the plain object on the right no longer participates in dependency tracking. The demo also
      shows that <code>toJS</code> returns a <code>markRaw</code> object as-is.
    </p>

    <div class="toolbar">
      <button class="btn" @click="mutateObservable">
        obs.aa.bb.cc++
      </button>
      <button class="btn" @click="mutatePlain">
        js.aa.bb.cc++
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          observable cc
        </div>
        <div class="value">
          {{ obsValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          plain js cc
        </div>
        <div class="value">
          {{ plainValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          observable / plain autorun
        </div>
        <div class="value">
          {{ obsRuns }} / {{ plainRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          does toJS keep markRaw as-is
        </div>
        <div class="value">
          {{ markedSame ? 'true' : 'false' }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Snapshot
        </div>
        <pre>{{ formatValue({ observable: obsValue, plain: plainValue, markedSame }) }}</pre>
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
