export function Result({ value }: { value: unknown }) {
  return <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{JSON.stringify(value, null, 2)}</pre>
}
