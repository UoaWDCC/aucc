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
    <section className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="bg-abyss rounded-2xl p-4 shadow-xl">
        <div className="mb-3 text-center">
          <h2 className="text-lg font-extrabold tracking-widest text-white">
            MAP
          </h2>
          <p className="text-sm text-white">
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
