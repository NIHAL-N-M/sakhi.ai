"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Share, Bookmark } from "lucide-react"
import Link from "next/link"

interface ResourcePageProps {
  params: {
    id: string
  }
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const router = useRouter()

  // In a real application, you would fetch this data from an API or database
  const resources = {
    "1": {
      title: "Domestic Violence Protection",
      category: "Legal Rights",
      content: `
        <h2>Understanding Domestic Violence Protection Laws</h2>
        <p>The Protection of Women from Domestic Violence Act, 2005 (PWDVA) is a comprehensive legislation that provides protection to women against domestic violence. This law recognizes various forms of abuse including physical, sexual, verbal, emotional, and economic abuse.</p>
        
        <h3>Key Provisions of the Act</h3>
        <ul>
          <li><strong>Definition of Domestic Violence:</strong> The Act defines domestic violence broadly to include any act, omission, or commission that harms, injures, or endangers the health, safety, life, limb, or well-being of the victim.</li>
          <li><strong>Protection Orders:</strong> Women can obtain protection orders that prevent the abuser from committing acts of domestic violence, contacting the victim, or entering her workplace or residence.</li>
          <li><strong>Residence Orders:</strong> These ensure that women are not forced out of their homes and can continue to live in the shared household regardless of whether they have any title or rights in it.</li>
          <li><strong>Monetary Relief:</strong> Women can claim financial support for expenses incurred due to domestic violence, including medical expenses, loss of earnings, and maintenance.</li>
        </ul>
        
        <h3>How to Seek Help</h3>
        <p>If you are experiencing domestic violence, you can take the following steps:</p>
        <ol>
          <li>File a complaint with a Protection Officer, police officer, or magistrate.</li>
          <li>Seek assistance from service providers like NGOs, shelters, or legal aid services.</li>
          <li>Request for protection orders, residence orders, or monetary relief as needed.</li>
          <li>Contact the National Commission for Women or State Women's Commissions for guidance.</li>
        </ol>
        
        <h3>Important Resources</h3>
        <p>National Helpline for Women: 1091</p>
        <p>Women's Helpline (All India): 181</p>
        <p>National Commission for Women: 011-26942369, 26944754</p>
      `,
    },
    "2": {
      title: "Women's Safety Rights",
      category: "Legal Rights",
      content: `
        <h2>Understanding Your Safety Rights as a Woman</h2>
        <p>Every woman has the right to safety and security, both in public and private spaces. Various laws in India are designed to protect women's safety and provide recourse in case of violations.</p>
        
        <h3>Key Safety Rights</h3>
        <ul>
          <li><strong>Right to Emergency Services:</strong> Women have the right to access emergency services including police assistance, medical care, and crisis intervention without delay or discrimination.</li>
          <li><strong>Right to File Zero FIR:</strong> Women can file an FIR at any police station regardless of where the crime occurred (Zero FIR), which will later be transferred to the appropriate police station.</li>
          <li><strong>Right to Privacy and Dignity:</strong> During reporting, medical examination, and legal proceedings, women have the right to privacy, dignity, and confidentiality.</li>
          <li><strong>Right to Legal Representation:</strong> Women have the right to free legal aid and representation in cases of violence or safety threats.</li>
        </ul>
        
        <h3>Safety Measures and Precautions</h3>
        <p>While it's important to know your rights, taking preventive measures can enhance your safety:</p>
        <ol>
          <li><strong>Emergency Contacts:</strong> Keep emergency contacts readily available, including local police, women's helplines, and trusted family/friends.</li>
          <li><strong>Safety Apps:</strong> Consider using safety apps like Himmat, Nirbhaya, or Shake2Safety that can send SOS alerts with your location to emergency contacts.</li>
          <li><strong>Travel Safety:</strong> When traveling, especially at night, share your location with trusted contacts, use verified transportation services, and stay aware of your surroundings.</li>
          <li><strong>Self-Defense:</strong> Consider learning basic self-defense techniques and carrying legal safety tools like pepper spray where permitted.</li>
        </ol>
        
        <h3>Emergency Helplines</h3>
        <p>Women's Helpline (All India): 181</p>
        <p>Police Emergency: 100</p>
        <p>National Commission for Women: 011-26942369</p>
        <p>Domestic Violence Helpline: 1800-102-7282</p>
      `,
    },
    "4": {
      title: "Financial Literacy Basics",
      category: "Financial Literacy",
      content: `
        <h2>Financial Literacy Fundamentals</h2>
        <p>Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. Developing these skills is crucial for achieving financial independence and security.</p>
        
        <h3>Budgeting Basics</h3>
        <p>A budget is a plan that helps you track your income and expenses. Here's how to create an effective budget:</p>
        <ol>
          <li><strong>Track Your Income:</strong> List all sources of income, including salary, business income, rental income, etc.</li>
          <li><strong>List Your Expenses:</strong> Categorize your expenses into fixed (rent, loan payments) and variable (groceries, entertainment).</li>
          <li><strong>Set Financial Goals:</strong> Define short-term and long-term financial goals.</li>
          <li><strong>Create a Spending Plan:</strong> Allocate your income to different expense categories and savings.</li>
          <li><strong>Review and Adjust:</strong> Regularly review your budget and make adjustments as needed.</li>
        </ol>
        
        <h3>Saving and Investing</h3>
        <p>Saving is setting aside money for future use, while investing is putting money into assets with the expectation of generating returns. Here are some basic principles:</p>
        <ul>
          <li><strong>Emergency Fund:</strong> Aim to save 3-6 months of living expenses for emergencies.</li>
          <li><strong>Retirement Planning:</strong> Start saving for retirement early to benefit from compound interest.</li>
          <li><strong>Diversification:</strong> Spread your investments across different asset classes to reduce risk.</li>
          <li><strong>Risk Assessment:</strong> Understand your risk tolerance before making investment decisions.</li>
        </ul>
        
        <h3>Managing Debt</h3>
        <p>Debt management is a crucial aspect of financial literacy. Here are some tips:</p>
        <ul>
          <li>Prioritize high-interest debt for repayment.</li>
          <li>Avoid taking on unnecessary debt.</li>
          <li>Understand the terms and conditions of loans before borrowing.</li>
          <li>Regularly check your credit score and report.</li>
        </ul>
      `,
    },
  }

