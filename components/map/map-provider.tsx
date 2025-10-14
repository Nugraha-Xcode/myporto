"use client"

import React, { useEffect, useRef, useState } from "react"
import { MapContext } from "@/context/map-context"
import "leaflet/dist/leaflet.css"

// Dynamic import for client-side only
let L: any = null

type MapProviderProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>
  initialViewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  userLocation?: { lat: number; lng: number } | null
  showRoute?: boolean
  children?: React.ReactNode
}

export function MapProvider({
  mapContainerRef,
  initialViewState,
  userLocation,
  showRoute = false,
  children,
}: MapProviderProps) {
  const map = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)
  const userMarkerRef = useRef<any>(null)
  const lineRef = useRef<any>(null)
  const routingControlRef = useRef<any>(null)

  useEffect(() => {
    const container = mapContainerRef.current
    
    // Skip if no container
    if (!container) return
    
    if (map.current) return
    
    const timeoutId = setTimeout(() => {
      if (!mapContainerRef.current) return
      
      const cleanupContainer = () => {
        try {
          if ((container as any)._leaflet_id) {
            container.innerHTML = ''
            delete (container as any)._leaflet_id
            delete (container as any)._leaflet_map
          }
        } catch (e) {}
      }
      
      cleanupContainer()

    // Dynamic import Leaflet (client-side only)
    const initMap = async () => {
      try {
        const leaflet = await import("leaflet")
        L = leaflet.default
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        map.current = L.map(container, {
          center: [initialViewState.latitude, initialViewState.longitude],
          zoom: initialViewState.zoom,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
        })

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

          tileLayer = L.tileLayer(server.url, {
            attribution: server.attribution,
            maxZoom: 19,
          })

          tileLayer.on("tileerror", () => {
            tileLayer.remove()
            serverIndex++
            loadTileServer()
          })

          tileLayer.addTo(map.current)
        }

        loadTileServer()

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

        // Bogor marker will be added
        const bogorIcon = L.divIcon({
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

        // Always show Bogor marker (persistent)
        const bogorMarker = L.marker([initialViewState.latitude, initialViewState.longitude], {
          icon: bogorIcon,
          zIndexOffset: 500
        })
          .addTo(map.current)
          .bindPopup(`
            <div style="color: #333; padding: 8px;">
              <strong>Bogor, Indonesia</strong><br>
              West Java Province<br>
              <small>6°35'44"S 106°47'19"E</small>
            </div>
          `)
          
        // Store reference to prevent removal
        map.current._bogorMarker = bogorMarker

        setLoaded(true)
      } catch (error) {}
    }

      initMap()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      // Cleanup map instance
      if (map.current) {
        try {
          map.current.off() // Remove all event listeners
          map.current.remove()
        } catch (e) {
        } finally {
          map.current = null
        }
      }
      
      if (userMarkerRef.current) {
        try {
          userMarkerRef.current.remove()
        } catch (e) {}
        userMarkerRef.current = null
      }
      
      if (lineRef.current) {
        try {
          lineRef.current.remove()
        } catch (e) {}
        lineRef.current = null
      }
      
      if (routingControlRef.current) {
        try {
          map.current.removeControl(routingControlRef.current)
        } catch (e) {}
        routingControlRef.current = null
      }
      
      if (container) {
        try {
          container.innerHTML = ''
          delete (container as any)._leaflet_id
          delete (container as any)._leaflet_map
        } catch (e) {}
      }
    }
  }, [initialViewState, mapContainerRef])

  // Handle user marker and routing
  useEffect(() => {
    if (!map.current || !L || !userLocation || !loaded) return

    // Clean up existing elements
    if (userMarkerRef.current) {
      userMarkerRef.current.remove()
      userMarkerRef.current = null
    }
    if (lineRef.current) {
      try {
        lineRef.current.remove()
      } catch (e) {}
      lineRef.current = null
    }
    if (routingControlRef.current) {
      try {
        map.current.removeControl(routingControlRef.current)
      } catch (e) {}
      routingControlRef.current = null
    }

    const blueIcon = L.divIcon({
      className: "user-location-marker",
      html: `
        <div style="
          position: relative;
          width: 28px;
          height: 28px;
          z-index: 1000;
        ">
          <div style="
            position: absolute;
            width: 28px;
            height: 28px;
            background: #3b82f6;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.9), 0 0 10px rgba(59, 130, 246, 0.6);
            animation: pulse 2s infinite;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            z-index: 1001;
          "></div>
          <div style="
            position: absolute;
            top: -8px;
            left: -8px;
            width: 44px;
            height: 44px;
            border: 2px solid rgba(59, 130, 246, 0.3);
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
      icon: blueIcon,
      zIndexOffset: 1000
    })
      .addTo(map.current)
      .bindPopup(`
        <div style="color: #333; padding: 10px; text-align: center; min-width: 150px;">
          <strong style="color: #3b82f6;">📍 Your Location</strong><br>
          <div style="margin: 4px 0; font-size: 11px; color: #666;">
            ${userLocation.lat.toFixed(4)}°, ${userLocation.lng.toFixed(4)}°
          </div>
          <div style="font-size: 10px; color: #888;">Click to center map</div>
        </div>
      `, {
        closeButton: true,
        autoClose: false,
        closeOnClick: false
      })
    
    // User marker click handler
    if (userMarkerRef.current && map.current) {
      userMarkerRef.current.on('click', () => {
        try {
          map.current.setView([userLocation.lat, userLocation.lng], 15)
        } catch (error) {
          console.error('Error setting view:', error)
        }
      })
    }

    // Create route if tracking is enabled
    if (showRoute) {
      // Use OSRM API for road routing
      const createRouting = async () => {
        try {
          const startLng = userLocation.lng
          const startLat = userLocation.lat
          const endLng = initialViewState.longitude
          const endLat = initialViewState.latitude
          
          // Call OSRM routing API
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
          
          const response = await fetch(osrmUrl)
          const data = await response.json()
          
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0]
            const coordinates = route.geometry.coordinates
            
            // Convert to Leaflet coordinate format
            const latlngs = coordinates.map((coord: [number, number]) => [coord[1], coord[0]])
            
            // Create route polyline
            lineRef.current = L.polyline(latlngs, {
              color: '#ff4444',
              weight: 6,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }).addTo(map.current)
            
            // Fit map to show route
            setTimeout(() => {
              if (map.current && lineRef.current) {
                const bounds = lineRef.current.getBounds()
                map.current.fitBounds(bounds, { padding: [60, 60] })
              }
            }, 500)
            
            // Route created successfully
            
          } else {
            throw new Error('No route found')
          }
          
        } catch (error) {
          // Fallback to simple line
          // Using simple line fallback
          const latlngs = [
            [userLocation.lat, userLocation.lng],
            [initialViewState.latitude, initialViewState.longitude]
          ]
          
          lineRef.current = L.polyline(latlngs, {
            color: '#ff4444',
            weight: 6,
            opacity: 0.8,
            dashArray: '10, 5'
          }).addTo(map.current)
          
          // Fit map to show markers
          setTimeout(() => {
            if (map.current) {
              const bounds = L.latLngBounds(latlngs)
              map.current.fitBounds(bounds, { padding: [60, 60] })
            }
          }, 500)
        }
      }
      
      createRouting()
    }

  }, [showRoute, userLocation, initialViewState, loaded])

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
