"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, ArrowRight, Trash2, Edit } from "lucide-react"
import DocumentCard from "./document-card"
import { toast } from "@/hooks/use-toast"

interface SavedDocument {
  id: string
  title: string
  type: string
  date: string
  status: string
  content?: string
}

export default function DocumentGenerator() {
  const router = useRouter()
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([])

  // Load saved documents from localStorage on component mount
  useEffect(() => {
    const loadSavedDocuments = () => {
      try {
        const savedDocsJson = localStorage.getItem("savedDocumentDrafts")
        if (savedDocsJson) {
          const docs = JSON.parse(savedDocsJson)
          setSavedDocuments(docs)
        }
      } catch (error) {
        console.error("Error loading saved documents:", error)
      }
    }

    loadSavedDocuments()
  }, [])

  const documentTypes = [
    {
      id: 1,
      title: "Affidavit",
      description: "A written statement confirmed by oath or affirmation for use as evidence in court.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: true,
    },
    {
      id: 2,
      title: "Complaint Letter",
      description: "A formal letter expressing dissatisfaction with a product, service, or situation.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: false,
    },
    {
      id: 3,
      title: "RTI Application",
      description: "A request for information or records under the Right to Information Act.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: true,
    },
    {
      id: 4,
      title: "Legal Notice",
      description: "A formal communication that informs a party of your intention to take legal action.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: false,
    },
    {
      id: 5,
      title: "Power of Attorney",
      description: "A legal document giving someone authority to act on your behalf.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: true,
    },
    {
      id: 6,
      title: "Will",
      description:
        "A legal document expressing a person's wishes regarding the distribution of their property after death.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      popular: false,
    },
  ]

  // Remove the static recentDocuments array
  // const recentDocuments = [
  //   {
  //     id: 1,
  //     title: "Rental Agreement",
  //     date: "May 10, 2025",
  //     status: "Completed",
  //   },
  //   {
  //     id: 2,
  //     title: "Complaint Letter",
  //     date: "May 5, 2025",
  //     status: "Draft",
  //   },
  // ]

  const handleDownload = (doc: SavedDocument) => {
    try {
      // Create a Blob with the document content
      const blob = new Blob([doc.content || ""], { type: "text/plain" })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${doc.title}.txt`
      document.body.appendChild(a)
      a.click()

      // Clean up
      URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Document downloaded",
        description: `${doc.title} has been downloaded successfully.`,
      })
    } catch (error) {
      console.error("Error downloading document:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading your document.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (docId: string) => {
    // Find the document type ID based on the document title
    const doc = savedDocuments.find((d) => d.id === docId)
    if (!doc) return

    // Extract document type from title
    let typeId = "1" // Default to Affidavit

    if (doc.type.includes("Affidavit")) typeId = "1"
    else if (doc.type.includes("Complaint")) typeId = "2"
    else if (doc.type.includes("RTI")) typeId = "3"
    else if (doc.type.includes("Legal Notice")) typeId = "4"
    else if (doc.type.includes("Power of Attorney")) typeId = "5"
    else if (doc.type.includes("Will")) typeId = "6"

    // Store the document being edited in localStorage
    localStorage.setItem("editingDocument", JSON.stringify(doc))

    // Navigate to the document editor
    router.push(`/document-generator/${typeId}?edit=${docId}`)
  }

  const handleDelete = (docId: string) => {
    try {
      // Filter out the document to delete
      const updatedDocs = savedDocuments.filter((doc) => doc.id !== docId)

      // Update localStorage
      localStorage.setItem("savedDocumentDrafts", JSON.stringify(updatedDocs))

      // Update state
      setSavedDocuments(updatedDocs)

      toast({
        title: "Document deleted",
        description: "The document has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Delete failed",
        description: "There was an error deleting your document.",
        variant: "destructive",
      })
    }
  }

  const handleCreateDocument = () => {
    router.push(`/document-generator/1`) // Default to affidavit for custom document
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">AI Legal Document Generator</h1>
        <p className="mt-4 text-lg text-gray-600">
          Create professional legal documents tailored to your specific needs with our AI assistant.
        </p>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Document</TabsTrigger>
            <TabsTrigger value="my-documents">My Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="mt-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Select Document Type</h2>
              <p className="text-gray-600">Choose the type of document you want to create</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documentTypes.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="my-documents" className="mt-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Your Documents</h2>
              <p className="text-gray-600">Access and manage your created documents</p>
            </div>

            {savedDocuments.length > 0 ? (
              <div className="space-y-4">
                {savedDocuments.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <p className="text-sm text-gray-500">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={
                            doc.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {doc.status}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-primary text-black hover:bg-primary/90"
                          onClick={() => handleEdit(doc.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-xl font-medium">No documents yet</h3>
                  <p className="mb-6 text-gray-600">
                    You haven't created any documents yet. Start by creating your first document.
                  </p>
                  <Button
                    className="bg-primary text-black hover:bg-primary/90"
                    onClick={() => router.push("/document-generator/1")}
                  >
                    Create Document
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 rounded-lg bg-gray-50 p-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="text-2xl font-semibold">Need a Custom Document?</h2>
            <p className="mt-2 text-gray-600">
              Our AI can help you create custom legal documents based on your specific requirements.
            </p>
          </div>
          <Button className="button-hover bg-primary text-black hover:bg-primary/90" onClick={handleCreateDocument}>
            Start Custom Document
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Badge component for this page
const Badge = ({ children, className, variant }: any) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant === "outline" ? "border" : ""
      } ${className}`}
    >
      {children}
    </span>
  )
}
