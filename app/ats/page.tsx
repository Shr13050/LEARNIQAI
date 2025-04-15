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



// //correct code 
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
//   ScoreBreakdown: {
//     KeywordMatch: string;
//     ExperienceMatch: string;
//     SkillsMatch: string;
//     EducationMatch: string;
//   };
// }

// interface CareerSuggestion {
//   careerPath: string;
//   courses: string[];
// }

// const ATSAnalyzer = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion | null>(null);
//   const [suggestionsLoading, setSuggestionsLoading] = useState(false);

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

  

// const downloadReport = () => {
//   if (!result) return;

//   const doc = new jsPDF();
  
//   // Function to wrap text inside a defined width
//   const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
//     const wrappedText = doc.splitTextToSize(text, maxWidth);
//     doc.text(wrappedText, x, y);
//     return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
//   };

//   // Add JDMatch Section
//   doc.setFontSize(16);
//   doc.text('JD Match:', 10, 10);
//   doc.setFontSize(12);
//   let yPosition = 20;
//   yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

//   // Add Score Breakdown Section
//   doc.setFontSize(16);
//   doc.text('Score Breakdown:', 10, yPosition);
//   doc.setFontSize(12);
//   yPosition += 10;

//   const scoreBreakdown = result.ScoreBreakdown;
//   yPosition = wrapText(`Keyword Match: ${scoreBreakdown.KeywordMatch}`, 10, yPosition, 180);
//   yPosition = wrapText(`Experience Match: ${scoreBreakdown.ExperienceMatch}`, 10, yPosition, 180);
//   yPosition = wrapText(`Skills Match: ${scoreBreakdown.SkillsMatch}`, 10, yPosition, 180);
//   yPosition = wrapText(`Education Match: ${scoreBreakdown.EducationMatch}`, 10, yPosition, 180);

//   // Add Missing Keywords Section
//   doc.setFontSize(16);
//   doc.text('Missing Keywords:', 10, yPosition);
//   doc.setFontSize(12);
//   yPosition += 10;

//   result.MissingKeywords.forEach((keyword, index) => {
//     yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
//   });

//   // Add Profile Summary Section
//   doc.setFontSize(16);
//   doc.text('Profile Summary:', 10, yPosition);
//   doc.setFontSize(12);
//   yPosition += 10;

//   yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

//   // Save the PDF
//   doc.save('ATS_Analysis_Report.pdf');
// };


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
//           <div id="report-content" className="mt-6 space-y-4">
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
//               Download Analysis Report (PDF)
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;



//with analysed topics working perfect

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
//   ScoreBreakdown: {
//     KeywordMatch: string;
//     ExperienceMatch: string;
//     SkillsMatch: string;
//     EducationMatch: string;
//   };
// }

// interface CareerSuggestion {
//   careerPath: string;
//   courses: string[];
// }

// interface KeywordTopics {
//   [topic: string]: string[];
// }

// const ATSAnalyzer = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion | null>(null);
//   const [suggestionsLoading, setSuggestionsLoading] = useState(false);
//   const [keywordTopics, setKeywordTopics] = useState<KeywordTopics | null>(null);
//   const [showTopics, setShowTopics] = useState(false);
//   const [topicsLoading, setTopicsLoading] = useState(false);

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
//       setKeywordTopics(null);
//       setShowTopics(false);
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const analyzeKeywordTopics = async () => {
//     if (!result || !result.MissingKeywords || result.MissingKeywords.length === 0) {
//       alert('No missing keywords to analyze');
//       return;
//     }
    
//     setTopicsLoading(true);
//     try {
//       const prompt = `
//         You are a career and technology expert. Analyze the following list of missing keywords from a job application and group them into meaningful technology/skill categories or topics.
        
//         Missing keywords: ${result.MissingKeywords.join(', ')}
        
//         Return your analysis in strictly valid JSON format with the following structure:
//         {
//           "categories": {
//             "category1": ["keyword1", "keyword2"],
//             "category2": ["keyword3", "keyword4"],
//             ...
//           }
//         }
        
//         Use 3-7 categories maximum. Group similar technologies and skills together. Categories should be meaningful in a technical/professional context (like "Cloud Technologies", "Programming Languages", "Data Analysis Tools", etc.).
        
//         Ensure your response is ONLY the JSON object, with no additional text or markdown.
//       `;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Invalid response format');
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);
      
