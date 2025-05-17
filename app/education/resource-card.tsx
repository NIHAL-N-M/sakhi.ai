"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Resource {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  category: string
  popular: boolean
}

interface ResourceCardProps {
  resource: Resource
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/education/${resource.id}`)
  }

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(255, 214, 128, 0.3)" }}
      transition={{ duration: 0.3 }}
      className="card-hover cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <Card className="border-primary/20 h-full transition-all hover:border-primary">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-full bg-primary/10 p-3">{resource.icon}</div>
            {resource.popular && <Badge className="bg-primary/20 text-black border-primary/30">Popular</Badge>}
          </div>
          <h3 className="mb-2 text-lg font-semibold">{resource.title}</h3>
          <p className="text-sm text-gray-600">{resource.description}</p>
        </CardContent>
        <CardFooter className="border-t border-primary/20 pt-4">
          <div className="w-full">
            <Button className="w-full bg-white text-black hover:bg-primary/10 border border-primary/20">
              <span>Learn More</span>
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
              />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ResourceCard
