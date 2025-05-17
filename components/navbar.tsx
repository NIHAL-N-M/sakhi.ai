"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleGetHelpNow = () => {
    router.push("/test-chatbot")
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Lawyer Connect", href: "/lawyer-connect" },
    { name: "Document Generator", href: "/document-generator" },
    { name: "Directory", href: "/directory" },
    { name: "Know Your Rights", href: "/education" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#FFD166] shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-2xl font-bold text-black">SAKHI.AI</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative text-sm font-medium text-black transition-colors hover:text-white"
            >
              <span className="relative">
                {item.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          ))}
          <Button
            className="button-hover yellow-shadow bg-primary text-black hover:bg-primary/90"
            onClick={handleGetHelpNow}
          >
            Get Help Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="flex items-center md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="container mx-auto space-y-4 px-4 pb-6 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-lg font-medium text-black hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              className="w-full bg-primary text-black hover:bg-primary/90"
              onClick={() => {
                setIsOpen(false)
                router.push("/test-chatbot")
              }}
            >
              Get Help Now
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar
