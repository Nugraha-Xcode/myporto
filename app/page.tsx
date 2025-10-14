"use client"

import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, GitlabIcon as Gitlab } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { LocationMap } from "@/components/map/location-map"
import { useLanguage } from "@/context/language-context"

export default function Portfolio() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="relative z-10">Fullstack Developer</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">{t("hero.greeting")}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Agil Nugraha
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px]">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#projects">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                  <span className="relative z-10 flex items-center">
                    {t("hero.cta")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
                >
                  {t("contact.title")}
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 pt-4">
              <Link href="https://github.com/Nugraha-Xcode" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://gitlab.com/Nugraha-Xcode" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Gitlab className="h-5 w-5" />
                  <span className="sr-only">GitLab</span>
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/agilnugraha" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:nugrahaagil13@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <CreativeHero />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title={t("about.title")} subtitle={t("about.intro")} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src="/agil.jpg?height=600&width=600"
                  alt="Agil Nugraha"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-300">
                  {t("about.paragraph1")}
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  {t("about.paragraph2")}
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  {t("about.paragraph3")}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Name</div>
                    <div className="font-medium">Agil Nugraha</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">nugrahaagil13@gmail.com</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Location</div>
                    <div className="font-medium">Bogor, Indonesia</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Availability</div>
                    <div className="font-medium text-green-500">Open to opportunities</div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link 
                    href="https://drive.google.com/file/d/1tyNVihT6QqPpnqb_63loIsK57v1Cvbhb/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">Download Resume</Button>
                  </Link>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title={t("skills.title")} subtitle={t("skills.subtitle")} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            <SkillBadge name="JavaScript" level={95} />
            <SkillBadge name="Python" level={85} />
            <SkillBadge name="React.js" level={95} />
            <SkillBadge name="Next.js" level={90} />
            <SkillBadge name="Vue.js" level={88} />
            <SkillBadge name="Node.js" level={90} />
            <SkillBadge name="Express.js" level={92} />
            <SkillBadge name="PostgreSQL" level={90} />
            <SkillBadge name="PostGIS" level={85} />
            <SkillBadge name="Docker" level={85} />
            <SkillBadge name="Git" level={90} />
            <SkillBadge name="TailwindCSS" level={88} />
            <SkillBadge name="QGIS" level={80} />
            <SkillBadge name="ArcGIS Server" level={75} />
            <SkillBadge name="Apache Kafka" level={70} />
            <SkillBadge name="Splunk" level={75} />
            <SkillBadge name="VMware vCenter" level={70} />
            <SkillBadge name="Windows Server" level={85} />
            <SkillBadge name="Linux" level={85} />
            <SkillBadge name="Nginx" level={80} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title={t("projects.title")} subtitle={t("projects.subtitle")} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ProjectCard
              title={t("projects.sipulau.title")}
              description={t("projects.sipulau.description")}
              tags={["Next.js", "Vue.js", "DirectUS", "PostgreSQL", "Mapbox", "Docker"]}
              images={["/projects/sipulau1.png?height=400&width=600", "/projects/sipulau2.png?height=400&width=600", "/projects/sipulau3.png?height=400&width=600"]}
              demoUrl="https://sipulau.big.go.id"
            />
            <ProjectCard
              title={t("projects.onemap.title")}
              description={t("projects.onemap.description")}
              tags={["PHP", "CodeIgniter 3", "PostgreSQL", "PostGIS", "GeoServer", "Docker"]}
              images={["/projects/onemap1.png?height=400&width=600", "/projects/onemap2.png?height=400&width=600", "/projects/onemap3.png?height=400&width=600"]}
              demoUrl="https://onemap.big.go.id"
            />
            <ProjectCard
              title={t("projects.integration.title")}
              description={t("projects.integration.description")}
              tags={["React.js", "Express.js", "Apache Kafka", "MinIO", "reCAPTCHA", "2FA"]}
              images={["/projects/integ1.png?height=400&width=600", "/projects/integ2.png?height=400&width=600", "/projects/integ3.png?height=400&width=600"]}
              demoUrl="https://integrasi.big.go.id"
            />
            <ProjectCard
              title={t("projects.sibatnas.title")}
              description={t("projects.sibatnas.description")}
              tags={["React.js", "Express.js", "Redux", "PostgreSQL", "PostGIS", "GeoServer"]}
              images={["/projects/sibatnas1.png?height=400&width=600", "/projects/sibatnas2.png?height=400&width=600", "/projects/sibatnas3.png?height=400&width=600"]}
              demoUrl="https://sibatnas.big.go.id"
            />
            <ProjectCard
              title={t("projects.palapa.title")}
              description={t("projects.palapa.description")}
              tags={["React.js", "Express.js", "PostgreSQL", "PostGIS", "Docker"]}
              images={["/projects/palapa1.png?height=400&width=600", "/projects/palapa2.png?height=400&width=600", "/projects/palapa3.png?height=400&width=600"]}
              demoUrl="https://geodev.big.go.id"
            />
            <ProjectCard
              title={t("projects.sinar.title")}
              description={t("projects.sinar.description")}
              tags={["PHP", "CodeIgniter 3", "PostgreSQL", "PostGIS", "Codemagic", "Mobile"]}
              images={["/projects/sinar1.png?height=400&width=600", "/projects/sinar2.png?height=400&width=600", "/projects/sinar3.png?height=400&width=600"]}
              demoUrl="https://sinar.big.go.id"
            />
            <ProjectCard
              title={t("projects.portfolio.title")}
              description={t("projects.portfolio.description")}
              tags={["Next.js", "TailwindCSS", "Framer Motion", "TypeScript", "Leaflet"]}
              images={["/projects/porto1.png?height=400&width=600", "/projects/porto2.png?height=400&width=600"]}
              demoUrl="https://vercel.app"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title={t("experience.title")} subtitle={t("experience.subtitle")} />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Education & Certifications" subtitle="Academic background and professional certifications" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {/* Education */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Education</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-lg font-semibold">Bachelor of Information Technology (S.T)</h4>
                  <p className="text-zinc-400">Sekolah Tinggi Teknik PLN, Jakarta</p>
                  <p className="text-sm text-zinc-500">July 2015 - August 2019</p>
                  <p className="text-sm text-zinc-400 mt-2">GPA: 3.63/4.00</p>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Certifications */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6 text-pink-400">Certifications</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="text-lg font-semibold">Microsoft Technology Associate (MTA)</h4>
                  <p className="text-zinc-400">Database Administration Fundamentals</p>
                  <p className="text-sm text-zinc-500">February 2019</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="text-lg font-semibold">SKKNI-based Certification</h4>
                  <p className="text-zinc-400">Junior Computer Technician</p>
                  <p className="text-sm text-zinc-500">May 2019</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="text-lg font-semibold">SKKNI-based Certification</h4>
                  <p className="text-zinc-400">Junior Networking</p>
                  <p className="text-sm text-zinc-500">November 2018</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="text-lg font-semibold">IBM Cloud Certifications</h4>
                  <p className="text-zinc-400">IBM Cloud Essentials & IBM Cloud Core Badge</p>
                  <p className="text-sm text-zinc-500">March 2020</p>
                </div>
              </div>
            </GlassmorphicCard>
          </div>

          {/* Languages */}
          <div className="mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Languages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Indonesian</span>
                  <span className="text-zinc-400">Native</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">English</span>
                  <span className="text-zinc-400">Professional Working Proficiency</span>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title={t("contact.title")} subtitle={t("contact.subtitle")} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">nugrahaagil13@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">linkedin.com/in/nugrahaagil</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">github.com/Nugraha-Xcode</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Gitlab className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitLab</div>
                    <div className="font-medium">gitlab.com/Nugraha-Xcode</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
          
          {/* Location Map */}
          <div className="mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">My Location</h3>
              <LocationMap className="w-full" />
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Agil</span>
              <span className="text-white">Nugraha</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Agil Nugraha. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/Nugraha-Xcode" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://gitlab.com/Nugraha-Xcode" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Gitlab className="h-5 w-5" />
                <span className="sr-only">GitLab</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/agilnugraha" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:nugrahaagil13@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
