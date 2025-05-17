"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Phone, Building, Briefcase, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface Listing {
  id: number
  name: string
  category: string
  description: string
  location: string
  contact: string
  website: string
  tags: string[]
}

interface DirectoryCardProps {
  listing: Listing
}

const DirectoryCard = ({ listing }: DirectoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ngo":
        return <Building className="h-5 w-5 text-blue-500" />
      case "scheme":
        return <FileText className="h-5 w-5 text-green-500" />
      case "job":
        return <Briefcase className="h-5 w-5 text-purple-500" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ngo":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheme":
        return "bg-green-100 text-green-800 border-green-200"
      case "job":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleVisitWebsite = () => {
    window.open(listing.website, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(255, 214, 128, 0.3)" }}
      transition={{ duration: 0.3 }}
      className="card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center justify-between">
            <Badge className={getCategoryColor(listing.category)}>
              <div className="flex items-center space-x-1">
                {getCategoryIcon(listing.category)}
                <span className="capitalize">{listing.category}</span>
              </div>
            </Badge>
          </div>
          <h3 className="mb-2 text-lg font-semibold yellow-border-bottom pb-2">{listing.name}</h3>
          <p className="mb-4 text-sm text-gray-600">{listing.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              {listing.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              {listing.contact}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-primary/5 border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-primary/20 pt-4">
          <Button
            variant="outline"
            className="w-full text-black hover:bg-primary/10 border-primary/20"
            onClick={handleVisitWebsite}
          >
            <span>Visit Website</span>
            <ExternalLink
              className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default DirectoryCard
