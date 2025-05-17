import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIInfoCard() {
  return (
    <Card className="yellow-card golden-glow overflow-hidden">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFD166]/30"></div>
      <CardHeader className="relative z-10">
        <CardTitle>AI-Powered Legal Assistance</CardTitle>
        <CardDescription>
          SAKHI.AI uses advanced AI capabilities to provide legal assistance tailored to women's needs
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-sm text-gray-600">
          Our AI assistant understands and responds to the unique legal challenges women face. Its advanced capabilities
          allow us to provide nuanced, contextual guidance on complex legal matters. While our AI provides helpful
          information specifically designed for women's concerns, we always recommend consulting with a qualified legal
          professional for personalized legal advice.
        </p>
      </CardContent>
    </Card>
  )
}
