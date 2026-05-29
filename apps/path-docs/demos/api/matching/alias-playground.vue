<script setup lang="ts">
import { Path } from '@silver-formily/path'
import { computed, ref } from 'vue'

const pattern = ref('aa.*(!bb)')
const name = ref('kk.mm.aa.cc')
const alias = ref('aa.cc')
const includeSource = ref('a.b')
const includeTarget = ref('a.b')

const result = computed(() => {
  try {
    const parsed = Path.parse(pattern.value)
    return {
      directName: parsed.match(name.value),
      directAlias: parsed.match(alias.value),
      aliasGroup: parsed.matchAliasGroup(name.value, alias.value),
      matcher: Path.match(pattern.value)(name.value),
      includes: Path.parse(includeSource.value).includes(includeTarget.value),
      score: parsed.matchScore,
      error: '',
    }
  }
  catch (error) {
    return {
      directName: false,
      directAlias: false,
      aliasGroup: false,
      matcher: false,
      includes: false,
      score: 0,
      error: error instanceof Error ? error.message : String(error),
    }
  }
})

const presets = [
  {
    text: 'alias success',
    pattern: 'aa.*(!bb)',
    name: 'kk.mm.aa.cc',
    alias: 'aa.cc',
  },
  {
    text: 'alias reject',
    pattern: 'aa.*(!bb)',
    name: 'kk.mm.aa.bb',
    alias: 'aa.bb',
  },
  {
    text: 'exclude score',
    pattern: 'aa.bb.*(11,22,33).*(!aa,bb,cc)',
    name: 'aa.bb.11.mm',
    alias: 'aa.cc.dd.bb.11.mm',
  },
]

function usePreset(item: { text: string, pattern: string, name: string, alias: string }) {
  pattern.value = item.pattern
  name.value = item.name
  alias.value = item.alias
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
        <span class="fieldLabel">Name</span>
        <input v-model="name" class="input">
      </label>
      <label class="field">
        <span class="fieldLabel">Alias</span>
        <input v-model="alias" class="input">
      </label>
    </div>

    <div class="grid">
      <label class="field">
        <span class="fieldLabel">includes source</span>
        <input v-model="includeSource" class="input">
      </label>
      <label class="field">
        <span class="fieldLabel">includes target</span>
        <input v-model="includeTarget" class="input">
      </label>
    </div>

    <div v-if="result.error" class="errorBox">
      {{ result.error }}
    </div>

    <div class="panelGrid">
      <div class="panel">
        <div class="panelTitle">
          match(name)
        </div>
        <div class="panelBody">
          <span :class="result.directName ? 'statusTrue' : 'statusFalse'">{{ result.directName }}</span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          match(alias)
        </div>
        <div class="panelBody">
          <span :class="result.directAlias ? 'statusTrue' : 'statusFalse'">{{ result.directAlias }}</span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          matchAliasGroup
        </div>
        <div class="panelBody">
          <span :class="result.aliasGroup ? 'statusTrue' : 'statusFalse'">{{ result.aliasGroup }}</span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          Path.match(pattern)(name)
        </div>
        <div class="panelBody">
          <span :class="result.matcher ? 'statusTrue' : 'statusFalse'">{{ result.matcher }}</span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          includes(source, target)
        </div>
        <div class="panelBody">
          <span :class="result.includes ? 'statusTrue' : 'statusFalse'">{{ result.includes }}</span>
        </div>
      </div>
      <div class="panel">
        <div class="panelTitle">
          last matchScore
        </div>
        <div class="panelBody metricValue">
          {{ result.score }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../shared/path-demo.css"></style>
