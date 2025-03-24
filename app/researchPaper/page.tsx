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




//correct code 



// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";
// import axios from "axios";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
//   Topics: string[];
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);

//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   // Extract text from uploaded file
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

//   // Analyze research paper and extract key topics
//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     setLoading(true);
//     try {
//       const paperText = await extractTextFromFile(file);

//       const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution",
//         "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
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

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis || !Array.isArray(parsedResult.Topics)) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//       fetchResearchPapers(parsedResult.Topics);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch research papers from arXiv based on extracted topics
//   const fetchResearchPapers = async (topics: string[]) => {
//     if (topics.length === 0) {
//       alert("No topics found for search.");
//       return;
//     }

//     setFetching(true);
//     try {
//       const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
//       const response = await axios.get(
//         `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
//       );

//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.data, "text/xml");
//       const entries = xmlDoc.getElementsByTagName("entry");

//       const fetchedPapers = Array.from(entries).map((entry) => ({
//         title: entry.getElementsByTagName("title")[0].textContent,
//         summary: entry.getElementsByTagName("summary")[0].textContent,
//         link: entry.getElementsByTagName("id")[0].textContent,
//       }));

//       setPapers(fetchedPapers);
//     } catch (error) {
//       console.error("Error fetching research papers:", error);
//       alert("Failed to fetch related research papers.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Combine all text for speech
//   const getCombinedText = () => {
//     if (!result) return "";
//     return `Summary: ${result.Summary}. 
//             Key Points: ${result.KeyPoints.join(". ")}. 
//             Paper Analysis: ${result.PaperAnalysis}`;
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8 p-6 shadow-lg rounded-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a paper to analyze and find related studies</p>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Upload Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
//           <p className="text-sm text-gray-500">Upload a PDF, Word, or TXT file.</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Analyze Paper & Find Related"}
//         </Button>

//         {/* Display Analysis Results */}
//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">{result.KeyPoints.map((point, index) => <li key={index}>{point}</li>)}</ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Extracted Topics</h3>
//               <ul className="list-disc list-inside">{result.Topics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
//             </div>

//             <TextToSpeech text={getCombinedText()} />
//           </div>
//         )}

//         {/* Display arXiv Papers */}
//         {papers.length > 0 && (
//           <div className="mt-6 space-y-4">
//             <h3 className="text-lg font-semibold">Related Research Papers from arXiv</h3>
//             {papers.map((paper, index) => (
//               <div key={index} className="p-4 bg-gray-100 rounded-lg">
//                 <h4 className="font-bold text-blue-600">
//                 <a href={paper.link ? paper.link : undefined} target="_blank" rel="noopener noreferrer">
//   {paper.title}
// </a>

//                 </h4>
//                 <p className="text-gray-700">{paper.summary}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;


//with regenerate works well
// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";
// import axios from "axios";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
//   Topics: string[];
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);
//   const [result, setResult] = useState<ResearchPaperResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [regenerationsLeft, setRegenerationsLeft] = useState(3);
//   const [paperText, setPaperText] = useState<string>("");

//   // Extract text from uploaded file
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

//   // Analyze research paper and extract key topics
//   const analyzeResearchPaper = async (text: string) => {
//     setLoading(true);
//     try {
//       const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution",
//         "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
//       }
//       Research Paper Text: ${text}
//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis || !Array.isArray(parsedResult.Topics)) {
//         throw new Error("Invalid response structure");
//       }

//       setResult(parsedResult);
//       fetchResearchPapers(parsedResult.Topics);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle initial submission
//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     try {
//       const extractedText = await extractTextFromFile(file);
//       setPaperText(extractedText);
//       await analyzeResearchPaper(extractedText);
//     } catch (error) {
//       console.error("Error extracting text:", error);
//       alert("An error occurred while processing the file. Please try again.");
//     }
//   };

//   // Handle regeneration
//   const handleRegenerate = async () => {
//     if (regenerationsLeft <= 0) {
//       alert("You have used all your regenerations.");
//       return;
//     }

//     if (!paperText) {
//       alert("No paper text available for regeneration.");
//       return;
//     }

//     setRegenerationsLeft(prev => prev - 1);
//     await analyzeResearchPaper(paperText);
//   };

//   // Fetch research papers from arXiv based on extracted topics
//   const fetchResearchPapers = async (topics: string[]) => {
//     if (topics.length === 0) {
//       alert("No topics found for search.");
//       return;
//     }

//     setFetching(true);
//     try {
//       const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
//       const response = await axios.get(
//         `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
//       );

//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.data, "text/xml");
//       const entries = xmlDoc.getElementsByTagName("entry");

//       const fetchedPapers = Array.from(entries).map((entry) => ({
//         title: entry.getElementsByTagName("title")[0].textContent,
//         summary: entry.getElementsByTagName("summary")[0].textContent,
//         link: entry.getElementsByTagName("id")[0].textContent,
//       }));

