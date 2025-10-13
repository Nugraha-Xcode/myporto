"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "id"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang === "en" || savedLang === "id") {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

// Translations
const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      greeting: "Hi, I'm",
      role: "Geospatial Full Stack Developer",
      description: "Full Stack Developer with 5+ years of experience in enterprise system administration, system support, and geospatial application development. Specialized in building scalable web applications with modern tech stacks.",
      cta: "View My Work",
      location: "Based in Bogor, Indonesia",
    },
    about: {
      title: "About Me",
      intro: "I'm a passionate Full Stack Developer with expertise in geospatial technologies and modern web development.",
      paragraph1: "Fullstack Developer with 5+ years of experience in enterprise system administration and geospatial application development. Specialized in building scalable web applications using modern tech stacks (React.js, Express.js, Next.js, Vue.js) with geospatial data processing capabilities.",
      paragraph2: "Proven track record in API integration, microservices architecture, CI/CD implementation, and managing complex database systems (PostgreSQL, PostGIS). Former Linux/Windows System Administrator at IBM with expertise in infrastructure management, security operations, and performance optimization.",
      paragraph3: "Currently working at Badan Informasi Geospasial (Geospatial Information Agency) as fullstack developer handling development of multiple geospatial applications and API integrations for Indonesia's national geospatial data systems.",
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Technologies I work with",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Some of my recent work",
      viewProject: "View Project",
      sipulau: {
        title: "SIPULAU - Island Information System",
        description: "Developed new features and resolved critical bugs for Indonesia's island information system with modern API integration.",
      },
      onemap: {
        title: "Kebijakan Satu Peta (KSP) - OneMap Development",
        description: "Developed and maintained OneMap portal for Indonesia's geospatial data integration policy.",
      },
      integration: {
        title: "KSP Integration Platform",
        description: "Built full-stack geospatial integration platform from scratch with secure authentication, cloud storage, and message queue system.",
      },
      sibatnas: {
        title: "SIBATNAS - National Bathymetry System",
        description: "Integrated national bathymetry system with server infrastructure for efficient geospatial data processing.",
      },
      palapa: {
        title: "Geoportal JIGN (Palapa v5)",
        description: "Designed CI/CD pipeline and enhanced geospatial service integration for BIG's main geoportal platform.",
      },
      sinar: {
        title: "SINAR Web & Mobile",
        description: "Performed debugging and optimization for geospatial web platform and managed mobile app deployment.",
      },
      portfolio: {
        title: "Portfolio Website",
        description: "This portfolio website showcasing my geospatial development expertise and projects.",
      },
    },
    experience: {
      title: "Work Experience",
      subtitle: "My professional journey",
      present: "Present",
      big: {
        title: "Fullstack Application Developer",
        company: "Badan Informasi Geospasial (Geospatial Information Agency)",
        period: "February 2023 - Present",
        description: "fullstack development of multiple geospatial applications, API integrations, and infrastructure improvements for Indonesia's national geospatial data systems. Built scalable applications using React.js, Next.js, Vue.js, Express.js, PostgreSQL, and Docker.",
      },
      ibm: {
        title: "Linux & Windows System Administrator",
        company: "IBM Indonesia (Prudential Account)",
        period: "April 2020 - January 2023",
        description: "Managed enterprise-level Linux and Windows server infrastructure for Prudential's critical systems. Handled VMware virtualization, security operations using Splunk SIEM, endpoint security with McAfee and Cybereason, and ITIL-based service management.",
      },
      dcop: {
        title: "Data Center Operator",
        company: "PT. Jasa Teknologi Informasi IBM",
        period: "December 2019 - April 2020",
        description: "Managed 24/7 data center operations ensuring optimal facility performance and system availability. Monitored power systems, server health metrics, performed backups, and managed incident tickets following DCMS procedures.",
      },
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together",
      description: "Interested in collaborating or have a project in mind? Feel free to reach out!",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      or: "Or connect with me on",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with",
      and: "and",
    },
  },
  id: {
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
      resume: "Resume",
    },
    hero: {
      greeting: "Halo, Saya",
      role: "Geospasial Full Stack Developer",
      description: "Full Stack Developer dengan pengalaman 5+ tahun di bidang enterprise system administration, system support, dan pengembangan aplikasi geospasial. Spesialis dalam membangun aplikasi web scalable dengan tech stack modern.",
      cta: "Lihat Karya Saya",
      location: "Berdomisili di Bogor, Indonesia",
    },
    about: {
      title: "Tentang Saya",
      intro: "Saya adalah Full Stack Developer yang passionate dengan keahlian di bidang teknologi geospasial dan pengembangan web modern.",
      paragraph1: "Fullstack Developer dengan pengalaman 5+ tahun di bidang enterprise system administration dan pengembangan aplikasi geospasial. Spesialis dalam membangun aplikasi web scalable menggunakan tech stack modern (React.js, Express.js, Next.js, Vue.js) dengan kemampuan pemrosesan data geospasial.",
      paragraph2: "Memiliki rekam jejak terbukti dalam integrasi API, arsitektur microservices, implementasi CI/CD, dan mengelola sistem database kompleks (PostgreSQL, PostGIS). Mantan System Administrator Linux/Windows di IBM dengan keahlian dalam manajemen infrastruktur, operasi keamanan, dan optimasi performa.",
      paragraph3: "Saat ini bekerja di Badan Informasi Geospasial (Geospatial Information Agency) sebagai fullstack developer yang menangani pengembangan berbagai aplikasi geospasial dan integrasi API untuk sistem data geospasial nasional Indonesia.",
    },
    skills: {
      title: "Keahlian & Teknologi",
      subtitle: "Teknologi yang saya kuasai",
    },
    projects: {
      title: "Proyek Unggulan",
      subtitle: "Beberapa karya terbaru saya",
      viewProject: "Lihat Proyek",
      sipulau: {
        title: "SIPULAU - Sistem Informasi Pulau",
        description: "Mengembangkan fitur baru dan menyelesaikan bug kritis untuk sistem informasi pulau Indonesia dengan integrasi API modern.",
      },
      onemap: {
        title: "Kebijakan Satu Peta (KSP) - Pengembangan OneMap",
        description: "Mengembangkan dan memelihara portal OneMap untuk kebijakan integrasi data geospasial Indonesia.",
      },
      integration: {
        title: "Platform Integrasi KSP",
        description: "Membangun platform integrasi geospasial full-stack dari awal dengan autentikasi aman, cloud storage, dan sistem message queue.",
      },
      sibatnas: {
        title: "SIBATNAS - Sistem Batimetri Nasional",
        description: "Mengintegrasikan sistem batimetri nasional dengan infrastruktur server untuk pemrosesan data geospasial yang efisien.",
      },
      palapa: {
        title: "Geoportal JIGN (Palapa v5)",
        description: "Merancang CI/CD pipeline dan meningkatkan integrasi layanan geospasial untuk platform geoportal utama BIG.",
      },
      sinar: {
        title: "SINAR Web & Mobile",
        description: "Melakukan debugging dan optimasi untuk platform web geospasial serta mengelola deployment aplikasi mobile.",
      },
      portfolio: {
        title: "Website Portfolio",
        description: "Website portfolio ini menampilkan keahlian dan proyek pengembangan geospasial saya.",
      },
    },
    experience: {
      title: "Pengalaman Kerja",
      subtitle: "Perjalanan profesional saya",
      present: "Sekarang",
      big: {
        title: "Fullstack Application Developer",
        company: "Badan Informasi Geospasial (Badan Informasi Geospasial)",
        period: "Februari 2023 - Sekarang",
        description: "Pengembangan fullstack dari berbagai aplikasi geospasial, integrasi API, dan peningkatan infrastruktur untuk sistem data geospasial nasional Indonesia. Membangun aplikasi scalable menggunakan React.js, Next.js, Vue.js, Express.js, PostgreSQL, dan Docker.",
      },
      ibm: {
        title: "Linux & Windows System Administrator",
        company: "IBM Indonesia (Prudential Account)",
        period: "April 2020 - Januari 2023",
        description: "Mengelola infrastruktur server Linux dan Windows tingkat enterprise untuk sistem kritis Prudential. Menangani virtualisasi VMware, operasi keamanan menggunakan Splunk SIEM, keamanan endpoint dengan McAfee dan Cybereason, serta manajemen layanan berbasis ITIL.",
      },
      dcop: {
        title: "Data Center Operator",
        company: "PT. Jasa Teknologi Informasi IBM",
        period: "Desember 2019 - April 2020",
        description: "Mengelola operasi data center 24/7 untuk memastikan performa fasilitas dan ketersediaan sistem yang optimal. Memantau sistem power, metrik kesehatan server, melakukan backup, dan mengelola tiket insiden mengikuti prosedur DCMS.",
      },
    },
    contact: {
      title: "Mari Terhubung",
      subtitle: "Mari bekerja sama",
      description: "Tertarik berkolaborasi atau punya proyek? Jangan ragu untuk menghubungi!",
      name: "Nama Anda",
      email: "Email Anda",
      message: "Pesan Anda",
      send: "Kirim Pesan",
      sending: "Mengirim...",
      success: "Pesan berhasil dikirim!",
      error: "Gagal mengirim pesan. Silakan coba lagi.",
      or: "Atau hubungi saya di",
    },
    footer: {
      rights: "Semua hak dilindungi.",
      built: "Dibuat dengan",
      and: "dan",
    },
  },
}
