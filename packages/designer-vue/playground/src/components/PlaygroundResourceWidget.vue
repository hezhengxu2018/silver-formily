<script setup lang="ts">
import type { PlaygroundResourceGroup } from '../mock/designer'

defineProps<{
  groups: PlaygroundResourceGroup[]
}>()
</script>

<template>
  <aside class="pd-resource-widget">
    <div class="pd-resource-widget__content">
      <section
        v-for="group in groups"
        :key="group.name"
        class="pd-resource-widget__group"
      >
        <h3 class="pd-resource-widget__group-title">
          {{ group.name }}
        </h3>

        <div class="pd-resource-widget__items">
          <article
            v-for="item in group.items"
            :key="item.sourceId"
            class="pd-resource-widget__item"
            draggable="true"
            :data-designer-source-id="item.sourceId"
          >
            <span class="pd-resource-widget__item-icon">
              {{ item.icon }}
            </span>
            <span class="pd-resource-widget__item-name">
              {{ item.title }}
            </span>
          </article>
        </div>
      </section>
    </div>
  </aside>
</template>
