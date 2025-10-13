"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface MapboxLocationProps {
  className?: string
}

export function MapboxLocation({ className = "" }: MapboxLocationProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    const initializeMap = () => {
      if (typeof window !== "undefined" && window.L && mapContainer.current) {
        const L = window.L

        if (map.current) return // Initialize map only once

        try {
          // Initialize Leaflet map
          map.current = L.map(mapContainer.current, {
            center: [-6.5944, 106.7886], // Bogor, Indonesia coordinates (lat, lng for Leaflet)
            zoom: 12,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true,
            touchZoom: true,
            boxZoom: true,
            keyboard: true,
          })

          // Try multiple tile servers as fallback
          const tileServers = [
            {
              url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              attribution: '© OpenStreetMap contributors'
            },
            {
              url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
              attribution: '© OpenStreetMap contributors © CARTO'
            },
            {
              url: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
              attribution: '© OpenStreetMap contributors © Stadia Maps'
            }
          ]

          // Try to load the first tile server
          let tileLayer = L.tileLayer(tileServers[0].url, {
            attribution: tileServers[0].attribution,
            maxZoom: 19,
            crossOrigin: true
          })

          tileLayer.on('tileerror', () => {
            console.log('Primary tile server failed, trying fallback...')
            // If first fails, try second
            tileLayer.remove()
            tileLayer = L.tileLayer(tileServers[1].url, {
              attribution: tileServers[1].attribution,
              maxZoom: 19,
              crossOrigin: true
            }).addTo(map.current)
          })

          tileLayer.addTo(map.current)

          // Create custom purple marker
          const purpleIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 30px; 
                height: 30px; 
                background: #a855f7; 
                border: 3px solid white; 
                border-radius: 50%; 
                box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
                animation: pulse 2s infinite;
              "></div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })

          // Add marker for Bogor location
          L.marker([-6.5944, 106.7886], { icon: purpleIcon })
            .addTo(map.current)
            .bindPopup(`
              <div style="color: white; background: rgba(0,0,0,0.9); padding: 8px; border-radius: 6px;">
                <strong>Bogor, Indonesia</strong><br>
                West Java Province<br>
                <small>6°35'44"S 106°47'19"E</small>
              </div>
            `)

        } catch (error) {
          console.error('Error initializing map:', error)
        }
      }
    }

    // Try to initialize immediately
    initializeMap()

    // If Leaflet is not loaded yet, wait for it
    const checkLeaflet = setInterval(() => {
      if (window.L && !map.current) {
        initializeMap()
        clearInterval(checkLeaflet)
      }
    }, 100)

    // Clean up after 10 seconds
    setTimeout(() => clearInterval(checkLeaflet), 10000)

    return () => {
      clearInterval(checkLeaflet)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Fallback component if Leaflet is not available
  const FallbackMap = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl overflow-hidden border border-zinc-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <MapPin className="h-12 w-12 text-purple-400 mx-auto animate-pulse" />
            <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Bogor, Indonesia</h3>
            <p className="text-sm text-zinc-400">West Java Province</p>
            <p className="text-xs text-zinc-500 mt-2">6°35'44"S 106°47'19"E</p>
          </div>
        </div>
      </div>
      
      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 border border-purple-500/30 rounded-full animate-ping"></div>
        <div className="absolute inset-4 border border-pink-500/20 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute inset-8 border border-purple-400/10 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    </div>
  )

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75"></div>
      <div className="relative">
        <div
          ref={mapContainer}
          className="w-full rounded-xl overflow-hidden border border-zinc-700/50"
          style={{ height: "400px", minHeight: "400px" }}
        />
        {/* Show fallback if map fails to load */}
        {typeof window !== "undefined" && !window.L && (
          <div className="absolute inset-0">
            <FallbackMap />
          </div>
        )}
      </div>
      
      {/* Location overlay */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700/50">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-purple-400" />
          <div>
            <div className="text-sm font-medium text-white">Bogor, Indonesia</div>
            <div className="text-xs text-zinc-400">Based in West Java</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    L: any
  }
}
