

// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { chatSession } from "@/utils/AiModel";

// const FileAnalysis = ({ fileResponse }) => {
//   if (!fileResponse) return null;

//   return (
//     <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
//       <h3 className="text-2xl font-bold mb-4">File Analysis: {fileResponse.fileName}</h3>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <span className="font-semibold">File Type:</span> {fileResponse.fileType}
//           </div>
//           <div>
//             <span className="font-semibold">Complexity Level:</span> {fileResponse.complexityLevel}
//           </div>
//         </div>
        
//         <div>
//           <h4 className="font-semibold mb-2">Purpose</h4>
//           <p className="text-gray-700">{fileResponse.purpose}</p>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Key Components</h4>
//           <div className="space-y-4">
//             {fileResponse.keyComponents.map((component, index) => (
//               <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
//                 <h5 className="font-semibold text-lg mb-2">{component.name}</h5>
//                 <p className="text-gray-700 mb-3">{component.description}</p>
//                 <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
//                   <code className="text-sm">{component.codeSnippet}</code>
//                 </pre>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Technologies Used</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {fileResponse.technologiesUsed.map((tech, index) => (
//               <li key={index} className="text-gray-700">{tech}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Brief Explanation</h4>
//           <p className="text-gray-700">{fileResponse.briefExplanation}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProjectOverview = ({ overview }) => {
//   if (!overview) return null;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
//       <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <span className="font-semibold">Project Name:</span> {overview.projectName}
//           </div>
//           <div>
//             <span className="font-semibold">Complexity:</span> {overview.complexity}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Purpose</h4>
//           <p className="text-gray-700">{overview.purpose}</p>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Key Features</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {overview.keyFeatures.map((feature, index) => (
//               <li key={index} className="text-gray-700">{feature}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Technologies Used</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {overview.technologiesUsed.map((tech, index) => (
//               <li key={index} className="text-gray-700">{tech}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GitHubChatPage = () => {
//   const [repoUrl, setRepoUrl] = useState("");
//   const [repoData, setRepoData] = useState(null);
//   const [fileContents, setFileContents] = useState({});
//   const [projectOverview, setProjectOverview] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileResponse, setFileResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const cleanJsonString = (str) => {
//     return str
//       .replace(/```json\n|```\n|```/g, '')
//       .replace(/,(\s*[}\]])/g, '$1')
//       .trim();
//   };

//   const parseJsonResponse = (rawResponse) => {
//     try {
//       return JSON.parse(rawResponse);
//     } catch (e) {
//       const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      
//       if (!jsonMatch) {
//         throw new Error("No valid JSON found in response");
//       }

//       const jsonStr = cleanJsonString(jsonMatch[0]);
//       try {
//         return JSON.parse(jsonStr);
//       } catch (e2) {
//         throw new Error(`Failed to parse JSON: ${e2.message}`);
//       }
//     }
//   };

//   const fetchFileContents = async (files, owner, repo, path = '') => {
//     const contentsPromises = files.map(async (file) => {
//       const fullPath = path ? `${path}/${file.name}` : file.name;
      
//       try {
//         if (file.type === 'file') {
//           const contentResponse = await axios.get(
//             `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}`
//           );
//           return { 
//             name: fullPath, 
//             content: atob(contentResponse.data.content) 
//           };
//         } else if (file.type === 'dir') {
//           const dirContentsResponse = await axios.get(
//             `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}`
//           );
//           return await fetchFileContents(
//             dirContentsResponse.data, 
//             owner, 
//             repo, 
//             fullPath
//           );
//         }
//       } catch (error) {
//         console.error(`Error fetching ${file.type} ${fullPath}:`, error);
//         return null;
//       }
//       return null;
//     });

//     const contents = await Promise.all(contentsPromises);
//     return contents.flat().filter(Boolean);
//   };

//   const getProjectOverview = async (fileContents) => {
//     if (!chatSession) {
//       throw new Error("Chat session is not initialized");
//     }