//       if (!parsedResult.categories) {
//         throw new Error('Invalid response structure');
//       }

//       setKeywordTopics(parsedResult.categories);
//       setShowTopics(true);
//     } catch (error) {
//       console.error('Error analyzing keyword topics:', error);
//       alert('An error occurred while analyzing keyword topics. Please try again.');
//     } finally {
//       setTopicsLoading(false);
//     }
//   };

//   const downloadReport = () => {
//     if (!result) return;

//     const doc = new jsPDF();
    
//     // Function to wrap text inside a defined width
//     const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
//       const wrappedText = doc.splitTextToSize(text, maxWidth);
//       doc.text(wrappedText, x, y);
//       return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
//     };

//     // Add JDMatch Section
//     doc.setFontSize(16);
//     doc.text('JD Match:', 10, 10);
//     doc.setFontSize(12);
//     let yPosition = 20;
//     yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

//     // Add Score Breakdown Section
//     doc.setFontSize(16);
//     doc.text('Score Breakdown:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     const scoreBreakdown = result.ScoreBreakdown;
//     yPosition = wrapText(`Keyword Match: ${scoreBreakdown.KeywordMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Experience Match: ${scoreBreakdown.ExperienceMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Skills Match: ${scoreBreakdown.SkillsMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Education Match: ${scoreBreakdown.EducationMatch}`, 10, yPosition, 180);

//     // Add Missing Keywords Section
//     doc.setFontSize(16);
//     doc.text('Missing Keywords:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     result.MissingKeywords.forEach((keyword, index) => {
//       yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
//     });

//     // Add Keyword Topics Section if available
//     if (keywordTopics) {
//       doc.setFontSize(16);
//       doc.text('Keyword Topics:', 10, yPosition);
//       doc.setFontSize(12);
//       yPosition += 10;

//       Object.keys(keywordTopics).forEach(topic => {
//         yPosition = wrapText(`${topic}:`, 10, yPosition, 180);
//         keywordTopics[topic].forEach((keyword, index) => {
//           yPosition = wrapText(`  - ${keyword}`, 10, yPosition, 180);
//         });
//         yPosition += 5; // Add space between topics
//       });
//     }

//     // Add Profile Summary Section
//     doc.setFontSize(16);
//     doc.text('Profile Summary:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

//     // Save the PDF
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
//           <div id="report-content" className="mt-6 space-y-4">
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
              
//               <div className="mt-4">
//                 <Button 
//                   onClick={analyzeKeywordTopics} 
//                   disabled={topicsLoading}
//                   variant="outline"
//                   className="w-full"
//                 >
//                   {topicsLoading ? 'Analyzing Topics...' : 'Analyze Missing Keywords by Topic'}
//                 </Button>
//               </div>
//             </div>
            
//             {showTopics && keywordTopics && (
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <h3 className="font-semibold">Keyword Topics</h3>
//                 <div className="mt-3 space-y-4">
//                   {Object.keys(keywordTopics).map((topic, index) => (
//                     <div key={index} className="border rounded-md p-3">
//                       <h4 className="font-medium text-blue-700">{topic}</h4>
//                       <ul className="mt-2 list-disc list-inside">
//                         {keywordTopics[topic].map((keyword, idx) => (
//                           <li key={idx} className="text-gray-700">{keyword}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>

//             <Button onClick={downloadReport} className="w-full mt-4">
//               Download Analysis Report (PDF)
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;




//without local storage but perfect

// "use client"

// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/AiModel';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/navigation';

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

// interface CareerSuggestion {
//   careerPath: string;
//   courses: string[];
// }

// interface KeywordTopics {
//   [topic: string]: string[];
// }

