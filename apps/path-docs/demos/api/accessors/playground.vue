<script setup lang="ts">
import { Path } from '@silver-formily/path'
import { computed, ref } from 'vue'

const initialSource = {
  user: {
    profile: {
      nickname: 'silver',
      city: 'Shanghai',
    },
  },
  list: [{ label: 'first' }],
}

const sourceText = ref(JSON.stringify(initialSource, null, 2))
const pattern = ref('user.profile.nickname')
const setValueText = ref('"new-name"')
const defaultValueText = ref('"guest"')

const parsedSource = computed(() => {
  try {
    return { value: JSON.parse(sourceText.value), error: '' }
  }
  catch (error) {
    return { value: null, error: error instanceof Error ? error.message : String(error) }
  }
})

const readState = computed(() => {
  if (parsedSource.value.error || !parsedSource.value.value) {
    return { getValue: '-', exists: false, error: parsedSource.value.error }
  }
  try {
    const source = parsedSource.value.value
    return {
      getValue: JSON.stringify(Path.getIn(source, pattern.value), null, 2) ?? 'undefined',
      exists: Path.existIn(source, pattern.value),
      error: '',
    }
  }
  catch (error) {
    return {
      getValue: '-',
      exists: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
})

function parseLooseValue(input: string) {
  try {
    return JSON.parse(input)
  }
  catch {
    return input
  }
}

function applyMutation(type: 'set' | 'ensure' | 'delete') {
  if (parsedSource.value.error || !parsedSource.value.value)
    return
  const next = JSON.parse(JSON.stringify(parsedSource.value.value))
  if (type === 'set') {
    Path.setIn(next, pattern.value, parseLooseValue(setValueText.value))
  }
  else if (type === 'ensure') {
    Path.ensureIn(next, pattern.value, parseLooseValue(defaultValueText.value))
  }
  else {
    Path.deleteIn(next, pattern.value)
  }
  sourceText.value = JSON.stringify(next, null, 2)
}

function reset() {
  sourceText.value = JSON.stringify(initialSource, null, 2)
  pattern.value = 'user.profile.nickname'
  setValueText.value = '"new-name"'
  defaultValueText.value = '"guest"'
}
</script>

<template>
  <div class="playground">
    <div class="grid">
      <label class="field">
        <span class="fieldLabel">Pattern</span>
        <input v-model="pattern" class="input">
      </label>
      <label class="field">
        <span class="fieldLabel">setIn value</span>
        <input v-model="setValueText" class="input">
      </label>
      <label class="field">
        <span class="fieldLabel">ensureIn default</span>
        <input v-model="defaultValueText" class="input">
      </label>
    </div>

    <label class="field">
      <span class="fieldLabel">Source JSON</span>
      <textarea v-model="sourceText" class="textarea" spellcheck="false" />
    </label>

    <div class="toolbar">
      <button class="btn" @click="applyMutation('set')">
        apply setIn
      </button>
      <button class="btn" @click="applyMutation('ensure')">
        apply ensureIn
      </button>
      <button class="btn secondary" @click="applyMutation('delete')">
        apply deleteIn
      </button>
      <button class="btn secondary" @click="reset">
        reset
      </button>
    </div>

    <div v-if="parsedSource.error || readState.error" class="errorBox">
      {{ parsedSource.error || readState.error }}
    </div>

    <div class="panelGrid">
      <div class="panel">
        <div class="panelTitle">
          getIn result
        </div>
        <div class="panelBody metricValue">
          {{ readState.getValue }}
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          existIn result
        </div>
        <div class="panelBody">
          <span :class="readState.exists ? 'statusTrue' : 'statusFalse'">
            {{ readState.exists }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../shared/path-demo.css"></style>
