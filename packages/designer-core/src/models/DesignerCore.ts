import type {
  DesignerCommandContext,
  DesignerCommandDescriptor,
  DesignerCoreOptions,
  DesignerDuplicateOptions,
  DesignerEvent,
  DesignerInsertOptions,
  DesignerMoveOptions,
  DesignerNodePatch,
  DesignerOperationOptions,
  DesignerRestoreOptions,
  DesignerSchemaNode,
  DesignerSnapshot,
} from '../types'

import { clone, Subscribable } from '@silver-formily/shared'
import { isSameSelection, snapshotEquals, stripNodeIds } from '../shared'
import { DesignerCommands } from './DesignerCommands'
import { DesignerHistory } from './DesignerHistory'
import { DesignerMaterialRegistry } from './DesignerMaterialRegistry'
import { DesignerSelection } from './DesignerSelection'
import { DesignerTree } from './DesignerTree'

type EventBus = Subscribable<DesignerEvent>

export class DesignerCore {
  tree: DesignerTree
  selection: DesignerSelection
  materials: DesignerMaterialRegistry
  history: DesignerHistory
  commands: DesignerCommands
  protected events: EventBus

  constructor(options: DesignerCoreOptions = {}) {
    this.tree = new DesignerTree({
      schema: options.schema,
      rootComponentName: options.rootComponentName,
    })
    this.selection = new DesignerSelection()
    this.materials = new DesignerMaterialRegistry()
    this.history = new DesignerHistory(options.historyLimit)
    this.events = new Subscribable<DesignerEvent>()
    this.commands = new DesignerCommands(() => this.getCommandContext())

    if (options.materials?.length) {
      this.materials.registerMany(options.materials)
      this.emit({
        type: 'materials:changed',
        materialNames: this.materials.list().map(item => item.name),
      })
    }

    this.registerBuiltInCommands()
  }

  subscribe(listener: (event: DesignerEvent) => void) {
    const index = this.events.subscribe(listener)
    return () => this.events.unsubscribe(index)
  }

  get snapshot(): DesignerSnapshot {
    return {
      schema: this.tree.exportSchema(),
      selectedId: this.selection.selectedId,
      hoveredId: this.selection.hoveredId,
    }
  }

  exportSchema() {
    return this.tree.exportSchema()
  }

  importSchema(schema: DesignerSchemaNode, options: DesignerOperationOptions = {}) {
    return this.withMutation(() => {
      this.tree.importSchema(schema)
      this.ensureSelectionIntegrity()
      return this.tree.root
    }, {
      recordHistory: options.recordHistory,
      reason: options.reason || 'import',
    })
  }

  restore(snapshot: DesignerSnapshot, options: DesignerRestoreOptions = {}) {
    this.tree.importSchema(snapshot.schema)
    const previousSelection = this.selection.state
    this.selection.restore({
      selectedId: snapshot.selectedId,
      hoveredId: snapshot.hoveredId,
    })
    this.ensureSelectionIntegrity()
    this.emitTreeChanged(options.reason || 'restore')
    if (options.notifySelection !== false && !isSameSelection(previousSelection, this.selection.state))
      this.emitSelectionChanged()
    this.emitHistoryChanged()
  }

  selectNode(nodeId?: string) {
    const previous = this.selection.state
    this.selection.select(nodeId)
    this.ensureSelectionIntegrity()
    if (!isSameSelection(previous, this.selection.state))
      this.emitSelectionChanged()
    return this.selection.state
  }

  hoverNode(nodeId?: string) {
    const previous = this.selection.state
    this.selection.hover(nodeId)
    this.ensureSelectionIntegrity()
    if (!isSameSelection(previous, this.selection.state))
      this.emitSelectionChanged()
    return this.selection.state
  }

  clearSelection() {
    const previous = this.selection.state
    this.selection.clear()
    if (!isSameSelection(previous, this.selection.state))
      this.emitSelectionChanged()
    return this.selection.state
  }

  registerMaterial(material: Parameters<DesignerMaterialRegistry['register']>[0]) {
    this.materials.register(material)
    this.emit({
      type: 'materials:changed',
      materialNames: this.materials.list().map(item => item.name),
    })
    return this
  }

  registerMaterials(materials: Parameters<DesignerMaterialRegistry['registerMany']>[0]) {
    this.materials.registerMany(materials)
    this.emit({
      type: 'materials:changed',
      materialNames: this.materials.list().map(item => item.name),
    })
    return this
  }

  createNodeFromMaterial(name: string, overrides?: Parameters<DesignerMaterialRegistry['createNode']>[1]) {
    return this.materials.createNode(name, overrides)
  }

  insertNode(schema: DesignerSchemaNode, options: DesignerInsertOptions = {}) {
    return this.withMutation(() => {
      const mutation = this.tree.insertNode(schema, options)
      this.selectNode(mutation.node.id)
      return mutation
    }, {
      reason: 'insert',
    })
  }

  appendNode(schema: DesignerSchemaNode, parentId?: string) {
    return this.insertNode(schema, { parentId })
  }

  removeNode(nodeId: string) {
    return this.withMutation(() => {
      const mutation = this.tree.removeNode(nodeId)
      if (this.selection.selectedId === nodeId || mutation.node.contains(this.selection.selectedId))
        this.selection.select(mutation.parent?.id)
      if (this.selection.hoveredId === nodeId || mutation.node.contains(this.selection.hoveredId))
        this.selection.hover(undefined)
      return mutation
    }, {
      reason: 'remove',
    })
  }

  moveNode(nodeId: string, options: DesignerMoveOptions) {
    return this.withMutation(() => this.tree.moveNode(nodeId, options), {
      reason: 'move',
    })
  }

