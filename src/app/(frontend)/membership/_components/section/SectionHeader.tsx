import { cn } from '@/lib/utils/cn'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  children?: React.ReactNode
  eyebrowClassName?: string
  titleClassName?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  eyebrowClassName,
  titleClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-2xl flex-col items-center text-center',
        className,
      )}
    >
      <p
        className={cn(
          'font-[family-name:var(--font-caveat-brush)] text-lg md:text-2xl',
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-heading text-2xl uppercase [word-spacing:0.2em] md:text-5xl',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children ? (
        <p className="font-body mt-2 text-sm leading-6 italic md:mt-3 md:text-base">
          {children}
        </p>
      ) : null}
    </div>
  )
}
