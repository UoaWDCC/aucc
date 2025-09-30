import Link from 'next/link'

import Button from '@/components/Button'

interface NotFoundComponentProps {
  title?: string
  subtitle?: string
  buttonText?: string
  href?: string
  buttonIntent?: 'primary' | 'outline' | 'secondary' | 'ghost'
  buttonColor?: 'cream' | 'abyss' | 'algae' | 'grass'
  buttonSize?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function NotFoundComponent({
  title = 'Page',
  subtitle,
  buttonText = 'Return to Home',
  href = '/',
  buttonIntent = 'outline',
  buttonColor = 'algae',
  buttonSize = 'lg',
  className = '',
}: NotFoundComponentProps) {
  return (
    <div
      className={`flex h-screen w-full flex-col items-center justify-center gap-15 ${className}`}
    >
      <div className="bg-cream/5 flex flex-col items-center gap-15 rounded-lg px-[10vw] py-[15vh]">
        <div className="text-cream font-heading text-center text-8xl">
          {title} Not
          <br /> Found!
        </div>
        {subtitle && (
          <p className="text-cream/85 text-center text-xl">{subtitle}</p>
        )}
        <Button
          href={href}
          intent={buttonIntent}
          color={buttonColor}
          size={buttonSize}
          className="hover:bg-cream/5"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
