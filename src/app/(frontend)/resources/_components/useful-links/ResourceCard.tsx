import Button from '@/components/Button'
import { cn } from '@/lib/utils/cn'

export type ResourceLink = {
  label: string
  href: string
}

interface ResourceCardProps {
  title: string
  description?: string
  links: ResourceLink[]
  inline?: boolean
  className?: string
}

export function ResourceCard({
  title,
  description,
  links,
  inline = false,
  className,
}: ResourceCardProps) {
  return (
    <div
      className={cn(
        'bg-cream flex flex-col p-8 md:p-10',
        inline && 'items-center text-center',
        className,
      )}
    >
      <h3 className="text-algae font-heading text-base md:text-lg">{title}</h3>
      {description && (
        <p className="font-body text-abyss mt-4 text-sm leading-relaxed italic">
          {description}
        </p>
      )}
      <div
        className={cn(
          'mt-6 flex gap-3',
          inline ? 'flex-wrap justify-center' : 'flex-col items-start',
        )}
      >
        {links.map((link, i) => (
          <Button
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            color="algae"
            size="sm"
            className={cn(
              'font-unbounded px-4 text-[10px]',
              i === 0 && links.length > 1 && 'bg-algae text-cream',
            )}
          >
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
