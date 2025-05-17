"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface ChatbotFeedbackProps {
  messageId: number
}

export default function ChatbotFeedback({ messageId }: ChatbotFeedbackProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type)
    setShowThankYou(true)

    // In a real implementation, you would send this feedback to your backend
    console.log(`Feedback for message ${messageId}: ${type}`)

    // Hide the thank you message after 3 seconds
    setTimeout(() => {
      setShowThankYou(false)
    }, 3000)
  }

  if (showThankYou) {
    return <div className="mt-1 text-xs text-gray-500">Thank you for your feedback!</div>
  }

  if (feedback) {
    return null
  }

  return (
    <div className="mt-1 flex items-center space-x-2">
      <span className="text-xs text-gray-500">Was this helpful?</span>
      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => handleFeedback("positive")}>
        <ThumbsUp className="h-3 w-3" />
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => handleFeedback("negative")}>
        <ThumbsDown className="h-3 w-3" />
      </Button>
    </div>
  )
}
