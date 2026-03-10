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
  pushLog(logs, 'read aa / nested.bb (observe does not record reads)')
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
      This demo registers one deep observer and one shallow observer. Updating a root property is
      recorded by both; updating a nested property is only recorded by the deep observer. Pure
      reads do not produce observe events.
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
          deep observe runs
        </div>
        <div class="value">
          {{ deepCount }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          shallow observe runs
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
