<script setup lang="ts">
import { batch, observable, reaction } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { pushLog } from '../observable/shared'

const obs = observable({
  aa: 1,
  bb: 2,
})

const rawAa = ref(obs.aa)
const rawBb = ref(obs.bb)
const trackerValue = ref(obs.aa + obs.bb)
const subscriberValue = ref<number | null>(null)
const trackerRuns = ref(0)
const subscriberRuns = ref(0)
const logs = ref<string[]>([])

const dispose = reaction(() => {
  trackerRuns.value += 1
  const next = obs.aa + obs.bb
  trackerValue.value = next
  pushLog(logs, `tracker #${trackerRuns.value}: sum = ${next}`)
  return next
}, (next, prev) => {
  subscriberRuns.value += 1
  subscriberValue.value = next
  pushLog(logs, `subscriber #${subscriberRuns.value}: ${prev} -> ${next}`)
})

function syncRawState() {
  rawAa.value = obs.aa
  rawBb.value = obs.bb
}

function swapWithBatch() {
  batch(() => {
    obs.aa = 2
    obs.bb = 1
  })
  syncRawState()
}

function setAaToFour() {
  obs.aa = 4
  syncRawState()
}

function reset() {
  obs.aa = 1
  obs.bb = 2
  rawAa.value = 1
  rawBb.value = 2
  trackerValue.value = 3
  subscriberValue.value = null
  trackerRuns.value = 0
  subscriberRuns.value = 0
  logs.value = []
}

syncRawState()

onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>reaction</code> 会先执行 tracker，但只有 tracker 的返回值真的变化时才会调用
      subscriber。批量交换 <code>aa</code> / <code>bb</code> 后，总和不变，所以 subscriber
      不会执行。
    </p>

    <div class="toolbar">
      <button class="btn" @click="swapWithBatch">
        batch swap (2 / 1)
      </button>
      <button class="btn" @click="setAaToFour">
        obs.aa = 4
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
          tracker 结果
        </div>
        <div class="value">
          {{ trackerValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          subscriber 结果
        </div>
        <div class="value">
          {{ subscriberValue ?? '-' }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          tracker / subscriber
        </div>
        <div class="value">
          {{ trackerRuns }} / {{ subscriberRuns }}
        </div>
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
