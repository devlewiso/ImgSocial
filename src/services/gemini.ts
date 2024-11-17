import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBtr0eHcuzrHtaLp8cPTWFsEKGwkoKt_Fo');

export async function analyzeImageWithGemini(imageData: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
  // Remove the data URL prefix to get just the base64 data
  const base64Image = imageData.split(',')[1];
  
  const result = await model.generateContent([
    "Describe this image in detail, focusing on the main elements, colors, composition, and any notable features.",
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg"
      }
    }
  ]);

  const response = await result.response;
  return response.text();
}