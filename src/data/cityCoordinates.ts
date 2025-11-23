// City coordinates from Simplemaps mapdata
// Converted from lat/lng to SVG percentage coordinates
// Based on Simplemaps SVG viewBox="0 0 1200 1200"

export interface CityLocation {
  lat: number
  lng: number
  name: string
  x?: number // Manual override: percent from left
  y?: number // Manual override: percent from top
}

export const cityLocations: Record<string, CityLocation> = {
  'Oslo': {
    name: 'Oslo',
    lat: 59.916667,
    lng: 10.75,
    x: 28,
    y: 84
  },
  'Stavanger': {
    name: 'Stavanger',
    lat: 58.971,
    lng: 5.731,
    x: 13,
    y: 90
  },
  'Trondheim': {
    name: 'Trondheim',
    lat: 63.431,
    lng: 10.392,
    x: 27,
    y: 61
  },
  'Bergen': {
    name: 'Bergen',
    lat: 60.391,
    lng: 5.333,
    x: 11.5,
    y: 81
  },
  'Tromsø': {
    name: 'Tromsø',
    lat: 69.6498,
    lng: 18.9841,
    x: 53.5,
    y: 13
  }
}

// Norway bounding box for coordinate conversion
const NORWAY_BOUNDS = {
  minLat: 57.9,  // South
  maxLat: 71.2,  // North
  minLng: 4.5,   // West
  maxLng: 31.3   // East
}

// Convert lat/lng to SVG percentage coordinates
// SVG viewBox="0 0 1200 1200" (intrinsic size)
// Rendered size: 1000x500px
// Container: 100% width × 500px height
// With object-fit: contain, SVG scales to fit height (500px)
// So SVG displays at 500x500px centered horizontally in container
export function latLngToSvgPercent(lat: number, lng: number): { left: number; top: number } {
  const latRange = NORWAY_BOUNDS.maxLat - NORWAY_BOUNDS.minLat
  const lngRange = NORWAY_BOUNDS.maxLng - NORWAY_BOUNDS.minLng

  // Normalize coordinates to 0-1 range
  const normalizedLng = (lng - NORWAY_BOUNDS.minLng) / lngRange
  const normalizedLat = (lat - NORWAY_BOUNDS.minLat) / latRange

  // Convert to SVG viewBox coordinates (0-1200 range)
  // X-axis (longitude): west (low lng) = left, east (high lng) = right
  const svgX = normalizedLng * 1200

  // Y-axis (latitude): south (low lat) = bottom, north (high lat) = top (inverted in SVG)
  // Since SVG Y=0 is at top, we invert: 1 - normalizedLat
  const svgY = (1 - normalizedLat) * 1200

  // With object-fit: contain in 100%×500px container:
  // SVG (1200x1200 viewBox) scales to 500px (fits height)
  // So SVG displays at 500x500px, centered horizontally
  // Container width varies, but SVG uses middle portion

  // Convert SVG coordinates (0-1200) to percentage of container
  // SVG spans middle portion of container width, full height
  const svgDisplayWidthPercent = 50  // SVG takes ~50% of container (500px out of ~1000px)
  const svgOffsetPercent = 25  // SVG starts at ~25% from left (centered)

  // Map SVG X (0-1200) to container percentage
  const leftPercent = svgOffsetPercent + ((svgX / 1200) * svgDisplayWidthPercent)

  // Map SVG Y (0-1200) to container percentage (full height)
  const topPercent = (svgY / 1200) * 100

  return { left: leftPercent, top: topPercent }
}

