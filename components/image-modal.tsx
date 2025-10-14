"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"

interface ImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  title: string
}

export function ImageModal({ images, currentIndex, onClose, onNext, onPrev, title }: ImageModalProps) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }
    window.addEventListener("keydown", handleKeyboard)
    return () => window.removeEventListener("keydown", handleKeyboard)
  }, [onClose, onNext, onPrev])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && images.length > 1) {
      onNext()
    }
    if (isRightSwipe && images.length > 1) {
      onPrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >

      {/* Navigation arrows (only if more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 z-60 bg-white text-black hover:bg-purple-500 hover:text-white p-3 rounded-full transition-all duration-200 shadow-lg"
            title="Previous (←)"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 z-60 bg-white text-black hover:bg-purple-500 hover:text-white p-3 rounded-full transition-all duration-200 shadow-lg"
            title="Next (→)"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white text-black hover:bg-red-500 hover:text-white p-3 rounded-full transition-all duration-200 shadow-lg"
        style={{ zIndex: 10000 }}
        title="Close (ESC)"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - Screenshot ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Title */}
        <div className="absolute top-4 left-4 bg-white text-black px-5 py-3 rounded-lg shadow-lg">
          <h3 className="font-bold text-sm">{title}</h3>
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-4 bg-black/90 border border-white/20 text-white px-4 py-3 rounded-lg text-sm space-y-2 shadow-lg">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/20 rounded font-mono text-xs">ESC</kbd>
          <span className="text-zinc-300">Close</span>
        </div>
        {images.length > 1 && (
          <>
            <div className="hidden md:flex items-center gap-2">
              <div className="flex gap-1">
                <kbd className="px-2 py-1 bg-white/20 rounded font-mono text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-white/20 rounded font-mono text-xs">→</kbd>
              </div>
              <span className="text-zinc-300">Navigate</span>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-zinc-300">👈 Swipe to navigate</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
