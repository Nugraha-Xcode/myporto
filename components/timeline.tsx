"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Fullstack Application Developer",
    company: "Badan Informasi Geospasial (Geospatial Information Agency)",
    period: "February 2023 - Present",
    description:
      "fullstack development of multiple geospatial applications, API integrations, and infrastructure improvements for Indonesia's national geospatial data systems. Built scalable applications using React.js, Next.js, Vue.js, Express.js, PostgreSQL, and Docker.",
  },
  {
    title: "Linux & Windows System Administrator",
    company: "IBM Indonesia (Prudential Account)",
    period: "April 2020 - January 2023",
    description:
      "Managed enterprise-level Linux and Windows server infrastructure for Prudential's critical systems. Handled VMware virtualization, security operations using Splunk SIEM, endpoint security with McAfee and Cybereason, and ITIL-based service management.",
  },
  {
    title: "Data Center Operator",
    company: "PT. Jasa Teknologi Informasi IBM",
    period: "December 2019 - April 2020",
    description:
      "Managed 24/7 data center operations ensuring optimal facility performance and system availability. Monitored power systems, server health metrics, performed backups, and managed incident tickets following DCMS procedures.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
