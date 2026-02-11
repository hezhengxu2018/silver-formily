export interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  name?: string
}