// const ATSAnalyzer = () => {
//   const router = useRouter();
//   const [jobDescription, setJobDescription] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion | null>(null);
//   const [suggestionsLoading, setSuggestionsLoading] = useState(false);
//   const [keywordTopics, setKeywordTopics] = useState<KeywordTopics | null>(null);
//   const [showTopics, setShowTopics] = useState(false);
//   const [topicsLoading, setTopicsLoading] = useState(false);

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
//       setKeywordTopics(null);
//       setShowTopics(false);
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const analyzeKeywordTopics = async () => {
//     if (!result || !result.MissingKeywords || result.MissingKeywords.length === 0) {
//       alert('No missing keywords to analyze');
//       return;
//     }
    
//     setTopicsLoading(true);
//     try {
//       const prompt = `
//         You are a career and technology expert. Analyze the following list of missing keywords from a job application and group them into meaningful technology/skill categories or topics.
        
//         Missing keywords: ${result.MissingKeywords.join(', ')}
        
//         Return your analysis in strictly valid JSON format with the following structure:
//         {
//           "categories": {
//             "category1": ["keyword1", "keyword2"],
//             "category2": ["keyword3", "keyword4"],
//             ...
//           }
//         }
        
//         Use 3-7 categories maximum. Group similar technologies and skills together. Categories should be meaningful in a technical/professional context (like "Cloud Technologies", "Programming Languages", "Data Analysis Tools", etc.).
        
//         Ensure your response is ONLY the JSON object, with no additional text or markdown.
//       `;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Invalid response format');
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);
      
//       if (!parsedResult.categories) {
//         throw new Error('Invalid response structure');
//       }

//       setKeywordTopics(parsedResult.categories);
//       setShowTopics(true);
//     } catch (error) {
//       console.error('Error analyzing keyword topics:', error);
//       alert('An error occurred while analyzing keyword topics. Please try again.');
//     } finally {
//       setTopicsLoading(false);
//     }
//   };

//   const navigateToRoadmap = (topic: string, keywords: string[]) => {
//     // Store the data in localStorage to pass to the roadmap page
//     const roadmapData = {
//       topic,
//       keywords,
//       jobDescription: jobDescription
//     };
    
//     localStorage.setItem('roadmapData', JSON.stringify(roadmapData));
    
//     // Redirect to roadmap page
//     router.push('/roadmap');
//   };

//   const downloadReport = () => {
//     if (!result) return;

//     const doc = new jsPDF();
    
//     // Function to wrap text inside a defined width
//     const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
//       const wrappedText = doc.splitTextToSize(text, maxWidth);
//       doc.text(wrappedText, x, y);
//       return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
//     };

//     // Add JDMatch Section
//     doc.setFontSize(16);
//     doc.text('JD Match:', 10, 10);
//     doc.setFontSize(12);
//     let yPosition = 20;
//     yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

//     // Add Score Breakdown Section
//     doc.setFontSize(16);
//     doc.text('Score Breakdown:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     const scoreBreakdown = result.ScoreBreakdown;
//     yPosition = wrapText(`Keyword Match: ${scoreBreakdown.KeywordMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Experience Match: ${scoreBreakdown.ExperienceMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Skills Match: ${scoreBreakdown.SkillsMatch}`, 10, yPosition, 180);
//     yPosition = wrapText(`Education Match: ${scoreBreakdown.EducationMatch}`, 10, yPosition, 180);

//     // Add Missing Keywords Section
//     doc.setFontSize(16);
//     doc.text('Missing Keywords:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     result.MissingKeywords.forEach((keyword, index) => {
//       yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
//     });

//     // Add Keyword Topics Section if available
//     if (keywordTopics) {
//       doc.setFontSize(16);
//       doc.text('Keyword Topics:', 10, yPosition);
//       doc.setFontSize(12);
//       yPosition += 10;

//       Object.keys(keywordTopics).forEach(topic => {
//         yPosition = wrapText(`${topic}:`, 10, yPosition, 180);
//         keywordTopics[topic].forEach((keyword, index) => {
//           yPosition = wrapText(`  - ${keyword}`, 10, yPosition, 180);
//         });
//         yPosition += 5; // Add space between topics
//       });
//     }

//     // Add Profile Summary Section
//     doc.setFontSize(16);
//     doc.text('Profile Summary:', 10, yPosition);
//     doc.setFontSize(12);
//     yPosition += 10;

//     yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

//     // Save the PDF
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
//           <div id="report-content" className="mt-6 space-y-4">
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
              
//               <div className="mt-4">
//                 <Button 
//                   onClick={analyzeKeywordTopics} 
//                   disabled={topicsLoading}
//                   variant="outline"
//                   className="w-full"
//                 >
//                   {topicsLoading ? 'Analyzing Topics...' : 'Analyze Missing Keywords by Topic'}
//                 </Button>
//               </div>
//             </div>
            
