"use client"

import { Button } from "@/components/ui/button"

interface ChatExampleProps {
  onSelectExample: (example: string) => void
}

export default function ChatExamples({ onSelectExample }: ChatExampleProps) {
  const examples = [
    "What are my rights as a woman facing domestic violence?",
    "How can I file a workplace sexual harassment complaint?",
    "What are the property inheritance rights for women in India?",
    "How can I apply for legal aid as a single mother?",
    "What is the process for filing for divorce as a woman in India?",
  ]

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">Common questions women ask:</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs border-[#FFD166]/30 bg-white hover:bg-[#FFD166]/10"
            onClick={() => onSelectExample(example)}
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  )
}
