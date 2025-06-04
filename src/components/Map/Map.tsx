'use client'

import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import { cn } from '@/lib/utils/cn'

type Coordinate = {
  latitude: number
  longitude: number
  label?: string
}

type MapProps = {
  coordinates: Coordinate[]
  className?: string
}

export default function Map({ coordinates, className }: MapProps) {
  const FallbackCenter = [
    coordinates[0].latitude,
    coordinates[0].longitude,
  ] as [number, number]

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

  return (
    <MapContainer
      center={FallbackCenter}
      zoom={1}
      scrollWheelZoom={true}
      className={cn('h-[500px] w-[500px]', className)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds coordinates={coordinates} />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.latitude, coord.longitude]}>
          {coord.label && <Popup>{coord.label}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  )
}
