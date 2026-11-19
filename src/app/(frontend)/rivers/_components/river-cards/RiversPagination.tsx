import Button from '@/components/Button'

export function riversPageHref(page: number) {
  return page <= 1 ? '/rivers' : `/rivers?page=${page}`
}

type RiversPaginationProps = {
  page: number
  totalPages: number
}

export function RiversPagination({ page, totalPages }: RiversPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Rivers pages"
      className="text-abyss flex w-full max-w-[400px] items-center justify-between gap-4 md:max-w-5xl"
    >
      {page > 1 ? (
        <Button
          href={riversPageHref(page - 1)}
          intent="secondary"
          color="abyss"
          rel="prev"
        >
          Previous
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}

      <p className="font-unbounded text-sm" aria-current="page">
        Page {page} of {totalPages}
      </p>

      {page < totalPages ? (
        <Button
          href={riversPageHref(page + 1)}
          intent="secondary"
          color="abyss"
          rel="next"
        >
          Next
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  )
}
