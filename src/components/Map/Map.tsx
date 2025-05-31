'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

type Coordinate = {
  latitude: number
  longitude: number
  label?: string
}

type MapProps = {
  coordinates: Coordinate[]
}

function FitBounds({ coordinates }: { coordinates: Coordinate[] }) {
  const map = useMap()
  useEffect(() => {
    const bounds = coordinates.map(
      (c) => [c.latitude, c.longitude] as [number, number],
    )
    map.fitBounds(bounds)
  }, [coordinates, map])

  return null
}

export default function Map({ coordinates }: MapProps) {
  const FallbackCenter = [
    coordinates[0].latitude,
    coordinates[0].longitude,
  ] as [number, number]

  return (
    <MapContainer
      center={FallbackCenter}
      zoom={1}
      scrollWheelZoom={true}
      className="h-[500px] w-[500px] rounded-xl border shadow"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds coordinates={coordinates} />
      {coordinates.map((coord) => (
        <Marker
          key={coord.label ?? `${coord.latitude}-${coord.longitude}`}
          position={[coord.latitude, coord.longitude]}
        >
          <Popup>{coord.label ?? `${coord.latitude}-${coord.longitude}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
