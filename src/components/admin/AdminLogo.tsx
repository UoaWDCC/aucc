import { Logo } from '@/assets/Logo'

/** Shown on the admin login screen in place of the Payload logo. */
export function AdminLogo() {
  return (
    <div className="aucc-admin-logo">
      <div className="aucc-admin-logo__mark">
        <Logo color="currentColor" />
      </div>
      <p className="aucc-admin-logo__title">AUCC website admin</p>
      <p className="aucc-admin-logo__subtitle">
        Sign in to update the club website.
      </p>
    </div>
  )
}
