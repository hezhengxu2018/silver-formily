<script setup lang="ts">
import { Designer, Viewport, Workspace } from '@/designable/containers'
import { ComponentTreeWidget, ResourceWidget, RuntimeNode } from '@/designable/widgets'
import { engine, paletteResourceGroups } from '../designer'

const componentNames = [
  'ArrayCards',
  'ArrayCollapse',
  'ArrayItems',
  'ArrayListTabs',
  'ArrayTable',
  'ArrayTabs',
  'Autocomplete',
  'Cascader',
  'Checkbox',
  'Checkbox.Group',
  'ColorPicker',
  'ColorPickerPanel',
  'DatePicker',
  'DatePickerPanel',
  'Editable',
  'EditablePopover',
  'Form',
  'FormButtonGroup',
  'FormCollapse',
  'FormGrid',
  'FormGridColumn',
  'FormItem',
  'FormLayout',
  'FormStep',
  'FormTab',
  'Input',
  'Input.TextArea',
  'InputNumber',
  'InputTag',
  'Mention',
  'Password',
  'PickerSelect',
  'QueryForm',
  'QueryFormItem',
  'Radio',
  'Radio.Group',
  'Rate',
  'Reset',
  'Segmented',
  'Select',
  'SelectTable',
  'Slider',
  'Space',
  'Submit',
  'Switch',
  'TimePicker',
  'TimeSelect',
  'Transfer',
  'Tree',
  'TreeSelect',
  'Upload',
]

const components = Object.fromEntries(componentNames.map(name => [name, RuntimeNode]))
</script>

<template>
  <Designer :engine="engine">
    <main class="epd-designable-shell">
      <header class="epd-designable-shell__header">
        <div>
          <strong>Element Plus Designable</strong>
          <span>Official structure prototype</span>
        </div>
      </header>

      <section class="epd-designable-shell__workspace">
        <ResourceWidget :groups="paletteResourceGroups" />

        <div class="epd-designable-shell__center">
          <Workspace id="element-plus-designable">
            <Viewport>
              <div class="epd-designable-shell__canvas">
                <ComponentTreeWidget :components="components" />
              </div>
            </Viewport>
          </Workspace>
        </div>
      </section>
    </main>
  </Designer>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designable-shell {
  @apply min-h-screen bg-slate-100 pt-[var(--editor-header-height)] text-slate-950;

  &__header {
    @apply fixed inset-x-0 top-0 z-30 flex h-[var(--editor-header-height)] items-center border-b border-slate-200 bg-white px-5;

    strong {
      @apply block text-sm font-semibold;
    }

    span {
      @apply block text-xs text-slate-500;
    }
  }

  &__workspace {
    @apply relative flex h-[calc(100vh-var(--editor-header-height))] overflow-hidden;
  }

  &__center {
    @apply relative min-w-[30rem] flex-1;
  }

  &__canvas {
    @apply mx-auto my-8 min-h-[42rem] w-[min(100%,50rem)] rounded-[1.25rem] bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)];
  }
}
</style>
