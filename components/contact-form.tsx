"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import DOMPurify from "isomorphic-dompurify"
import validator from "validator"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"

// Security utilities with DOMPurify
const sanitizeInput = (input: string): string => {
  // Use DOMPurify for robust XSS protection
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
  })
  return cleaned.trim()
}

const validateEmail = (email: string): boolean => {
  // Use validator library for robust email validation
  return validator.isEmail(email, {
    allow_display_name: false,
    require_tld: true,
    allow_utf8_local_part: false,
  })
}

const isSpamContent = (text: string): boolean => {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|prize)\b/gi,
    /(https?:\/\/){3,}/gi,
    /(.)\1{10,}/gi, 
  ]
  return spamPatterns.some(pattern => pattern.test(text))
}

export function ContactForm() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [submissionTime, setSubmissionTime] = useState<number | null>(null)

  // Track form mount time for bot detection
  useState(() => {
    setSubmissionTime(Date.now())
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Save form reference before async operations
    const form = e.currentTarget

    try {
      // SECURITY CHECK 1: Honeypot (bot detection)
      if (honeypot) {
        console.warn("Bot detected via honeypot")
        toast({
          title: t("contact.toast.error.title"),
          description: "Security validation failed",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // SECURITY CHECK 2: Submission speed (bot detection)
      if (submissionTime && Date.now() - submissionTime < 3000) {
        console.warn("Bot detected: too fast submission")
        toast({
          title: t("contact.toast.error.title"),
          description: "Please wait a moment before submitting",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Get and sanitize form data
      const formData = new FormData(form)
      const name = sanitizeInput(formData.get("user_name") as string)
      const email = sanitizeInput(formData.get("user_email") as string)
      const subject = sanitizeInput(formData.get("subject") as string)
      const message = sanitizeInput(formData.get("message") as string)

      // SECURITY CHECK 3: Validate inputs
      if (!name || name.length < 2 || name.length > 100) {
        toast({
          title: t("contact.toast.error.title"),
          description: "Please enter a valid name (2-100 characters)",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      if (!validateEmail(email)) {
        toast({
          title: t("contact.toast.error.title"),
          description: "Please enter a valid email address",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      if (!subject || subject.length < 3 || subject.length > 200) {
        toast({
          title: t("contact.toast.error.title"),
          description: "Please enter a valid subject (3-200 characters)",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      if (!message || message.length < 10 || message.length > 2000) {
        toast({
          title: t("contact.toast.error.title"),
          description: "Please enter a valid message (10-2000 characters)",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // SECURITY CHECK 4: Spam detection
      if (isSpamContent(name) || isSpamContent(subject) || isSpamContent(message)) {
        console.warn("Spam content detected")
        toast({
          title: t("contact.toast.error.title"),
          description: "Your message was flagged as spam. Please try again with different content.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.warn("EmailJS not configured. Using fallback mode.")
        
        // Fallback: Open email client with sanitized data
        const mailtoLink = `mailto:nugrahaagil13@gmail.com?subject=${encodeURIComponent(
          `${subject} - from ${name}`
        )}&body=${encodeURIComponent(
          `From: ${name} (${email})\n\n${message}`
        )}`
        
        window.location.href = mailtoLink
        
        toast({
          title: t("contact.toast.fallback.title"),
          description: t("contact.toast.fallback.description"),
        })
        
        setIsSubmitting(false)
        form.reset()
        setSubmissionTime(Date.now()) // Reset timer
        return
      }

      // Send email using EmailJS with SANITIZED data (not raw form)
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: name,    
          user_email: email,   
          subject: subject,    
          message: message,     
        },
        publicKey
      )

      toast({
        title: t("contact.toast.success.title"),
        description: t("contact.toast.success.description"),
        className: "bg-green-800 border-green-600 text-white",
      })

      form.reset()
      setSubmissionTime(Date.now()) // Reset timer for next submission
    } catch (error: any) {
      console.error("Failed to send email:", error)
      
      // More detailed error message
      let errorMessage = t("contact.toast.error.description")
      
      if (error?.text) {
        errorMessage = error.text
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      toast({
        title: t("contact.toast.error.title"),
        description: errorMessage,
        variant: "destructive",
        className: "bg-red-900 border-red-700 text-white",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-purple-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field - hidden from users, only bots will fill it */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            
            <div className="space-y-2">
              <Input
                name="user_name"
                placeholder={t("contact.form.name")}
                required
                minLength={2}
                maxLength={100}
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="user_email"
                placeholder={t("contact.form.email")}
                required
                maxLength={100}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="subject"
                placeholder={t("contact.form.subject")}
                required
                minLength={3}
                maxLength={200}
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                name="message"
                placeholder={t("contact.form.message")}
                rows={5}
                required
                minLength={10}
                maxLength={2000}
                className="bg-zinc-900/50 border-zinc-700 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>{t("contact.form.sending")}</>
              ) : (
                <>
                  {t("contact.form.send")} <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
