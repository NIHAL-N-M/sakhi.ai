"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Video, Filter, X } from "lucide-react"
import LawyerCard from "./lawyer-card"
import { useRouter } from "next/navigation"

export default function LawyerConnect() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("find")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [callType, setCallType] = useState<"voice" | "video" | null>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialization: "Family Law",
      experience: "12 years",
      rating: 4.8,
      reviews: 124,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      availability: "Available today",
      languages: ["English", "Hindi"],
      consultationFee: "₹1,500",
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      specialization: "Property Law",
      experience: "15 years",
      rating: 4.7,
      reviews: 98,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      availability: "Available tomorrow",
      languages: ["English", "Hindi", "Punjabi"],
      consultationFee: "₹2,000",
    },
    {
      id: 3,
      name: "Adv. Meera Patel",
      specialization: "Labor Law",
      experience: "8 years",
      rating: 4.9,
      reviews: 76,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      availability: "Available today",
      languages: ["English", "Gujarati", "Hindi"],
      consultationFee: "₹1,200",
    },
    {
      id: 4,
      name: "Adv. Sanjay Verma",
      specialization: "Criminal Law",
      experience: "20 years",
      rating: 4.6,
      reviews: 156,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      availability: "Available in 2 days",
      languages: ["English", "Hindi", "Marathi"],
      consultationFee: "₹2,500",
    },
  ]

  // Available time slots based on selected date
  const timeSlots = selectedDate
    ? ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]
    : []

  const handleBookAppointment = (lawyerId: number) => {
    setSelectedLawyer(lawyerId)
    setActiveTab("appointments")
    // Scroll to the appointment section
    setTimeout(() => {
      document.getElementById("appointment-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTimeSlot || !callType || selectedLawyer === null) {
      alert("Please select date, time, and call type to book an appointment")
      return
    }

    const lawyer = lawyers.find((l) => l.id === selectedLawyer)

    if (!lawyer) return

    const newAppointment = {
      id: Date.now(),
      lawyerName: lawyer.name,
      lawyerSpecialization: lawyer.specialization,
      date: selectedDate,
      time: selectedTimeSlot,
      callType: callType,
      status: "Confirmed",
      image: lawyer.image,
    }

    setAppointments([...appointments, newAppointment])

    // Reset selection
    setSelectedDate(undefined)
    setSelectedTimeSlot(null)
    setCallType(null)
    setSelectedLawyer(null)

    alert("Appointment booked successfully!")
  }

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments(appointments.filter((app) => app.id !== appointmentId))
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const filteredLawyers = lawyers.filter((lawyer) => {
    if (activeFilters.length === 0) return true

    if (activeFilters.includes("Family Law") && lawyer.specialization === "Family Law") return true
    if (activeFilters.includes("Property Law") && lawyer.specialization === "Property Law") return true
    if (activeFilters.includes("Labor Law") && lawyer.specialization === "Labor Law") return true
    if (activeFilters.includes("Criminal Law") && lawyer.specialization === "Criminal Law") return true

    if (activeFilters.includes("Available Today") && lawyer.availability.includes("today")) return true

    return false
  })

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">Connect with Lawyers</h1>
        <p className="mt-4 text-lg text-gray-600">
          Schedule consultations with experienced lawyers specializing in various fields.
        </p>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="find" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find">Find a Lawyer</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="find" className="mt-6">
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={activeFilters.length > 0 ? "default" : "outline"}
                  className="flex items-center space-x-2"
                  onClick={() => setActiveFilters([])}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters {activeFilters.length > 0 ? `(${activeFilters.length})` : ""}</span>
                </Button>
                <Button
                  variant={activeFilters.includes("Family Law") ? "default" : "outline"}
                  onClick={() => toggleFilter("Family Law")}
                >
                  Family Law
                </Button>
                <Button
                  variant={activeFilters.includes("Property Law") ? "default" : "outline"}
                  onClick={() => toggleFilter("Property Law")}
                >
                  Property Law
                </Button>
                <Button
                  variant={activeFilters.includes("Available Today") ? "default" : "outline"}
                  onClick={() => toggleFilter("Available Today")}
                >
                  Available Today
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredLawyers.map((lawyer) => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} onBookAppointment={handleBookAppointment} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="appointments" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>View and manage your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-6 py-4">
                    {appointments.length > 0 ? (
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 overflow-hidden rounded-full">
                                <img
                                  src={appointment.image || "/placeholder.svg"}
                                  alt={appointment.lawyerName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.lawyerName}</p>
                                <p className="text-xs text-gray-500">{appointment.lawyerSpecialization}</p>
                                <p className="text-xs">
                                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">You have no upcoming appointments.</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t p-6">
                  <Button variant="outline" onClick={() => setActiveTab("find")}>
                    Find Lawyers
                  </Button>
                </CardFooter>
              </Card>

              <div className="lg:col-span-2" id="appointment-section">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Consultation</CardTitle>
                    <CardDescription>
                      {selectedLawyer
                        ? `Booking with ${lawyers.find((l) => l.id === selectedLawyer)?.name}`
                        : "Select a date and time for your appointment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <div className="sm:w-1/2">
                        <h3 className="mb-2 font-medium">Select Date</h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                          disabled={(date) =>
                            date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                          }
                        />
                      </div>
                      <div className="sm:w-1/2">
                        <h3 className="mb-2 font-medium">Available Time Slots</h3>
                        {selectedDate ? (
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTimeSlot === time ? "default" : "outline"}
                                className="text-sm"
                                onClick={() => setSelectedTimeSlot(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Please select a date to see available time slots.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t">
                    <div className="flex space-x-2">
                      <Button
                        variant={callType === "voice" ? "default" : "outline"}
                        className="flex items-center space-x-2"
                        onClick={() => setCallType("voice")}
                      >
                        <Phone className="h-4 w-4" />
                        <span>Voice Call</span>
                      </Button>
                      <Button
                        variant={callType === "video" ? "default" : "outline"}
                        className="flex items-center space-x-2"
                        onClick={() => setCallType("video")}
                      >
                        <Video className="h-4 w-4" />
                        <span>Video Call</span>
                      </Button>
                    </div>
                    <Button
                      className="bg-primary text-black hover:bg-primary/90"
                      disabled={!selectedDate || !selectedTimeSlot || !callType || selectedLawyer === null}
                      onClick={handleConfirmBooking}
                    >
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