//       setPapers(fetchedPapers);
//     } catch (error) {
//       console.error("Error fetching research papers:", error);
//       alert("Failed to fetch related research papers.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Combine all text for speech
//   const getCombinedText = () => {
//     if (!result) return "";
//     return `Summary: ${result.Summary}. 
//             Key Points: ${result.KeyPoints.join(". ")}. 
//             Paper Analysis: ${result.PaperAnalysis}`;
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8 p-6 shadow-lg rounded-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a paper to analyze and find related studies</p>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Upload Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
//           <p className="text-sm text-gray-500">Upload a PDF, Word, or TXT file.</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Analyze Paper & Find Related"}
//         </Button>

//         {/* Display Analysis Results */}
//         {result && (
//           <div className="mt-6 space-y-4">
//             {/* Regenerate Button */}
//             <div className="flex justify-between items-center">
//               <Button 
//                 onClick={handleRegenerate} 
//                 disabled={loading || regenerationsLeft <= 0} 
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {loading ? "Regenerating..." : `Regenerate Analysis (${regenerationsLeft} left)`}
//               </Button>
//               {regenerationsLeft <= 0 && (
//                 <p className="text-red-500 text-sm">No regenerations left</p>
//               )}
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Summary</h3>
//               <p className="text-xl font-bold text-blue-600">{result.Summary}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Key Points</h3>
//               <ul className="list-disc list-inside">{result.KeyPoints.map((point, index) => <li key={index}>{point}</li>)}</ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Paper Analysis</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.PaperAnalysis}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Extracted Topics</h3>
//               <ul className="list-disc list-inside">{result.Topics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
//             </div>

//             <TextToSpeech text={getCombinedText()} />
//           </div>
//         )}

//         {/* Display arXiv Papers */}
//         {papers.length > 0 && (
//           <div className="mt-6 space-y-4">
//             <h3 className="text-lg font-semibold">Related Research Papers from arXiv</h3>
//             {papers.map((paper, index) => (
//               <div key={index} className="p-4 bg-gray-100 rounded-lg">
//                 <h4 className="font-bold text-blue-600">
//                   <a href={paper.link ? paper.link : undefined} target="_blank" rel="noopener noreferrer">
//                     {paper.title}
//                   </a>
//                 </h4>
//                 <p className="text-gray-700">{paper.summary}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;

//all responses as buttons perfect



// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";
// import axios from "axios";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
//   Topics: string[];
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [results, setResults] = useState<ResearchPaperResult[]>([]);
//   const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [regenerationsLeft, setRegenerationsLeft] = useState(3);
//   const [paperText, setPaperText] = useState<string>("");
//   const [activeResultIndex, setActiveResultIndex] = useState<number | null>(null);

//   // Extract text from uploaded file
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

//   // Analyze research paper and extract key topics
//   const analyzeResearchPaper = async (text: string) => {
//     setLoading(true);
//     try {
//       const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution",
//         "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
//       }
//       Research Paper Text: ${text}
//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis || !Array.isArray(parsedResult.Topics)) {
//         throw new Error("Invalid response structure");
//       }

//       // Add the new result to the results array
//       const newResults = [...results, parsedResult];
//       setResults(newResults);
      
//       // Set the newest result as active
//       setActiveResultIndex(newResults.length - 1);
      
//       fetchResearchPapers(parsedResult.Topics);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle initial submission
//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     try {
//       // Reset previous results when uploading a new file
//       setResults([]);
//       setRegenerationsLeft(3);
//       setActiveResultIndex(null);
      
//       const extractedText = await extractTextFromFile(file);
//       setPaperText(extractedText);
//       await analyzeResearchPaper(extractedText);
//     } catch (error) {
//       console.error("Error extracting text:", error);
//       alert("An error occurred while processing the file. Please try again.");
//     }
//   };

//   // Handle regeneration
//   const handleRegenerate = async () => {
//     if (regenerationsLeft <= 0) {
//       alert("You have used all your regenerations.");
//       return;
//     }

//     if (!paperText) {
//       alert("No paper text available for regeneration.");
//       return;
//     }

//     setRegenerationsLeft(prev => prev - 1);
//     await analyzeResearchPaper(paperText);
//   };

//   // Toggle between analysis results
//   const toggleResult = (index: number) => {
//     setActiveResultIndex(index);
//   };

//   // Fetch research papers from arXiv based on extracted topics
//   const fetchResearchPapers = async (topics: string[]) => {
//     if (topics.length === 0) {
//       alert("No topics found for search.");
//       return;
//     }

//     setFetching(true);
//     try {
//       const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
//       const response = await axios.get(
//         `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
//       );

//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.data, "text/xml");
//       const entries = xmlDoc.getElementsByTagName("entry");

//       const fetchedPapers = Array.from(entries).map((entry) => ({
//         title: entry.getElementsByTagName("title")[0].textContent,
//         summary: entry.getElementsByTagName("summary")[0].textContent,
//         link: entry.getElementsByTagName("id")[0].textContent,
//       }));

