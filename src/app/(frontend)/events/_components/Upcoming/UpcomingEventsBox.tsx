// src/app/(frontend)/events/_components/Upcoming/UpcomingEventsBox.tsx
import { getEventsPetrolCosts } from '@/queries/eventsglobal'

// lexial rich test renderer
function renderLexical(node: any, key = 'n0'): any {
  if (!node) return null
  const k = (i: number) => `${key}-${i}`
  const children = (n: any) =>
    Array.isArray(n?.children)
      ? n.children.map((c: any, i: number) => renderLexical(c, k(i)))
      : null

  switch (node.type) {
    case 'root':
      return <>{children(node)}</>

    case 'paragraph':
      return (
        <p key={key} className="mb-3">
          {children(node)}
        </p>
      )

    case 'list': {
      const isOrdered =
        node.listType === 'number' || node.listType === 'ordered'
      const Cmp: any = isOrdered ? 'ol' : 'ul'
      return (
        <Cmp key={key} className="list-disc space-y-3 pl-5">
          {children(node)}
        </Cmp>
      )
    }

    case 'listitem':
    case 'list-item':
      return <li key={key}>{children(node)}</li>

    case 'linebreak':
      return <br key={key} />

    case 'link': {
      const href = node.url ?? node.fields?.url ?? '#'
      return (
        <a
          key={key}
          href={href}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {children(node)}
        </a>
      )
    }

    case 'text':
      return <span key={key}>{node.text ?? ''}</span>

    default:
      return children(node)
  }
}

export async function UpcomingEventsBox() {
  const petrol = await getEventsPetrolCosts()

  return (
    <div className="mx-auto w-full max-w-[320px] rounded-lg border border-[#9AA687] bg-transparent p-6 text-left md:mx-0 md:mt-2">
      <h3 className="font-heading text-grass mb-4 text-center text-lg tracking-tighter">
        PETROL COSTS
      </h3>

      {petrol ? (
        <div className="font-body text-grass text-sm italic">
          {renderLexical(petrol.root ?? petrol)}
        </div>
      ) : (
        // Fallback
        <ul className="font-body text-grass list-disc space-y-3 pl-5 text-sm italic">
          <li>
            We rely on carpooling to get our members to and from event trip
            locations. Passengers will have to pay a contribution to petrol for
            the driver.
          </li>
          <li>
            The club policy is for passengers to contribute 2 parts passenger
            cost to 1 part driver cost (passenger : driver).
          </li>
          <li>
            eg. for a car with 3 passengers, 1 driver, and a $140 total petrol
            cost; the passengers each pay $40 and the driver pays $20. Ratio
            2:2:2:1, (passenger 40 : passenger 40 : passenger 40 : driver 20)
          </li>
        </ul>
      )}
    </div>
  )
}