//     const fileNames = Object.keys(fileContents);
//     const fileContentsStr = fileNames.slice(0, 5)
//       .map(name => `File: ${name}\nContent:\n${fileContents[name]}`)
//       .join('\n\n');

//     const chatResponse = await chatSession.sendMessage(
//       `Analyze these files from a GitHub repository and provide a comprehensive project overview. 
//        Provide the response in this JSON format:
//        {
//          "projectName": "Name of the project",
//          "purpose": "Main objective of the project",
//          "keyFeatures": ["Feature 1", "Feature 2"],
//          "technologiesUsed": ["Technology 1", "Technology 2"],
//          "complexity": "Low/Medium/High"
//        }
       
//        Files to analyze:\n${fileContentsStr}`
//     );

//     const rawResponse = await chatResponse.response.text();
//     return parseJsonResponse(rawResponse);
//   };

//   const chatWithFile = async (fileName) => {
//     setSelectedFile(fileName);
//     setLoading(true);
//     setError("");

//     try {
//       const fileContent = fileContents[fileName];
//       const chatResponse = await chatSession.sendMessage(
//         `Analyze the following code file and provide a detailed explanation in this JSON format:
//         {
//           "fileName": "${fileName}",
//           "fileType": "Determine the file type/language",
//           "purpose": "Explain the main purpose of this file",
//           "keyComponents": [
//             {
//               "name": "Name of the function/class",
//               "description": "Explain its purpose and functionality",
//               "codeSnippet": "Relevant code snippet"
//             }
//           ],
//           "technologiesUsed": ["List technologies/libraries and how they are being used"],
//           "complexityLevel": "Low/Medium/High",
//           "briefExplanation": "Concise description of file's functionality"
//         }
        
//         Code:\n${fileContent}`
//       );

//       const rawResponse = await chatResponse.response.text();
//       const response = parseJsonResponse(rawResponse);

//       const requiredFields = [
//         "fileName",
//         "fileType",
//         "purpose",
//         "keyComponents",
//         "technologiesUsed",
//         "complexityLevel",
//         "briefExplanation"
//       ];
      
//       const missingFields = requiredFields.filter(field => !(field in response));
      
//       if (missingFields.length > 0) {
//         throw new Error(`Invalid response structure. Missing fields: ${missingFields.join(", ")}`);
//       }

//       setFileResponse(response);
//     } catch (error) {
//       console.error("Error chatting with file:", error);
//       setError(`Failed to analyze file: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRepoData = async () => {
//     if (!repoUrl) {
//       setError("Please enter a repository URL");
//       return;
//     }

//     const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
//     const match = repoUrl.match(urlPattern);
    
//     if (!match) {
//       setError("Invalid GitHub repository URL");
//       return;
//     }

//     const [, owner, repo] = match;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get(
//         `https://api.github.com/repos/${owner}/${repo}/contents`
//       );
//       setRepoData(response.data);

//       const allFileContents = await fetchFileContents(response.data, owner, repo);
//       const contentsMap = allFileContents.reduce((acc, file) => {
//         if (file) {
//           acc[file.name] = file.content;
//         }
//         return acc;
//       }, {});

//       setFileContents(contentsMap);
//       const overview = await getProjectOverview(contentsMap);
//       setProjectOverview(overview);

//     } catch (error) {
//       console.error("Error fetching repository data:", error);
//       setError(error.response?.status === 404 
//         ? "Repository not found or private" 
//         : "Failed to fetch repository data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4">GitHub Repository Analyzer</h2>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={repoUrl}
//             onChange={(e) => setRepoUrl(e.target.value)}
//             placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button 
//             onClick={fetchRepoData}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Loading..." : "Analyze"}
//           </button>
//         </div>
//         {error && (
//           <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}
//       </div>

//       <ProjectOverview overview={projectOverview} />

