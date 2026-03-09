<script setup lang="ts">
import { autorun, observable } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { parseNumber, pushLog } from '../observable/shared'

const obs = observable({
  aa: 0,
})

const nextValue = ref(1)
const rawValue = ref(obs.aa)
const trackedValue = ref(obs.aa)
const runCount = ref(0)
const active = ref(false)
const logs = ref<string[]>([])

let disposeCurrent: null | (() => void) = null

function syncRawState() {
  rawValue.value = obs.aa
}

function start() {
  if (active.value)
    return
  disposeCurrent = autorun(() => {
    runCount.value += 1
    trackedValue.value = obs.aa
    rawValue.value = obs.aa
    pushLog(logs, `autorun #${runCount.value}: aa = ${obs.aa}`)
  })
  active.value = true
}

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
  if (active.value) {
    pushLog(logs, 'dispose() called')
  }
  active.value = false
}

function applyValue() {
  obs.aa = nextValue.value
  syncRawState()
}

function increment() {
  obs.aa += 1
  nextValue.value = obs.aa
  syncRawState()
}

function reset() {
  stop()
  obs.aa = 0
  nextValue.value = 1
  rawValue.value = 0
  trackedValue.value = 0
  runCount.value = 0
  logs.value = []
  start()
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextValue.value = parseNumber(target?.value, nextValue.value)
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>autorun</code> 会立即执行一次，并在依赖的 observable 属性变化后重新执行。点击
      <code>dispose()</code> 后，后续写入就不会再触发。
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="autorun-next-value">下一次写入的 aa</label>
        <input
          id="autorun-next-value"
          class="input"
          type="number"
          :value="nextValue"
          @input="handleInput"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="applyValue">
        obs.aa = nextValue
      </button>
      <button class="btn" @click="increment">
        obs.aa += 1
      </button>
      <button class="btn" :disabled="active" @click="start">
        restart autorun
      </button>
      <button class="btn secondary" :disabled="!active" @click="stop">
        dispose()
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          当前值
        </div>
        <div class="value">
          {{ rawValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          最近一次追踪值
        </div>
        <div class="value">
          {{ trackedValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          执行次数
        </div>
        <div class="value">
          {{ runCount }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          订阅状态
        </div>
        <div class="value">
          {{ active ? 'active' : 'disposed' }}
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
