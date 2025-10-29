import { RestrictedHireCard } from './RestrictedHireCard'
import { RestrictedHireTitle } from './RestrictedHireTitle'

export function RestrictedHireSection() {
  return (
    <div className="bg-water h-full min-h-100 w-full">
      <RestrictedHireTitle />
      <div className="flex justify-center lg:px-20 lg:pb-40">
        <RestrictedHireCard />
      </div>
    </div>
  )
}