//       {fileContents && Object.keys(fileContents).length > 0 && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
//           <h3 className="text-2xl font-bold mb-4">Repository Files</h3>
//           <div className="space-y-2">
//             {Object.keys(fileContents).map((fileName, index) => (
//               <div 
//                 key={index}
//                 className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
//               >
//                 <span className="font-medium">{fileName}</span>
//                 <button 
//                   onClick={() => chatWithFile(fileName)}
//                   disabled={loading}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Analyze File
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {fileResponse && <FileAnalysis fileResponse={fileResponse} />}
//     </div>
//   );
// };

// export default GitHubChatPage;









//perfect code below


// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { chatSession } from "@/utils/AiModel";

// const FileAnalysis = ({ fileResponse }) => {
//   if (!fileResponse) return null;

//   return (
//     <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
//       <h3 className="text-2xl font-bold mb-4">File Analysis: {fileResponse.fileName}</h3>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <span className="font-semibold">File Type:</span> {fileResponse.fileType}
//           </div>
//           <div>
//             <span className="font-semibold">Complexity Level:</span> {fileResponse.complexityLevel}
//           </div>
//         </div>
        
//         <div>
//           <h4 className="font-semibold mb-2">Purpose</h4>
//           <p className="text-gray-700">{fileResponse.purpose}</p>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Key Components</h4>
//           <div className="space-y-4">
//             {fileResponse.keyComponents.map((component, index) => (
//               <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
//                 <h5 className="font-semibold text-lg mb-2">{component.name}</h5>
//                 <p className="text-gray-700 mb-3">{component.description}</p>
//                 <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
//                   <code className="text-sm">{component.codeSnippet}</code>
//                 </pre>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Technologies Used</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {fileResponse.technologiesUsed.map((tech, index) => (
//               <li key={index} className="text-gray-700">{tech}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Brief Explanation</h4>
//           <p className="text-gray-700">{fileResponse.briefExplanation}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProjectOverview = ({ overview }) => {
//   if (!overview) return null;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
//       <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <span className="font-semibold">Project Name:</span> {overview.projectName}
//           </div>
//           <div>
//             <span className="font-semibold">Complexity:</span> {overview.complexity}
//           </div>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Purpose</h4>
//           <p className="text-gray-700">{overview.purpose}</p>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Key Features</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {overview.keyFeatures.map((feature, index) => (
//               <li key={index} className="text-gray-700">{feature}</li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Technologies Used</h4>
//           <ul className="list-disc pl-5 space-y-1">
//             {overview.technologiesUsed.map((tech, index) => (
//               <li key={index} className="text-gray-700">{tech}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// // GitHub API helper with environment variable token
// const githubApi = axios.create({
//   baseURL: 'https://api.github.com',
//   headers: {
//     Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
//     Accept: 'application/vnd.github.v3+json'
//   }
// });

// const GitHubChatPage = () => {
//   const [repoUrl, setRepoUrl] = useState("");
//   const [repoData, setRepoData] = useState(null);
//   const [fileContents, setFileContents] = useState({});
//   const [projectOverview, setProjectOverview] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileResponse, setFileResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
  
//   // Check if the GitHub token is configured
//   const [tokenConfigured] = useState(!!process.env.NEXT_PUBLIC_GITHUB_PAT);

//   const cleanJsonString = (str) => {
//     return str
//       .replace(/```json\n|```\n|```/g, '')
//       .replace(/,(\s*[}\]])/g, '$1')
//       .trim();
//   };

//   const parseJsonResponse = (rawResponse) => {
//     try {
//       return JSON.parse(rawResponse);
//     } catch (e) {
//       const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      
//       if (!jsonMatch) {
//         throw new Error("No valid JSON found in response");
//       }

//       const jsonStr = cleanJsonString(jsonMatch[0]);
//       try {
//         return JSON.parse(jsonStr);
//       } catch (e2) {
//         throw new Error(`Failed to parse JSON: ${e2.message}`);
//       }
//     }
//   };

//   const fetchFileContents = async (files, owner, repo, path = '') => {
//     const contentsPromises = files.map(async (file) => {
//       const fullPath = path ? `${path}/${file.name}` : file.name;
      
