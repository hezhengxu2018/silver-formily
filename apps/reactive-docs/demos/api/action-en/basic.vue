<script setup lang="ts">
import { action, autorun, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  count: 0,
})

const countValue = ref(obs.count)
const runCount = ref(0)
const logs = ref<string[]>([])

const increase = action.bound(() => {
  obs.count += 1
})

const dispose = autorun(() => {
  runCount.value += 1
  countValue.value = obs.count
  pushLog(logs, `autorun #${runCount.value}: count = ${obs.count}`)
})

function increment() {
  increase()
}

function reset() {
  obs.count = 0
  countValue.value = 0
  runCount.value = 0
  logs.value = []
}

onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>action.bound</code> is useful for packaging imperative update logic into reusable
      methods. Each click on <code>increase()</code> produces only one extra reaction.
    </p>

    <div class="toolbar">
      <button class="btn" @click="increment">
        increase()
      </button>
      <button class="btn secondary" @click="reset">
        reset display
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          count
        </div>
        <div class="value">
          {{ countValue }}
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
