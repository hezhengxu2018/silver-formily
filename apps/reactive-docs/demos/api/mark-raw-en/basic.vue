<script setup lang="ts">
import { autorun, markRaw, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

class PlainTarget {
  property = 'step-0'
}

class RawClassTarget {
  property = 'step-0'
}

markRaw(RawClassTarget)

const normalRuns = ref(0)
const instanceRuns = ref(0)
const classRuns = ref(0)
const normalCurrent = ref('step-0')
const instanceCurrent = ref('step-0')
const classCurrent = ref('step-0')
const normalTracked = ref('step-0')
const instanceTracked = ref('step-0')
const classTracked = ref('step-0')
const logs = ref<string[]>([])

let normal: PlainTarget
let instanceRaw: PlainTarget
let classRaw: RawClassTarget
let mutationIndex = 0
let stopNormal: null | (() => void) = null
let stopInstance: null | (() => void) = null
let stopClass: null | (() => void) = null

function stop() {
  stopNormal?.()
  stopInstance?.()
  stopClass?.()
  stopNormal = null
  stopInstance = null
  stopClass = null
}

function syncCurrent() {
  normalCurrent.value = normal.property
  instanceCurrent.value = instanceRaw.property
  classCurrent.value = classRaw.property
}

function start() {
  normal = observable(new PlainTarget())
  instanceRaw = observable(markRaw(new PlainTarget()))
  classRaw = observable(new RawClassTarget())
  mutationIndex = 0

  stopNormal = autorun(() => {
    normalRuns.value += 1
    normalTracked.value = normal.property
    pushLog(logs, `normal autorun #${normalRuns.value}: ${normal.property}`)
  })

  stopInstance = autorun(() => {
    instanceRuns.value += 1
    instanceTracked.value = instanceRaw.property
    pushLog(logs, `instance markRaw autorun #${instanceRuns.value}: ${instanceRaw.property}`)
  })

  stopClass = autorun(() => {
    classRuns.value += 1
    classTracked.value = classRaw.property
    pushLog(logs, `class markRaw autorun #${classRuns.value}: ${classRaw.property}`)
  })

  syncCurrent()
}

function mutateAll() {
  mutationIndex += 1
  const nextValue = `step-${mutationIndex}`
  normal.property = nextValue
  instanceRaw.property = nextValue
  classRaw.property = nextValue
  syncCurrent()
}

function reset() {
  stop()
  normalRuns.value = 0
  instanceRuns.value = 0
  classRuns.value = 0
  normalCurrent.value = 'step-0'
  instanceCurrent.value = 'step-0'
  classCurrent.value = 'step-0'
  normalTracked.value = 'step-0'
  instanceTracked.value = 'step-0'
  classTracked.value = 'step-0'
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      Compare a normal instance, an instance-level <code>markRaw</code>, and a class-level
      <code>markRaw</code>. After mutating the same property, only the normal instance keeps being
      observed and reruns autorun.
    </p>

    <div class="toolbar">
      <button class="btn" @click="mutateAll">
        mutate all
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          normal instance
        </div>
        <pre>{{ formatValue({ current: normalCurrent, tracked: normalTracked, runs: normalRuns }) }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          instance markRaw
        </div>
        <pre>{{ formatValue({ current: instanceCurrent, tracked: instanceTracked, runs: instanceRuns }) }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          class markRaw
        </div>
        <pre>{{ formatValue({ current: classCurrent, tracked: classTracked, runs: classRuns }) }}</pre>
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
