// "use client"
// import React, { useState } from 'react';
// import { Upload, FileText, Book, ChevronDown, ChevronUp, RotateCw } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { chatSession } from '@/utils/AiModel';

// // ... Section component remains the same ...
// const Section = ({ title, children, defaultOpen = false }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
  
//   return (
//     <div className="border rounded-lg mb-4">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 rounded-t-lg hover:bg-gray-100"
//       >
//         <span className="font-medium">{title}</span>
//         {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//       </button>
//       {isOpen && (
//         <div className="p-4 border-t">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const ResearchPaperSummarizer = () => {
//   const [file, setFile] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState(null);
//   const [detailLevel, setDetailLevel] = useState('balanced');
//   const [outputFormat, setOutputFormat] = useState('markdown');

//   // ... handleFileUpload, readFileContent, and generatePrompt functions remain the same ...
//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     setFile(uploadedFile);
//     setError(null);
//   };

//   const readFileContent = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => resolve(event.target.result);
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   };

//   const generatePrompt = (content, detailLevel) => {
//     const detailLevelInstructions = {
//       concise: "Provide a brief overview focusing only on the most crucial findings and methodology.",
//       balanced: "Create a comprehensive summary including key findings, methodology, and important details.",
//       detailed: "Generate an in-depth analysis covering all aspects of the paper including nuanced details."
//     };

//     return `
//       Analyze and summarize the following research paper content. 
//       ${detailLevelInstructions[detailLevel]}
      
//       Please structure the response as follows:
//       1. Title and Brief Overview
//       2. Key Insights (3-5 bullet points)
//       3. Section-by-Section Summary (Abstract, Methods, Results, Discussion)
      
//       Paper content:
//       ${content}
//     `;
//   };

//   const processPaper = async () => {
//     try {
//       setIsProcessing(true);
//       setError(null);

//       if (!file) {
//         throw new Error('Please upload a file first');
//       }

//       const content = await readFileContent(file);
//       const prompt = generatePrompt(content, detailLevel);
//       const result = await chatSession.sendMessage(prompt);
//       const response = await result.response;
//       const text = response.text();

//       // Parse the response and structure it
//       const sections = text.split('\n\n').reduce((acc, section) => {
//         if (section.startsWith('Title')) {
//           acc.title = section.split('\n')[1];
//         } else if (section.includes('Key Insights')) {
//           acc.keyInsights = section
//             .split('\n')
//             .filter(line => line.trim().startsWith('-'))
//             .map(line => line.trim().substring(2));
//         } else {
//           const sectionMatch = section.match(/^(Abstract|Methods|Results|Discussion):/);
//           if (sectionMatch) {
//             acc.sections[sectionMatch[1].toLowerCase()] = section.substring(sectionMatch[0].length).trim();
//           }
//         }
//         return acc;
//       }, { title: '', sections: {}, keyInsights: [] });

//       setSummary(sections);
//     } catch (err) {
//       setError(err.message || 'An error occurred while processing the paper');
//       console.error('Error processing paper:', err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Research Paper Summarizer</CardTitle>
//           <CardDescription>
//             Upload your research paper and get an intelligent summary with key insights
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="border-2 border-dashed rounded-lg p-6 text-center">
//               <input
//                 type="file"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//                 accept=".pdf,.doc,.docx,.txt"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer flex flex-col items-center gap-2"
//               >
//                 <Upload className="w-8 h-8 text-gray-400" />
//                 <span className="text-sm text-gray-600">
//                   Drop your file here or click to upload
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   Supported formats: PDF, Word, TXT
//                 </span>
//               </label>
//               {file && (
//                 <div className="mt-4 flex items-center gap-2 justify-center">
//                   <FileText className="w-4 h-4" />
//                   <span className="text-sm">{file.name}</span>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <select
//                 value={detailLevel}
//                 onChange={(e) => setDetailLevel(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="concise">Concise</option>
//                 <option value="balanced">Balanced</option>
//                 <option value="detailed">Detailed</option>
//               </select>

//               <select
//                 value={outputFormat}
//                 onChange={(e) => setOutputFormat(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="markdown">Markdown</option>
//                 <option value="pdf">PDF</option>
//                 <option value="text">Plain Text</option>
//               </select>