//             {showTopics && keywordTopics && (
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <h3 className="font-semibold">Keyword Topics</h3>
//                 <div className="mt-3 space-y-4">
//                   {Object.keys(keywordTopics).map((topic, index) => (
//                     <div key={index} className="border rounded-md p-3">
//                       <div className="flex justify-between items-center">
//                         <h4 className="font-medium text-blue-700">{topic}</h4>
//                         <Button 
//                           variant="default"
//                           size="sm"
//                           className="bg-green-600 hover:bg-green-700"
//                           onClick={() => navigateToRoadmap(topic, keywordTopics[topic])}
//                         >
//                           Generate Roadmap
//                         </Button>
//                       </div>
//                       <ul className="mt-2 list-disc list-inside">
//                         {keywordTopics[topic].map((keyword, idx) => (
//                           <li key={idx} className="text-gray-700">{keyword}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>

//             <Button onClick={downloadReport} className="w-full mt-4">
//               Download Analysis Report (PDF)
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;

//correct code latest



// "use client"

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/AiModel';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/navigation';

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

// interface CareerSuggestion {
//   careerPath: string;
//   courses: string[];
// }

// interface KeywordTopics {
//   [topic: string]: string[];
// }

// const ATSAnalyzer = () => {
//   const router = useRouter();
//   const [jobDescription, setJobDescription] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [result, setResult] = useState<ATSResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion | null>(null);
//   const [suggestionsLoading, setSuggestionsLoading] = useState(false);
//   const [keywordTopics, setKeywordTopics] = useState<KeywordTopics | null>(null);
//   const [showTopics, setShowTopics] = useState(false);
//   const [topicsLoading, setTopicsLoading] = useState(false);

//   // Load data from localStorage when component mounts
//   useEffect(() => {
//     const storedJobDescription = localStorage.getItem('jobDescription');
//     if (storedJobDescription) {
//       setJobDescription(storedJobDescription);
//     }

//     const storedResult = localStorage.getItem('atsResult');
//     if (storedResult) {
//       setResult(JSON.parse(storedResult));
//     }

//     const storedKeywordTopics = localStorage.getItem('keywordTopics');
//     if (storedKeywordTopics) {
//       setKeywordTopics(JSON.parse(storedKeywordTopics));
//     }

//     const storedShowTopics = localStorage.getItem('showTopics');
//     if (storedShowTopics) {
//       setShowTopics(JSON.parse(storedShowTopics));
//     }
//   }, []);

//   // Save job description to localStorage whenever it changes
//   useEffect(() => {
//     if (jobDescription) {
//       localStorage.setItem('jobDescription', jobDescription);
//     }
//   }, [jobDescription]);

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

//       // Save result to state and localStorage
//       setResult(parsedResult);
//       localStorage.setItem('atsResult', JSON.stringify(parsedResult));
      
//       // Reset keyword topics
//       setKeywordTopics(null);
//       localStorage.removeItem('keywordTopics');
      
