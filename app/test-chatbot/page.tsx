"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import ChatExamples from "@/components/chat-examples"
import ChatbotFeedback from "@/components/chatbot-feedback"
import ClientTimestamp from "@/components/ClientTimestamp"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function TestChatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SAKHI.AI's legal assistant. I specialize in helping women with questions about domestic violence laws, property rights, workplace harassment, and other legal matters that affect women. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showExamples, setShowExamples] = useState(true)

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setShowExamples(false)

    // Show bot typing indicator
    setIsTyping(true)

    try {
      // Call the API to get a response from AI
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await response.json()

      const newBotMessage: Message = {
        id: messages.length + 2,
        text: data.response || "I'm sorry, I couldn't process your request at this time.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)

      // Add error message
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSelectExample = (example: string) => {
    setInput(example)
    setShowExamples(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-semibold text-center text-black">Chat with the Women's Legal Assistant</h1>

        <Card className="border-2 border-[#FFD166] shadow-sm">
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4 bg-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[#FFD166] text-black font-medium"
                        : "bg-gray-100 text-black font-medium"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <ClientTimestamp timestamp={message.timestamp} />
                      {message.sender === "bot" && message.id > 1 && <ChatbotFeedback messageId={message.id} />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 text-black">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show examples if there's only the initial message */}
              {showExamples && messages.length === 1 && (
                <div className="mt-4">
                  <ChatExamples onSelectExample={handleSelectExample} />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-gray-200 py-3 text-base"
              />
              <Button
                type="submit"
                className="bg-[#FFD166] text-black hover:bg-[#FFBE0B]"
                disabled={!input.trim() || isTyping}
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