//       try {
//         if (file.type === 'file') {
//           const contentResponse = await githubApi.get(
//             `/repos/${owner}/${repo}/contents/${fullPath}`
//           );
//           return { 
//             name: fullPath, 
//             content: atob(contentResponse.data.content) 
//           };
//         } else if (file.type === 'dir') {
//           const dirContentsResponse = await githubApi.get(
//             `/repos/${owner}/${repo}/contents/${fullPath}`
//           );
//           return await fetchFileContents(
//             dirContentsResponse.data, 
//             owner, 
//             repo, 
//             fullPath
//           );
//         }
//       } catch (error) {
//         console.error(`Error fetching ${file.type} ${fullPath}:`, error);
//         return null;
//       }
//       return null;
//     });

//     const contents = await Promise.all(contentsPromises);
//     return contents.flat().filter(Boolean);
//   };

//   const getProjectOverview = async (fileContents) => {
//     if (!chatSession) {
//       throw new Error("Chat session is not initialized");
//     }

//     const fileNames = Object.keys(fileContents);
//     const fileContentsStr = fileNames.slice(0, 5)
//       .map(name => `File: ${name}\nContent:\n${fileContents[name]}`)
//       .join('\n\n');

//     const chatResponse = await chatSession.sendMessage(
//       `Analyze these files from a GitHub repository and provide a comprehensive project overview. 
//        Provide the response in this JSON format:
//        {
//          "projectName": "Name of the project",
//          "purpose": "Main objective of the project",
//          "keyFeatures": ["Feature 1", "Feature 2"],
//          "technologiesUsed": ["Technology 1", "Technology 2"],
//          "complexity": "Low/Medium/High"
//        }
       
//        Files to analyze:\n${fileContentsStr}`
//     );

//     const rawResponse = await chatResponse.response.text();
//     return parseJsonResponse(rawResponse);
//   };

//   const chatWithFile = async (fileName) => {
//     setSelectedFile(fileName);
//     setLoading(true);
//     setError("");

//     try {
//       const fileContent = fileContents[fileName];
//       const chatResponse = await chatSession.sendMessage(
//         `Analyze the following code file and provide a detailed explanation in this JSON format:
//         {
//           "fileName": "${fileName}",
//           "fileType": "Determine the file type/language",
//           "purpose": "Explain the main purpose of this file",
//           "keyComponents": [
//             {
//               "name": "Name of the function/class",
//               "description": "Explain its purpose and functionality",
//               "codeSnippet": "Relevant code snippet"
//             }
//           ],
//           "technologiesUsed": ["List technologies/libraries and how they are being used"],
//           "complexityLevel": "Low/Medium/High",
//           "briefExplanation": "Concise description of file's functionality"
//         }
        
//         Code:\n${fileContent}`
//       );

//       const rawResponse = await chatResponse.response.text();
//       const response = parseJsonResponse(rawResponse);

//       const requiredFields = [
//         "fileName",
//         "fileType",
//         "purpose",
//         "keyComponents",
//         "technologiesUsed",
//         "complexityLevel",
//         "briefExplanation"
//       ];
      
//       const missingFields = requiredFields.filter(field => !(field in response));
      
//       if (missingFields.length > 0) {
//         throw new Error(`Invalid response structure. Missing fields: ${missingFields.join(", ")}`);
//       }

//       setFileResponse(response);
//     } catch (error) {
//       console.error("Error chatting with file:", error);
//       setError(`Failed to analyze file: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRepoData = async () => {
//     if (!repoUrl) {
//       setError("Please enter a repository URL");
//       return;
//     }

//     if (!tokenConfigured) {
//       setError("GitHub PAT token is not configured in environment variables");
//       return;
//     }

//     const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
//     const match = repoUrl.match(urlPattern);
    
//     if (!match) {
//       setError("Invalid GitHub repository URL");
//       return;
//     }

//     const [, owner, repo] = match;
//     setLoading(true);
//     setError("");

//     try {
//       const response = await githubApi.get(`/repos/${owner}/${repo}/contents`);
//       setRepoData(response.data);

