// The club is in New Zealand, so "today" means the NZ calendar date. Using the
// UTC date would treat same-day swims logged before 1pm NZDT as future dates.
const nzDateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Pacific/Auckland',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Today's date in New Zealand as YYYY-MM-DD. */
export function todayInNZ(now: Date = new Date()): string {
  return nzDateFormat.format(now) // en-CA formats as YYYY-MM-DD
}
