<script setup lang="ts">
import { autorun, markRaw, observable, toJS } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

const obsValue = ref(123)
const plainValue = ref(123)
const obsRuns = ref(0)
const plainRuns = ref(0)
const markedSame = ref(false)
const logs = ref<string[]>([])

let obs: { aa: { bb: { cc: number } } }
let plain: { aa: { bb: { cc: number } } }
let disposeObs: null | (() => void) = null
let disposePlain: null | (() => void) = null

function stop() {
  disposeObs?.()
  disposePlain?.()
  disposeObs = null
  disposePlain = null
}

function start() {
  const marked = observable(markRaw({
    aa: {
      bb: 1,
    },
  }))
  markedSame.value = toJS(marked) === marked

  obs = observable({
    aa: {
      bb: {
        cc: 123,
      },
    },
  })
  plain = toJS(obs)

  disposeObs = autorun(() => {
    obsRuns.value += 1
    obsValue.value = obs.aa.bb.cc
    pushLog(logs, `observable autorun #${obsRuns.value}: cc = ${obs.aa.bb.cc}`)
  })

  disposePlain = autorun(() => {
    plainRuns.value += 1
    plainValue.value = plain.aa.bb.cc
    pushLog(logs, `plain autorun #${plainRuns.value}: cc = ${plain.aa.bb.cc}`)
  })
}

function mutateObservable() {
  obs.aa.bb.cc += 1
}

function mutatePlain() {
  plain.aa.bb.cc += 1
  plainValue.value = plain.aa.bb.cc
  pushLog(logs, `manual plain mutation: cc = ${plain.aa.bb.cc}`)
}

function reset() {
  stop()
  obsValue.value = 123
  plainValue.value = 123
  obsRuns.value = 0
  plainRuns.value = 0
  markedSame.value = false
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>toJS</code> 会生成一个普通 JS 快照。左边的 observable 仍然是响应式的；右边的
      plain object 不会再参与依赖追踪。下面还额外展示了：被 <code>markRaw</code> 标记的对象，
      调用 <code>toJS</code> 后会原样返回。
    </p>

    <div class="toolbar">
      <button class="btn" @click="mutateObservable">
        obs.aa.bb.cc++
      </button>
      <button class="btn" @click="mutatePlain">
        js.aa.bb.cc++
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          observable cc
        </div>
        <div class="value">
          {{ obsValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          plain js cc
        </div>
        <div class="value">
          {{ plainValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          observable / plain autorun
        </div>
        <div class="value">
          {{ obsRuns }} / {{ plainRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          markRaw 后 toJS 是否原样返回
        </div>
        <div class="value">
          {{ markedSame ? 'true' : 'false' }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          Snapshot
        </div>
        <pre>{{ formatValue({ observable: obsValue, plain: plainValue, markedSame }) }}</pre>
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