//       setPapers(fetchedPapers);
//     } catch (error) {
//       console.error("Error fetching research papers:", error);
//       alert("Failed to fetch related research papers.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Combine all text for speech
//   const getCombinedText = (result: ResearchPaperResult) => {
//     return `Summary: ${result.Summary}. 
//             Key Points: ${result.KeyPoints.join(". ")}. 
//             Paper Analysis: ${result.PaperAnalysis}`;
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8 p-6 shadow-lg rounded-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a paper to analyze and find related studies</p>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Upload Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
//           <p className="text-sm text-gray-500">Upload a PDF, Word, or TXT file.</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Analyze Paper & Find Related"}
//         </Button>

//         {/* Regenerate Button */}
//         {results.length > 0 && (
//           <div className="flex justify-between items-center mt-4">
//             <Button 
//               onClick={handleRegenerate} 
//               disabled={loading || regenerationsLeft <= 0} 
//               className="bg-green-600 hover:bg-green-700"
//             >
//               {loading ? "Regenerating..." : `Regenerate Analysis (${regenerationsLeft} left)`}
//             </Button>
//             {regenerationsLeft <= 0 && (
//               <p className="text-red-500 text-sm">No regenerations left</p>
//             )}
//           </div>
//         )}

//         {/* Display Analysis Results with Toggle Buttons */}
//         {results.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
            
//             {/* Result Toggle Buttons */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {results.map((_, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => toggleResult(index)}
//                   variant={activeResultIndex === index ? "default" : "outline"}
//                   className={activeResultIndex === index ? "bg-blue-600" : ""}
//                 >
//                   Analysis {index + 1} {index === results.length - 1 ? "(Latest)" : ""}
//                 </Button>
//               ))}
//             </div>
            
//             {/* Display Active Result */}
//             {activeResultIndex !== null && results[activeResultIndex] && (
//               <div className="space-y-4 border p-4 rounded-lg">
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Summary</h3>
//                   <p className="text-xl font-bold text-blue-600">{results[activeResultIndex].Summary}</p>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Key Points</h3>
//                   <ul className="list-disc list-inside">
//                     {results[activeResultIndex].KeyPoints.map((point, pointIndex) => (
//                       <li key={pointIndex}>{point}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Paper Analysis</h3>
//                   <p className="text-gray-700 whitespace-pre-line">{results[activeResultIndex].PaperAnalysis}</p>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Extracted Topics</h3>
//                   <ul className="list-disc list-inside">
//                     {results[activeResultIndex].Topics.map((topic, topicIndex) => (
//                       <li key={topicIndex}>{topic}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <TextToSpeech text={getCombinedText(results[activeResultIndex])} />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Display arXiv Papers */}
//         {papers.length > 0 && (
//           <div className="mt-6 space-y-4">
//             <h3 className="text-lg font-semibold">Related Research Papers from arXiv</h3>
//             {papers.map((paper, index) => (
//               <div key={index} className="p-4 bg-gray-100 rounded-lg">
//                 <h4 className="font-bold text-blue-600">
//                   <a href={paper.link ? paper.link : undefined} target="_blank" rel="noopener noreferrer">
//                     {paper.title}
//                   </a>
//                 </h4>
//                 <p className="text-gray-700">{paper.summary}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;



//correct

// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { chatSession } from "@/utils/AiModel";
// import TextToSpeech from "@/components/TextToSpeech";
// import axios from "axios";

// interface ResearchPaperResult {
//   Summary: string;
//   KeyPoints: string[];
//   PaperAnalysis: string;
//   Topics: string[];
// }

// interface ComparisonResult {
//   criteria: string;
//   ratings: { [key: number]: string | number };
//   notes: string;
// }

// const ResearchPaperAnalyzer = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [results, setResults] = useState<ResearchPaperResult[]>([]);
//   const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [comparing, setComparing] = useState(false);
//   const [regenerationsLeft, setRegenerationsLeft] = useState(3);
//   const [paperText, setPaperText] = useState<string>("");
//   const [activeResultIndex, setActiveResultIndex] = useState<number | null>(null);
//   const [showComparison, setShowComparison] = useState(false);
//   const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);

//   // Extract text from uploaded file
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