//       setShowTopics(false);
//       localStorage.setItem('showTopics', 'false');
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       alert('An error occurred while analyzing the resume. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const analyzeKeywordTopics = async () => {
//     if (!result || !result.MissingKeywords || result.MissingKeywords.length === 0) {
//       alert('No missing keywords to analyze');
//       return;
//     }
    
//     setTopicsLoading(true);
//     try {
//       const prompt = `
//         You are a career and technology expert. Analyze the following list of missing keywords from a job application and group them into meaningful technology/skill categories or topics.
        
//         Missing keywords: ${result.MissingKeywords.join(', ')}
        
//         Return your analysis in strictly valid JSON format with the following structure:
//         {
//           "categories": {
//             "category1": ["keyword1", "keyword2"],
//             "category2": ["keyword3", "keyword4"],
//             ...
//           }
//         }
        
//         Use 3-7 categories maximum. Group similar technologies and skills together. Categories should be meaningful in a technical/professional context (like "Cloud Technologies", "Programming Languages", "Data Analysis Tools", etc.).
        
//         Ensure your response is ONLY the JSON object, with no additional text or markdown.
//       `;

//       const response = await chatSession.sendMessage(prompt);
//       const resultText = await response.response.text();

//       const jsonMatch = resultText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error('Invalid response format');
//       }

//       const parsedResult = JSON.parse(jsonMatch[0]);
      
//       if (!parsedResult.categories) {
//         throw new Error('Invalid response structure');
//       }

//       // Save keyword topics to state and localStorage
//       setKeywordTopics(parsedResult.categories);
//       localStorage.setItem('keywordTopics', JSON.stringify(parsedResult.categories));
      
//       setShowTopics(true);
//       localStorage.setItem('showTopics', 'true');
//     } catch (error) {
//       console.error('Error analyzing keyword topics:', error);
//       alert('An error occurred while analyzing keyword topics. Please try again.');
//     } finally {
//       setTopicsLoading(false);
//     }
//   };

  // const navigateToRoadmap = (topic: string, keywords: string[]) => {
  //   // Store the data in localStorage to pass to the roadmap page
  //   const roadmapData = {
  //     topic,
  //     keywords,
  //     jobDescription: jobDescription
  //   };
    
  //   localStorage.setItem('roadmapData', JSON.stringify(roadmapData));
    
  //   // Redirect to roadmap page
  //   router.push('/roadmap');
  // };

//   const clearAllData = () => {
//     // Clear state
//     setResult(null);
//     setKeywordTopics(null);
//     setShowTopics(false);
    
//     // Clear localStorage
//     localStorage.removeItem('atsResult');
//     localStorage.removeItem('keywordTopics');
//     localStorage.removeItem('showTopics');
    
//     // Optionally clear job description too
//     // setJobDescription('');
//     // localStorage.removeItem('jobDescription');
//   };

  // const downloadReport = () => {
  //   if (!result) return;

  //   const doc = new jsPDF();
    
  //   // Function to wrap text inside a defined width
  //   const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
  //     const wrappedText = doc.splitTextToSize(text, maxWidth);
  //     doc.text(wrappedText, x, y);
  //     return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
  //   };

  //   // Add JDMatch Section
  //   doc.setFontSize(16);
  //   doc.text('JD Match:', 10, 10);
  //   doc.setFontSize(12);
  //   let yPosition = 20;
  //   yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

  //   // Add Score Breakdown Section
  //   doc.setFontSize(16);
  //   doc.text('Score Breakdown:', 10, yPosition);
  //   doc.setFontSize(12);
  //   yPosition += 10;

  //   const scoreBreakdown = result.ScoreBreakdown;
  //   yPosition = wrapText(`Keyword Match: ${scoreBreakdown.KeywordMatch}`, 10, yPosition, 180);
  //   yPosition = wrapText(`Experience Match: ${scoreBreakdown.ExperienceMatch}`, 10, yPosition, 180);
  //   yPosition = wrapText(`Skills Match: ${scoreBreakdown.SkillsMatch}`, 10, yPosition, 180);
  //   yPosition = wrapText(`Education Match: ${scoreBreakdown.EducationMatch}`, 10, yPosition, 180);

  //   // Add Missing Keywords Section
  //   doc.setFontSize(16);
  //   doc.text('Missing Keywords:', 10, yPosition);
  //   doc.setFontSize(12);
  //   yPosition += 10;

  //   result.MissingKeywords.forEach((keyword, index) => {
  //     yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
  //   });

  //   // Add Keyword Topics Section if available
  //   if (keywordTopics) {
  //     doc.setFontSize(16);
  //     doc.text('Keyword Topics:', 10, yPosition);
  //     doc.setFontSize(12);
  //     yPosition += 10;

  //     Object.keys(keywordTopics).forEach(topic => {
  //       yPosition = wrapText(`${topic}:`, 10, yPosition, 180);
  //       keywordTopics[topic].forEach((keyword, index) => {
  //         yPosition = wrapText(`  - ${keyword}`, 10, yPosition, 180);
  //       });
  //       yPosition += 5; // Add space between topics
  //     });
  //   }

  //   // Add Profile Summary Section
  //   doc.setFontSize(16);
  //   doc.text('Profile Summary:', 10, yPosition);
  //   doc.setFontSize(12);
  //   yPosition += 10;

  //   yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

  //   // Save the PDF
  //   doc.save('ATS_Analysis_Report.pdf');
  // };

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

//         <div className="flex space-x-2">
//           <Button 
//             onClick={handleSubmit} 
//             disabled={loading}
//             className="flex-1"
//           >
//             {loading ? 'Analyzing...' : 'Submit'}
//           </Button>
          
//           {result && (
//             <Button 
//               onClick={clearAllData} 
//               variant="destructive"
//               className="w-1/4"
//             >
//               Clear Results
//             </Button>
//           )}
//         </div>

//         {result && (
//           <div id="report-content" className="mt-6 space-y-4">
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
              
//               <div className="mt-4">
//                 <Button 
//                   onClick={analyzeKeywordTopics} 
//                   disabled={topicsLoading}
//                   variant="outline"
//                   className="w-full"
//                 >
//                   {topicsLoading ? 'Analyzing Topics...' : 'Analyze Missing Keywords by Topic'}
//                 </Button>
//               </div>
//             </div>
            
//             {showTopics && keywordTopics && (
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <h3 className="font-semibold">Keyword Topics</h3>
//                 <div className="mt-3 space-y-4">
//                   {Object.keys(keywordTopics).map((topic, index) => (
//                     <div key={index} className="border rounded-md p-3">
//                       <div className="flex justify-between items-center">
//                         <h4 className="font-medium text-blue-700">{topic}</h4>
//                         <Button 
//                           variant="default"
//                           size="sm"
//                           className="bg-green-600 hover:bg-green-700"
//                           onClick={() => navigateToRoadmap(topic, keywordTopics[topic])}
//                         >
//                           Generate Roadmap
//                         </Button>
//                       </div>
//                       <ul className="mt-2 list-disc list-inside">
//                         {keywordTopics[topic].map((keyword, idx) => (
//                           <li key={idx} className="text-gray-700">{keyword}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <h3 className="font-semibold">Profile Summary</h3>
//               <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
//             </div>

//             <Button onClick={downloadReport} className="w-full mt-4">
//               Download Analysis Report (PDF)
//             </Button>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ATSAnalyzer;

"use client"
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, ChevronRight, ArrowRight, Download, BarChart, BookOpen, CheckCircle, AlertCircle, Award, RefreshCw, Router } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/navigation';

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

