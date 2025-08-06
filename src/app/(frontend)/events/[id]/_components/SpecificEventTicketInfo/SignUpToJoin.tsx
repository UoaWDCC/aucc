import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SignUpToJoin() {
  return (
    <Link href="https://form.jotform.com/250418674375867?fbclid=PAZXh0bgNhZW0CMTEAAaeWIjTTV9xmRZdfLddy8HFmM9hUlfwNq9s9cwQ25cArwsCTzYgQgbH-2bx3Pw_aem_0HuEKOXK5sj-2w6iUQDzWA">
      <button className="text-cream border-cream font-unbounded text-md flex cursor-pointer items-center text-left text-sm">
        SIGN UP TO JOIN
        <ArrowRight />
      </button>
    </Link>
  )
}
