import { LongTermRequestFormButton } from './LongTermRequestFormButton'
import { ShortTermRequestFormButton } from './ShortTermRequestFormButton'

export function ClubGearHire() {
  return (
    <div className="bg-cream h-full w-full">
      <div className="p-8 lg:p-20">
        <h1 className="font-heading text-grass text-2xl">
          Club gear for general hire
        </h1>

        <ul className="text-abyss front-body leading-6 italic">
          <li>4 - Dagger Axioms (1 x Small, 2 x Medium, 1 x Large)</li>
          <ul className="pl-2">
            <li>4 - Dagger Mambas (2 x Small, 2 x Medium)</li>
            <li>2 - Dagger Phantoms</li>
            <li>2 - Liquidlogic Remixes (1 x Small, 1 x Medium)</li>
            <li>1 - Liquidlogic Stomper</li>
            <li>1 - Liquidlogic Braaap 69</li>
            <li>1 - Liquidlogic Freeride</li>
            <li>2 - Pyranha Burns (1 x Small BII, 1 x Medium BIII)</li>
            <li>2 - Pyranha Z-Ones (1 x Small, 1 x Medium)</li>
          </ul>
          <li>17 - Bliss-Stick Mystics & Mini-Mystics</li>
          <ul className="pl-2">
            <li>2 - Bliss-Stick Freestylers</li>
            <li>2 - Topo Duos</li>
            <li>1 - Jackson Dynamic Duo</li>
          </ul>
          <li>12 - Assorted older and/or novelty kayaks</li>
        </ul>

        <p className="text-body mt-4 text-sm italic">
          Plus paddles, personal flotation devices (PFDs), lifejackets, helmets,
          sprayskirts, safety equipment, and other goodies.
        </p>
      </div>
      <div className="flex flex-row gap-10 p-8 pt-10 max-[361px]:gap-6 max-[361px]:px-3 lg:p-20">
        <ShortTermRequestFormButton />
        <LongTermRequestFormButton />
      </div>
    </div>
  )
}
