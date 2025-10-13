"use client"

import L from "leaflet"
import { useEffect, useRef } from "react"
import { useMap } from "@/context/map-context"

type MapMarkerProps = {
  longitude: number
  latitude: number
  color?: string
  children?: React.ReactNode
}

export function MapMarker({ longitude, latitude, color = "#a855f7", children }: MapMarkerProps) {
  const { map } = useMap()
  const markerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const markerEl = markerRef.current
    if (!map || !markerEl) return

    const icon = L.divIcon({
      className: "custom-marker",
      html: markerEl.innerHTML,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    const marker = L.marker([latitude, longitude], { icon }).addTo(map)

    return () => {
      marker.remove()
    }
  }, [map, longitude, latitude, color])

  return <div ref={markerRef}>{children}</div>
}
