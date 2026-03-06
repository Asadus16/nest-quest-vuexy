'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import 'leaflet/dist/leaflet.css'

type LatLng = { lat: number; lng: number }

type SearchResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

export interface LocationPickerMapProps {
  latitude: string
  longitude: string
  onLocationChange: (lat: string, lng: string) => void
}

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const DEFAULT_CENTER: LatLng = { lat: 25.2048, lng: 55.2708 } // Dubai

// Inner component to handle map click events & fly-to
function MapController({ position, onMapClick }: { position: LatLng; onMapClick: (lat: number, lng: number) => void }) {
  const map = useMap()

  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng)
    }
  })

  useEffect(() => {
    map.flyTo(position, map.getZoom() < 14 ? 14 : map.getZoom(), { duration: 1 })
  }, [position.lat, position.lng]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default function LocationPickerMap({ latitude, longitude, onLocationChange }: LocationPickerMapProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const position: LatLng = {
    lat: latitude ? parseFloat(latitude) : DEFAULT_CENTER.lat,
    lng: longitude ? parseFloat(longitude) : DEFAULT_CENTER.lng
  }

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      onLocationChange(lat.toFixed(6), lng.toFixed(6))
    },
    [onLocationChange]
  )

  const searchLocation = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSearchResults([])

      return
    }

    setSearching(true)

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      )

      const data: SearchResult[] = await res.json()

      setSearchResults(data)
      setShowResults(true)
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    searchTimeoutRef.current = setTimeout(() => searchLocation(value), 400)
  }

  const handleSelectResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)

    onLocationChange(lat.toFixed(6), lng.toFixed(6))
    setSearchQuery(result.display_name.split(',').slice(0, 2).join(','))
    setShowResults(false)
    setSearchResults([])
  }

  // Close results dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Search bar */}
      <Box sx={{ position: 'relative', mb: 2 }} ref={resultsRef}>
        <TextField
          fullWidth
          size='small'
          placeholder='Search for a location...'
          value={searchQuery}
          onChange={e => handleSearchChange(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <i className='tabler-search text-lg' />
                </InputAdornment>
              ),
              endAdornment: searching ? (
                <InputAdornment position='end'>
                  <CircularProgress size={18} />
                </InputAdornment>
              ) : searchQuery ? (
                <InputAdornment position='end'>
                  <IconButton
                    size='small'
                    onClick={() => {
                      setSearchQuery('')
                      setSearchResults([])
                      setShowResults(false)
                    }}
                  >
                    <i className='tabler-x text-lg' />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          }}
        />

        {/* Search results dropdown */}
        {showResults && searchResults.length > 0 && (
          <Paper
            elevation={8}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              maxHeight: 240,
              overflow: 'auto',
              mt: 0.5,
              borderRadius: 1
            }}
          >
            <List dense disablePadding>
              {searchResults.map(result => (
                <ListItemButton key={result.place_id} onClick={() => handleSelectResult(result)}>
                  <ListItemText
                    primary={result.display_name.split(',').slice(0, 2).join(',')}
                    secondary={result.display_name.split(',').slice(2, 5).join(',')}
                    slotProps={{
                      primary: { noWrap: true, variant: 'body2' },
                      secondary: { noWrap: true, variant: 'caption' }
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Map */}
      <Box
        sx={{
          height: 350,
          borderRadius: 1,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          '& .leaflet-container': { height: '100%', width: '100%', zIndex: 1 }
        }}
      >
        <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png?lang=en'
          />
          <Marker position={[position.lat, position.lng]} icon={markerIcon} />
          <MapController position={position} onMapClick={handleMapClick} />
        </MapContainer>
      </Box>

      {/* Coordinates display */}
      {latitude && longitude && (
        <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
          <Typography variant='caption' color='text.secondary'>
            Lat: {latitude}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Lng: {longitude}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
