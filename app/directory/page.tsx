"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Building, Briefcase } from "lucide-react"
import DirectoryCard from "./directory-card"
import { useRouter } from "next/navigation"

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showLocationFilter, setShowLocationFilter] = useState(false)
  const router = useRouter()

  const ngos = [
    {
      id: 1,
      name: "Women's Rights Initiative",
      category: "ngo",
      description: "Providing legal aid and support to women facing domestic violence and discrimination.",
      location: "Delhi",
      contact: "+91 98765 43210",
      website: "https://wri.org",
      tags: ["Legal Aid", "Women's Rights", "Domestic Violence"],
    },
    {
      id: 2,
      name: "Legal Empowerment Foundation",
      category: "ngo",
      description: "Offering free legal services to underprivileged communities across India.",
      location: "Mumbai",
      contact: "+91 98765 43211",
      website: "https://lef.org",
      tags: ["Legal Aid", "Education", "Community Support"],
    },
  ]

  const schemes = [
    {
      id: 3,
      name: "Pradhan Mantri Awas Yojana",
      category: "scheme",
      description: "Government scheme providing affordable housing to the urban and rural poor.",
      location: "Nationwide",
      contact: "1800-111-800",
      website: "https://pmaymis.gov.in",
      tags: ["Housing", "Government", "Financial Aid"],
    },
    {
      id: 4,
      name: "Sukanya Samriddhi Yojana",
      category: "scheme",
      description: "Small savings scheme for girl child education and marriage expenses.",
      location: "Nationwide",
      contact: "1800-111-801",
      website: "https://www.india.gov.in/sukanya-samriddhi-account",
      tags: ["Education", "Financial Aid", "Women's Welfare"],
    },
  ]

  const jobs = [
    {
      id: 5,
      name: "Legal Assistant",
      category: "job",
      description: "Entry-level position assisting lawyers with research and documentation.",
      location: "Bangalore",
      contact: "careers@lawfirm.com",
      website: "https://lawfirm.com/careers",
      tags: ["Legal", "Full-time", "Entry Level"],
    },
    {
      id: 6,
      name: "Remote Content Writer",
      category: "job",
      description: "Create content related to legal awareness and women's rights.",
      location: "Remote",
      contact: "hr@contentfirm.com",
      website: "https://contentfirm.com/jobs",
      tags: ["Content", "Remote", "Part-time"],
    },
  ]

  const allListings = [...ngos, ...schemes, ...jobs]

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleLocationFilter = () => {
    setShowLocationFilter(!showLocationFilter)
  }

  const handleAskAI = () => {
    router.push("/test-chatbot")
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">Resource Directory</h1>
        <p className="mt-4 text-lg text-gray-600">
          Find NGOs, government schemes, and job opportunities to support your legal and financial needs.
        </p>
      </div>

      <div className="mt-12">
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, description, or tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => alert("Filter options would appear here")}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2" onClick={toggleLocationFilter}>
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Button>
          </div>
        </div>

        {showLocationFilter && (
          <div className="mb-4 rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-medium">Filter by Location</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("Delhi")
                  setShowLocationFilter(false)
                }}
              >
                Delhi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("Mumbai")
                  setShowLocationFilter(false)
                }}
              >
                Mumbai
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("Bangalore")
                  setShowLocationFilter(false)
                }}
              >
                Bangalore
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("Remote")
                  setShowLocationFilter(false)
                }}
              >
                Remote
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("Nationwide")
                  setShowLocationFilter(false)
                }}
              >
                Nationwide
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ngo" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>NGOs</span>
            </TabsTrigger>
            <TabsTrigger value="scheme">
              <span>Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="job" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((listing) => (
                  <DirectoryCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border py-12 text-center">
                <p className="mb-4 text-lg font-medium">No results found</p>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </Tabs>
      </div>

      <div className="mt-16 rounded-lg bg-primary/20 p-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="text-2xl font-semibold">Can't find what you're looking for?</h2>
            <p className="mt-2 text-gray-600">
              Our AI assistant can help you find resources tailored to your specific needs.
            </p>
          </div>
          <Button className="button-hover bg-primary text-black hover:bg-primary/90" onClick={handleAskAI}>
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  )
}
