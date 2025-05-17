"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Mic } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ChatExamples from "./chat-examples"
import ChatbotFeedback from "./chatbot-feedback"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SAKHI.AI, your personal legal assistant. I'm here to help women with questions about domestic violence laws, property rights, workplace harassment, and other legal matters. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showExamples, setShowExamples] = useState(true)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Update the handleSendMessage function to use the actual API
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

    // Show bot typing indicator
    setIsTyping(true)

    try {
      // Call the API to get a response from Grok
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
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-[#FFD166] p-0 text-black shadow-lg hover:bg-[#FFBE0B] golden-glow"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-lg border bg-white shadow-xl sm:w-[400px] golden-glow"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b bg-[#FFD166] p-4">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-black" />
                <h3 className="font-semibold text-black">SAKHI.AI - Your Personal Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="h-8 w-8 rounded-full p-0 text-black hover:bg-[#FFBE0B]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 women-empowerment-pattern">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[#FFD166] text-black"
                        : "bg-white text-black border border-[#FFD166]/30"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {message.sender === "bot" && message.id > 1 && <ChatbotFeedback messageId={message.id} />}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] rounded-lg bg-white p-3 text-black border border-[#FFD166]/30">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#FFD166]"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-[#FFD166]"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-[#FFD166]"
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

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t border-[#FFD166]/30 p-4 bg-white">
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 rounded-full text-gray-500 hover:bg-[#FFD166]/10 hover:text-black"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about women's rights..."
                  className="flex-1 border-[#FFD166]/30 focus-visible:ring-[#FFD166]"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0 rounded-full bg-[#FFD166] text-black hover:bg-[#FFBE0B]"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotWidget
