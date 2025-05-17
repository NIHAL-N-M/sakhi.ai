"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, Landmark, Coins, Shield } from "lucide-react"
import ResourceCard from "./resource-card"

export default function Education() {
  const router = useRouter()

  const legalResources = [
    {
      id: 1,
      title: "Domestic Violence Protection",
      description: "Learn about your rights and protections under the Protection of Women from Domestic Violence Act.",
      icon: <Landmark className="h-8 w-8 text-primary" />,
      category: "legal",
      popular: true,
    },
    {
      id: 2,
      title: "Women's Safety Rights",
      description:
        "Understand your legal rights to safety, emergency services, and protection in public and private spaces.",
      icon: <Shield className="h-8 w-8 text-primary" />,
      category: "legal",
      popular: true,
    },
  ]

  const financialResources = [
    {
      id: 4,
      title: "Financial Literacy Basics",
      description: "Learn the fundamentals of managing personal finances, budgeting, and saving.",
      icon: <Coins className="h-8 w-8 text-primary" />,
      category: "financial",
      popular: true,
    },
  ]

  const faqs = [
    {
      question: "What is the Protection of Women from Domestic Violence Act?",
      answer:
        "The Protection of Women from Domestic Violence Act, 2005 is a comprehensive legislation that provides protection to women against domestic violence. It covers physical, sexual, verbal, emotional, and economic abuse, and provides for immediate and emergency relief to victims of domestic violence in the form of protection orders, residence orders, monetary relief, custody orders, and compensation orders.",
    },
    {
      question: "How can I file a complaint for workplace harassment?",
      answer:
        "To file a complaint for workplace harassment, you should first report the incident to your organization's Internal Complaints Committee (ICC), which is mandatory under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. If your organization doesn't have an ICC or if you're not satisfied with the outcome, you can file a complaint with the Local Complaints Committee in your district or directly approach the police.",
    },
    {
      question: "What emergency helplines are available for women's safety?",
      answer:
        "There are several emergency helplines available for women in India: Women's Helpline (All India): 181, National Commission for Women Helpline: 011-26942369, Police Emergency Number: 100, and Domestic Violence Helpline: 1800-102-7282. Many states also have their own women's helpline numbers. These services provide immediate assistance, counseling, and can connect you with local authorities.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">Know Your Rights</h1>
        <p className="mt-4 text-lg text-gray-600">
          Access educational resources to understand your legal and financial rights.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search for topics..." className="pl-10" />
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center space-x-2">
              <Landmark className="h-4 w-4" />
              <span>Legal Rights</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center space-x-2">
              <Coins className="h-4 w-4" />
              <span>Financial Literacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...legalResources, ...financialResources].map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {legalResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {financialResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-gray-600">Find answers to common questions about legal and financial rights.</p>

          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="mt-16 rounded-lg bg-primary/20 p-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="text-2xl font-semibold">Have more questions?</h2>
            <p className="mt-2 text-gray-600">
              Our AI assistant can provide personalized information about your legal and financial rights.
            </p>
          </div>
          <Button
            className="button-hover bg-primary text-black hover:bg-primary/90"
            onClick={() => router.push("/test-chatbot")}
          >
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  )
}
