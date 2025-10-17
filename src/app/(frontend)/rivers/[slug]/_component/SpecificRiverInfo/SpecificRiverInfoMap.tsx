'use client'

import { MapComponent } from '@/components/Map/MapWrapper'
import { RiverDTO } from '@/queries/rivers'

type Coord = { latitude: number; longitude: number; label?: string }

export function SpecificRiverInfoMap({ river }: { river: RiverDTO }) {
  const coords: Coord[] = []

  if (river?.putIn?.latitude && river?.putIn?.longitude) {
    coords.push({
      latitude: river.putIn.latitude,
      longitude: river.putIn.longitude,
      label: `${river.name} — Put-in`,
    })
  }

  if (river?.takeOut?.latitude && river?.takeOut?.longitude) {
    coords.push({
      latitude: river.takeOut.latitude,
      longitude: river.takeOut.longitude,
      label: `${river.name} — Take-out`,
    })
  }

  if (!coords.length) return null

  return (
    <section className="mx-auto max-w-4xl -translate-x-[20%] py-24">
      <div className="bg-abyss rounded-xl px-16 pt-8 pb-12 shadow-xl">
        <div className="mb-3 text-center">
          <h2 className="text-cream text-2xl font-extrabold">MAP</h2>
          <p className="text-water text-sm italic">
            Explore river locations on the map.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl">
          <MapComponent coordinates={coords} className="h-[420px] w-full" />
        </div>
      </div>
    </section>
  )
}
