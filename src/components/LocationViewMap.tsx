'use client'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import Box from '@mui/material/Box'

import 'leaflet/dist/leaflet.css'

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface LocationViewMapProps {
  latitude: string
  longitude: string
  height?: number
}

export default function LocationViewMap({ latitude, longitude, height = 280 }: LocationViewMapProps) {
  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)

  if (isNaN(lat) || isNaN(lng)) return null

  return (
    <Box
      sx={{
        height,
        borderRadius: 1,
        overflow: 'hidden',
        '& .leaflet-container': { height: '100%', width: '100%', zIndex: 1 }
      }}
    >
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png?lang=en'
        />
        <Marker position={[lat, lng]} icon={markerIcon} />
      </MapContainer>
    </Box>
  )
}
