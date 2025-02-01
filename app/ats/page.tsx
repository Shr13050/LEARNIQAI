// 'use client';
// import { useState } from 'react';

// const ATSPage = () => {
//   const [jd, setJd] = useState<string>('');
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [atsResponse, setAtsResponse] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setResumeFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!jd || !resumeFile) {
//       alert('Please provide both a job description and a resume');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('jd', jd);
//     formData.append('resume', resumeFile);

//     try {
//       const response = await fetch('/api/atsHandler', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       setAtsResponse(data.atsResponse);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('Error submitting data');
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">Smart ATS - Resume Evaluation</h1>

//       <textarea
//         value={jd}
//         onChange={(e) => setJd(e.target.value)}
//         placeholder="Paste the Job Description here"
//         className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//         rows={6}
//       />

//       <input
//         type="file"
//         onChange={handleResumeUpload}
//         className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//       />

//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Evaluating...' : 'Evaluate Resume'}
//       </button>

//       {atsResponse && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">ATS Evaluation Result:</h2>
//           <pre className="text-lg">{atsResponse}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ATSPage;


// "use client";
// import { useState } from 'react';

// interface ATSResponse {
//   "JD Match": string;
//   "MissingKeywords": string[];
//   "Profile Summary": string;
// }

// const ResumeAnalyzer = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>('');
//   const [result, setResult] = useState<ATSResponse | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     const formData = new FormData(event.currentTarget);

//     try {
//       const response = await fetch('/api/atsHandler', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       // Parse the ATS response string into an object
//       const parsedResponse = JSON.parse(data.atsResponse) as ATSResponse;
//       setResult(parsedResponse);
//     } catch (err) {
//       console.error('Error submitting data:', err);
//       setError(err instanceof Error ? err.message : 'Failed to analyze resume');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Resume ATS Analyzer</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="resume" className="block text-sm font-medium mb-2">
//             Upload Resume (PDF)
//           </label>
//           <input
//             type="file"
//             id="resume"
//             name="resume"
//             accept=".pdf"
//             required
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="jd" className="block text-sm font-medium mb-2">
//             Job Description
//           </label>
//           <textarea
//             id="jd"
//             name="jd"
//             required
//             rows={6}
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2"
//             placeholder="Paste the job description here..."
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 rounded-lg text-white ${
//             loading
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Analyzing...' : 'Analyze Resume'}
//         </button>
//       </form>

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {result && (
//         <div className="mt-6 p-6 bg-white border rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium text-gray-700">JD Match</h3>
//               <p className="text-2xl font-bold text-blue-600">{result['JD Match']}</p>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-700">Missing Keywords</h3>
//               <ul className="list-disc list-inside space-y-1">
//                 {result.MissingKeywords.map((keyword, index) => (
//                   <li key={index} className="text-gray-600">{keyword}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-700">Profile Summary</h3>
//               <p className="text-gray-600 whitespace-pre-wrap">
//                 {result['Profile Summary']}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeAnalyzer;


// "use client";
// import { useState } from 'react';

// interface ATSResponse {
//   "JD Match": string;
//   "MissingKeywords": string[];
//   "Profile Summary": string;
// }

// const ResumeAnalyzer = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>('');
//   const [result, setResult] = useState<ATSResponse | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     const formData = new FormData(event.currentTarget);

//     try {
//         const response = await fetch('/api/atsHandler', {
//             method: 'POST',
//             body: formData,
//           });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       // Parse the ATS response string into an object
//       const parsedResponse = JSON.parse(data.atsResponse) as ATSResponse;
//       setResult(parsedResponse);
//     } catch (err) {
//       console.error('Error submitting data:', err);
//       setError(err instanceof Error ? err.message : 'Failed to analyze resume');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Resume ATS Analyzer</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="resume" className="block text-sm font-medium mb-2">
//             Upload Resume (PDF)
//           </label>
//           <input
//             type="file"
//             id="resume"
//             name="resume"
//             accept=".pdf"
//             required
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="jd" className="block text-sm font-medium mb-2">
//             Job Description
//           </label>
//           <textarea
//             id="jd"
//             name="jd"
//             required
//             rows={6}
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2"
//             placeholder="Paste the job description here..."
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 rounded-lg text-white ${
//             loading
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Analyzing...' : 'Analyze Resume'}
//         </button>
//       </form>

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {result && (
//         <div className="mt-6 p-6 bg-white border rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium text-gray-700">JD Match</h3>
//               <p className="text-2xl font-bold text-blue-600">{result['JD Match']}</p>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-700">Missing Keywords</h3>
//               <ul className="list-disc list-inside space-y-1">
//                 {result.MissingKeywords.map((keyword, index) => (
//                   <li key={index} className="text-gray-600">{keyword}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-700">Profile Summary</h3>
//               <p className="text-gray-600 whitespace-pre-wrap">
//                 {result['Profile Summary']}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeAnalyzer;















//old chalne waala code



// 'use client';

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/AiModel';

// interface ATSResult {
//   JDMatch: string;
//   MissingKeywords: string[];
//   ProfileSummary: string;
// }

// const ATSAnalyzer = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromPDF = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('pdf', file);

//     const response = await fetch('/api/extractPdf', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to process PDF');
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file || !jobDescription) {
//       alert('Please provide both a resume and job description');
//       return;
//     }

//     setLoading(true);
//     try {
//       const resumeText = await extractTextFromPDF(file);
      
//       const prompt = `You are an ATS (Applicant Tracking System) expert with deep understanding of tech fields including software engineering, data science, data analysis, and big data engineering. Analyze the provided resume against the job description. Return your analysis in strictly valid JSON format with the following structure:
//       {
//         "JDMatch": "percentage as string with % symbol",
//         "MissingKeywords": ["array of missing important keywords"],
//         "ProfileSummary": "detailed profile analysis"
//       }

//       Resume text: ${resumeText}
//       Job Description: ${jobDescription}

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
//       if (!parsedResult.JDMatch || !Array.isArray(parsedResult.MissingKeywords) || !parsedResult.ProfileSummary) {
//         throw new Error('Invalid response structure');
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Smart ATS</CardTitle>
//         <p className="text-center text-gray-600">Improve Your Resume ATS</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Job Description</label>
//           <Textarea
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             placeholder="Paste the job description here..."
//             className="h-32"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Resume</label>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF file</p>
//         </div>

//         <Button 
//           onClick={handleSubmit} 
//           disabled={loading}
//           className="w-full"
//         >
//           {loading ? 'Analyzing...' : 'Submit'}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">JD Match</h3>
//               <p className="text-2xl font-bold text-blue-600">{result.JDMatch}</p>
//             </div>
            
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Missing Keywords</h3>
//               <ul className="list-disc list-inside">
//                 {result.MissingKeywords.map((keyword, index) => (
//                   <li key={index} className="text-gray-700">{keyword}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;


// "use client"
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/AiModel';
// import { jsPDF } from 'jspdf';

// interface ATSResult {
//   JDMatch: string;
//   MissingKeywords: string[];
//   ProfileSummary: string;
// }

// const ATSAnalyzer = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromPDF = async (file: File): Promise<string> => {
//     const formData = new FormData();
//     formData.append('pdf', file);

//     const response = await fetch('/api/extractPdf', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Failed to process PDF');
//     }

//     const data = await response.json();
//     return data.text;
//   };

//   const handleSubmit = async () => {
//     if (!file || !jobDescription) {
//       alert('Please provide both a resume and job description');
//       return;
//     }

//     setLoading(true);
//     try {
//       const resumeText = await extractTextFromPDF(file);
      
//       const prompt = `You are an ATS (Applicant Tracking System) expert with deep understanding of tech fields including software engineering, data science, data analysis, and big data engineering. Analyze the provided resume against the job description. Return your analysis in strictly valid JSON format with the following structure:
//       {
//         "JDMatch": "percentage as string with % symbol",
//         "MissingKeywords": ["array of missing important keywords"],
//         "ProfileSummary": "detailed profile analysis"
//       }

//       Resume text: ${resumeText}
//       Job Description: ${jobDescription}

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
//       if (!parsedResult.JDMatch || !Array.isArray(parsedResult.MissingKeywords) || !parsedResult.ProfileSummary) {
//         throw new Error('Invalid response structure');
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = () => {
//     if (!result) return;

//     const doc = new jsPDF();
    
//     doc.setFontSize(18);
//     doc.text('ATS Analysis Report', 14, 20);
//     doc.setFontSize(14);
    
//     doc.text('Job Description Match: ' + result.JDMatch, 14, 40);
//     doc.text('Missing Keywords:', 14, 60);
//     result.MissingKeywords.forEach((keyword, index) => {
//       doc.text(`${index + 1}. ${keyword}`, 14, 70 + index * 10);
//     });
    
//     doc.text('Profile Summary:', 14, 90);
//     doc.text(result.ProfileSummary, 14, 100);
    
//     doc.save('ATS_Analysis_Report.pdf');
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Smart ATS</CardTitle>
//         <p className="text-center text-gray-600">Improve Your Resume ATS</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Job Description</label>
//           <Textarea
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             placeholder="Paste the job description here..."
//             className="h-32"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Resume</label>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload a PDF file</p>
//         </div>

//         <Button 
//           onClick={handleSubmit} 
//           disabled={loading}
//           className="w-full"
//         >
//           {loading ? 'Analyzing...' : 'Submit'}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">JD Match</h3>
//               <p className="text-2xl font-bold text-blue-600">{result.JDMatch}</p>
//             </div>
            
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Missing Keywords</h3>
//               <ul className="list-disc list-inside">
//                 {result.MissingKeywords.map((keyword, index) => (
//                   <li key={index} className="text-gray-700">{keyword}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>

//             <Button onClick={downloadPDF} className="w-full mt-6">
//               Download Report as PDF
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;



// 'use client';

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/AiModel';

// interface ATSResult {
//   JDMatch: string;
//   MissingKeywords: string[];
//   ProfileSummary: string;
//   ScoreBreakdown: {
//     KeywordMatch: string;
//     ExperienceMatch: string;
//     SkillsMatch: string;
//     EducationMatch: string;
//   };
// }

// const ATSAnalyzer = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const extractTextFromPDFs = async (files: File[]): Promise<string> => {
//     let combinedText = '';
//     for (const file of files) {
//       const formData = new FormData();
//       formData.append('pdf', file);

//       const response = await fetch('/api/extractPdf', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process PDF');
//       }

//       const data = await response.json();
//       combinedText += data.text + '\n';
//     }
//     return combinedText;
//   };

//   const handleSubmit = async () => {
//     if (files.length === 0 || !jobDescription) {
//       alert('Please provide both a resume and job description');
//       return;
//     }

//     setLoading(true);
//     try {
//       const resumeText = await extractTextFromPDFs(files);

//       const prompt = `You are an ATS (Applicant Tracking System) expert with deep understanding of tech fields including software engineering, data science, data analysis, and big data engineering. Analyze the provided resume against the job description. Return your analysis in strictly valid JSON format with the following structure:
//       {
//         "JDMatch": "percentage as string with % symbol",
//         "MissingKeywords": ["array of missing important keywords"],
//         "ProfileSummary": "detailed profile analysis",
//         "ScoreBreakdown": {
//           "KeywordMatch": "percentage as string with % symbol",
//           "ExperienceMatch": "percentage as string with % symbol",
//           "SkillsMatch": "percentage as string with % symbol",
//           "EducationMatch": "percentage as string with % symbol"
//         }
//       }

//       Resume text: ${resumeText}
//       Job Description: ${jobDescription}

//       Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Invalid response format');
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);

//       if (!parsedResult.JDMatch || !Array.isArray(parsedResult.MissingKeywords) || !parsedResult.ProfileSummary || !parsedResult.ScoreBreakdown) {
//         throw new Error('Invalid response structure');
//       }

//       setResult(parsedResult);
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReport = () => {
//     if (!result) return;

//     const report = {
//       jobDescription,
//       analysis: result,
//     };

//     const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'ATS_Analysis_Report.json';
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto mt-8">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">Smart ATS</CardTitle>
//         <p className="text-center text-gray-600">Improve Your Resume ATS</p>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Job Description</label>
//           <Textarea
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             placeholder="Paste the job description here..."
//             className="h-32"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Upload Resume</label>
//           <input
//             type="file"
//             accept=".pdf"
//             multiple
//             onChange={(e) => setFiles(Array.from(e.target.files || []))}
//             className="w-full"
//           />
//           <p className="text-sm text-gray-500">Please upload PDF files</p>
//         </div>

//         <Button 
//           onClick={handleSubmit} 
//           disabled={loading}
//           className="w-full"
//         >
//           {loading ? 'Analyzing...' : 'Submit'}
//         </Button>

//         {result && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">JD Match</h3>
//               <p className="text-2xl font-bold text-blue-600">{result.JDMatch}</p>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Score Breakdown</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-600">Keyword Match</p>
//                   <p className="text-lg font-bold">{result.ScoreBreakdown.KeywordMatch}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Experience Match</p>
//                   <p className="text-lg font-bold">{result.ScoreBreakdown.ExperienceMatch}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Skills Match</p>
//                   <p className="text-lg font-bold">{result.ScoreBreakdown.SkillsMatch}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Education Match</p>
//                   <p className="text-lg font-bold">{result.ScoreBreakdown.EducationMatch}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Missing Keywords</h3>
//               <ul className="list-disc list-inside">
//                 {result.MissingKeywords.map((keyword, index) => (
//                   <li key={index} className="text-gray-700">{keyword}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>

//             <Button onClick={downloadReport} className="w-full mt-4">
//               Download Analysis Report
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;

"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/AiModel';
import { jsPDF } from 'jspdf';

interface ATSResult {
  JDMatch: string;
  MissingKeywords: string[];
  ProfileSummary: string;
  ScoreBreakdown: {
    KeywordMatch: string;
    ExperienceMatch: string;
    SkillsMatch: string;
    EducationMatch: string;
  };
}

interface CareerSuggestion {
  careerPath: string;
  courses: string[];
}

const ATSAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion | null>(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const extractTextFromPDFs = async (files: File[]): Promise<string> => {
    let combinedText = '';
    for (const file of files) {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/extractPdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      combinedText += data.text + '\n';
    }
    return combinedText;
  };

  const handleSubmit = async () => {
    if (files.length === 0 || !jobDescription) {
      alert('Please provide both a resume and job description');
      return;
    }

    setLoading(true);
    try {
      const resumeText = await extractTextFromPDFs(files);

      const prompt = `You are an ATS (Applicant Tracking System) expert with deep understanding of tech fields including software engineering, data science, data analysis, and big data engineering. Analyze the provided resume against the job description. Return your analysis in strictly valid JSON format with the following structure:
      {
        "JDMatch": "percentage as string with % symbol",
        "MissingKeywords": ["array of missing important keywords"],
        "ProfileSummary": "detailed profile analysis",
        "ScoreBreakdown": {
          "KeywordMatch": "percentage as string with % symbol",
          "ExperienceMatch": "percentage as string with % symbol",
          "SkillsMatch": "percentage as string with % symbol",
          "EducationMatch": "percentage as string with % symbol"
        }
      }

      Resume text: ${resumeText}
      Job Description: ${jobDescription}

      Ensure your response is ONLY the JSON object, with no additional text or markdown.`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();

      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const parsedResult = JSON.parse(jsonMatch[0]);

      if (!parsedResult.JDMatch || !Array.isArray(parsedResult.MissingKeywords) || !parsedResult.ProfileSummary || !parsedResult.ScoreBreakdown) {
        throw new Error('Invalid response structure');
      }

      setResult(parsedResult);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('An error occurred while analyzing the resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

const downloadReport = () => {
  if (!result) return;

  const doc = new jsPDF();
  
  // Function to wrap text inside a defined width
  const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
    const wrappedText = doc.splitTextToSize(text, maxWidth);
    doc.text(wrappedText, x, y);
    return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
  };

  // Add JDMatch Section
  doc.setFontSize(16);
  doc.text('JD Match:', 10, 10);
  doc.setFontSize(12);
  let yPosition = 20;
  yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

  // Add Score Breakdown Section
  doc.setFontSize(16);
  doc.text('Score Breakdown:', 10, yPosition);
  doc.setFontSize(12);
  yPosition += 10;

  const scoreBreakdown = result.ScoreBreakdown;
  yPosition = wrapText(`Keyword Match: ${scoreBreakdown.KeywordMatch}`, 10, yPosition, 180);
  yPosition = wrapText(`Experience Match: ${scoreBreakdown.ExperienceMatch}`, 10, yPosition, 180);
  yPosition = wrapText(`Skills Match: ${scoreBreakdown.SkillsMatch}`, 10, yPosition, 180);
  yPosition = wrapText(`Education Match: ${scoreBreakdown.EducationMatch}`, 10, yPosition, 180);

  // Add Missing Keywords Section
  doc.setFontSize(16);
  doc.text('Missing Keywords:', 10, yPosition);
  doc.setFontSize(12);
  yPosition += 10;

  result.MissingKeywords.forEach((keyword, index) => {
    yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
  });

  // Add Profile Summary Section
  doc.setFontSize(16);
  doc.text('Profile Summary:', 10, yPosition);
  doc.setFontSize(12);
  yPosition += 10;

  yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

  // Save the PDF
  doc.save('ATS_Analysis_Report.pdf');
};


  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Smart ATS</CardTitle>
        <p className="text-center text-gray-600">Improve Your Resume ATS</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Job Description</label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="h-32"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Upload Resume</label>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full"
          />
          <p className="text-sm text-gray-500">Please upload PDF files</p>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </Button>

        {result && (
          <div id="report-content" className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">JD Match</h3>
              <p className="text-2xl font-bold text-blue-600">{result.JDMatch}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Score Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Keyword Match</p>
                  <p className="text-lg font-bold">{result.ScoreBreakdown.KeywordMatch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience Match</p>
                  <p className="text-lg font-bold">{result.ScoreBreakdown.ExperienceMatch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Skills Match</p>
                  <p className="text-lg font-bold">{result.ScoreBreakdown.SkillsMatch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Education Match</p>
                  <p className="text-lg font-bold">{result.ScoreBreakdown.EducationMatch}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Missing Keywords</h3>
              <ul className="list-disc list-inside">
                {result.MissingKeywords.map((keyword, index) => (
                  <li key={index} className="text-gray-700">{keyword}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Profile Summary</h3>
              <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
            </div>

            <Button onClick={downloadReport} className="w-full mt-4">
              Download Analysis Report (PDF)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATSAnalyzer;
