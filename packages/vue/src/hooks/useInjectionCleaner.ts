import type { InjectionKey, Ref } from 'vue'
import { provide, ref } from 'vue'

export function useInjectionCleaner(injectionKeys: InjectionKey<Ref<unknown>>[]) {
  injectionKeys.forEach(key => provide(key, ref()))
}