//       const allFileContents = await fetchFileContents(response.data, owner, repo);
//       const contentsMap = allFileContents.reduce((acc, file) => {
//         if (file) {
//           acc[file.name] = file.content;
//         }
//         return acc;
//       }, {});

//       setFileContents(contentsMap);
//       const overview = await getProjectOverview(contentsMap);
//       setProjectOverview(overview);

//     } catch (error) {
//       console.error("Error fetching repository data:", error);
//       if (error.response?.status === 401) {
//         setError("Authentication failed. Check your GitHub PAT token in environment variables");
//       } else if (error.response?.status === 403) {
//         setError("Rate limit exceeded or insufficient permissions with current token");
//       } else if (error.response?.status === 404) {
//         setError("Repository not found or private. Check permissions of your PAT token");
//       } else {
//         setError("Failed to fetch repository data: " + (error.message || "Unknown error"));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-bold mb-4">GitHub Repository Analyzer</h2>
        
//         {!tokenConfigured && (
//           <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
//             <p className="font-medium">GitHub PAT token not configured!</p>
//             <p className="text-sm">Add <code>NEXT_PUBLIC_GITHUB_PAT</code> to your environment variables.</p>
//           </div>
//         )}

//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={repoUrl}
//             onChange={(e) => setRepoUrl(e.target.value)}
//             placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button 
//             onClick={fetchRepoData}
//             disabled={loading || !tokenConfigured}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Loading..." : "Analyze"}
//           </button>
//         </div>
//         {error && (
//           <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}
//       </div>

//       <ProjectOverview overview={projectOverview} />

//       {fileContents && Object.keys(fileContents).length > 0 && (
//         <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
//           <h3 className="text-2xl font-bold mb-4">Repository Files</h3>
//           <div className="space-y-2">
//             {Object.keys(fileContents).map((fileName, index) => (
//               <div 
//                 key={index}
//                 className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
//               >
//                 <span className="font-medium">{fileName}</span>
//                 <button 
//                   onClick={() => chatWithFile(fileName)}
//                   disabled={loading}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Analyze File
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {fileResponse && <FileAnalysis fileResponse={fileResponse} />}
//     </div>
//   );
// };

// export default GitHubChatPage;

