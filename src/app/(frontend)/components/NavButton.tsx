import Link from 'next/link'

type NavButtonProps = {
  children: React.ReactNode
  route: string
}

export default function NavButton({ children, route }: NavButtonProps) {
  return (
    <Link href={route} className="border-2 border-black">
      {children}
    </Link>
  )
}
