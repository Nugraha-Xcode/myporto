"use client"

import { useRef } from "react"
import { MapProvider } from "./map-provider"
import { MapPin } from "lucide-react"

export function LocationMap({ className = "" }: { className?: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Koordinat Bogor, Indonesia
  const bogorCoordinates = {
    longitude: 106.7886,
    latitude: -6.5944,
    zoom: 11,
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75"></div>
      <div className="relative">
        <div
          ref={mapContainerRef}
          className="w-full rounded-xl overflow-hidden border border-zinc-700/50"
          style={{ height: "400px", minHeight: "400px" }}
        />
        <MapProvider mapContainerRef={mapContainerRef} initialViewState={bogorCoordinates}>
          {/* Marker akan ditambahkan oleh Mapbox otomatis */}
        </MapProvider>

        {/* Location overlay */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700/50">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-400" />
            <div>
              <div className="text-sm font-medium text-white">Bogor, West Java</div>
              <div className="text-xs text-zinc-400">Indonesia • 6°35'S 106°47'E</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
