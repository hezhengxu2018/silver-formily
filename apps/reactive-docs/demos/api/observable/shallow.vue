<script setup lang="ts">
import { observable } from '@formily/reactive'
import { ref } from 'vue'
import { formatValue, pushLog, useAutorunEffect } from './shared'

const logs = ref<string[]>([])
const rawValue = ref(111)
const trackedValue = ref(111)
const rawSnapshot = ref('')
const trackedSnapshot = ref('')
const runCount = ref(0)

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
})

function syncRawState() {
  rawValue.value = obs.aa.bb
  rawSnapshot.value = formatValue(obs)
}

useAutorunEffect(() => {
  runCount.value += 1
  trackedValue.value = obs.aa.bb
  trackedSnapshot.value = formatValue(obs)
  pushLog(logs, `autorun #${runCount.value}: aa.bb = ${obs.aa.bb}`)
})

syncRawState()

function increaseNested() {
  obs.aa.bb += 1
  syncRawState()
}

function replaceParent() {
  obs.aa = { bb: obs.aa.bb + 10 }
  syncRawState()
}

function reset() {
  obs.aa = { bb: 111 }
  syncRawState()
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      浅模式只追踪第一层属性。直接修改 <code>aa.bb</code> 会改变原始值，但不会重新触发
      <code>autorun</code>；替换 <code>aa</code> 才会。
    </p>

    <div class="toolbar">
      <button class="btn" @click="increaseNested">
        obs.aa.bb += 1
      </button>
      <button class="btn" @click="replaceParent">
        obs.aa = { bb: ... }
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          autorun 次数
        </div>
        <div class="value">
          {{ runCount }}
        </div>
      </div>
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
          Last Tracked Snapshot
        </div>
        <pre>{{ trackedSnapshot }}</pre>
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
