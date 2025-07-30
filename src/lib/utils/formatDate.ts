export function formatDate(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
