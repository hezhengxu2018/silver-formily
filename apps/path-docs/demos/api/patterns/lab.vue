<script setup lang="ts">
import { Path } from '@silver-formily/path'
import { computed, ref } from 'vue'

const pattern = ref('*(phases.*.type,phases.*.steps.*.type)')
const base = ref('')
const target = ref('phases.0.steps.1.type')

const parsed = computed(() => {
  try {
    const value = Path.parse(pattern.value, base.value || undefined)
    return { value, error: '' }
  }
  catch (error) {
    return { value: null, error: error instanceof Error ? error.message : String(error) }
  }
})

const matchResult = computed(() => {
  if (parsed.value.error || !parsed.value.value)
    return { matched: false, error: parsed.value.error }
  try {
    return {
      matched: parsed.value.value.match(target.value),
      error: '',
    }
  }
  catch (error) {
    return {
      matched: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
})

const presets = [
  { text: 'single wildcard', value: 'user.*', target: 'user.name' },
  { text: 'optional deep wildcard', value: 'aa.**', target: 'aa.bb.cc' },
  { text: 'expand', value: 't.0.value~', target: 't.0.value_list' },
  { text: 'exclude group', value: '*(!basic.name,versionTag)', target: 'basic.id' },
  { text: 'relative path', value: '.value', target: 'users.0.value', base: 'users.0' },
]

function usePreset(item: { text: string, value: string, target: string, base?: string }) {
  pattern.value = item.value
  target.value = item.target
  base.value = item.base ?? ''
}
</script>

<template>
  <div class="playground">
    <div class="tagRow">
      <button v-for="item in presets" :key="item.text" class="btn secondary" @click="usePreset(item)">
        {{ item.text }}
      </button>
    </div>

    <div class="grid">
      <label class="field">
        <span class="fieldLabel">Pattern</span>
        <input v-model="pattern" class="input">
      </label>
      <label class="field">
        <span class="fieldLabel">Base</span>
        <input v-model="base" class="input" placeholder="optional">
      </label>
      <label class="field">
        <span class="fieldLabel">Target</span>
        <input v-model="target" class="input">
      </label>
    </div>

    <div v-if="parsed.error || matchResult.error" class="errorBox">
      {{ parsed.error || matchResult.error }}
    </div>

    <div v-else-if="parsed.value" class="panelGrid">
      <div class="panel">
        <div class="panelTitle">
          Parsed Path
        </div>
        <div class="panelBody metricValue">
          {{ parsed.value.toString() }}
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Segments
        </div>
        <div class="panelBody metricValue">
          {{ JSON.stringify(parsed.value.toArr(), null, 2) }}
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Match Target
        </div>
        <div class="panelBody">
          <span :class="matchResult.matched ? 'statusTrue' : 'statusFalse'">
            {{ matchResult.matched }}
          </span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Flags
        </div>
        <div class="panelBody tagRow">
          <span class="tag">isMatchPattern: {{ parsed.value.isMatchPattern }}</span>
          <span class="tag">isWildMatchPattern: {{ parsed.value.isWildMatchPattern }}</span>
          <span class="tag">haveRelativePattern: {{ parsed.value.haveRelativePattern }}</span>
          <span class="tag">haveExcludePattern: {{ parsed.value.haveExcludePattern }}</span>
          <span class="tag">isRegExp: {{ parsed.value.isRegExp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../shared/path-demo.css"></style>
