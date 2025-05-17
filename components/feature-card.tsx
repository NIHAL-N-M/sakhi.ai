"use client"

import type React from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const FeatureCard = ({ icon, title, description, link }: FeatureCardProps) => {
  return (
    <Link href={link} className="block">
      <motion.div
        whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(255, 209, 102, 0.4)" }}
        transition={{ duration: 0.3 }}
        className="card-hover flex h-full flex-col rounded-lg border border-[#FFD166]/30 bg-white p-6 shadow-sm cursor-pointer"
      >
        <div className="mb-4 rounded-full bg-[#FFD166]/10 p-3 w-fit">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold text-black">{title}</h3>
        <p className="mb-4 flex-grow text-gray-600">{description}</p>
        <div className="group mt-2 inline-flex items-center text-sm font-medium text-black hover:text-[#FFBE0B]">
          Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </Link>
  )
}

export default FeatureCard
