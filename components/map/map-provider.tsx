"use client"

import React, { useEffect, useRef, useState } from "react"
import { MapContext } from "@/context/map-context"
import "leaflet/dist/leaflet.css"

// Dynamic import to avoid SSR issues
let L: any = null

type MapProviderProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>
  initialViewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  children?: React.ReactNode
}

export function MapProvider({
  mapContainerRef,
  initialViewState,
  children,
}: MapProviderProps) {
  const map = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return

    // Dynamic import Leaflet (client-side only)
    const initMap = async () => {
      try {
        // Import Leaflet dynamically
        const leaflet = await import("leaflet")
        L = leaflet.default

        // Fix for default marker icon in Leaflet with Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        // Initialize Leaflet map
        map.current = L.map(mapContainerRef.current!, {
          center: [initialViewState.latitude, initialViewState.longitude],
          zoom: initialViewState.zoom,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
        })

        // Try multiple tile servers (with fallback)
        const tileServers = [
          {
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
            name: "CartoDB Voyager"
          },
          {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            attribution: '© <a href="https://www.esri.com/">Esri</a>',
            name: "ESRI World Street"
          },
          {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            name: "OpenStreetMap"
          },
        ]

        let tileLayer: any
        let serverIndex = 0

        const loadTileServer = () => {
          if (serverIndex >= tileServers.length) {
            console.error("All tile servers failed to load")
            return
          }

          const server = tileServers[serverIndex]
          console.log(`Loading tile server: ${server.name}`)

          tileLayer = L.tileLayer(server.url, {
            attribution: server.attribution,
            maxZoom: 19,
          })

          tileLayer.on("tileerror", () => {
            console.warn(`Tile server failed: ${server.name}, trying next...`)
            tileLayer.remove()
            serverIndex++
            loadTileServer()
          })

          tileLayer.addTo(map.current)
        }

        loadTileServer()

        // Create custom purple marker
        const purpleIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="
              position: relative;
              width: 30px;
              height: 30px;
            ">
              <div style="
                position: absolute;
                width: 30px;
                height: 30px;
                background: #a855f7;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
                animation: pulse 2s infinite;
              "></div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })

        // Add marker
        L.marker([initialViewState.latitude, initialViewState.longitude], {
          icon: purpleIcon,
        })
          .addTo(map.current)
          .bindPopup(`
            <div style="color: #333; padding: 8px;">
              <strong>Bogor, Indonesia</strong><br>
              West Java Province<br>
              <small>6°35'44"S 106°47'19"E</small>
            </div>
          `)

        // Map is ready
        setLoaded(true)
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    initMap()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [initialViewState, mapContainerRef])

  return (
    <MapContext.Provider value={{ map: map.current }}>
      {children}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-[1000] rounded-xl">
          <div className="text-lg font-medium text-white">Loading map...</div>
        </div>
      )}
    </MapContext.Provider>
  )
}
