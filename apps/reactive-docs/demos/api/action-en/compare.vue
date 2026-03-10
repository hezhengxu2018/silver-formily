<script setup lang="ts">
import { action, autorun, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  aa: 0,
  bb: 0,
})

const runCount = ref(0)
const rawAa = ref(obs.aa)
const rawBb = ref(obs.bb)
const logs = ref<string[]>([])

const handler = action.bound(() => {
  obs.aa += 1
  obs.bb += 1
})

const dispose = autorun(() => {
  runCount.value += 1
  rawAa.value = obs.aa
  rawBb.value = obs.bb
  pushLog(logs, `autorun #${runCount.value}: aa = ${obs.aa}, bb = ${obs.bb}`)
})

function runDirect() {
  obs.aa += 1
  obs.bb += 1
  rawAa.value = obs.aa
  rawBb.value = obs.bb
}

function runAction() {
  handler()
  rawAa.value = obs.aa
  rawBb.value = obs.bb
}

function reset() {
  obs.aa = 0
  obs.bb = 0
  rawAa.value = 0
  rawBb.value = 0
  runCount.value = 0
  logs.value = []
}

onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="playground">
    <p class="hint">
      Compare direct writes with <code>action.bound</code>: both update the data, but
      <code>action</code> groups the writes into one transaction.
    </p>

    <div class="toolbar">
      <button class="btn" @click="runDirect">
        direct writes
      </button>
      <button class="btn" @click="runAction">
        action.bound()
      </button>
      <button class="btn secondary" @click="reset">
        reset display
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
