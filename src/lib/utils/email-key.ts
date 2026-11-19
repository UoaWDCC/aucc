const GMAIL_DOMAINS = ['gmail.com', 'googlemail.com']

/**
 * The mailbox an email address delivers to, for rate limiting: addresses
 * that reach the same inbox get the same key. Not for display or sending.
 *
 * - Case is ignored.
 * - A plus tag is dropped (john+news@x.com → john@x.com). Gmail, Outlook,
 *   iCloud, Fastmail and most other providers deliver tagged addresses to
 *   the base mailbox.
 * - For consumer Gmail only, dots in the local part are ignored and
 *   googlemail.com is treated as gmail.com. Other providers treat
 *   john.doe and johndoe as different people, so their dots are kept.
 *
 * Returns '' for something that isn't an email address.
 */
export function emailRateLimitKey(email: string): string {
  const address = email.trim().toLowerCase()
  const at = address.lastIndexOf('@')
  if (at <= 0 || at === address.length - 1) return ''

  let local = address.slice(0, at)
  let domain = address.slice(at + 1)

  const plus = local.indexOf('+')
  if (plus > 0) local = local.slice(0, plus)

  if (GMAIL_DOMAINS.includes(domain)) {
    domain = 'gmail.com'
    local = local.replaceAll('.', '')
  }

  return `${local}@${domain}`
}

/** Every domain that can produce the same key as `key`'s domain. */
export function emailKeyDomains(key: string): string[] {
  const domain = key.slice(key.lastIndexOf('@') + 1)
  return domain === 'gmail.com' ? GMAIL_DOMAINS : [domain]
}
