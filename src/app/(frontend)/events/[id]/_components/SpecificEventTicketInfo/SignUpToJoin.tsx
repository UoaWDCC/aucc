import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/** Club membership sign-up. The /membership page links to the current form. */
export function SignUpToJoin() {
  return (
    <Link
      href="/membership"
      className="text-cream font-unbounded flex items-center gap-1 text-left text-sm"
    >
      SIGN UP TO JOIN
      <ArrowRight aria-hidden="true" />
    </Link>
  )
}
