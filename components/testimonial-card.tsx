"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(255, 209, 102, 0.4)" }}
      transition={{ duration: 0.3 }}
      className="card-hover flex flex-col rounded-lg border border-[#FFD166]/30 bg-white p-6 shadow-sm"
    >
      <div className="rounded-full bg-[#FFD166]/10 p-2 w-fit">
        <Quote className="h-6 w-6 text-[#FFD166]" />
      </div>
      <p className="mt-4 flex-grow text-gray-600">{quote}</p>
      <div className="mt-6 border-t border-[#FFD166]/30 pt-4">
        <p className="font-semibold text-black">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
