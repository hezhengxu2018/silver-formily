<script setup lang="ts">
import { autorun, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const source = observable({
  aa: 0,
})

const sourceValue = ref(source.aa)
const memoValue = ref(0)
const runCount = ref(0)
const active = ref(false)
const logs = ref<string[]>([])

let disposeCurrent: null | (() => void) = null

function start() {
  if (active.value)
    return
  disposeCurrent = autorun(() => {
    runCount.value += 1
    sourceValue.value = source.aa
    const memoState = autorun.memo(() =>
      observable({
        bb: 0,
      }), [])
    pushLog(logs, `run #${runCount.value}: aa = ${source.aa}, memo.bb = ${memoState.bb}`)
    memoState.bb += 1
    memoValue.value = memoState.bb
  })
  active.value = true
}

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
  active.value = false
}

function incrementSource() {
  source.aa += 1
  sourceValue.value = source.aa
}

function reset() {
  stop()
  source.aa = 0
  sourceValue.value = 0
  memoValue.value = 0
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
      <code>autorun.memo</code> keeps a persistent reference for the lifetime of the current
      autorun. Here <code>memo.bb</code> keeps increasing across reruns instead of resetting to 0.
    </p>

    <div class="toolbar">
      <button class="btn" @click="incrementSource">
        obs1.aa++
      </button>
      <button class="btn secondary" @click="reset">
        recreate autorun
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          obs1.aa
        </div>
        <div class="value">
          {{ sourceValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          current memo.bb
        </div>
        <div class="value">
          {{ memoValue }}
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
