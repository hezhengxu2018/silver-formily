<script setup lang="ts">
import { autorun, model } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, parseNumber, pushLog } from '../observable/shared'

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb
  },
  update(nextAa: number, nextBb: number) {
    this.aa = nextAa
    this.bb = nextBb
  },
})

const nextAa = ref(4)
const nextBb = ref(6)
const rawAa = ref(obs.aa)
const rawBb = ref(obs.bb)
const currentTotal = ref(obs.cc)
const runCount = ref(0)
const snapshot = ref('')
const logs = ref<string[]>([])

function syncRawState() {
  rawAa.value = obs.aa
  rawBb.value = obs.bb
  snapshot.value = formatValue({
    aa: obs.aa,
    bb: obs.bb,
  })
}

const dispose = autorun(() => {
  runCount.value += 1
  currentTotal.value = obs.cc
  pushLog(logs, `autorun #${runCount.value}: cc = ${obs.cc}`)
})

syncRawState()

function setAaOnly() {
  obs.aa = nextAa.value
  syncRawState()
}

function setSeparately() {
  obs.aa = nextAa.value
  obs.bb = nextBb.value
  syncRawState()
}

function runUpdate() {
  obs.update(nextAa.value, nextBb.value)
  syncRawState()
}

function reset() {
  obs.update(1, 2)
  nextAa.value = 4
  nextBb.value = 6
  syncRawState()
}

function handleAaInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextAa.value = parseNumber(target?.value, nextAa.value)
}

function handleBbInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextBb.value = parseNumber(target?.value, nextBb.value)
}

onBeforeUnmount(() => dispose())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>model</code> 会自动把 getter 包装成 <code>computed</code>，把函数包装成
      <code>action</code>。你可以比较“分别赋值”和“调用 update()”时的响应次数。
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="model-next-aa">aa</label>
        <input
          id="model-next-aa"
          class="input"
          type="number"
          :value="nextAa"
          @input="handleAaInput"
        >
      </div>
      <div class="inputGroup">
        <label for="model-next-bb">bb</label>
        <input
          id="model-next-bb"
          class="input"
          type="number"
          :value="nextBb"
          @input="handleBbInput"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="setAaOnly">
        obs.aa = nextAa
      </button>
      <button class="btn" @click="setSeparately">
        set aa / bb separately
      </button>
      <button class="btn" @click="runUpdate">
        obs.update(nextAa, nextBb)
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          aa
        </div>
        <div class="value">
          {{ rawAa }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          bb
        </div>
        <div class="value">
          {{ rawBb }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          computed(cc)
        </div>
        <div class="value">
          {{ currentTotal }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          autorun 次数
        </div>
        <div class="value">
          {{ runCount }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Current Values
        </div>
        <pre>{{ snapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Why update() Matters
        </div>
        <pre>分别给 aa / bb 赋值会多次触发响应；调用 update() 会被自动包装成 action。</pre>
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
