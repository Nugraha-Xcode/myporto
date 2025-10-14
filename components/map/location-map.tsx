"use client"

import { useRef, useState, useEffect } from "react"
import { MapProvider } from "./map-provider"
import { MapPin, Navigation, Locate, Route } from "lucide-react"
import { Button } from "@/components/ui/button"

const mapStyles = `
  .user-location-marker {
    z-index: 1000 !important;
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .leaflet-routing-container {
    display: none !important;
  }
`

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function LocationMap({ className = "" }: { className?: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [isTrackingDistance, setIsTrackingDistance] = useState(false)
  const [mapKey, setMapKey] = useState(0)
  
  const bogorCoordinates = {
    longitude: 106.7886,
    latitude: -6.5944,
    zoom: 11,
  }

  // Remove auto location request for better user privacy

  const getUserLocation = (showError: boolean = true) => {
    if (!navigator.geolocation) {
      if (showError) setLocationError("Geolocation not supported by your browser")
      return
    }
    
    setIsGettingLocation(true)
    setLocationError(null)
    
    const isSecureContext = window.location.protocol === 'https:' || 
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1'
    
    if (!isSecureContext) {
      if (showError) setLocationError("Geolocation requires HTTPS. Please use a secure connection.")
      setIsGettingLocation(false)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude
        setUserLocation({ lat: userLat, lng: userLng })
        
        const dist = calculateDistance(
          userLat,
          userLng,
          bogorCoordinates.latitude,
          bogorCoordinates.longitude
        )
        setDistance(dist)
        setIsGettingLocation(false)
      },
      (error) => {
        if (!showError) {
          setIsGettingLocation(false)
          return
        }
        
        let errorMessage = "Unable to get your location"
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location access and try again."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable. Check your GPS/location services."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again."
            break
        }
        
        setLocationError(errorMessage)
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000
      }
    )
  }


  const startTracking = () => {
    // Stop tracking if already active
    if (isTrackingDistance) {
      setIsTrackingDistance(false)
      return
    }

    // Get user location if not available
    if (!userLocation) {
      setIsGettingLocation(true)
      setLocationError(null)
      
      const isSecureContext = window.location.protocol === 'https:' || 
                             window.location.hostname === 'localhost' ||
                             window.location.hostname === '127.0.0.1'
      
      if (!isSecureContext) {
        setLocationError("Geolocation requires HTTPS. Please use a secure connection.")
        setIsGettingLocation(false)
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation({ lat: userLat, lng: userLng })
          
          const dist = calculateDistance(
            userLat,
            userLng,
            bogorCoordinates.latitude,
            bogorCoordinates.longitude
          )
          setDistance(dist)
          setIsGettingLocation(false)
          // Start tracking after getting location
          setIsTrackingDistance(true)
          // Center map to user location
          setMapKey(prev => prev + 1)
        },
        (error) => {
          let errorMessage = "Unable to get your location"
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please allow location access and try again."
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location unavailable. Check your GPS/location services."
              break
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again."
              break
          }
          
          setLocationError(errorMessage)
          setIsGettingLocation(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000
        }
      )
    } else {
      // Start tracking with existing location
      setIsTrackingDistance(true)
      // Center map to user location
      setMapKey(prev => prev + 1)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: mapStyles }} />
      <div className={`relative ${className}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75"></div>
        <div className="relative">
          <div
            ref={mapContainerRef}
            className="w-full rounded-xl overflow-hidden border border-zinc-700/50"
            style={{ height: "400px", minHeight: "400px" }}
          />
          <MapProvider 
            key={mapKey}
            mapContainerRef={mapContainerRef} 
            initialViewState={bogorCoordinates}
            userLocation={userLocation}
            showRoute={isTrackingDistance}
          />
          
          {/* Control Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
            {/* Track Distance Button */}
            <button
              onClick={startTracking}
              disabled={isGettingLocation}
              className={`${
                isTrackingDistance 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } disabled:bg-gray-600 disabled:opacity-50 text-white p-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2`}
              title="Track distance from your location"
            >
              <Route className="h-4 w-4" />
              <span className="text-xs font-medium">
                {isGettingLocation ? "Getting Location..." : 
                 isTrackingDistance ? "Stop Tracking" : "Track Distance"}
              </span>
            </button>
          </div>

          {/* Info Panel */}
          <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700/50 space-y-2 max-w-xs z-[1000] pointer-events-auto shadow-xl">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-400" />
              <div>
                <div className="text-sm font-medium text-white">Bogor, West Java</div>
                <div className="text-xs text-zinc-400">Indonesia • 6°35'S 106°47'E</div>
              </div>
            </div>
            
            {distance !== null && userLocation && (
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-700">
                <Navigation className="h-4 w-4 text-green-400" />
                <div className="flex-1">
                  <div className="text-xs text-zinc-400">Distance from you</div>
                  <div className="text-sm font-medium text-white">
                    {distance < 1 
                      ? `${Math.round(distance * 1000)} meters`
                      : `${distance.toFixed(1)} km`
                    }
                  </div>
                  {isTrackingDistance && (
                    <div className="text-xs text-green-400 mt-1">
                      📍 Route displayed on map
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {locationError && (
              <div className="pt-2 border-t border-zinc-700">
                <div className="text-xs text-red-400 mb-2">{locationError}</div>
                <Button
                  onClick={() => getUserLocation(true)}
                  disabled={isGettingLocation}
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs h-8"
                >
                  <Locate className="h-3 w-3 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
            
            {!userLocation && !locationError && !isGettingLocation && (
              <div className="pt-2 border-t border-zinc-700">
                <div className="text-xs text-zinc-400">
                  💡 Allow location access to see your distance
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}