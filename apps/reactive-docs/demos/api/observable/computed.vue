<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { formatValue, parseNumber, pushLog, useAutorunEffect } from './shared'

const logs = ref<string[]>([])
const rawSnapshot = ref('')
const aaValue = ref(11)
const bbValue = ref(22)
const getterRuns = ref(0)
const autorunRuns = ref(0)
const totalValue = ref(0)
let getterSeed = 0

const obs = observable({
  aa: 11,
  bb: 22,
})

const total = observable.computed(() => {
  getterSeed += 1
  getterRuns.value = getterSeed
  return obs.aa + obs.bb
})

function syncRawState() {
  aaValue.value = obs.aa
  bbValue.value = obs.bb
  rawSnapshot.value = formatValue(obs)
}

useAutorunEffect(() => {
  autorunRuns.value += 1
  const nextTotal = total.value
  totalValue.value = nextTotal
  pushLog(logs, `autorun #${autorunRuns.value}: sum = ${nextTotal}`)
})

syncRawState()

function setAa(event: Event) {
  const target = event.target as HTMLInputElement | null
  obs.aa = parseNumber(target?.value, obs.aa)
  syncRawState()
}

function setBb(event: Event) {
  const target = event.target as HTMLInputElement | null
  obs.bb = parseNumber(target?.value, obs.bb)
  syncRawState()
}

function readTwice() {
  const first = total.value
  const second = total.value
  pushLog(logs, `连续读取两次 computed：${first} / ${second}`)
}

function reset() {
  obs.aa = 11
  obs.bb = 22
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      修改依赖后会重新计算；如果依赖没变，重复读取 <code>computed.value</code> 会直接命中缓存。
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="observable-computed-aa">aa</label>
        <input
          id="observable-computed-aa"
          class="input"
          type="number"
          :value="aaValue"
          @input="setAa"
        >
      </div>
      <div class="inputGroup">
        <label for="observable-computed-bb">bb</label>
        <input
          id="observable-computed-bb"
          class="input"
          type="number"
          :value="bbValue"
          @input="setBb"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="readTwice">
        read computed twice
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          当前结果
        </div>
        <div class="value">
          {{ totalValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          getter 次数
        </div>
        <div class="value">
          {{ getterRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          autorun 次数
        </div>
        <div class="value">
          {{ autorunRuns }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Raw Snapshot
        </div>
        <pre>{{ rawSnapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Cache Hint
        </div>
        <pre>依赖不变时，多次读取 total.value 不会让 getter 次数继续增长。</pre>
      </div>
    </div>

    <div>
      <div class="sectionTitle">
        运行日志
      </div>
      <ul class="logs">
        <li v-for="log in logs" :key="log">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="./shared.css"></style>
