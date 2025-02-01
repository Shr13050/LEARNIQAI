// // app/api/analyze-resume/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import pdfParse from 'pdf-parse';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = process.env.GOOGLE_API_KEY;
// if (!apiKey) {
//   throw new Error('Google API key is missing');
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const getGeminiResponse = async (input: string): Promise<string> => {
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//   const result = await model.generateContent([input]);
//   const response = await result.response;
//   return response.text();
// };

// const inputPrompt = `
// Hey Act Like a skilled or very experienced ATS(Application Tracking System) with a deep understanding of the tech field, software engineering, data science, data analyst, and big data engineering. Your task is to evaluate the resume based on the given job description. You must consider that the job market is very competitive, and you should provide the best assistance for improving the resume. Assign the percentage matching based on the JD and the missing keywords with high accuracy.

// resume: {text}
// description: {jd}

// I want the response in one single string with the structure: {{"JD Match":"%", "MissingKeywords":[], "Profile Summary":""}}
// `;

// const parsePdf = async (buffer: Buffer): Promise<string> => {
//   try {
//     const data = await pdfParse(buffer);
//     return data.text;
//   } catch (err) {
//     console.error('Error parsing PDF:', err);
//     throw new Error('Failed to parse PDF file');
//   }
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const jd = formData.get('jd') as string;
//     const resumeFile = formData.get('resume') as File;

//     if (!jd || !resumeFile) {
//       return NextResponse.json(
//         { error: 'Missing job description or resume file' },
//         { status: 400 }
//       );
//     }

//     if (!resumeFile.type.includes('pdf')) {
//       return NextResponse.json(
//         { error: 'Only PDF files are supported' },
//         { status: 400 }
//       );
//     }

//     const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
//     const resumeText = await parsePdf(resumeBuffer);

//     const formattedPrompt = inputPrompt
//       .replace('{text}', resumeText)
//       .replace('{jd}', jd);
    
//     const atsResponse = await getGeminiResponse(formattedPrompt);

//     return NextResponse.json({ atsResponse });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Error processing resume';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import pdfParse from 'pdf-parse';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = process.env.GOOGLE_API_KEY;
// if (!apiKey) {
//   throw new Error('Google API key is missing');
// }

// const genAI = new GoogleGenerativeAI(apiKey);

// const getGeminiResponse = async (input: string): Promise<string> => {
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//   const result = await model.generateContent([input]);
//   const response = await result.response;
//   return response.text();
// };

// const inputPrompt = `
// Hey Act Like a skilled or very experienced ATS(Application Tracking System) with a deep understanding of the tech field, software engineering, data science, data analyst, and big data engineering. Your task is to evaluate the resume based on the given job description. You must consider that the job market is very competitive, and you should provide the best assistance for improving the resume. Assign the percentage matching based on the JD and the missing keywords with high accuracy.

// resume: {text}
// description: {jd}

// I want the response in one single string with the structure: {{"JD Match":"%", "MissingKeywords":[], "Profile Summary":""}}
// `;

// const parsePdf = async (buffer: Buffer): Promise<string> => {
//   try {
//     const data = await pdfParse(buffer);
//     return data.text;
//   } catch (err) {
//     console.error('Error parsing PDF:', err);
//     throw new Error('Failed to parse PDF file');
//   }
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const jd = formData.get('jd') as string;
//     const resumeFile = formData.get('resume') as File;

//     if (!jd || !resumeFile) {
//       return NextResponse.json(
//         { error: 'Missing job description or resume file' },
//         { status: 400 }
//       );
//     }

//     if (!resumeFile.type.includes('pdf')) {
//       return NextResponse.json(
//         { error: 'Only PDF files are supported' },
//         { status: 400 }
//       );
//     }

//     const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
//     const resumeText = await parsePdf(resumeBuffer);

//     const formattedPrompt = inputPrompt
//       .replace('{text}', resumeText)
//       .replace('{jd}', jd);

//     const atsResponse = await getGeminiResponse(formattedPrompt);

//     return NextResponse.json({ atsResponse });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Error processing resume';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('pdf') as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse the PDF
    const pdfData = await pdfParse(buffer);
    
    return NextResponse.json({ text: pdfData.text });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Error processing PDF file' },
      { status: 500 }
    );
  }
}