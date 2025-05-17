"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Loader2, Download, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { jsPDF } from "jspdf"

interface SavedDocument {
  id: string
  title: string
  type: string
  date: string
  status: string
  content?: string
}

export default function DocumentGeneratorForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editDocId = searchParams.get("edit")

  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    documentType: "",
    purpose: "",
    details: "",
  })

  const documentTypes: { [key: string]: string } = {
    "1": "Affidavit",
    "2": "Complaint Letter",
    "3": "RTI Application",
    "4": "Legal Notice",
    "5": "Power of Attorney",
    "6": "Will",
  }

  // Load saved documents and check if we're editing an existing document
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

    // Check if we're editing an existing document
    if (editDocId) {
      try {
        const editingDocJson = localStorage.getItem("editingDocument")
        if (editingDocJson) {
          const editingDoc = JSON.parse(editingDocJson)

          // Set the document content
          setGeneratedDocument(editingDoc.content || "")
          setIsGenerated(true)

          // Try to extract form data from the document (simplified)
          // In a real app, you'd have a more robust parsing mechanism
          const lines = editingDoc.content?.split("\n") || []
          const extractedData = {
            fullName: extractValue(lines, "Name"),
            address: extractValue(lines, "Address"),
            city: extractValue(lines, "City"),
            state: extractValue(lines, "State"),
            pincode: extractValue(lines, "Pincode"),
            purpose: extractValue(lines, "Purpose"),
            details: extractValue(lines, "Details"),
            documentType: documentTypes[params.id] || "",
          }

          // Update form data with extracted values
          setFormData((prev) => ({
            ...prev,
            ...extractedData,
          }))

          // Clean up
          localStorage.removeItem("editingDocument")
        }
      } catch (error) {
        console.error("Error loading document for editing:", error)
      }
    }
  }, [editDocId, params.id])

  // Helper function to extract values from document content
  const extractValue = (lines: string[], field: string): string => {
    const line = lines.find((l) => l.includes(`${field}:`))
    if (!line) return ""
    return line.split(`${field}:`)[1]?.trim() || ""
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  // Generate a document without relying on the API
  const handleGenerateDocument = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Instead of making an API call, we'll generate the document locally
      // This avoids potential API errors while still providing functionality

      const docType = documentTypes[params.id] || "Document"
      const currentDate = new Date().toLocaleDateString()

      // Generate document based on type
      let documentContent = ""

      if (docType === "Affidavit") {
        documentContent = `
AFFIDAVIT

I, ${formData.fullName || "[Your Name]"}, son/daughter of [Father's Name], aged [Age] years, resident of ${formData.address || "[Address]"}, ${formData.city || "[City]"}, ${formData.state || "[State]"}, ${formData.pincode || "[Pincode]"}, do hereby solemnly affirm and declare as follows:

1. That I am the deponent in this affidavit and am fully competent to swear this affidavit.
2. That I am submitting this affidavit for the purpose of ${formData.purpose || "[Purpose]"}.
3. ${formData.details || "That the contents of this affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom."}

I solemnly affirm that the contents of this affidavit are true to the best of my knowledge and belief and nothing has been concealed therein and that I am fully aware that I am liable for action under the law if any information provided herein is found to be false.

Date: ${currentDate}
Place: ${formData.city || "[City]"}

Deponent
`
      } else if (docType === "Complaint Letter") {
        documentContent = `
COMPLAINT LETTER

From:
${formData.fullName || "[Your Name]"}
${formData.address || "[Address]"}
${formData.city || "[City]"}, ${formData.state || "[State]"} - ${formData.pincode || "[Pincode]"}

Date: ${currentDate}

To:
[Recipient Name]
[Recipient Designation]
[Organization Name]
[Organization Address]

Subject: Complaint regarding ${formData.purpose || "[Subject of Complaint]"}

Dear Sir/Madam,

I am writing this letter to bring to your attention ${formData.purpose || "[Subject of Complaint]"}.

${formData.details || "Please provide details of your complaint here, including relevant dates, locations, and persons involved. Be specific about what happened and how it has affected you."}

I request you to look into this matter at the earliest and take appropriate action. I am available for any further information or clarification that you may require.

Thank you for your attention to this matter.

Yours sincerely,

${formData.fullName || "[Your Name]"}
Contact: [Your Phone Number]
Email: [Your Email Address]
`
      } else {
        // Generic document template for other types
        documentContent = `
${docType.toUpperCase()}

Date: ${currentDate}

From:
${formData.fullName || "[Your Name]"}
${formData.address || "[Address]"}
${formData.city || "[City]"}, ${formData.state || "[State]"} - ${formData.pincode || "[Pincode]"}

Purpose: ${formData.purpose || "[Purpose]"}

Details:
${formData.details || "[Please provide detailed information relevant to this document]"}

This document is prepared for the purpose mentioned above and contains information provided by the undersigned.

Signed,

${formData.fullName || "[Your Name]"}
Date: ${currentDate}
Place: ${formData.city || "[City]"}
`
      }

      // Set the generated document
      setGeneratedDocument(documentContent)

      // Document generated successfully
      setIsGenerating(false)
      setIsGenerated(true)
    } catch (error) {
      console.error("Error generating document:", error)
      setIsGenerating(false)
      setError("Failed to generate document. Please try again.")
    }
  }

  // Download the document as PDF
  const handleDownloadPDF = () => {
    if (!generatedDocument) {
      toast({
        title: "No document to download",
        description: "Please generate a document first before downloading.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)

    try {
      const docType = documentTypes[params.id] || "Document"
      const fileName = `${docType}_${formData.purpose ? formData.purpose.replace(/\s+/g, "_") : "Document"}.pdf`

      // Create a new jsPDF instance
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Set font size and type
      doc.setFontSize(12)

      // Split the document content into lines
      const lines = generatedDocument.split("\n")

      // Add content to PDF
      let y = 20 // Starting y position

      // Add title with larger font
      if (lines.length > 0 && lines[1].trim()) {
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text(lines[1].trim(), 105, y, { align: "center" })
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        y += 15
      }

      // Add the rest of the content
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line) {
          // Check if this is a heading (all caps)
          if (line === line.toUpperCase() && line.length > 3) {
            doc.setFont("helvetica", "bold")
            y += 5 // Add some space before headings
          } else {
            doc.setFont("helvetica", "normal")
          }

          // Handle long lines by wrapping text
          const textLines = doc.splitTextToSize(line, 180)
          doc.text(textLines, 15, y)
          y += 7 * textLines.length

          // Add extra space after paragraphs
          if (line === "") {
            y += 5
          }

          // Check if we need a new page
          if (y > 270) {
            doc.addPage()
            y = 20
          }
        } else {
          y += 5 // Empty line spacing
        }
      }

      // Save the PDF
      doc.save(fileName)

      // Show success message
      toast({
        title: "Document downloaded",
        description: `Your ${docType} has been downloaded as a PDF.`,
      })
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast({
        title: "Failed to download document",
        description: "An error occurred while creating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Save the current document as a draft
  const handleSaveDraft = () => {
    if (!generatedDocument) {
      toast({
        title: "No document to save",
        description: "Please generate a document first before saving a draft.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const docType = documentTypes[params.id] || "Document"
      const draftTitle = `${docType} - ${formData.purpose || "Draft"}`

      // Check if we're editing an existing document
      const existingDocIndex = editDocId ? savedDocuments.findIndex((doc) => doc.id === editDocId) : -1

      // Create a new document object
      const documentObj: SavedDocument = {
        id: editDocId || Date.now().toString(),
        title: draftTitle,
        type: docType,
        date: new Date().toLocaleDateString(),
        status: "Draft",
        content: generatedDocument,
      }

      let updatedDocs: SavedDocument[]

      if (existingDocIndex >= 0) {
        // Update existing document
        updatedDocs = [...savedDocuments]
        updatedDocs[existingDocIndex] = documentObj
      } else {
        // Add new document
        updatedDocs = [...savedDocuments, documentObj]
      }

      // Save to localStorage
      localStorage.setItem("savedDocumentDrafts", JSON.stringify(updatedDocs))

      // Update state
      setSavedDocuments(updatedDocs)

      toast({
        title: "Document saved successfully",
        description: `Your ${docType} has been saved as a draft.`,
      })
    } catch (error) {
      console.error("Error saving document:", error)
      toast({
        title: "Failed to save document",
        description: "An error occurred while saving your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/document-generator"
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Document Types
        </Link>
        <h1 className="text-3xl font-bold text-black">Generate {documentTypes[params.id] || "Document"}</h1>
        <p className="mt-2 text-gray-600">Fill in the required information to generate your document</p>
      </div>

      {!isGenerated ? (
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary" : "bg-gray-200"} text-black`}
                >
                  1
                </div>
                <div className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary" : "bg-gray-200"} text-black`}
                >
                  2
                </div>
                <div className={`h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary" : "bg-gray-200"} text-black`}
                >
                  3
                </div>
              </div>
              <div className="text-sm font-medium">Step {step} of 3</div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Personal Information"}
                {step === 2 && "Document Details"}
                {step === 3 && "Review & Generate"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Provide your personal information for the document"}
                {step === 2 && "Specify the details needed for your document"}
                {step === 3 && "Review your information and generate the document"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter your pincode"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) => handleSelectChange("documentType", value)}
                    >
                      <SelectTrigger id="documentType">
                        <SelectValue placeholder={documentTypes[params.id] || "Select document type"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="affidavit">Affidavit</SelectItem>
                        <SelectItem value="complaint">Complaint Letter</SelectItem>
                        <SelectItem value="rti">RTI Application</SelectItem>
                        <SelectItem value="notice">Legal Notice</SelectItem>
                        <SelectItem value="poa">Power of Attorney</SelectItem>
                        <SelectItem value="will">Will</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      placeholder="Enter the purpose of this document"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Additional Details</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Provide any additional details or specific requirements"
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Personal Information</h3>
                    <div className="rounded-md bg-gray-50 p-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                          <dd className="mt-1 text-sm text-black">{formData.fullName || "Not provided"}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="mt-1 text-sm text-black">{formData.address || "Not provided"}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">City</dt>
                          <dd className="mt-1 text-sm text-black">{formData.city || "Not provided"}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">State</dt>
                          <dd className="mt-1 text-sm text-black">{formData.state || "Not provided"}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Pincode</dt>
                          <dd className="mt-1 text-sm text-black">{formData.pincode || "Not provided"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">Document Details</h3>
                    <div className="rounded-md bg-gray-50 p-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Document Type</dt>
                          <dd className="mt-1 text-sm text-black">{documentTypes[params.id] || "Not selected"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                          <dd className="mt-1 text-sm text-black">{formData.purpose || "Not provided"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Additional Details</dt>
                          <dd className="mt-1 text-sm text-black">{formData.details || "Not provided"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-md bg-red-50 p-4 text-red-800">
                      <p>{error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
              ) : (
                <Button variant="outline" onClick={() => router.push("/document-generator")}>
                  Cancel
                </Button>
              )}
              {step < 3 ? (
                <Button className="bg-primary text-black hover:bg-primary/90" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-primary text-black hover:bg-primary/90"
                  onClick={handleGenerateDocument}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Document"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Document Generated Successfully</CardTitle>
              <CardDescription>
                Your {documentTypes[params.id]} has been generated. You can preview, edit, or download it as a PDF.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="rounded-md border p-6">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{generatedDocument}</pre>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-4">
                  <div className="space-y-4">
                    <Textarea
                      rows={20}
                      value={generatedDocument}
                      onChange={(e) => setGeneratedDocument(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => setIsGenerated(false)}>
                Back to Form
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving} className="flex items-center">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex items-center bg-primary text-black hover:bg-primary/90"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
