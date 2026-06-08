/// <reference types="@silver-formily/core" />
/// <reference types="@silver-formily/json-schema" />
import * as Types from './types'

declare global {
  namespace Formily.Vue {
    export { Types }
  }
}
