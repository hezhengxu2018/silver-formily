<script setup lang="ts">
import { autorun, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  aa: 0,
})

const rawValue = ref(obs.aa)
const trackerRuns = ref(0)
const effectRuns = ref(0)
const cleanupRuns = ref(0)
const active = ref(false)
const logs = ref<string[]>([])

let disposeCurrent: null | (() => void) = null

function start() {
  if (active.value)
    return
  disposeCurrent = autorun(() => {
    trackerRuns.value += 1
    rawValue.value = obs.aa
    pushLog(logs, `tracker #${trackerRuns.value}: aa = ${obs.aa}`)
    autorun.effect(() => {
      effectRuns.value += 1
      pushLog(logs, `effect #${effectRuns.value}: after microtask`)
      return () => {
        cleanupRuns.value += 1
        pushLog(logs, `cleanup #${cleanupRuns.value}: dispose autorun`)
      }
    }, [])
  })
  active.value = true
}

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
  active.value = false
}

function increment() {
  obs.aa += 1
  rawValue.value = obs.aa
}

function reset() {
  stop()
  obs.aa = 0
  rawValue.value = 0
  trackerRuns.value = 0
  effectRuns.value = 0
  cleanupRuns.value = 0
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>autorun.effect</code> runs on the microtask after the first autorun execution and calls
      its cleanup function when the autorun is disposed.
    </p>

    <div class="toolbar">
      <button class="btn" @click="increment">
        obs.aa++
      </button>
      <button class="btn secondary" :disabled="!active" @click="stop">
        dispose()
      </button>
      <button class="btn secondary" @click="reset">
        restart autorun
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          aa
        </div>
        <div class="value">
          {{ rawValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          tracker runs
        </div>
        <div class="value">
          {{ trackerRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          effect runs
        </div>
        <div class="value">
          {{ effectRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          cleanup runs
        </div>
        <div class="value">
          {{ cleanupRuns }}
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
