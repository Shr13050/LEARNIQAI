

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


"use client";
import React, { useState } from "react";
import axios from "axios";
import { chatSession } from "@/utils/AiModel";

const FileAnalysis = ({ fileResponse }) => {
  if (!fileResponse) return null;

  return (
    <div className="mt-4 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold mb-4">File Analysis: {fileResponse.fileName}</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">File Type:</span> {fileResponse.fileType}
          </div>
          <div>
            <span className="font-semibold">Complexity Level:</span> {fileResponse.complexityLevel}
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
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold text-lg mb-2">{component.name}</h5>
                <p className="text-gray-700 mb-3">{component.description}</p>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{component.codeSnippet}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Technologies Used</h4>
          <ul className="list-disc pl-5 space-y-1">
            {fileResponse.technologiesUsed.map((tech, index) => (
              <li key={index} className="text-gray-700">{tech}</li>
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

const ProjectOverview = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
      <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Project Name:</span> {overview.projectName}
          </div>
          <div>
            <span className="font-semibold">Complexity:</span> {overview.complexity}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Purpose</h4>
          <p className="text-gray-700">{overview.purpose}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Key Features</h4>
          <ul className="list-disc pl-5 space-y-1">
            {overview.keyFeatures.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Technologies Used</h4>
          <ul className="list-disc pl-5 space-y-1">
            {overview.technologiesUsed.map((tech, index) => (
              <li key={index} className="text-gray-700">{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// GitHub API helper with environment variable token
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
    Accept: 'application/vnd.github.v3+json'
  }
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
  
  // Check if the GitHub token is configured
  const [tokenConfigured] = useState(!!process.env.NEXT_PUBLIC_GITHUB_PAT);

  const cleanJsonString = (str) => {
    return str
      .replace(/```json\n|```\n|```/g, '')
      .replace(/,(\s*[}\]])/g, '$1')
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

  const fetchFileContents = async (files, owner, repo, path = '') => {
    const contentsPromises = files.map(async (file) => {
      const fullPath = path ? `${path}/${file.name}` : file.name;
      
      try {
        if (file.type === 'file') {
          const contentResponse = await githubApi.get(
            `/repos/${owner}/${repo}/contents/${fullPath}`
          );
          return { 
            name: fullPath, 
            content: atob(contentResponse.data.content) 
          };
        } else if (file.type === 'dir') {
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
      .map(name => `File: ${name}\nContent:\n${fileContents[name]}`)
      .join('\n\n');

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
       
       Files to analyze:\n${fileContentsStr}`
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
        
        Code:\n${fileContent}`
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
        "briefExplanation"
      ];
      
      const missingFields = requiredFields.filter(field => !(field in response));
      
      if (missingFields.length > 0) {
        throw new Error(`Invalid response structure. Missing fields: ${missingFields.join(", ")}`);
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
        setError("Authentication failed. Check your GitHub PAT token in environment variables");
      } else if (error.response?.status === 403) {
        setError("Rate limit exceeded or insufficient permissions with current token");
      } else if (error.response?.status === 404) {
        setError("Repository not found or private. Check permissions of your PAT token");
      } else {
        setError("Failed to fetch repository data: " + (error.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">GitHub Repository Analyzer</h2>
        
        {!tokenConfigured && (
          <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
            <p className="font-medium">GitHub PAT token not configured!</p>
            <p className="text-sm">Add <code>NEXT_PUBLIC_GITHUB_PAT</code> to your environment variables.</p>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL (e.g., https://github.com/owner/repo)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={fetchRepoData}
            disabled={loading || !tokenConfigured}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Analyze"}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <ProjectOverview overview={projectOverview} />

      {fileContents && Object.keys(fileContents).length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-2xl font-bold mb-4">Repository Files</h3>
          <div className="space-y-2">
            {Object.keys(fileContents).map((fileName, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <span className="font-medium">{fileName}</span>
                <button 
                  onClick={() => chatWithFile(fileName)}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze File
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {fileResponse && <FileAnalysis fileResponse={fileResponse} />}
    </div>
  );
};

export default GitHubChatPage;