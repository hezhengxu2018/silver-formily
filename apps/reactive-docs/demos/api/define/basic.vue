<script setup lang="ts">
import { action, define, observable } from '@formily/reactive'
import { ref } from 'vue'
import { formatValue, parseNumber, pushLog, useAutorunEffect } from '../observable/shared'

class DomainModel {
  deep = { aa: 1 }
  shallow = { count: 0 }
  box: any = 0
  ref = 'hello'

  constructor() {
    define(this, {
      deep: observable,
      shallow: observable.shallow,
      box: observable.box,
      ref: observable.ref,
      total: observable.computed,
      action,
    })
  }

  get total() {
    return this.deep.aa + this.box.get()
  }

  action(nextDeep: number, nextBox: number) {
    this.deep.aa = nextDeep
    this.box.set(nextBox)
  }
}

const model = new DomainModel()

const nextDeep = ref(1)
const nextBox = ref(2)
const nextRef = ref(model.ref)
const totalValue = ref(model.total)
const totalRuns = ref(0)
const shallowRuns = ref(0)
const rawDeep = ref(model.deep.aa)
const rawBox = ref(model.box.get())
const rawRef = ref(model.ref)
const rawShallow = ref(model.shallow.count)
const trackedShallow = ref(model.shallow.count)
const snapshot = ref('')
const logs = ref<string[]>([])

function syncRawState() {
  rawDeep.value = model.deep.aa
  rawBox.value = model.box.get()
  rawRef.value = model.ref
  rawShallow.value = model.shallow.count
  snapshot.value = formatValue({
    deep: model.deep,
    shallow: model.shallow,
    box: model.box.get(),
    ref: model.ref,
  })
}

useAutorunEffect(() => {
  totalRuns.value += 1
  totalValue.value = model.total
  pushLog(logs, `autorun(total) #${totalRuns.value}: total = ${model.total}`)
})

useAutorunEffect(() => {
  shallowRuns.value += 1
  trackedShallow.value = model.shallow.count
  pushLog(logs, `autorun(shallow) #${shallowRuns.value}: count = ${model.shallow.count}`)
})

syncRawState()

function runAction() {
  model.action(nextDeep.value, nextBox.value)
  syncRawState()
}

function applyRef() {
  model.ref = nextRef.value
  syncRawState()
}

function mutateShallowNested() {
  model.shallow.count += 1
  syncRawState()
}

function replaceShallow() {
  model.shallow = { count: model.shallow.count + 1 }
  syncRawState()
}

function reset() {
  model.deep.aa = 1
  model.box.set(0)
  model.ref = 'hello'
  model.shallow = { count: 0 }
  nextDeep.value = 1
  nextBox.value = 2
  nextRef.value = 'hello'
  syncRawState()
}

function handleDeepInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextDeep.value = parseNumber(target?.value, nextDeep.value)
}

function handleBoxInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextBox.value = parseNumber(target?.value, nextBox.value)
}

function handleRefInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  nextRef.value = target?.value ?? nextRef.value
}
</script>

<template>
  <div class="playground">
    <p class="hint">
      这个 Demo 同时演示了 <code>define</code> 的几种 annotation：<code>deep</code>、
      <code>shallow</code>、<code>ref</code>、<code>box</code> 和 <code>computed</code>。
    </p>

    <div class="inputRow">
      <div class="inputGroup">
        <label for="define-next-deep">action 的 deep 值</label>
        <input
          id="define-next-deep"
          class="input"
          type="number"
          :value="nextDeep"
          @input="handleDeepInput"
        >
      </div>
      <div class="inputGroup">
        <label for="define-next-box">action 的 box 值</label>
        <input
          id="define-next-box"
          class="input"
          type="number"
          :value="nextBox"
          @input="handleBoxInput"
        >
      </div>
      <div class="inputGroup">
        <label for="define-next-ref">ref 值</label>
        <input
          id="define-next-ref"
          class="input"
          type="text"
          :value="nextRef"
          @input="handleRefInput"
        >
      </div>
    </div>

    <div class="toolbar">
      <button class="btn" @click="runAction">
        action(nextDeep, nextBox)
      </button>
      <button class="btn" @click="applyRef">
        model.ref = nextRef
      </button>
      <button class="btn" @click="mutateShallowNested">
        shallow.count += 1
      </button>
      <button class="btn" @click="replaceShallow">
        replace shallow
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div class="metrics">
      <div class="metric">
        <div class="label">
          computed(total)
        </div>
        <div class="value">
          {{ totalValue }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          total autorun 次数
        </div>
        <div class="value">
          {{ totalRuns }}
        </div>
      </div>
      <div class="metric">
        <div class="label">
          shallow autorun 次数
        </div>
        <div class="value">
          {{ shallowRuns }}
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
          Tracked Values
        </div>
        <pre>{{
          formatValue({
            total: totalValue,
            shallowCount: trackedShallow,
            ref: rawRef,
            deep: rawDeep,
            box: rawBox,
            shallowRaw: rawShallow,
          })
        }}</pre>
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
