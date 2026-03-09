<script setup lang="ts">
import { autorun, observable, raw } from '@formily/reactive'
import { onBeforeUnmount, ref } from 'vue'
import { formatValue, pushLog } from '../observable/shared'

const trackedValue = ref(123)
const runCount = ref(0)
const rootSame = ref(false)
const childSame = ref(false)
const childEqualsNestedRaw = ref(true)
const obsSnapshot = ref('')
const rootSnapshot = ref('')
const nestedSnapshot = ref('')
const logs = ref<string[]>([])

let obs: { aa: { bb: number } }
let disposeCurrent: null | (() => void) = null

function stop() {
  disposeCurrent?.()
  disposeCurrent = null
}

function start() {
  obs = observable({
    aa: {
      bb: 123,
    },
  })

  disposeCurrent = autorun(() => {
    runCount.value += 1
    trackedValue.value = obs.aa.bb
    rootSame.value = raw(obs) === obs
    childSame.value = raw(obs).aa === obs.aa
    childEqualsNestedRaw.value = raw(obs).aa === raw(obs.aa)
    obsSnapshot.value = formatValue(obs)
    rootSnapshot.value = formatValue(raw(obs))
    nestedSnapshot.value = formatValue(raw(obs.aa))
    pushLog(logs, `autorun #${runCount.value}: bb = ${obs.aa.bb}`)
  })
}

function mutateNested() {
  obs.aa.bb += 1
}

function replaceNested() {
  obs.aa = { bb: obs.aa.bb + 10 }
}

function reset() {
  stop()
  trackedValue.value = 123
  runCount.value = 0
  rootSame.value = false
  childSame.value = false
  childEqualsNestedRaw.value = true
  obsSnapshot.value = ''
  rootSnapshot.value = ''
  nestedSnapshot.value = ''
  logs.value = []
  start()
}

start()

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="playground">
    <p class="hint">
      <code>raw</code> 会返回当前对象对应的源数据引用。它不是深拷贝，所以你能继续拿到嵌套对象的源数据，
      但它本身也不会再是 observable proxy。
    </p>

    <div class="toolbar">
      <button class="btn" @click="mutateNested">
        obs.aa.bb++
      </button>
      <button class="btn" @click="replaceNested">
        replace obs.aa
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          当前 bb
        </div>
        <div class="value">
          {{ trackedValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          raw(obs) === obs
        </div>
        <div class="value">
          {{ rootSame ? 'true' : 'false' }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          raw(obs).aa === obs.aa
        </div>
        <div class="value">
          {{ childSame ? 'true' : 'false' }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          raw(obs).aa === raw(obs.aa)
        </div>
        <div class="value">
          {{ childEqualsNestedRaw ? 'true' : 'false' }}
        </div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panelTitle">
          observable
        </div>
        <pre>{{ obsSnapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          raw(obs)
        </div>
        <pre>{{ rootSnapshot }}</pre>
      </div>
      <div class="panel">
        <div class="panelTitle">
          raw(obs.aa)
        </div>
        <pre>{{ nestedSnapshot }}</pre>
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
