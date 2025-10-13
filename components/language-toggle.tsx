"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
      title={language === "en" ? "Switch to Indonesian" : "Ganti ke English"}
    >
      <Languages className="h-4 w-4" />
      <span className="font-semibold">{language === "en" ? "ID" : "EN"}</span>
    </Button>
  )
}
