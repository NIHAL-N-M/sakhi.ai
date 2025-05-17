"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, FileText, Users, BookOpen, Star, Sparkles } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  // Animation variants for text
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  }

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.9,
        ease: "easeOut",
      },
    },
  }

  // Text animation for the typing effect
  const typewriterVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 2.5,
        ease: "easeInOut",
      },
    },
  }

  // Animation for decorative elements
  const decorationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with Yellow Background */}
      <section className="relative yellow-gradient py-20">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-[#FFD166]/40 blur-xl"></div>
        <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-[#FFD166]/40 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 h-16 w-16 rounded-full bg-[#FFD166]/30 blur-lg"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="mb-12 max-w-xl">
              <motion.div
                className="mb-6 flex justify-center"
                initial="hidden"
                animate="visible"
                variants={decorationVariants}
              >
                <div className="h-16 w-16 rounded-full bg-[#FFD166] flex items-center justify-center shadow-lg">
                  <Sparkles className="h-8 w-8 text-black" />
                </div>
              </motion.div>

              <motion.h1
                className="mb-6 text-center text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl md:text-6xl"
                initial="hidden"
                animate="visible"
                variants={titleVariants}
              >
                <span className="text-[#FFD166]">SAKHI</span>.AI
              </motion.h1>

              <motion.h2
                className="mb-8 text-center text-2xl font-semibold text-gray-800"
                initial="hidden"
                animate="visible"
                variants={subtitleVariants}
              >
                Legal & Financial Empowerment for Women
              </motion.h2>

              <div className="relative overflow-hidden">
                <motion.div
                  className="relative overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  variants={typewriterVariants}
                >
                  <p className="text-center text-lg text-gray-600 whitespace-nowrap overflow-hidden">
                    Empowering women through AI-powered legal and financial assistance
                  </p>
                </motion.div>
              </div>

              <motion.p
                className="mt-4 text-center text-lg text-gray-600"
                initial="hidden"
                animate="visible"
                variants={descriptionVariants}
              >
                SAKHI.AI is your trusted companion on the journey to legal and financial independence. We provide women
                with AI-powered assistance, connect you with supportive lawyers, and offer resources tailored to your
                unique needs.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
              >
                <Button
                  className="button-hover golden-glow bg-[#FFD166] text-black hover:bg-[#FFBE0B]"
                  size="lg"
                  onClick={() => router.push("/test-chatbot")}
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  className="button-hover border-[#FFD166] bg-white"
                  size="lg"
                  onClick={() => router.push("/education")}
                >
                  Explore Resources
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Yellow wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section with Yellow Accents */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-[#FFD166]/20 rounded-full">
              <span className="text-black font-medium">Designed for Women</span>
            </div>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              <span className="yellow-highlight">Empowering</span> Features for Women
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform offers a comprehensive suite of tools designed to provide legal and financial support
              specifically tailored to women's needs.
            </p>

            {/* Yellow divider */}
            <div className="flex justify-center mt-6">
              <div className="h-1 w-20 bg-[#FFD166] rounded-full"></div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-[#FFD166]" />}
              title="AI Legal Companion"
              description="Get instant answers to your legal questions from our supportive AI assistant, designed with women's concerns in mind."
              link="/test-chatbot"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#FFD166]" />}
              title="Women-Friendly Lawyers"
              description="Connect with empathetic lawyers who specialize in women's legal issues and rights protection."
              link="/lawyer-connect"
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-[#FFD166]" />}
              title="Document Creator"
              description="Create legal documents tailored to your specific needs with guidance every step of the way."
              link="/document-generator"
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-[#FFD166]" />}
              title="Know Your Rights"
              description="Access educational resources designed to help women understand their legal and financial rights."
              link="/education"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section with Yellow Background */}
      <section className="yellow-pattern py-20 relative">
        <div className="absolute inset-0 bg-[#FFD166]/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-white rounded-full shadow-sm">
              <span className="text-black font-medium">Simple Process</span>
            </div>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">How SAKHI.AI Supports Women</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform simplifies the process of getting legal and financial assistance, with a focus on women's
              unique challenges.
            </p>

            {/* Yellow divider */}
            <div className="flex justify-center mt-6">
              <div className="h-1 w-20 bg-[#FFD166] rounded-full"></div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-hover rounded-lg border border-[#FFD166]/30 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD166] text-black">
                1
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black">Ask Your Questions</h3>
              <p className="mt-2 text-gray-600">
                Use our AI chatbot to get answers to your legal and financial questions in a safe, judgment-free space.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-hover rounded-lg border border-[#FFD166]/30 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD166] text-black">
                2
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black">Create Your Documents</h3>
              <p className="mt-2 text-gray-600">
                Generate legal documents tailored to your specific situation with guidance that respects your choices.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-hover rounded-lg border border-[#FFD166]/30 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD166] text-black">
                3
              </div>
              <h3 className="mt-4 text-xl font-semibold text-black">Connect with Support</h3>
              <p className="mt-2 text-gray-600">
                Schedule consultations with women-friendly lawyers or find women-focused NGOs and support organizations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Yellow Accents */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block mb-4 px-6 py-2 bg-[#FFD166]/20 rounded-full">
              <span className="text-black font-medium">Real Stories</span>
            </div>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Women's <span className="yellow-highlight">Success Stories</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See how SAKHI.AI has helped women navigate legal and financial challenges with confidence.
            </p>

            {/* Yellow divider */}
            <div className="flex justify-center mt-6">
              <div className="h-1 w-20 bg-[#FFD166] rounded-full"></div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="SAKHI.AI was my guiding light during my divorce proceedings. The AI chatbot provided clear guidance on my rights, and I connected with a compassionate lawyer who truly understood my situation."
              author="Priya S."
              role="Delhi"
            />
            <TestimonialCard
              quote="As a woman facing workplace harassment, I felt alone and confused. The document generator helped me create a formal complaint letter, and the resources taught me about my legal protections."
              author="Anita K."
              role="Mumbai"
            />
            <TestimonialCard
              quote="Being from a rural area with limited access to legal resources, SAKHI.AI has been my lifeline. I learned about government schemes specifically for women and how to apply for financial support."
              author="Lakshmi R."
              role="Tamil Nadu"
            />
          </div>

          {/* Yellow stars decoration */}
          <div className="flex justify-center mt-12 space-x-2">
            <Star className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
            <Star className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
            <Star className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
            <Star className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
            <Star className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
          </div>
          <p className="text-center mt-2 text-sm text-gray-500">Rated 4.9/5 by women across India</p>
        </div>
      </section>

      {/* CTA Section with Enhanced Yellow */}
      <section className="bg-[#FFD166] py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-[#FFBE0B]/30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-[#FFBE0B]/30 translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-block mb-6 px-8 py-3 bg-white rounded-full shadow-md">
              <span className="text-[#FFD166] font-bold text-lg">Join Our Community</span>
            </div>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">Ready to Take the First Step?</h2>
            <p className="mt-4 text-lg text-black">
              Join thousands of women who have found support, guidance, and empowerment through SAKHI.AI.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                className="button-hover golden-glow bg-black text-white hover:bg-black/90"
                size="lg"
                onClick={() => router.push("/test-chatbot")}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                className="button-hover border-black bg-white text-black hover:bg-black/10"
                size="lg"
                onClick={() => router.push("/directory")}
              >
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
