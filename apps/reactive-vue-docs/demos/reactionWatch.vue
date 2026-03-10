<script setup lang="ts">
import { batch, observable } from '@formily/reactive'
import { reactionWatch } from '@silver-formily/reactive-vue'
import { ref } from 'vue'

const state = observable({
  aa: 1,
  bb: 2,
})

const rawAa = ref(state.aa)
const rawBb = ref(state.bb)
const trackerValue = ref(state.aa + state.bb)
const subscriberValue = ref<number | null>(null)
const subscriberRuns = ref(0)
const active = ref(true)

const stop = reactionWatch(
  () => {
    const next = state.aa + state.bb
    trackerValue.value = next
    return next
  },
  (next) => {
    subscriberRuns.value += 1
    subscriberValue.value = next
  },
)

function syncRawState() {
  rawAa.value = state.aa
  rawBb.value = state.bb
}

function swapValues() {
  batch(() => {
    state.aa = 2
    state.bb = 1
  })
  syncRawState()
}

function setAaToFour() {
  state.aa = 4
  syncRawState()
}

function dispose() {
  if (!active.value)
    return
  stop()
  active.value = false
}
</script>

<template>
  <div>
    <div class="demoToolbar">
      <button class="demoButton" @click="swapValues">
        batch swap
      </button>
      <button class="demoButton" @click="setAaToFour">
        aa = 4
      </button>
      <button class="demoButton secondary" :disabled="!active" @click="dispose">
        dispose
      </button>
    </div>

    <div>aa / bb：{{ rawAa }} / {{ rawBb }}</div>
    <div>tracker 结果：{{ trackerValue }}</div>
    <div>subscriber 结果：{{ subscriberValue ?? '-' }}</div>
    <div>subscriber 次数：{{ subscriberRuns }}</div>
    <div>订阅状态：{{ active ? 'active' : 'disposed' }}</div>
  </div>
</template>

<style scoped src="./effectDemo.css"></style>
