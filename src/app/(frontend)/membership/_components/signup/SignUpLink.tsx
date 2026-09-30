import Button from '@/components/Button'
import { SignUpClosed } from '../errors/SignUpClosed'

export function SignUpLink({ url }: { url: string }) {
  if (!url) return <SignUpClosed />
  return (
    <Button
      href={url}
      target="_blank"
      rel="noreferrer"
      intent="primary"
      size="md"
      color="cream"
      className="font-unbounded text-xs uppercase"
    >
      Sign up!
    </Button>
  )
}
