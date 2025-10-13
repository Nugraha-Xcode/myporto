"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let devicePixelRatio = window.devicePixelRatio || 1

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas || !ctx) return
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = (Math.random() * canvasWidth) / devicePixelRatio
        this.y = (Math.random() * canvasHeight) / devicePixelRatio
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvasWidth / devicePixelRatio || this.x < 0) {
          this.speedX = -this.speedX
        }

        if (this.y > canvasHeight / devicePixelRatio || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
      }
    }

    // Create particles after canvas is properly sized
    const initParticles = () => {
      if (!canvas) return
      particlesArray.length = 0
      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height))
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const particleCount = 50

    // Call initParticles after setCanvasDimensions
    setCanvasDimensions()
    initParticles()

    // Update the resize event listener
    const handleResize = () => {
      setCanvasDimensions()
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(120, 180, 255, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(canvas.width, canvas.height)
        particlesArray[i].draw(ctx)
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}