//               <Button
//                 onClick={processPaper}
//                 disabled={!file || isProcessing}
//                 className="w-full"
//               >
//                 {isProcessing ? (
//                   <RotateCw className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <Book className="w-4 h-4 mr-2" />
//                 )}
//                 {isProcessing ? "Processing..." : "Generate Summary"}
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {error && (
//         <Alert className="mb-6">
//           <AlertDescription className="text-red-600">
//             {error}
//           </AlertDescription>
//         </Alert>
//       )}

//       {summary && (
//         <div className="space-y-6">
//           <Alert>
//             <AlertDescription>
//               Summary generated successfully! Explore the sections below.
//             </AlertDescription>
//           </Alert>

//           <div className="space-y-4">
//             <Section title="Overview" defaultOpen={true}>
//               <div className="prose">
//                 <h3 className="text-lg font-semibold">{summary.title}</h3>
//                 <p className="mt-2">{summary.sections.abstract}</p>
//               </div>
//             </Section>

//             <Section title="Key Insights">
//               <ul className="list-disc pl-6 space-y-2">
//                 {summary.keyInsights.map((insight, index) => (
//                   <li key={index}>{insight}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="Detailed Sections">
//               <div className="space-y-4">
//                 {Object.entries(summary.sections).map(([section, content]) => (
//                   <div key={section} className="border-l-2 pl-4">
//                     <h4 className="font-semibold capitalize">{section}</h4>
//                     <p className="mt-1 text-gray-600">{content}</p>
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResearchPaperSummarizer;




































// 'use client';

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { chatSession } from '@/utils/AiModel'; // Assuming your chatSession utility is already set up

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('pdf', file);


//     const response = await fetch('api/extractPdf', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to process the file');
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert('Please upload a research paper (PDF, Word, or TXT file)');
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);
      
//       const prompt = `You are an AI researcher with expertise in summarizing and analyzing academic papers. Analyze the provided research paper text and return your analysis in strictly valid JSON format with the following structure:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution"
//       }

//       Research Paper Text: ${paperText}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();
      
//       // Try to find JSON in the response
//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Invalid response format');
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);
      
//       // Validate the response structure
//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis) {
//         throw new Error('Invalid response structure');
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error('Error analyzing research paper:', error);
//       alert('An error occurred while analyzing the paper. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a Research Paper for Analysis</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF, Word, or TXT file of the research paper</p>
//         </div>

//         <Button 
//           onClick={handleSubmit} 
//           disabled={loading}
//           className="w-full"
//         >
//           {loading ? 'Analyzing...' : 'Submit Paper for Analysis'}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//             </div>
            
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">
//                 {result.KeyPoints.map((point, index) => (
//                   <li key={index} className="text-gray-700">{point}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;


// "use client";

// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel"; 
// import TextToSpeech from "@/components/TextToSpeech"; // Import TTS Component

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("pdf", file);

//     const response = await fetch("/api/extractPdf", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to process the file");
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);

//       const prompt = `You are an AI researcher with expertise in summarizing and analyzing academic papers. Analyze the provided research paper text and return your analysis in strictly valid JSON format with the following structure:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution"
//       }

//       Research Paper Text: ${paperText}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a Research Paper for Analysis</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF, Word, or TXT file of the research paper</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Submit Paper for Analysis"}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//               <TextToSpeech text={result.Summary} />
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">
//                 {result.KeyPoints.map((point, index) => (
//                   <li key={index} className="text-gray-700">
//                     {point}
//                     <TextToSpeech text={point} />
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//               <TextToSpeech text={result.PaperAnalysis} />
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;

// "use client";

// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel"; 
// import TextToSpeech from "@/components/TextToSpeech"; // Import TTS Component

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("pdf", file);

//     const response = await fetch("/api/extractPdf", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to process the file");
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);

//       const prompt = `You are an AI researcher with expertise in summarizing and analyzing academic papers. Analyze the provided research paper text and return your analysis in strictly valid JSON format with the following structure:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution"
//       }

//       Research Paper Text: ${paperText}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a Research Paper for Analysis</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
          
          
//           <TextToSpeech text="This is a test message to verify text to speech functionality." />
//           <p className="text-sm text-gray-500">Please upload a PDF, Word, or TXT file of the research paper</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Submit Paper for Analysis"}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">
//                 {result.KeyPoints.map((point, index) => (
//                   <li key={index} className="text-gray-700">{point}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//             </div>

//             {/* Single TTS Button for the entire result */}
//             <TextToSpeech text={`${result.Summary}. Key Points: ${result.KeyPoints.join(", ")}. ${result.PaperAnalysis}`} />
//           </div>
//         )}
//       </CardContent>
//     </Card>
    
//   );
// };

// export default ResearchPaperAnalyzer;
// components/ResearchPaperAnalyzer.tsx












// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("pdf", file);

//     const response = await fetch("/api/extractPdf", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to process the file");
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);

//       const prompt = `You are an AI researcher with expertise in summarizing and analyzing academic papers. Analyze the provided research paper text and return your analysis in strictly valid JSON format with the following structure:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution"
//       }

//       Research Paper Text: ${paperText}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a Research Paper for Analysis</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF, Word, or TXT file of the research paper</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Submit Paper for Analysis"}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//               <TextToSpeech text={result.Summary} />
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">
//                 {result.KeyPoints.map((point, index) => (
//                   <li key={index} className="text-gray-700">{point}</li>
//                 ))}
//               </ul>
//               <TextToSpeech text={`Key Points: ${result.KeyPoints.join(". ")}`} />
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//               <TextToSpeech text={result.PaperAnalysis} />
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;




