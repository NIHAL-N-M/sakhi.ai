import { GoogleGenerativeAI } from '@google/generative-ai';

// Add more detailed error handling for the API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Debug logging for environment variables
console.log('Environment variables loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  hasGoogleApiKey: !!GOOGLE_API_KEY,
});

if (!GOOGLE_API_KEY) {
  console.error(`
Missing GOOGLE_API_KEY environment variable. 
Please make sure you have:
1. Created a .env.local file in the project root
2. Added GOOGLE_API_KEY=your_key_here to the file
3. Restarted the Next.js development server
Current environment: ${process.env.NODE_ENV}
`);
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

// Initialize the Gemini AI model with logging
console.log('Initializing Gemini AI...');
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
console.log('Gemini AI initialized successfully with model: gemini-1.5-flash-latest');

export async function generateLegalResponse(prompt: string) {
  try {
    console.log('Generating legal response for prompt:', prompt.substring(0, 100) + '...');
    
    const result = await model.generateContent(`You are a legal assistant specializing in Indian law, with a particular focus on women's rights, gender-based issues, property law, labor law, and family law. Provide accurate, helpful, and empathetic information tailored to women's unique challenges. Your responses should be informative but easy to understand for someone without legal background.

    When discussing legal matters affecting women:
    1. Explain relevant laws and rights in simple terms, highlighting protections specifically for women
    2. Provide practical next steps when appropriate, considering the unique challenges women may face
    3. Mention if there are state-specific variations to consider that might impact women differently
    4. Suggest when professional legal consultation might be necessary and how to find women-friendly legal resources
    5. Be empathetic and supportive in your tone, recognizing the emotional aspects of legal challenges women face
    
    User query: ${prompt}`);

    const response = await result.response;
    console.log('Generated response successfully');
    return { text: response.text() };
  } catch (error) {
    console.error("Error generating legal response with Gemini:", error);
    return {
      text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
    };
  }
}

export async function generateDocument(documentType: string, userInfo: Record<string, string>) {
  try {
    console.log('Generating document:', documentType);
    
    const result = await model.generateContent(`Generate a ${documentType} document using the following information, with special attention to women's rights and protections where applicable:
    
    ${Object.entries(userInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}
    
    Format the document professionally and include all necessary legal language and sections for a valid ${documentType} in India. If this document relates to women's rights (such as domestic violence protection, workplace harassment, etc.), be sure to include specific protections and provisions that apply to women under Indian law.`);

    const response = await result.response;
    console.log('Generated document successfully');
    return { text: response.text() };
  } catch (error) {
    console.error("Error generating document with Gemini:", error);
    return {
      text: "I'm sorry, I encountered an error while generating your document. Please try again later.",
    };
  }
} 