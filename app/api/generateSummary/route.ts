// app/api/generateSummary/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('API key is missing in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

export async function POST(request: Request) {
  try {
    const { transcriptText } = await request.json();

    if (!transcriptText) {
      return NextResponse.json(
        { error: 'Transcript text is required' },
        { status: 400 }
      );
    }

    const prompt = `
      You are a YouTube video summarizer. You will be taking the transcript text
      and summarizing the entire video and providing the important summary in points
      within 250 words. Please provide the summary of the text given here: ${transcriptText}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ summary: text });
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return NextResponse.json(
      { error: 'Error generating summary' },
      { status: 500 }
    );
  }
}