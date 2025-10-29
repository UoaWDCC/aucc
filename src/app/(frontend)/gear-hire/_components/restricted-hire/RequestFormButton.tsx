import Button from '@/components/Button'

export function RequestFormButton() {
  return (
    <div className="w-40 py-10">
      <Button
        href="mailto:gear@aucc.org.nz"
        intent="outline"
        size="md"
        target="_blank"
        color="cream"
        className="text-grass border-grass"
      >
        REQUEST FORM
      </Button>
    </div>
  )
}