  const resource = resources[params.id as keyof typeof resources]

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">Resource Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">The resource you are looking for does not exist.</p>
          <Button className="mt-8 bg-primary text-black hover:bg-primary/90" asChild>
            <Link href="/education">Back to Resources</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleBookmark = () => {
    alert(`${resource.title} has been bookmarked`)
    // In a real app, this would save to user's bookmarks
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: `Check out this resource on ${resource.title}`,
        url: window.location.href,
      })
    } else {
      alert(`Share link copied to clipboard`)
      // In a real app, this would copy the URL to clipboard
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/education"
          className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
        <h1 className="text-3xl font-bold text-black sm:text-4xl">{resource.title}</h1>
        <div className="mt-2 flex items-center">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-black">
            {resource.category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <Tabs defaultValue="content">
              <div className="border-b">
                <div className="flex items-center justify-between px-4">
                  <TabsList className="h-14">
                    <TabsTrigger value="content" className="text-sm">
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="text-sm">
                      Additional Resources
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={handleBookmark}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <TabsContent value="content" className="p-6">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: resource.content }} />
              </TabsContent>
              <TabsContent value="resources" className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Helpful Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.ncw.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        National Commission for Women
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.iwcwtministry.org/?gad_source=1&gad_campaignid=15372368053&gbraid=0AAAAADJSuSu-cpmJmjNk9nlgsaYLSDZ92&gclid=Cj0KCQjwxJvBBhDuARIsAGUgNfgfmL28cGmSTvR0u5OH_7i4psiMA8BA8QunhIVyMyOc7JG8oJkvEOcaAiMsEALw_wcB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ministry of Women and Child Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://kslsa.kar.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Legal Services Authority
                      </a>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Need Personalized Help?</h3>
            <p className="mb-4 text-sm text-gray-600">
              Our AI assistant can provide personalized guidance based on your specific situation.
            </p>
            <Button
              className="w-full bg-primary text-black hover:bg-primary/90"
              onClick={() => router.push("/test-chatbot")}
            >
              Ask AI Assistant
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