//pERFECT CODE 


// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromFile = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append("pdf", file);

//     const response = await fetch("/api/extractPdf", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to process the file");
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);

//       const prompt = `You are an AI researcher with expertise in summarizing and analyzing academic papers. Analyze the provided research paper text and return your analysis in strictly valid JSON format with the following structure:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution"
//       }

//       Research Paper Text: ${paperText}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to combine all text for speech
//   const getCombinedText = () => {
//     if (!result) return "";
    
//     return `Summary: ${result.Summary}. 
//             Key Points: ${result.KeyPoints.join(". ")}. 
//             Paper Analysis: ${result.PaperAnalysis}`;
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a Research Paper for Analysis</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF, Word, or TXT file of the research paper</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Submit Paper for Analysis"}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">
//                 {result.KeyPoints.map((point, index) => (
//                   <li key={index} className="text-gray-700">{point}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//             </div>

//             {/* Single audio button for the entire analysis */}
//             <div className="flex justify-center pt-4">
//               <div className="bg-white p-4 rounded-lg shadow-sm">
//                 <h3 className="text-center font-semibold mb-2">Listen to Complete Analysis</h3>
//                 <TextToSpeech text={getCombinedText()} />
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;





"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AiModel";
import TextToSpeech from "@/components/TextToSpeech";
import axios from "axios";

interface ResearchPaperResult {
  Summary: string;
  KeyPoints: string[];
  PaperAnalysis: string;
  Topics: string[];
}

const ResearchPaperAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);

  const [result, setResult] = useState<ResearchPaperResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Extract text from uploaded file
  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/api/extractPdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process the file");
    }

    const data = await response.json();
    return data.text;
  };

  // Analyze research paper and extract key topics
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a research paper (PDF, Word, or TXT file)");
      return;
    }

    setLoading(true);
    try {
      const paperText = await extractTextFromFile(file);

      const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
      {
        "Summary": "a concise summary of the paper",
        "KeyPoints": ["key points or findings from the paper"],
        "PaperAnalysis": "detailed analysis of the paper's contribution",
        "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
      }
      Research Paper Text: ${paperText}
      Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();

      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format");
      }

      const parsedResult = JSON.parse(jsonMatch[0]);

      if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis || !Array.isArray(parsedResult.Topics)) {
        throw new Error("Invalid response structure");
      }

      setResult(parsedResult);
      fetchResearchPapers(parsedResult.Topics);
    } catch (error) {
      console.error("Error analyzing research paper:", error);
      alert("An error occurred while analyzing the paper. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch research papers from arXiv based on extracted topics
  const fetchResearchPapers = async (topics: string[]) => {
    if (topics.length === 0) {
      alert("No topics found for search.");
      return;
    }

    setFetching(true);
    try {
      const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
      const response = await axios.get(
        `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const entries = xmlDoc.getElementsByTagName("entry");

      const fetchedPapers = Array.from(entries).map((entry) => ({
        title: entry.getElementsByTagName("title")[0].textContent,
        summary: entry.getElementsByTagName("summary")[0].textContent,
        link: entry.getElementsByTagName("id")[0].textContent,
      }));

      setPapers(fetchedPapers);
    } catch (error) {
      console.error("Error fetching research papers:", error);
      alert("Failed to fetch related research papers.");
    } finally {
      setFetching(false);
    }
  };

  // Combine all text for speech
  const getCombinedText = () => {
    if (!result) return "";
    return `Summary: ${result.Summary}. 
            Key Points: ${result.KeyPoints.join(". ")}. 
            Paper Analysis: ${result.PaperAnalysis}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
        <p className="text-center text-gray-600">Upload a paper to analyze and find related studies</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
          <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
          <p className="text-sm text-gray-500">Upload a PDF, Word, or TXT file.</p>
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Analyzing..." : "Analyze Paper & Find Related"}
        </Button>

        {/* Display Analysis Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Summary</h3>
              <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Key Points</h3>
              <ul className="list-disc list-inside">{result.KeyPoints.map((point, index) => <li key={index}>{point}</li>)}</ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Paper Analysis</h3>
              <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Extracted Topics</h3>
              <ul className="list-disc list-inside">{result.Topics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
            </div>

            <TextToSpeech text={getCombinedText()} />
          </div>
        )}

        {/* Display arXiv Papers */}
        {papers.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Related Research Papers from arXiv</h3>
            {papers.map((paper, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-bold text-blue-600">
                <a href={paper.link ? paper.link : undefined} target="_blank" rel="noopener noreferrer">
  {paper.title}
</a>

                </h4>
                <p className="text-gray-700">{paper.summary}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResearchPaperAnalyzer;
