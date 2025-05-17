"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })

    setEmail("")
  }

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              <span className="text-[#FFD166]">SAKHI</span>.AI
            </h3>
            <p className="text-sm text-gray-600">
              Empowering women through legal and financial knowledge with AI-powered assistance tailored to your unique
              needs.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-600 transition-colors hover:text-[#FFD166]"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-600 transition-colors hover:text-[#FFD166]"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 transition-colors hover:text-[#FFD166]"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold yellow-border-bottom pb-2">For Women</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lawyer-connect" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Women-Friendly Lawyers
                </Link>
              </li>
              <li>
                <Link
                  href="/document-generator"
                  className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]"
                >
                  Legal Document Creator
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Women's Support Organizations
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Women's Rights Education
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold yellow-border-bottom pb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/education" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Women's Legal Blog
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  FAQs for Women
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Privacy & Safety
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-sm text-gray-600 transition-colors hover:text-[#FFD166]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold yellow-border-bottom pb-2">Join Our Community</h3>
            <p className="text-sm text-gray-600">Subscribe to receive updates on women's rights and resources.</p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[220px] border-[#FFD166]/30 focus-visible:ring-[#FFD166]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-[#FFD166] text-black hover:bg-[#FFBE0B] golden-glow">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-[#FFD166]/20 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} SAKHI.AI. Empowering women through knowledge and support.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
