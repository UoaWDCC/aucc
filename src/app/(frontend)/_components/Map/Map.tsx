'use client'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

type MapProps = {
  riverStart: [number, number]
  riverEnd: [number, number]
  zoom: number
}

export default function Map({ riverStart, riverEnd, zoom }: MapProps) {
  return (
    <MapContainer
      center={riverStart}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '500px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={riverStart}>
        <Popup>This is the start of the river.</Popup>
      </Marker>
      <Marker position={riverEnd}>
        <Popup>This is the end of the river.</Popup>
      </Marker>
    </MapContainer>
  )
}
