import type {
  DesignerCommandContext,
  DesignerCommandDescriptor,
  DesignerCommandExecutionOptions,
  DesignerCommandMap,
  DesignerCommandResult,
} from '../types'

export class DesignerCommands {
  protected commands: DesignerCommandMap = new Map()
  protected context: () => DesignerCommandContext

  constructor(context: () => DesignerCommandContext) {
    this.context = context
  }

  register<Payload = any, Result = any>(descriptor: DesignerCommandDescriptor<Payload, Result>) {
    this.commands.set(descriptor.name, descriptor)
    return this
  }

  get(name: string) {
    return this.commands.get(name)
  }

  list() {
    return Array.from(this.commands.values())
  }

  execute<Payload = any, Result = any>(
    name: string,
    payload: Payload,
    options: DesignerCommandExecutionOptions = {},
  ): DesignerCommandResult<Result> {
    const command = this.commands.get(name)
    if (!command)
      throw new Error(`Command "${name}" was not registered`)

    const result = this.context().designer.runCommand(command, payload, options)
    return {
      name,
      result,
    }
  }
}
