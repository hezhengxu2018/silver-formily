<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import { Copy, Trash2, X } from '@lucide/vue'
import { TreeNode as TreeNodeModel } from '@silver-formily/designer-core'
import { computed } from 'vue'
import { createNamespace } from '@/lib/utils'

const props = defineProps<{
  json: string
  node?: TreeNode
  path: Array<{
    componentName: string
    id: string
  }>
  sourceKey?: string
  visible?: boolean
}>()

defineEmits<{
  close: []
}>()

const { b } = createNamespace('settings-form')

const canCloneRef = computed(() => props.node?.allowClone() ?? false)
const canDeleteRef = computed(() => props.node?.allowDelete() ?? false)

function handleCopy() {
  if (!props.node?.allowClone())
    return

  TreeNodeModel.clone([props.node])
}

function handleDelete() {
  if (!props.node?.allowDelete())
    return

  TreeNodeModel.remove([props.node])
}
</script>

<template>
  <Transition :name="b('slide')">
    <section
      v-if="visible"
      :class="[b('panel'), b('panel', { floating: true })]"
    >
      <div :class="b('panel-header')">
        <div :class="b('panel-heading')">
          <button
            aria-label="关闭配置面板"
            :class="b('panel-close')"
            type="button"
            title="关闭"
            @click="$emit('close')"
          >
            <X :class="b('panel-close-icon')" />
          </button>
          <div
            v-if="path.length > 0"
            :class="b('path')"
          >
            <span
              v-for="(item, index) in path"
              :key="item.id"
              :class="b('path-item')"
            >
              <span
                v-if="index > 0"
                :class="b('path-separator')"
              >/</span>
              {{ item.componentName }}
            </span>
          </div>
        </div>
        <div :class="b('action-buttons-wrapper')">
          <button
            v-if="canCloneRef"
            aria-label="复制节点"
            :class="b('action-button')"
            title="Duplicate node"
            type="button"
            @click.stop="handleCopy"
          >
            <Copy :class="b('action-button-icon')" />
          </button>
          <button
            v-if="canDeleteRef"
            aria-label="删除节点"
            :class="[b('action-button'), b('action-button')]"
            title="Delete node"
            type="button"
            @click.stop="handleDelete"
          >
            <Trash2 :class="b('action-button-icon')" />
          </button>
        </div>
      </div>

      <pre
        :key="sourceKey"
        :class="b('code')"
      >{{ json }}</pre>
    </section>
  </Transition>
</template>
