import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBwCbo-MSfk0ycgHQx7NN9sw7YZK60Vntc';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeImage(imageData: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Remove data URL prefix
    const base64Image = imageData.split(',')[1];
    
    const result = await model.generateContent([
      "Analyze this image in detail. Describe the main elements, colors, composition, mood, and any notable features. If there are any people, describe their expressions and actions. If there's text, include it. If it's a chart or diagram, explain its meaning. Keep the tone engaging and social-media friendly.",
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}