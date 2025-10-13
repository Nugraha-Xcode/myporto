"use client"

import { useState } from "react"
import { MapPin, Navigation, Plus, Minus } from "lucide-react"

interface SimpleLocationMapProps {
  className?: string
}

export function SimpleLocationMap({ className = "" }: SimpleLocationMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75"></div>
      <div className="relative">
        <div 
          className="w-full rounded-xl overflow-hidden border border-zinc-700/50 bg-gradient-to-br from-emerald-50 via-green-100 to-blue-100 cursor-grab active:cursor-grabbing"
          style={{ height: "400px", minHeight: "400px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Indonesia Map Background */}
          <div 
            className="relative w-full h-full transition-transform duration-200"
            style={{ 
              transform: `scale(${zoomLevel}) translate(${mapPosition.x / zoomLevel}px, ${mapPosition.y / zoomLevel}px)`
            }}
          >
            {/* Java Island Shape (Realistic) */}
            <div className="absolute bottom-1/3 left-1/4 w-1/2 h-20 bg-green-200/80 transform" 
                 style={{ 
                   clipPath: 'polygon(0% 60%, 15% 40%, 40% 45%, 65% 35%, 85% 50%, 100% 45%, 95% 70%, 80% 85%, 60% 80%, 40% 75%, 20% 80%, 5% 75%)'
                 }}>
            </div>
            
            {/* Sumatra Island (Northwest) */}
            <div className="absolute top-1/4 left-12 w-16 h-40 bg-green-300/70 transform rotate-12" 
                 style={{ 
                   clipPath: 'polygon(20% 0%, 80% 5%, 90% 25%, 85% 50%, 90% 75%, 80% 95%, 60% 100%, 40% 95%, 30% 80%, 25% 60%, 15% 40%, 10% 20%)'
                 }}>
            </div>
            
            {/* Kalimantan Island (North) */}
            <div className="absolute top-16 left-1/3 w-40 h-32 bg-green-200/70 transform" 
                 style={{ 
                   clipPath: 'polygon(10% 20%, 30% 0%, 60% 5%, 85% 15%, 95% 40%, 90% 65%, 80% 85%, 60% 95%, 40% 90%, 20% 80%, 5% 60%, 0% 40%)'
                 }}>
            </div>
            
            {/* Sulawesi Island (Northeast) */}
            <div className="absolute top-1/4 right-20 w-20 h-32 bg-green-300/70 transform rotate-15" 
                 style={{ 
                   clipPath: 'polygon(40% 0%, 60% 10%, 70% 30%, 80% 50%, 85% 70%, 75% 85%, 60% 95%, 45% 90%, 35% 75%, 30% 55%, 25% 35%, 35% 15%)'
                 }}>
            </div>

            {/* Java Sea (North of Java) */}
            <div className="absolute top-1/3 left-1/4 w-1/2 h-24 bg-blue-200/60 rounded-full"></div>
            
            {/* Indian Ocean (South of Java) */}
            <div className="absolute bottom-4 left-0 right-0 h-20 bg-blue-300/50 rounded-t-full"></div>

            {/* Strait of Malacca */}
            <div className="absolute top-1/4 left-8 w-8 h-32 bg-blue-200/50 rounded-full transform rotate-12"></div>

            {/* West Java Province Highlight */}
            <div className="absolute bottom-1/3 left-1/4 w-32 h-16 bg-yellow-200/60 rounded-lg border-2 border-yellow-400/50 transform translate-y-2"></div>

            {/* Major Cities with Correct Positions */}
            {/* Jakarta (Northwest coast of Java) */}
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full transform -translate-y-2">
              <div className="absolute -top-6 -left-6 text-xs font-medium text-gray-700 whitespace-nowrap bg-white/80 px-1 rounded">Jakarta</div>
            </div>
            
            {/* Bogor (South of Jakarta, inland) */}
            <div className="absolute bottom-1/4 left-1/3 transform translate-x-6 translate-y-4">
              <div className="relative">
                {/* Pulsing rings */}
                <div className="absolute -inset-6 border-2 border-purple-400/40 rounded-full animate-ping"></div>
                <div className="absolute -inset-4 border-2 border-purple-400/30 rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute -inset-2 border-2 border-purple-400/20 rounded-full animate-ping animation-delay-2000"></div>
                
                {/* Main marker */}
                <div className="relative w-7 h-7 bg-purple-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -top-8 -left-8 text-xs font-bold text-purple-700 whitespace-nowrap bg-white/90 px-2 py-1 rounded">BOGOR</div>
              </div>
            </div>

            {/* Bandung (Southeast of Jakarta) */}
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform translate-y-6">
              <div className="absolute -top-6 -left-8 text-xs font-medium text-gray-700 whitespace-nowrap bg-white/80 px-1 rounded">Bandung</div>
            </div>

            {/* Semarang (Central Java) */}
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-green-600 rounded-full transform translate-x-8">
              <div className="absolute -top-6 -left-8 text-xs font-medium text-gray-700 whitespace-nowrap bg-white/80 px-1 rounded">Semarang</div>
            </div>

            {/* Surabaya (East Java) */}
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-orange-500 rounded-full">
              <div className="absolute -top-6 -left-8 text-xs font-medium text-gray-700 whitespace-nowrap bg-white/80 px-1 rounded">Surabaya</div>
            </div>

            {/* Mountains (South of Bogor - Puncak area) */}
            <div className="absolute bottom-1/6 left-2/5 w-12 h-8 bg-green-500/70 rounded-full transform"></div>
            <div className="absolute bottom-1/5 left-1/2 w-8 h-6 bg-green-600/70 rounded-full transform -translate-x-2"></div>
            <div className="absolute bottom-1/8 left-2/5 w-6 h-4 bg-green-700/60 rounded-full transform translate-x-4"></div>
            
            {/* Roads connecting cities */}
            {/* Jakarta-Bogor toll road */}
            <div className="absolute bottom-1/4 left-1/3 w-16 h-1 bg-yellow-500/80 transform translate-y-1 rotate-12"></div>
            {/* Jakarta-Bandung road */}
            <div className="absolute bottom-1/4 left-1/3 w-24 h-0.5 bg-gray-500/70 transform translate-y-8 rotate-25"></div>
            {/* Trans Java highway */}
            <div className="absolute bottom-1/4 left-1/4 w-1/2 h-0.5 bg-red-400/60 transform translate-y-2"></div>

            {/* Compass */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full border border-gray-300 flex items-center justify-center shadow-lg">
              <Navigation className="h-5 w-5 text-gray-600" />
            </div>

            {/* Scale indicator */}
            <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 border border-gray-300">
              {Math.round(50 / zoomLevel)} km
            </div>
          </div>
        </div>
        
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

        {/* Interactive zoom controls */}
        <div className="absolute top-4 left-4 space-y-1">
          <button 
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white/90 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-purple-100 transition-colors shadow-lg"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white/90 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-purple-100 transition-colors shadow-lg"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom level indicator */}
        <div className="absolute top-4 left-16 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 border border-gray-300">
          Zoom: {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  )
}
