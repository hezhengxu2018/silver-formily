import type {
  IFieldFactoryProps as CoreFieldFactoryProps,
  IFieldProps as CoreFieldProps,
  Field,
  FieldDisplayTypes,
  Form,
  FormPatternTypes,
  GeneralField,
  IVoidFieldFactoryProps,
} from '@formily/core'
import type { ISchema, Schema, SchemaKey } from '@formily/json-schema'
import type { FormPathPattern } from '@formily/shared'
import type { Component } from 'vue'
import type {
  MultiValidator as FormilyMultiValidator,
  IValidateResult as FormilyValidateResult,
  Validator as FormilyValidator,
  ValidatorFunction as FormilyValidatorFunction,
  ValidatorFunctionResponse as FormilyValidatorResponse,
  IValidatorRules as FormilyValidatorRules,
} from './validator'

export type SchemaFieldValidator = FormilyValidator
export type SchemaValidatorFunction = FormilyValidatorFunction<any>
export type SchemaValidatorRules = FormilyValidatorRules<any>
export type SchemaMultiValidator = FormilyMultiValidator<any>
export type SchemaValidateResult = FormilyValidateResult
export type SchemaValidatorResponse = FormilyValidatorResponse

export interface VueComponentOptionsWithProps {
  props: Record<string, unknown>
}

type ComponentPropsOrRecord<T extends Component> = T extends VueComponentOptionsWithProps
  ? T['props']
  : Record<string, unknown>

export type VueComponentProps<T extends Component> = ComponentPropsOrRecord<T> & Record<string, unknown>

export interface IProviderProps {
  form: Form
}

export interface IFieldProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}

export interface IFieldFactoryProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldFactoryProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}

export type IVoidFieldProps<
  D extends Component = Component,
  C extends Component = Component,
> = IVoidFieldFactoryProps<D, C> & {
  decoratorContent?: any
}

export type IArrayFieldProps = IFieldProps
export type IObjectFieldProps = IFieldProps

export interface IReactiveFieldProps {
  fieldType: 'Field' | 'ArrayField' | 'ObjectField' | 'VoidField'
  fieldProps: IFieldProps | IVoidFieldProps
}

export interface IComponentMapper<T extends Component = Component> {
  (target: T): Component
}

export type IStateMapper<Props>
  = | {
    [key in keyof Field]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)

export type SchemaVueComponents = Record<string, Component>
export type SchemaExpressionScope = Record<string, unknown>

export interface ISchemaFieldVueFactoryOptions<
  Components extends SchemaVueComponents = SchemaVueComponents,
> {
  components?: Components
  scope?: SchemaExpressionScope
}

export interface ISchemaFieldProps extends Omit<IRecursionFieldProps, 'name' | 'schema'> {
  schema?: ISchema
  components?: {
    [key: string]: Component
  }
  scope?: SchemaExpressionScope
  name?: SchemaKey
}

export interface ISchemaMapper {
  (schema: Schema, name: SchemaKey): Schema
}

export interface ISchemaFilter {
  (schema: Schema, name: SchemaKey): boolean
}

export interface IRecursionFieldProps {
  schema: Schema | ISchema
  name?: SchemaKey
  basePath?: FormPathPattern
  onlyRenderProperties?: boolean
  onlyRenderSelf?: boolean
  mapProperties?: ISchemaMapper
  filterProperties?: ISchemaFilter
}

export type ComponentPath<T, Key extends keyof T = keyof T> = Key extends string ? Key : never

export type ComponentPropsByPathValue<
  T extends SchemaVueComponents,
  P extends ComponentPath<T>,
> = P extends keyof T ? VueComponentProps<T[P]> : never

type SchemaContent<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message,
  ReactionField,
> = ISchema<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message,
  ReactionField
>['x-content']

type BaseSchemaMarkupFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>,
> = ISchema<
  Decorator,
  Component,
  ComponentPropsByPathValue<Components, Decorator>,
  ComponentPropsByPathValue<Components, Component>,
  FormPatternTypes,
  FieldDisplayTypes,
  SchemaFieldValidator,
  string,
  GeneralField
> & {
  'x-decorator-content'?: SchemaContent<
    Decorator,
    Component,
    ComponentPropsByPathValue<Components, Decorator>,
    ComponentPropsByPathValue<Components, Component>,
    FormPatternTypes,
    FieldDisplayTypes,
    SchemaFieldValidator,
    string,
    GeneralField
  >
}

type SchemaMarkupFieldShape = ISchema<
  string,
  string,
  Record<string, unknown>,
  Record<string, unknown>,
  FormPatternTypes,
  FieldDisplayTypes,
  SchemaFieldValidator,
  string,
  GeneralField
>

export type SchemaMarkupValidator = SchemaMarkupFieldShape['x-validator']

export type ISchemaMarkupFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>,
> = Omit<BaseSchemaMarkupFieldProps<Components, Decorator, Component>, 'x-validator'> & {
  'x-validator'?: SchemaMarkupValidator
}

export type ISchemaTypeFieldProps<
  Components extends SchemaVueComponents = SchemaVueComponents,
  Decorator extends ComponentPath<Components> = ComponentPath<Components>,
  Component extends ComponentPath<Components> = ComponentPath<Components>,
> = Omit<ISchemaMarkupFieldProps<Components, Decorator, Component>, 'type'>

export interface IExpressionScopeProps {
  value: SchemaExpressionScope
}

export type { FormilyValidator }
