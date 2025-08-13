export function formatDateRange(start?: string, end?: string): string {
  if (!start) return 'TBC'

  const startDate = new Date(start)
  const endDate = end ? new Date(end) : null

  const sameMonth =
    endDate &&
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()

  const sameYear = endDate && startDate.getFullYear() === endDate.getFullYear()

  const startText = startDate.toLocaleDateString('en-NZ', {
    day: 'numeric',
    ...(sameMonth ? {} : { month: 'short' }),
    ...(sameYear ? {} : { year: 'numeric' }),
  })

  const endText = endDate
    ? endDate.toLocaleDateString('en-NZ', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  return endDate ? `${startText} - ${endText}` : startText
}
