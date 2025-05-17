"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Lawyer {
  id: number
  name: string
  specialization: string
  experience: string
  rating: number
  reviews: number
  image: string
  availability: string
  languages: string[]
  consultationFee: string
}

interface LawyerCardProps {
  lawyer: Lawyer
  onBookAppointment: (lawyerId: number) => void
}

const LawyerCard = ({ lawyer, onBookAppointment }: LawyerCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 15px 30px -5px rgba(255, 214, 128, 0.3)" }}
      transition={{ duration: 0.3 }}
      className="card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="border-primary/20">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
            <img src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{lawyer.name}</h3>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                {lawyer.specialization}
              </Badge>
              <Badge variant="outline" className="border-primary/20">
                {lawyer.experience}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{lawyer.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">{lawyer.reviews} reviews</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Languages:</span>
              <span className="text-sm">{lawyer.languages.join(", ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Consultation Fee:</span>
              <span className="font-medium">{lawyer.consultationFee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Availability:</span>
              <Badge
                variant="outline"
                className={
                  lawyer.availability.includes("today")
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }
              >
                {lawyer.availability}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-primary/20 pt-4">
          <Button
            className="w-full bg-primary text-black hover:bg-primary/90"
            onClick={() => onBookAppointment(lawyer.id)}
          >
            Book Appointment
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default LawyerCard
