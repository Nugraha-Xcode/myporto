"use client"

import { motion } from "framer-motion"
import { InteractiveGlobe } from "./interactive-globe"

export function CreativeHero() {
  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <InteractiveGlobe />
    </motion.div>
  )
}