interface KeywordTopics {
  [topic: string]: string[];
}

const extractNumericPercentage = (percentStr: string): number => {
  const match = percentStr.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

const Index = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [keywordTopics, setKeywordTopics] = useState<KeywordTopics | null>(null);
  const [showTopics, setShowTopics] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  // Mock function to simulate the API call for demo purposes
  const mockAnalyzeResume = async () => {
    return new Promise<ATSResult>((resolve) => {
      setTimeout(() => {
        resolve({
          JDMatch: "72%",
          MissingKeywords: [
            "Kubernetes",
            "Docker",
            "AWS",
            "CI/CD pipelines",
            "TypeScript",
            "GraphQL",
            "React Native"
          ],
          ProfileSummary: "Your profile shows strong software development skills with experience in web development using React and Node.js. You have demonstrated ability to work in team environments and have completed several significant projects. To improve your match for this position, consider adding more cloud-native technologies and expanding your mobile development skills.",
          ScoreBreakdown: {
            KeywordMatch: "65%",
            ExperienceMatch: "80%",
            SkillsMatch: "75%",
            EducationMatch: "90%"
          }
        });
      }, 2000);
    });
  };
  const router = useRouter();

  // Mock function to simulate the keyword topics analysis
  const mockAnalyzeKeywordTopics = async () => {
    return new Promise<KeywordTopics>((resolve) => {
      setTimeout(() => {
        resolve({
          "Cloud Technologies": ["Kubernetes", "Docker", "AWS"],
          "Web Development": ["TypeScript", "GraphQL"],
          "Mobile Development": ["React Native"],
          "DevOps": ["CI/CD pipelines"]
        });
      }, 1500);
    });
  };

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedJobDescription = localStorage.getItem('jobDescription');
    if (storedJobDescription) {
      setJobDescription(storedJobDescription);
    }

    const storedResult = localStorage.getItem('atsResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      setActiveTab("results");
    }

    const storedKeywordTopics = localStorage.getItem('keywordTopics');
    if (storedKeywordTopics) {
      setKeywordTopics(JSON.parse(storedKeywordTopics));
    }

    const storedShowTopics = localStorage.getItem('showTopics');
    if (storedShowTopics) {
      setShowTopics(JSON.parse(storedShowTopics));
    }
  }, []);

  // Save job description to localStorage whenever it changes
  useEffect(() => {
    if (jobDescription) {
      localStorage.setItem('jobDescription', jobDescription);
    }
  }, [jobDescription]);

  const handleSubmit = async () => {
    if (files.length === 0 || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both a resume and job description",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // In a real application, this would call your API
      // For demo purposes, we're using a mock function
      const result = await mockAnalyzeResume();

      // Save result to state and localStorage
      setResult(result);
      localStorage.setItem('atsResult', JSON.stringify(result));
      
      // Reset keyword topics
      setKeywordTopics(null);
      localStorage.removeItem('keywordTopics');
      
      setShowTopics(false);
      localStorage.setItem('showTopics', 'false');
      
      setActiveTab("results");
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeKeywordTopics = async () => {
    if (!result || !result.MissingKeywords || result.MissingKeywords.length === 0) {
      toast({
        title: "No Keywords",
        description: "No missing keywords to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setTopicsLoading(true);
    try {
      // In a real application, this would call your API
      // For demo purposes, we're using a mock function
      const topicsResult = await mockAnalyzeKeywordTopics();

      // Save keyword topics to state and localStorage
      setKeywordTopics(topicsResult);
      localStorage.setItem('keywordTopics', JSON.stringify(topicsResult));
      
      setShowTopics(true);
      localStorage.setItem('showTopics', 'true');
      
      toast({
        title: "Topics Analyzed",
        description: "Missing keywords have been categorized into topics",
      });
    } catch (error) {
      console.error('Error analyzing keyword topics:', error);
      toast({
        title: "Topic Analysis Failed",
        description: "An error occurred while analyzing keyword topics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTopicsLoading(false);
    }
  };

  // const navigateToRoadmap = (topic: string, keywords: string[]) => {
  //   // For demo purposes, show a toast instead of navigation
  //   toast({
  //     title: "Roadmap Requested",
  //     description: `Generating roadmap for ${topic} with ${keywords.length} keywords`,
  //   });
  // };
  const navigateToRoadmap = (topic: string, keywords: string[]) => {
    // Store the data in localStorage to pass to the roadmap page
    const roadmapData = {
      topic,
      keywords,
      jobDescription: jobDescription
    };
    
    localStorage.setItem('roadmapData', JSON.stringify(roadmapData));
    
    // Redirect to roadmap page
    router.push('/roadmap');
    
  };

  const clearAllData = () => {
    // Clear state
    setResult(null);
    setKeywordTopics(null);
    setShowTopics(false);
    setActiveTab("upload");
    
    // Clear localStorage
    localStorage.removeItem('atsResult');
    localStorage.removeItem('keywordTopics');
    localStorage.removeItem('showTopics');
    
    toast({
      title: "Data Cleared",
      description: "All analysis results have been cleared",
    });
  };

  // const downloadReport = () => {
  //   if (!result) return;

  //   toast({
  //     title: "Report Downloaded",
  //     description: "Your analysis report has been downloaded as a PDF",
  //   });
  // };

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

    // Add Keyword Topics Section if available
    if (keywordTopics) {
      doc.setFontSize(16);
      doc.text('Keyword Topics:', 10, yPosition);
      doc.setFontSize(12);
      yPosition += 10;

      Object.keys(keywordTopics).forEach(topic => {
        yPosition = wrapText(`${topic}:`, 10, yPosition, 180);
        keywordTopics[topic].forEach((keyword, index) => {
          yPosition = wrapText(`  - ${keyword}`, 10, yPosition, 180);
        });
        yPosition += 5; // Add space between topics
      });
    }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4 tracking-tight">
            ATS Insights Optimizer
          </h1>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto">
            Optimize your resume for Applicant Tracking Systems and improve your chances of landing your dream job
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">ATS Resume Analysis</h3>
              <p className="text-gray-600">Get detailed insights into how your resume performs against applicant tracking systems</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Keyword Analysis</h3>
              <p className="text-gray-600">Discover missing keywords and categorize them by relevance and topic</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Skill Roadmaps</h3>
              <p className="text-gray-600">Get personalized skill development roadmaps to improve your qualification</p>
            </CardContent>
          </Card>
        </div>

        {/* Main App Section */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl bg-white border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">Resume ATS Optimizer</CardTitle>
            <CardDescription className="text-center text-blue-100">Get detailed insights and improve your resume's performance</CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mx-auto max-w-md my-4">
              <TabsTrigger value="upload" disabled={loading}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!result}>
                <BarChart className="mr-2 h-4 w-4" /> Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <CardContent className="space-y-6 pb-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Job Description
                  </h3>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    className="min-h-32 bg-blue-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-blue-600" />
                    Upload Resume
                  </h3>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50/50 hover:bg-blue-50/80 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => setFiles(Array.from(e.target.files || []))}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-blue-800 font-medium mb-1">
                        {files.length > 0 
                          ? `${files.length} file(s) selected` 
                          : "Drag and drop your resume or click to browse"}
                      </p>
                      <p className="text-sm text-blue-600">PDF files only</p>
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 rounded-lg shadow-lg flex items-center justify-center text-lg font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Resume...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Analyze My Resume
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="results">
              {result && (
                <CardContent className="space-y-6 pb-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-blue-900">ATS Match Score</h3>
                      <Badge className="text-lg py-1 px-3 bg-blue-600">
                        {result.JDMatch}
                      </Badge>
                    </div>
                    
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-blue-800 font-medium">Match Percentage</span>
                      <span className="text-sm text-blue-800 font-medium">{result.JDMatch}</span>
                    </div>
                    <Progress value={extractNumericPercentage(result.JDMatch)} className="h-2 bg-blue-200" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Score Breakdown</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Keyword Match</span>
                          <span className="font-semibold">{result.ScoreBreakdown.KeywordMatch}</span>
                        </div>
                        <Progress value={extractNumericPercentage(result.ScoreBreakdown.KeywordMatch)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Experience Match</span>
                          <span className="font-semibold">{result.ScoreBreakdown.ExperienceMatch}</span>
                        </div>
                        <Progress value={extractNumericPercentage(result.ScoreBreakdown.ExperienceMatch)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Skills Match</span>
                          <span className="font-semibold">{result.ScoreBreakdown.SkillsMatch}</span>
                        </div>
                        <Progress value={extractNumericPercentage(result.ScoreBreakdown.SkillsMatch)} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">Education Match</span>
                          <span className="font-semibold">{result.ScoreBreakdown.EducationMatch}</span>
                        </div>
                        <Progress value={extractNumericPercentage(result.ScoreBreakdown.EducationMatch)} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.MissingKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={analyzeKeywordTopics} 
                      disabled={topicsLoading}
                      variant="outline"
                      className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                    >
                      {topicsLoading ? (
                        <span className="flex items-center">
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Topics...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Analyze Keywords by Topic
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                  
                  {showTopics && keywordTopics && (
                    <div className="bg-indigo-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-indigo-900 mb-4">Keyword Topics</h3>
                      <div className="space-y-4">
                        {Object.keys(keywordTopics).map((topic, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-indigo-800 flex items-center">
                                <Award className="h-4 w-4 mr-2" />
                                {topic}
                              </h4>
                              <Button 
                                variant="default"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => navigateToRoadmap(topic, keywordTopics[topic])}
                              >
                                Generate Roadmap
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {keywordTopics[topic].map((keyword, idx) => (
                                <Badge key={idx} variant="outline" className="bg-indigo-50">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-4">Profile Summary</h3>
                    <div className="bg-white rounded-lg p-4 shadow-inner border border-green-100">
                      <p className="text-gray-700 whitespace-pre-line">{result.ProfileSummary}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={downloadReport} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Analysis Report
                    </Button>
                    
                    <Button 
                      onClick={clearAllData} 
                      variant="outline"
                      className="sm:w-1/3 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Clear Results
                    </Button>
                  </div>
                </CardContent>
              )}
            </TabsContent>
          </Tabs>
          
          <CardFooter className="bg-gray-50 py-4 px-6 text-center text-gray-500 text-sm rounded-b-lg">
            Unlock your career potential with AI-powered resume optimization
          </CardFooter>
        </Card>
        
        {/* Testimonials Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-md text-left">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-700">"This tool helped me identify key skills missing from my resume. After updating it, I got 3 interview calls in a week!"</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md text-left">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-gray-500">Data Analyst</p>
                  </div>
                </div>
                <p className="text-gray-700">"The roadmap feature guided me to learn exactly what I was missing. Improved my resume match score from 65% to 92%!"</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md text-left">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Jessica M.</p>
                    <p className="text-sm text-gray-500">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-700">"Finally landed my dream job after optimizing my resume with this tool. The keyword analysis was spot on!"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;