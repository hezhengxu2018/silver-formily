<script setup lang="ts">
import { observable, observe } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

const obs = observable({
  aa: 11,
  nested: {
    bb: 22,
  },
})

const snapshot = ref(formatValue(obs))
const deepCount = ref(0)
const shallowCount = ref(0)
const logs = ref<string[]>([])

const disposeDeep = observe(obs, (change) => {
  deepCount.value += 1
  pushLog(logs, `deep #${deepCount.value}: ${change.type} ${String(change.key ?? '')} path=${JSON.stringify(change.path ?? [])}`)
}, true)

const disposeShallow = observe(obs, (change) => {
  shallowCount.value += 1
  pushLog(logs, `shallow #${shallowCount.value}: ${change.type} ${String(change.key ?? '')} path=${JSON.stringify(change.path ?? [])}`)
}, false)

function syncSnapshot() {
  snapshot.value = formatValue(obs)
}

function setRoot() {
  obs.aa += 1
  syncSnapshot()
}

function setNested() {
  obs.nested.bb += 1
  syncSnapshot()
}

function readOnly() {
  void obs.aa
  void obs.nested.bb
  pushLog(logs, 'read aa / nested.bb (observe 不会记录读取)')
}

function reset() {
  obs.aa = 11
  obs.nested.bb = 22
  snapshot.value = formatValue(obs)
  deepCount.value = 0
  shallowCount.value = 0
  logs.value = []
}

onBeforeUnmount(() => {
  disposeDeep()
  disposeShallow()
})
</script>

<template>
  <div class="playground">
    <p class="hint">
      这个 Demo 同时挂了一个深度监听和一个浅监听。修改根属性时两者都会收到变化；修改嵌套属性时，
      只有深度监听会记录。单纯读取属性不会产生任何 observe 事件。
    </p>

    <div class="toolbar">
      <button class="btn" @click="setRoot">
        obs.aa++
      </button>
      <button class="btn" @click="setNested">
        obs.nested.bb++
      </button>
      <button class="btn" @click="readOnly">
        read only
      </button>
      <button class="btn secondary" @click="reset">
        reset display
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          deep observe 次数
        </div>
        <div class="value">
          {{ deepCount }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          shallow observe 次数
        </div>
        <div class="value">
          {{ shallowCount }}
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
