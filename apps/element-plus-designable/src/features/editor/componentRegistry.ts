import type { DesignableComponent } from '../renderer'
import { AllComponents } from '../renderer'

export const componentRegistry: Record<string, DesignableComponent> = AllComponents