  duplicateNode(nodeId: string, options: DesignerDuplicateOptions = {}) {
    return this.withMutation(() => {
      const mutation = this.tree.duplicateNode(nodeId, options)
      this.selection.select(mutation.node.id)
      return mutation
    }, {
      reason: 'duplicate',
    })
  }

  replaceNode(nodeId: string, schema: DesignerSchemaNode) {
    return this.withMutation(() => this.tree.replaceNode(nodeId, schema), {
      reason: 'replace',
    })
  }

  updateNode(nodeId: string, patch: DesignerNodePatch) {
    return this.withMutation(() => this.tree.updateNode(nodeId, patch), {
      reason: 'update',
    })
  }

  undo() {
    const snapshot = this.history.undo(this.snapshot)
    if (!snapshot)
      return undefined
    this.restore(snapshot, {
      reason: 'undo',
    })
    return snapshot
  }

  redo() {
    const snapshot = this.history.redo(this.snapshot)
    if (!snapshot)
      return undefined
    this.restore(snapshot, {
      reason: 'redo',
    })
    return snapshot
  }

  registerCommand<Payload = any, Result = any>(descriptor: DesignerCommandDescriptor<Payload, Result>) {
    this.commands.register(descriptor)
    return this
  }

  runCommand<Payload = any, Result = any>(
    descriptor: DesignerCommandDescriptor<Payload, Result>,
    payload: Payload,
    options: { recordHistory?: boolean } = {},
  ): Result {
    const context = this.getCommandContext()
    const execute = () => descriptor.handler(payload, context)

    const result = descriptor.mutate === false
      ? execute()
      : this.withMutation(execute, {
          reason: descriptor.name,
          recordHistory: options.recordHistory,
        })

    this.emit({
      type: 'command:executed',
      name: descriptor.name,
    })

    return result as Result
  }

  protected getCommandContext(): DesignerCommandContext {
    return {
      designer: this,
      tree: this.tree,
      selection: this.selection,
      materials: this.materials,
      history: this.history,
    }
  }

  protected withMutation<T>(runner: () => T, options: DesignerOperationOptions = {}): T {
    const before = this.snapshot
    const result = runner()
    this.ensureSelectionIntegrity()
    const after = this.snapshot
    const shouldRecord = options.recordHistory !== false

    if (!snapshotEquals(before.schema, after.schema) || before.selectedId !== after.selectedId || before.hoveredId !== after.hoveredId) {
      if (shouldRecord)
        this.history.push(before, options.reason)
      this.emitTreeChanged(options.reason || 'mutation')
      this.emitSelectionChanged(before)
      this.emitHistoryChanged()
    }

    return result
  }

  protected ensureSelectionIntegrity() {
    if (this.selection.selectedId && !this.tree.getNode(this.selection.selectedId))
      this.selection.select(undefined)
    if (this.selection.hoveredId && !this.tree.getNode(this.selection.hoveredId))
      this.selection.hover(undefined)
  }

  protected emit(event: DesignerEvent) {
    this.events.notify(clone(event))
  }

  protected emitTreeChanged(reason: string) {
    this.emit({
      type: 'tree:changed',
      reason,
      snapshot: this.snapshot,
    })
  }

  protected emitSelectionChanged(previousSelection?: { selectedId?: string, hoveredId?: string }) {
    if (previousSelection && isSameSelection(previousSelection, this.selection.state))
      return
    this.emit({
      type: 'selection:changed',
      selection: this.selection.state,
    })
  }

  protected emitHistoryChanged() {
    this.emit({
      type: 'history:changed',
      state: this.history.state,
    })
  }

  protected registerBuiltInCommands() {
    this.registerCommand({
      name: 'select',
      mutate: false,
      handler: payload => this.selectNode(payload?.nodeId),
    })
    this.registerCommand({
      name: 'hover',
      mutate: false,
      handler: payload => this.hoverNode(payload?.nodeId),
    })
    this.registerCommand({
      name: 'clearSelection',
      mutate: false,
      handler: () => this.clearSelection(),
    })
    this.registerCommand({
      name: 'importSchema',
      handler: payload => this.importSchema(payload.schema, {
        recordHistory: payload.recordHistory,
        reason: 'importSchema',
      }),
    })
    this.registerCommand({
      name: 'insertNode',
      handler: payload => this.insertNode(payload.schema, payload.options),
    })
    this.registerCommand({
      name: 'appendNode',
      handler: payload => this.appendNode(payload.schema, payload.parentId),
    })
    this.registerCommand({
      name: 'removeNode',
      handler: payload => this.removeNode(payload.nodeId),
    })
    this.registerCommand({
      name: 'moveNode',
      handler: payload => this.moveNode(payload.nodeId, payload.options),
    })
    this.registerCommand({
      name: 'duplicateNode',
      handler: payload => this.duplicateNode(payload.nodeId, payload.options),
    })
    this.registerCommand({
      name: 'replaceNode',
      handler: payload => this.replaceNode(payload.nodeId, payload.schema),
    })
    this.registerCommand({
      name: 'updateNode',
      handler: payload => this.updateNode(payload.nodeId, payload.patch),
    })
    this.registerCommand({
      name: 'createNodeFromMaterial',
      mutate: false,
      handler: payload => this.createNodeFromMaterial(payload.name, payload.overrides),
    })
    this.registerCommand({
      name: 'insertMaterialNode',
      handler: payload => this.insertNode(this.createNodeFromMaterial(payload.name, payload.overrides), payload.options),
    })
    this.registerCommand({
      name: 'duplicateSchema',
      mutate: false,
      handler: payload => stripNodeIds(payload.schema),
    })
  }
}