//   // Analyze research paper and extract key topics
//   const analyzeResearchPaper = async (text: string) => {
//     setLoading(true);
//     try {
//       const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
//       {
//         "Summary": "a concise summary of the paper",
//         "KeyPoints": ["key points or findings from the paper"],
//         "PaperAnalysis": "detailed analysis of the paper's contribution",
//         "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
//       }
//       Research Paper Text: ${text}
//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Invalid response format");
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.Summary || !Array.isArray(parsedResult.KeyPoints) || !parsedResult.PaperAnalysis || !Array.isArray(parsedResult.Topics)) {
//         throw new Error("Invalid response structure");
//       }

//       // Add the new result to the results array
//       const newResults = [...results, parsedResult];
//       setResults(newResults);
      
//       // Set the newest result as active
//       setActiveResultIndex(newResults.length - 1);
      
//       // Reset comparison view if it was active
//       setShowComparison(false);
      
//       fetchResearchPapers(parsedResult.Topics);
//     } catch (error) {
//       console.error("Error analyzing research paper:", error);
//       alert("An error occurred while analyzing the paper. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle initial submission
//   const handleSubmit = async () => {
//     if (!file) {
//       alert("Please upload a research paper (PDF, Word, or TXT file)");
//       return;
//     }

//     try {
//       // Reset previous results when uploading a new file
//       setResults([]);
//       setRegenerationsLeft(3);
//       setActiveResultIndex(null);
//       setShowComparison(false);
//       setComparisonResults([]);
      
//       const extractedText = await extractTextFromFile(file);
//       setPaperText(extractedText);
//       await analyzeResearchPaper(extractedText);
//     } catch (error) {
//       console.error("Error extracting text:", error);
//       alert("An error occurred while processing the file. Please try again.");
//     }
//   };

//   // Handle regeneration
//   const handleRegenerate = async () => {
//     if (regenerationsLeft <= 0) {
//       alert("You have used all your regenerations.");
//       return;
//     }

//     if (!paperText) {
//       alert("No paper text available for regeneration.");
//       return;
//     }

//     setRegenerationsLeft(prev => prev - 1);
//     await analyzeResearchPaper(paperText);
//   };

//   // Toggle between analysis results
//   const toggleResult = (index: number) => {
//     setActiveResultIndex(index);
//     setShowComparison(false);
//   };

//   // Compare all analyses
//   const compareAnalyses = async () => {
//     if (results.length < 2) {
//       alert("Need at least 2 analyses to compare.");
//       return;
//     }

//     setComparing(true);
//     try {
//       // Prepare the analyses for comparison
//       const analysesForComparison = results.map((result, index) => ({
//         id: index + 1,
//         summary: result.Summary,
//         keyPoints: result.KeyPoints,
//         topics: result.Topics
//       }));

//       const prompt = `Compare these ${results.length} analyses of the same research paper. Evaluate their relative quality, 
//       focusing on comprehensiveness, accuracy of key points captured, and usefulness of extracted topics.
//       Return your analysis ONLY as a valid JSON object with this format:
//       [
//         {
//           "criteria": "Comprehensiveness of Summary",
//           "ratings": {${analysesForComparison.map(a => `"${a.id}": "rating out of 10"`).join(", ")}},
//           "notes": "Which analysis has the most comprehensive summary and why"
//         },
//         {
//           "criteria": "Quality of Key Points",
//           "ratings": {${analysesForComparison.map(a => `"${a.id}": "rating out of 10"`).join(", ")}},
//           "notes": "Which analysis captured the most relevant key points"
//         },
//         {
//           "criteria": "Usefulness of Topics",
//           "ratings": {${analysesForComparison.map(a => `"${a.id}": "rating out of 10"`).join(", ")}},
//           "notes": "Which analysis extracted the most useful research topics"
//         },
//         {
//           "criteria": "Overall Quality",
//           "ratings": {${analysesForComparison.map(a => `"${a.id}": "rating out of 10"`).join(", ")}},
//           "notes": "Final assessment of which analysis is most accurate and useful overall"
//         }
//       ]
      
//       Here are the analyses to compare:
//       ${JSON.stringify(analysesForComparison)}`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\[[\s\S]*\]/);
//       if (!jsonMatch) {
//         throw new Error("Invalid comparison format");
//       }

//       const parsedComparison = JSON.parse(jsonMatch[0]);
//       setComparisonResults(parsedComparison);
//       setShowComparison(true);
//       setActiveResultIndex(null);
//     } catch (error) {
//       console.error("Error comparing analyses:", error);
//       alert("An error occurred while comparing the analyses. Please try again.");
//     } finally {
//       setComparing(false);
//     }
//   };

//   // Fetch research papers from arXiv based on extracted topics
//   const fetchResearchPapers = async (topics: string[]) => {
//     if (topics.length === 0) {
//       alert("No topics found for search.");
//       return;
//     }

//     setFetching(true);
//     try {
//       const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
//       const response = await axios.get(
//         `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
//       );

//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(response.data, "text/xml");
//       const entries = xmlDoc.getElementsByTagName("entry");

//       const fetchedPapers = Array.from(entries).map((entry) => ({
//         title: entry.getElementsByTagName("title")[0].textContent,
//         summary: entry.getElementsByTagName("summary")[0].textContent,
//         link: entry.getElementsByTagName("id")[0].textContent,
//       }));

//       setPapers(fetchedPapers);
//     } catch (error) {
//       console.error("Error fetching research papers:", error);
//       alert("Failed to fetch related research papers.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // Combine all text for speech
//   const getCombinedText = (result: ResearchPaperResult) => {
//     return `Summary: ${result.Summary}. 
//             Key Points: ${result.KeyPoints.join(". ")}. 
//             Paper Analysis: ${result.PaperAnalysis}`;
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8 p-6 shadow-lg rounded-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Research Paper Analyzer</CardTitle>
//         <p className="text-center text-gray-600">Upload a paper to analyze and find related studies</p>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Upload Section */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Research Paper (PDF, Word, TXT)</label>
//           <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full" />
//           <p className="text-sm text-gray-500">Upload a PDF, Word, or TXT file.</p>
//         </div>

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//           {loading ? "Analyzing..." : "Analyze Paper & Find Related"}
//         </Button>

//         {/* Action Buttons */}
//         {results.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-4">
//             <Button 
//               onClick={handleRegenerate} 
//               disabled={loading || regenerationsLeft <= 0 || comparing} 
//               className="bg-green-600 hover:bg-green-700"
//             >
//               {loading ? "Regenerating..." : `Regenerate Analysis (${regenerationsLeft} left)`}
//             </Button>
            
//             {results.length >= 2 && (
//               <Button 
//                 onClick={compareAnalyses} 
//                 disabled={comparing || loading}
//                 className="bg-purple-600 hover:bg-purple-700"
//               >
//                 {comparing ? "Comparing..." : "Compare All Analyses"}
//               </Button>
//             )}
            
//             {showComparison && (
//               <Button 
//                 onClick={() => {
//                   setShowComparison(false);
//                   setActiveResultIndex(results.length - 1);
//                 }}
//                 variant="outline"
//               >
//                 Back to Individual View
//               </Button>
//             )}
            
//             {regenerationsLeft <= 0 && (
//               <p className="text-red-500 text-sm">No regenerations left</p>
//             )}
//           </div>
//         )}

//         {/* Result Toggle Buttons (Only show in individual view mode) */}
//         {results.length > 0 && !showComparison && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Analysis Results</h3>
            
//             <div className="flex flex-wrap gap-2 mb-4">
//               {results.map((_, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => toggleResult(index)}
//                   variant={activeResultIndex === index ? "default" : "outline"}
//                   className={activeResultIndex === index ? "bg-blue-600" : ""}
//                 >
//                   Analysis {index + 1} {index === results.length - 1 ? "(Latest)" : ""}
//                 </Button>
//               ))}
//             </div>
            
//             {/* Display Active Result */}
//             {activeResultIndex !== null && results[activeResultIndex] && (
//               <div className="space-y-4 border p-4 rounded-lg">
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Summary</h3>
//                   <p className="text-xl font-bold text-blue-600">{results[activeResultIndex].Summary}</p>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Key Points</h3>
//                   <ul className="list-disc list-inside">
//                     {results[activeResultIndex].KeyPoints.map((point, pointIndex) => (
//                       <li key={pointIndex}>{point}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Paper Analysis</h3>
//                   <p className="text-gray-700 whitespace-pre-line">{results[activeResultIndex].PaperAnalysis}</p>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-semibold">Extracted Topics</h3>
//                   <ul className="list-disc list-inside">
//                     {results[activeResultIndex].Topics.map((topic, topicIndex) => (
//                       <li key={topicIndex}>{topic}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <TextToSpeech text={getCombinedText(results[activeResultIndex])} />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Comparison View */}
//         {showComparison && comparisonResults.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-4">Analysis Comparison</h3>
            
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="py-2 px-4 border-b text-left">Criteria</th>
//                     {results.map((_, index) => (
//                       <th key={index} className="py-2 px-4 border-b text-center">
//                         Analysis {index + 1}
//                       </th>
//                     ))}
//                     <th className="py-2 px-4 border-b text-left">Notes</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {comparisonResults.map((comparison, index) => (
//                     <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                       <td className="py-3 px-4 border-b font-medium">{comparison.criteria}</td>
                      
//                       {/* Ratings for each analysis */}
//                       {results.map((_, analysisIndex) => {
//                         const rating = comparison.ratings[analysisIndex + 1];
//                         const numericRating = typeof rating === 'number' ? rating : parseFloat(String(rating).match(/\d+(\.\d+)?/)?.[0] || "0");
                        
//                         // Determine color based on rating value
//                         let ratingColor = "text-gray-800";
//                         if (numericRating >= 8) ratingColor = "text-green-600 font-bold";
//                         else if (numericRating >= 6) ratingColor = "text-blue-600";
//                         else if (numericRating < 5) ratingColor = "text-red-600";
                        
//                         return (
//                           <td key={analysisIndex} className={`py-3 px-4 border-b text-center ${ratingColor}`}>
//                             {rating}
//                           </td>
//                         );
//                       })}
                      
//                       <td className="py-3 px-4 border-b text-sm">{comparison.notes}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
            
//             <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//               <h4 className="font-semibold mb-2">Recommendation</h4>
//               <p>
//                 Based on the comparison, <span className="font-bold text-blue-600">
//                   Analysis {Object.entries(comparisonResults.find(c => c.criteria === "Overall Quality")?.ratings || {})
//                     .sort((a, b) => (typeof b[1] === 'number' ? b[1] : parseFloat(String(b[1]).match(/\d+(\.\d+)?/)?.[0] || "0")) - 
//                                     (typeof a[1] === 'number' ? a[1] : parseFloat(String(a[1]).match(/\d+(\.\d+)?/)?.[0] || "0")))
//                     .map(([key]) => key)[0]}</span> appears to be the most accurate and comprehensive analysis.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Display arXiv Papers */}
//         {papers.length > 0 && (
//           <div className="mt-6 space-y-4">
//             <h3 className="text-lg font-semibold">Related Research Papers from arXiv</h3>
//             {papers.map((paper, index) => (
//               <div key={index} className="p-4 bg-gray-100 rounded-lg">
//                 <h4 className="font-bold text-blue-600">
//                   <a href={paper.link ? paper.link : undefined} target="_blank" rel="noopener noreferrer">
//                     {paper.title}
//                   </a>
//                 </h4>
//                 <p className="text-gray-700">{paper.summary}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ResearchPaperAnalyzer;
"use client"
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AiModel";
import TextToSpeech from "@/components/TextToSpeech";
import axios from "axios";
import { 
  BookOpen, 
  FileText, 
  UploadCloud, 
  RefreshCw, 
  Layers, 
  Volume2, 
  PlusCircle, 
  Book, 
  BarChart4 
} from "lucide-react";

interface ResearchPaperResult {
  Summary: string;
  KeyPoints: string[];
  PaperAnalysis: string;
  Topics: string[];
}

interface ComparisonResult {
  criteria: string;
  ratings: { [key: number]: string | number };
  notes: string;
}

interface ResearchPaper {
  title: string | null;
  summary: string | null;
  link: string | null;
}

interface Toast {
  id: string;
  title: string;
  description: string;
  variant: "destructive" | "default";
}

const ResearchPaperAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<ResearchPaperResult[]>([]);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [regenerationsLeft, setRegenerationsLeft] = useState(3);
  const [paperText, setPaperText] = useState<string>("");
  const [activeResultIndex, setActiveResultIndex] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [savedPapers, setSavedPapers] = useState<ResearchPaper[]>([]);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom toast function
  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  };

  const showToast = ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant: "destructive" | "default";
  }) => {
    addToast({ id: Date.now().toString(), title, description, variant });
  };

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
  const analyzeResearchPaper = async (text: string) => {
    setLoading(true);
    try {
      const prompt = `You are an AI researcher. Analyze the provided research paper text and return your findings in strictly valid JSON format:
      {
        "Summary": "a concise summary of the paper",
        "KeyPoints": ["key points or findings from the paper"],
        "PaperAnalysis": "detailed analysis of the paper's contribution",
        "Topics": ["Top 3-5 key topics extracted from the paper for further research"]
      }
      Research Paper Text: ${text}
      Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();

      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format");
      }

      const parsedResult = JSON.parse(jsonMatch[0]);

      if (
        !parsedResult.Summary ||
        !Array.isArray(parsedResult.KeyPoints) ||
        !parsedResult.PaperAnalysis ||
        !Array.isArray(parsedResult.Topics)
      ) {
        throw new Error("Invalid response structure");
      }

      // Add the new result to the results array
      const newResults = [...results, parsedResult];
      setResults(newResults);

      // Set the newest result as active
      setActiveResultIndex(newResults.length - 1);

      // Reset comparison view if it was active
      setShowComparison(false);

      fetchResearchPapers(parsedResult.Topics);
    } catch (error) {
      console.error("Error analyzing research paper:", error);
      showToast({
        title: "Analysis Error",
        description: "An error occurred while analyzing the paper. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle initial submission
  const handleSubmit = async () => {
    if (!file) {
      showToast({
        title: "No file selected",
        description: "Please upload a research paper (PDF, Word, or TXT file)",
        variant: "destructive",
      });
      return;
    }

    try {
      // Reset previous results when uploading a new file
      setResults([]);
      setRegenerationsLeft(3);
      setActiveResultIndex(null);
      setShowComparison(false);
      setComparisonResults([]);

      const extractedText = await extractTextFromFile(file);
      setPaperText(extractedText);
      await analyzeResearchPaper(extractedText);
    } catch (error) {
      console.error("Error extracting text:", error);
      showToast({
        title: "Processing Error",
        description: "An error occurred while processing the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle regeneration
  const handleRegenerate = async () => {
    if (regenerationsLeft <= 0) {
      showToast({
        title: "Limit Reached",
        description: "You have used all your regenerations.",
        variant: "destructive",
      });
      return;
    }

    if (!paperText) {
      showToast({
        title: "Missing Content",
        description: "No paper text available for regeneration.",
        variant: "destructive",
      });
      return;
    }

    setRegenerationsLeft((prev) => prev - 1);
    await analyzeResearchPaper(paperText);
  };

  // Toggle between analysis results
  const toggleResult = (index: number) => {
    setActiveResultIndex(index);
    setShowComparison(false);
  };

  // Compare all analyses
  const compareAnalyses = async () => {
    if (results.length < 2) {
      showToast({
        title: "Not Enough Analyses",
        description: "Need at least 2 analyses to compare.",
        variant: "destructive",
      });
      return;
    }

    setComparing(true);
    try {
      // Prepare the analyses for comparison
      const analysesForComparison = results.map((result, index) => ({
        id: index + 1,
        summary: result.Summary,
        keyPoints: result.KeyPoints,
        topics: result.Topics,
      }));

      const prompt = `Compare these ${results.length} analyses of the same research paper. Evaluate their relative quality, 
      focusing on comprehensiveness, accuracy of key points captured, and usefulness of extracted topics.
      Return your analysis ONLY as a valid JSON object with this format:
      [
        {
          "criteria": "Comprehensiveness of Summary",
          "ratings": {${analysesForComparison
            .map((a) => `"${a.id}": "rating out of 10"`)
            .join(", ")}},
          "notes": "Which analysis has the most comprehensive summary and why"
        },
        {
          "criteria": "Quality of Key Points",
          "ratings": {${analysesForComparison
            .map((a) => `"${a.id}": "rating out of 10"`)
            .join(", ")}},
          "notes": "Which analysis captured the most relevant key points"
        },
        {
          "criteria": "Usefulness of Topics",
          "ratings": {${analysesForComparison
            .map((a) => `"${a.id}": "rating out of 10"`)
            .join(", ")}},
          "notes": "Which analysis extracted the most useful research topics"
        },
        {
          "criteria": "Overall Quality",
          "ratings": {${analysesForComparison
            .map((a) => `"${a.id}": "rating out of 10"`)
            .join(", ")}},
          "notes": "Final assessment of which analysis is most accurate and useful overall"
        }
      ]
      
      Here are the analyses to compare:
      ${JSON.stringify(analysesForComparison)}`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();

      const jsonMatch = resultText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Invalid comparison format");
      }

      const parsedComparison = JSON.parse(jsonMatch[0]);
      setComparisonResults(parsedComparison);
      setShowComparison(true);
      setActiveResultIndex(null);
    } catch (error) {
      console.error("Error comparing analyses:", error);
      showToast({
        title: "Comparison Error",
        description: "An error occurred while comparing the analyses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setComparing(false);
    }
  };

  // Fetch research papers from arXiv based on extracted topics
  const fetchResearchPapers = async (topics: string[]) => {
    if (topics.length === 0) {
      showToast({
        title: "Search Error",
        description: "No topics found for search.",
        variant: "destructive",
      });
      return;
    }

    setFetching(true);
    try {
      const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
      const response = await axios.get(
        `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(
          query
        )}&start=0&max_results=5`
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
      showToast({
        title: "Fetch Error",
        description: "Failed to fetch related research papers.",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  // Combine all text for speech
  const getCombinedText = (result: ResearchPaperResult) => {
    return `Summary: ${result.Summary}. 
            Key Points: ${result.KeyPoints.join(". ")}. 
            Paper Analysis: ${result.PaperAnalysis}`;
  };

  // Add paper to learning path
  const addToLearningPath = (paper: ResearchPaper) => {
    if (savedPapers.some((p) => p.title === paper.title)) {
      showToast({
        title: "Already Added",
        description: "This paper is already in your learning path.",
        variant: "default",
      });
      return;
    }

    setSavedPapers([...savedPapers, paper]);
    showToast({
      title: "Paper Added",
      description: "Research paper added to your learning path!",
      variant: "default",
    });
  };

  // Remove paper from learning path
  const removeFromLearningPath = (paperTitle: string | null) => {
    if (!paperTitle) return;

    setSavedPapers(savedPapers.filter((p) => p.title !== paperTitle));
    showToast({
      title: "Paper Removed",
      description: "Research paper removed from your learning path.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10 relative">
      {/* Toast Container */}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded shadow-lg text-white transition transform hover:scale-105 ${
              toast.variant === "destructive" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <strong className="block">{toast.title}</strong>
            <span className="block text-sm">{toast.description}</span>
          </div>
        ))}
      </div>

      <Card className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 border-0">
        <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 mr-3" />
            <CardTitle className="text-3xl font-bold">Research Pathfinder</CardTitle>
          </div>
          <p className="text-center text-white/90 max-w-xl mx-auto">
            Upload a research paper to analyze its content, extract key topics, and discover related papers.
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Upload Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Upload Your Research Paper</h3>
              </div>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <UploadCloud className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 mb-2">
                  {file ? file.name : "Drag and drop your file here or click to browse"}
                </p>
                <p className="text-sm text-gray-500">Supported formats: PDF, Word, TXT</p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Analyze Paper &amp; Find Related
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Learning Path Section */}
          {savedPapers.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <div
                className="flex items-center gap-2 mb-4 cursor-pointer select-none"
                onClick={() => setShowLearningPath((prev) => !prev)}
              >
                <Book className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Learning Path ({savedPapers.length})
                </h3>
              </div>
              {showLearningPath && (
                <div className="space-y-3 mt-2">
                  {savedPapers.map((paper, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-indigo-700">{paper.title}</h4>
                        <a
                          href={paper.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-500 hover:underline mt-1 inline-block"
                        >
                          View on arXiv
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-500 p-1"
                        onClick={() => removeFromLearningPath(paper.title)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                onClick={handleRegenerate}
                disabled={loading || regenerationsLeft <= 0 || comparing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Regenerating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Analysis ({regenerationsLeft} left)
                  </span>
                )}
              </Button>

              {results.length >= 2 && (
                <Button
                  onClick={compareAnalyses}
                  disabled={comparing || loading}
                  className="bg-violet-600 hover:bg-violet-700 text-white transition-all"
                >
                  {comparing ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Comparing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <BarChart4 className="h-4 w-4" />
                      Compare All Analyses
                    </span>
                  )}
                </Button>
              )}

              {showComparison && (
                <Button
                  onClick={() => {
                    setShowComparison(false);
                    setActiveResultIndex(results.length - 1);
                  }}
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  Back to Individual View
                </Button>
              )}
            </div>
          )}

          {/* Result Toggle and Display */}
          {results.length > 0 && !showComparison && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {results.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => toggleResult(index)}
                    variant={activeResultIndex === index ? "default" : "outline"}
                    className={
                      activeResultIndex === index
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    }
                  >
                    Analysis {index + 1} {index === results.length - 1 ? "(Latest)" : ""}
                  </Button>
                ))}
              </div>

              {activeResultIndex !== null && results[activeResultIndex] && (
                <div className="space-y-6 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-md">
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-gray-50">
                    <h3 className="text-base font-semibold text-indigo-700 mb-2">Summary</h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {results[activeResultIndex].Summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-base font-semibold text-indigo-700 mb-2">Key Points</h3>
                      <ul className="space-y-2">
                        {results[activeResultIndex].KeyPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex gap-2 text-gray-700">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <h3 className="text-base font-semibold text-indigo-700 mb-2">Extracted Topics</h3>
                      <ul className="space-y-2">
                        {results[activeResultIndex].Topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex gap-2 text-gray-700">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm mx-4 mb-4">
                    <h3 className="text-base font-semibold text-indigo-700 mb-2">Paper Analysis</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {results[activeResultIndex].PaperAnalysis}
                    </p>
                  </div>

                  <div className="px-6 pb-6 flex justify-end">
                    <TextToSpeech text={getCombinedText(results[activeResultIndex])} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comparison View */}
          {showComparison && comparisonResults.length > 0 && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart4 className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Analysis Comparison</h3>
              </div>

              <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Criteria
                      </th>
                      {results.map((_, index) => (
                        <th
                          key={index}
                          className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Analysis {index + 1}
                        </th>
                      ))}
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {comparisonResults.map((comparison, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                          {comparison.criteria}
                        </td>
                        {results.map((_, analysisIndex) => {
                          const rating = comparison.ratings[analysisIndex + 1];
                          const numericRating =
                            typeof rating === "number"
                              ? rating
                              : parseFloat(
                                  String(rating).match(/\d+(\.\d+)?/)?.[0] || "0"
                                );

                          let ratingColor = "text-gray-800";
                          if (numericRating >= 8)
                            ratingColor = "text-emerald-600 font-bold";
                          else if (numericRating >= 6)
                            ratingColor = "text-indigo-600";
                          else if (numericRating < 5) ratingColor = "text-red-600";

                          return (
                            <td key={analysisIndex} className={`py-4 px-4 text-center ${ratingColor}`}>
                              {rating}
                            </td>
                          );
                        })}
                        <td className="py-4 px-4 text-sm text-gray-700">{comparison.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-700 mb-2">Recommendation</h4>
                <p className="text-gray-700">
                  Based on the comparison,{" "}
                  <span className="font-bold text-indigo-700">
                    Analysis{" "}
                    {Object.entries(
                      comparisonResults.find(
                        (c) => c.criteria === "Overall Quality"
                      )?.ratings || {}
                    )
                      .sort(
                        (a, b) =>
                          (typeof b[1] === "number"
                            ? b[1]
                            : parseFloat(
                                String(b[1]).match(/\d+(\.\d+)?/)?.[0] || "0"
                              )) -
                          (typeof a[1] === "number"
                            ? a[1]
                            : parseFloat(
                                String(a[1]).match(/\d+(\.\d+)?/)?.[0] || "0"
                              ))
                      )
                      .map(([key]) => key)[0]}
                  </span>{" "}
                  appears to be the most accurate and comprehensive analysis.
                </p>
              </div>
            </div>
          )}

          {/* Display arXiv Papers */}
          {papers.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-800">Related Research Papers</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {papers.map((paper, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-bold text-indigo-700 mb-2">
                        <a
                          href={paper.link ? paper.link : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {paper.title}
                        </a>
                      </h4>
                      <Button
                        onClick={() => addToLearningPath(paper)}
                        size="sm"
                        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 h-8"
                      >
                        <span className="flex items-center gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add to Learning Path
                        </span>
                      </Button>
                    </div>
                    <p className="text-gray-700 mt-2 text-sm">
                      {paper.summary && paper.summary.length > 300
                        ? `${paper.summary.substring(0, 300)}...`
                        : paper.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchPaperAnalyzer;
