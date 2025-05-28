import { WelcomeContent } from './WelcomeContent'
import { WelcomeSectionBackground } from './WelcomeSectionBackground'

export default function WelcomeSection() {
  return (
    <div className="relative">
      <WelcomeSectionBackground />
      <div className="z-2">
        <WelcomeContent />
      </div>
    </div>
  )
}
