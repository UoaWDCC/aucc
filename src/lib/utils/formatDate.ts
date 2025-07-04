export function formatDate(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
