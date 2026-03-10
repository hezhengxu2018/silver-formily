<script setup lang="ts">
import { autorun, markObservable, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

class SkippedTarget {
  property = 'step-0'

  toJSON() {}
}

class ForceClassTarget {
  property = 'step-0'

  toJSON() {}
}

markObservable(ForceClassTarget)

const skippedRuns = ref(0)
const instanceRuns = ref(0)
const classRuns = ref(0)
const skippedCurrent = ref('step-0')
const instanceCurrent = ref('step-0')
const classCurrent = ref('step-0')
const skippedTracked = ref('step-0')
const instanceTracked = ref('step-0')
const classTracked = ref('step-0')
const logs = ref<string[]>([])

let skipped: SkippedTarget
let instanceForced: SkippedTarget
let classForced: ForceClassTarget
let mutationIndex = 0
let stopSkipped: null | (() => void) = null
let stopInstance: null | (() => void) = null
let stopClass: null | (() => void) = null

function stop() {
  stopSkipped?.()
  stopInstance?.()
  stopClass?.()
  stopSkipped = null
  stopInstance = null
  stopClass = null
}

function syncCurrent() {
  skippedCurrent.value = skipped.property
  instanceCurrent.value = instanceForced.property
  classCurrent.value = classForced.property
}

function start() {
  skipped = observable(new SkippedTarget())
  instanceForced = observable(markObservable(new SkippedTarget()))
  classForced = observable(new ForceClassTarget())
  mutationIndex = 0

  stopSkipped = autorun(() => {
    skippedRuns.value += 1
    skippedTracked.value = skipped.property
    pushLog(logs, `skipped autorun #${skippedRuns.value}: ${skipped.property}`)
  })

  stopInstance = autorun(() => {
    instanceRuns.value += 1
    instanceTracked.value = instanceForced.property
    pushLog(logs, `instance markObservable autorun #${instanceRuns.value}: ${instanceForced.property}`)
  })

  stopClass = autorun(() => {
    classRuns.value += 1
    classTracked.value = classForced.property
    pushLog(logs, `class markObservable autorun #${classRuns.value}: ${classForced.property}`)
  })

  syncCurrent()
}

function mutateAll() {
  mutationIndex += 1
  const nextValue = `step-${mutationIndex}`
  skipped.property = nextValue
  instanceForced.property = nextValue
  classForced.property = nextValue
  syncCurrent()
}

function reset() {
  stop()
  skippedRuns.value = 0
  instanceRuns.value = 0
  classRuns.value = 0
  skippedCurrent.value = 'step-0'
  instanceCurrent.value = 'step-0'
  classCurrent.value = 'step-0'
  skippedTracked.value = 'step-0'
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
      默认情况下，带有 <code>toJSON</code> / <code>toJS</code> 方法的对象会被
      <code>@formily/reactive</code> 跳过。使用 <code>markObservable</code> 之后，
      实例级和类级都可以重新开启 observable 劫持。
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
          skipped by default
        </div>
        <pre>{{ formatValue({ current: skippedCurrent, tracked: skippedTracked, runs: skippedRuns }) }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          instance markObservable
        </div>
        <pre>{{ formatValue({ current: instanceCurrent, tracked: instanceTracked, runs: instanceRuns }) }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          class markObservable
        </div>
        <pre>{{ formatValue({ current: classCurrent, tracked: classTracked, runs: classRuns }) }}</pre>
      </div>
    </div>

    <div>
      <div class="sectionTitle">
        运行日志
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