"use client";
import React, { useState } from "react";
import axios from "axios";
import { chatSession } from "@/utils/AiModel";
// import { atob } from "abab"; // if needed for decoding GitHub content
import {
  FileText,
  UploadCloud,
  Download,
  Search,
  ChevronDown,
  BarChart,
  BookOpen,
  X,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

// File Analysis Component
const FileAnalysis = ({ fileResponse }) => {
  if (!fileResponse) return null;

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/30">
      <h3 className="text-2xl font-bold mb-4">
        File Analysis: {fileResponse.fileName}
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">File Type:</span>{" "}
            {fileResponse.fileType}
          </div>
          <div>
            <span className="font-semibold">Complexity Level:</span>{" "}
            {fileResponse.complexityLevel}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Purpose</h4>
          <p className="text-gray-700">{fileResponse.purpose}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Components</h4>
          <div className="space-y-4">
            {fileResponse.keyComponents.map((component, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h5 className="font-semibold text-lg mb-2">
                  {component.name}
                </h5>
                <p className="text-gray-700 mb-3">{component.description}</p>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{component.codeSnippet}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Technologies Used</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {fileResponse.technologiesUsed.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Brief Explanation</h4>
          <p className="text-gray-700">{fileResponse.briefExplanation}</p>
        </div>
      </div>
    </div>
  );
};

// Project Overview Component
const ProjectOverview = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-xl p-6 mt-6 border border-white/30">
      <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Project Name:</span>{" "}
            {overview.projectName}
          </div>
          <div>
            <span className="font-semibold">Complexity:</span>{" "}
            {overview.complexity}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Purpose</h4>
          <p className="text-gray-700">{overview.purpose}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Features</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {overview.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Technologies Used</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {overview.technologiesUsed.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// GitHub API helper with environment variable token
const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
    Accept: "application/vnd.github.v3+json",
  },
});

const GitHubChatPage = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [projectOverview, setProjectOverview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileResponse, setFileResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenConfigured] = useState(!!process.env.NEXT_PUBLIC_GITHUB_PAT);

  // Helper function to clean and parse JSON responses
  const cleanJsonString = (str) => {
    return str
      .replace(/```json\n|```\n|```/g, "")
      .replace(/,(\s*[}\]])/g, "$1")
      .trim();
  };

  const parseJsonResponse = (rawResponse) => {
    try {
      return JSON.parse(rawResponse);
    } catch (e) {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }
      const jsonStr = cleanJsonString(jsonMatch[0]);
      try {
        return JSON.parse(jsonStr);
      } catch (e2) {
        throw new Error(`Failed to parse JSON: ${e2.message}`);
      }
    }
  };

  const fetchFileContents = async (files, owner, repo, path = "") => {
    const contentsPromises = files.map(async (file) => {
      const fullPath = path ? `${path}/${file.name}` : file.name;
      try {
        if (file.type === "file") {
          const contentResponse = await githubApi.get(
            `/repos/${owner}/${repo}/contents/${fullPath}`
          );
          return {
            name: fullPath,
            content: atob(contentResponse.data.content),
          };
        } else if (file.type === "dir") {
          const dirContentsResponse = await githubApi.get(
            `/repos/${owner}/${repo}/contents/${fullPath}`
          );
          return await fetchFileContents(
            dirContentsResponse.data,
            owner,
            repo,
            fullPath
          );
        }
      } catch (error) {
        console.error(`Error fetching ${file.type} ${fullPath}:`, error);
        return null;
      }
      return null;
    });
    const contents = await Promise.all(contentsPromises);
    return contents.flat().filter(Boolean);
  };

  const getProjectOverview = async (fileContents) => {
    if (!chatSession) {
      throw new Error("Chat session is not initialized");
    }
    const fileNames = Object.keys(fileContents);
    const fileContentsStr = fileNames.slice(0, 5)
      .map((name) => `File: ${name}\nContent:\n${fileContents[name]}`)
      .join("\n\n");
    const chatResponse = await chatSession.sendMessage(
      `Analyze these files from a GitHub repository and provide a comprehensive project overview. 
Provide the response in this JSON format:
{
  "projectName": "Name of the project",
  "purpose": "Main objective of the project",
  "keyFeatures": ["Feature 1", "Feature 2"],
  "technologiesUsed": ["Technology 1", "Technology 2"],
  "complexity": "Low/Medium/High"
}

Files to analyze:
${fileContentsStr}`
    );
    const rawResponse = await chatResponse.response.text();
    return parseJsonResponse(rawResponse);
  };

  const chatWithFile = async (fileName) => {
    setSelectedFile(fileName);
    setLoading(true);
    setError("");

    try {
      const fileContent = fileContents[fileName];
      const chatResponse = await chatSession.sendMessage(
        `Analyze the following code file and provide a detailed explanation in this JSON format:
{
  "fileName": "${fileName}",
  "fileType": "Determine the file type/language",
  "purpose": "Explain the main purpose of this file",
  "keyComponents": [
    {
      "name": "Name of the function/class",
      "description": "Explain its purpose and functionality",
      "codeSnippet": "Relevant code snippet"
    }
  ],
  "technologiesUsed": ["List technologies/libraries and how they are being used"],
  "complexityLevel": "Low/Medium/High",
  "briefExplanation": "Concise description of file's functionality"
}

Code:
${fileContent}`
      );
      const rawResponse = await chatResponse.response.text();
      const response = parseJsonResponse(rawResponse);
      const requiredFields = [
        "fileName",
        "fileType",
        "purpose",
        "keyComponents",
        "technologiesUsed",
        "complexityLevel",
        "briefExplanation",
      ];
      const missingFields = requiredFields.filter(
        (field) => !(field in response)
      );
      if (missingFields.length > 0) {
        throw new Error(
          `Invalid response structure. Missing fields: ${missingFields.join(
            ", "
          )}`
        );
      }
      setFileResponse(response);
    } catch (error) {
      console.error("Error chatting with file:", error);
      setError(`Failed to analyze file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoData = async () => {
    if (!repoUrl) {
      setError("Please enter a repository URL");
      return;
    }
    if (!tokenConfigured) {
      setError("GitHub PAT token is not configured in environment variables");
      return;
    }
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(urlPattern);
    if (!match) {
      setError("Invalid GitHub repository URL");
      return;
    }
    const [, owner, repo] = match;
    setLoading(true);
    setError("");

    try {
      const response = await githubApi.get(`/repos/${owner}/${repo}/contents`);
      setRepoData(response.data);
      const allFileContents = await fetchFileContents(response.data, owner, repo);
      const contentsMap = allFileContents.reduce((acc, file) => {
        if (file) {
          acc[file.name] = file.content;
        }
        return acc;
      }, {});
      setFileContents(contentsMap);
      const overview = await getProjectOverview(contentsMap);
      setProjectOverview(overview);
    } catch (error) {
      console.error("Error fetching repository data:", error);
      if (error.response?.status === 401) {
        setError("Authentication failed. Check your GitHub PAT token.");
      } else if (error.response?.status === 403) {
        setError(
          "Rate limit exceeded or insufficient permissions with current token."
        );
      } else if (error.response?.status === 404) {
        setError("Repository not found or private. Check your PAT token permissions.");
      } else {
        setError("Failed to fetch repository data: " + (error.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = () => {
    setRepoData(null);
    setFileContents({});
    setProjectOverview(null);
    setFileResponse(null);
    setError("");
  };

  const downloadReport = () => {
    if (!fileResponse) return;
    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();

    const wrapText = (text, x, y, maxWidth) => {
      const wrappedText = doc.splitTextToSize(text, maxWidth);
      doc.text(wrappedText, x, y);
      return y + wrappedText.length * 10;
    };

    doc.setFontSize(16);
    doc.text("File Analysis Report", 10, 10);
    doc.setFontSize(12);
    let yPosition = 20;
    yPosition = wrapText(`File Name: ${fileResponse.fileName}`, 10, yPosition, 180);
    yPosition = wrapText(`File Type: ${fileResponse.fileType}`, 10, yPosition, 180);
    yPosition = wrapText(`Complexity: ${fileResponse.complexityLevel}`, 10, yPosition, 180);
    yPosition = wrapText(`Purpose: ${fileResponse.purpose}`, 10, yPosition, 180);

    fileResponse.keyComponents.forEach((component, index) => {
      yPosition = wrapText(
        `${index + 1}. ${component.name} - ${component.description}`,
        10,
        yPosition,
        180
      );
    });

    doc.save("File_Analysis_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 mb-8 border border-white/30">
          <h2 className="text-3xl font-bold mb-6 text-center">
            GitHub Repository Analyzer
          </h2>
          {!tokenConfigured && (
            <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              <p className="font-medium">GitHub PAT token not configured!</p>
              <p className="text-sm">
                Add <code>NEXT_PUBLIC_GITHUB_PAT</code> to your environment variables.
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={fetchRepoData}
              disabled={loading || !tokenConfigured}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {projectOverview && <ProjectOverview overview={projectOverview} />}

        {fileContents &&
          Object.keys(fileContents).length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 mt-8 border border-white/30">
              <h3 className="text-2xl font-bold mb-4">Repository Files</h3>
              <div className="space-y-3">
                {Object.keys(fileContents).map((fileName, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
                  >
                    <span className="font-medium">{fileName}</span>
                    <button
                      onClick={() => chatWithFile(fileName)}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Analyze File
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {fileResponse && <FileAnalysis fileResponse={fileResponse} />}

        {fileResponse && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              <Download className="h-5 w-5" />
              Download Analysis Report (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubChatPage;
