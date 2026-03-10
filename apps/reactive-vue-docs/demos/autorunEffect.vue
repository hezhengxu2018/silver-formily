<script setup lang="ts">
import { observable } from '@formily/reactive'
import { autorunEffect } from '@silver-formily/reactive-vue'
import { ref } from 'vue'

const state = observable({
  count: 0,
})

const writtenCount = ref(0)
const trackedCount = ref(0)
const runCount = ref(0)
const active = ref(true)

const stop = autorunEffect(() => {
  runCount.value += 1
  trackedCount.value = state.count
})

function syncWrittenCount() {
  writtenCount.value = state.count
}

function increment() {
  state.count += 1
  syncWrittenCount()
}

function addTen() {
  state.count += 10
  syncWrittenCount()
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
      <button class="demoButton" @click="increment">
        count + 1
      </button>
      <button class="demoButton" @click="addTen">
        count + 10
      </button>
      <button class="demoButton secondary" :disabled="!active" @click="dispose">
        dispose
      </button>
    </div>

    <div>手动写入值：{{ writtenCount }}</div>
    <div>autorun 同步值：{{ trackedCount }}</div>
    <div>autorun 执行次数：{{ runCount }}</div>
    <div>订阅状态：{{ active ? 'active' : 'disposed' }}</div>
  </div>
</template>

<style scoped src="./effectDemo.css"></style>
