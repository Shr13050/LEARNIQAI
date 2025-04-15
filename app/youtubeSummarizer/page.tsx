// // "use client";
// // import { useState } from 'react';

// // const YouTubeSummaryPage = () => {
// //   const [youtubeLink, setYoutubeLink] = useState<string>('');
// //   const [summary, setSummary] = useState<string>('');
// //   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);

// //   const extractTranscriptDetails = async (url: string): Promise<string> => {
// //     try {
// //       const videoId = url.split('=')[1];
// //       const response = await fetch(`/app/youtubeSummarizer/content/_components/api/youtubeTranscript.tsx?videoId=${videoId}`);
// //       const data = await response.json();
// //       return data.transcriptText;
// //     } catch (error) {
// //       console.error('Error extracting transcript:', error);
// //       return '';
// //     }
// //   };

// //   const generateGeminiContent = async (transcriptText: string): Promise<string> => {
// //     try {
// //       const response = await fetch('/app/youtubeSummarizer/content/_components/api/generateSummary.tsx', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ transcriptText }),
// //       });
// //       const data = await response.json();
// //       return data.summary;
// //     } catch (error) {
// //       console.error('Error generating summary:', error);
// //       return '';
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     const transcriptText = await extractTranscriptDetails(youtubeLink);
// //     if (transcriptText) {
// //       const summary = await generateGeminiContent(transcriptText);
// //       setSummary(summary);
// //       const videoId = youtubeLink.split('=')[1];
// //       setVideoThumbnail(`http://img.youtube.com/vi/${videoId}/0.jpg`);
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-8">
// //       <h1 className="text-4xl font-semibold text-center mb-6">YouTube Transcript to Detailed Notes Converter</h1>
// //       <div className="mb-4">
// //         <input
// //           type="text"
// //           className="w-full p-3 border border-gray-300 rounded-lg"
// //           placeholder="Enter YouTube Video Link"
// //           value={youtubeLink}
// //           onChange={(e) => setYoutubeLink(e.target.value)}
// //         />
// //       </div>
// //       {youtubeLink && (
// //         <div className="mb-6">
// //           <img
// //             src={`http://img.youtube.com/vi/${youtubeLink.split('=')[1]}/0.jpg`}
// //             alt="YouTube Video Thumbnail"
// //             className="w-full h-auto rounded-lg"
// //           />
// //         </div>
// //       )}
// //       <button
// //         onClick={handleSubmit}
// //         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
// //         disabled={loading}
// //       >
// //         {loading ? 'Loading...' : 'Get Detailed Notes'}
// //       </button>
// //       {summary && (
// //         <div className="mt-8">
// //           <h2 className="text-2xl font-semibold mb-4">Detailed Notes:</h2>
// //           <p className="text-lg">{summary}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default YouTubeSummaryPage;


// "use client";
// import { useState } from 'react';

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const extractTranscriptDetails = async (url: string): Promise<string> => {
//     try {
//       const videoId = url.split('=')[1];
//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       const data = await response.json();
//       return data.transcriptText;
//     } catch (error) {
//       console.error('Error extracting transcript:', error);
//       return '';
//     }
//   };

//   const generateGeminiContent = async (transcriptText: string): Promise<string> => {
//     try {
//       const response = await fetch('/api/generateSummary', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ transcriptText }),
//       });
//       const data = await response.json();
//       return data.summary;
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       return '';
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const transcriptText = await extractTranscriptDetails(youtubeLink);
//     if (transcriptText) {
//       const summary = await generateGeminiContent(transcriptText);
//       setSummary(summary);
//       const videoId = youtubeLink.split('=')[1];
//       setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">YouTube Transcript to Detailed Notes Converter</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>
//       {youtubeLink && (
//         <div className="mb-6">
//           <img
//             src={`https://img.youtube.com/vi/${youtubeLink.split('=')[1]}/0.jpg`}
//             alt="YouTube Video Thumbnail"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//       )}
//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : 'Get Detailed Notes'}
//       </button>
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Notes:</h2>
//           <p className="text-lg">{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;


// "use client";
// import { useState } from 'react';

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const extractVideoId = (url: string): string => {
//     try {
//       const urlObj = new URL(url);
//       const searchParams = new URLSearchParams(urlObj.search);
//       return searchParams.get('v') || '';
//     } catch (error) {
//       console.error('Error parsing URL:', error);
//       return '';
//     }
//   };

//   const extractTranscriptDetails = async (url: string): Promise<string> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) throw new Error('Failed to fetch transcript');
      
//       const data = await response.json();
//       return data.transcriptText;
//     } catch (error) {
//       console.error('Error extracting transcript:', error);
//       return '';
//     }
//   };

//   const generateGeminiContent = async (transcriptText: string): Promise<string> => {
//     try {
//       const response = await fetch('/api/generateSummary', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ transcriptText }),
//       });
      
//       if (!response.ok) throw new Error('Failed to generate summary');
      
//       const data = await response.json();
//       return data.summary;
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       return '';
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error('Invalid YouTube URL');
//       }

//       setVideoThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      
//       const transcriptText = await extractTranscriptDetails(youtubeLink);
//       if (!transcriptText) {
//         throw new Error('Failed to extract transcript');
//       }

//       const summary = await generateGeminiContent(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       console.error('Error:', error);
//       setSummary('Failed to generate summary. Please check the YouTube URL and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Transcript to Detailed Notes Converter
//       </h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>
//       {videoThumbnail && (
//         <div className="mb-6">
//           <img
//             src={videoThumbnail}
//             alt="YouTube Video Thumbnail"
//             className="w-full h-auto rounded-lg"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               const videoId = extractVideoId(youtubeLink);
//               target.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
//             }}
//           />
//         </div>
//       )}
//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
//           loading ? 'cursor-not-allowed opacity-50' : ''
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : 'Get Detailed Notes'}
//       </button>
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Notes:</h2>
//           <p className="text-lg whitespace-pre-wrap">{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;


// "use client";
// import { useState } from 'react';

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const extractVideoId = (url: string): string => {
//     try {
//       const urlObj = new URL(url);
//       // Handle both youtube.com and youtu.be URLs
//       if (urlObj.hostname === 'youtu.be') {
//         return urlObj.pathname.slice(1);
//       }
//       const searchParams = new URLSearchParams(urlObj.search);
//       return searchParams.get('v') || '';
//     } catch (error) {
//       console.error('Error parsing URL:', error);
//       return '';
//     }
//   };

//   const getThumbnailUrl = (videoId: string): string => {
//     // Try different thumbnail qualities
//     return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
//   };

//   const extractTranscriptDetails = async (url: string): Promise<string> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       return data.transcriptText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };

//   const generateGeminiContent = async (transcriptText: string): Promise<string> => {
//     try {
//       const response = await fetch('/api/generateSummary', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ transcriptText }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to generate summary');
//       }
      
//       const data = await response.json();
//       return data.summary;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary('');

//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       const thumbnailUrl = getThumbnailUrl(videoId);
//       setVideoThumbnail(thumbnailUrl);
      
//       const transcriptText = await extractTranscriptDetails(youtubeLink);
//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summary = await generateGeminiContent(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Transcript to Detailed Notes Converter
//       </h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link (e.g., https://www.youtube.com/watch?v=...)"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>
//       {videoThumbnail && (
//         <div className="mb-6">
//           <img
//             src={videoThumbnail}
//             alt="YouTube Video Thumbnail"
//             className="w-full h-auto rounded-lg"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               const videoId = extractVideoId(youtubeLink);
//               // Fallback to default thumbnail if high quality fails
//               target.src = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
//             }}
//           />
//         </div>
//       )}
//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
//           loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Get Detailed Notes'}
//       </button>
      
//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}
      
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Notes:</h2>
//           <div className="text-lg whitespace-pre-wrap bg-gray-50 p-6 rounded-lg">
//             {summary}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;

// "use client";
// import { useState } from 'react';
// import { chatSession } from '@/utils/AiModel';

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const extractVideoId = (url: string): string => {
//     try {
//       const urlObj = new URL(url);
//       // Handle both youtube.com and youtu.be URLs
//       if (urlObj.hostname === 'youtu.be') {
//         return urlObj.pathname.slice(1);
//       }
//       const searchParams = new URLSearchParams(urlObj.search);
//       return searchParams.get('v') || '';
//     } catch (error) {
//       console.error('Error parsing URL:', error);
//       return '';
//     }
//   };

//   const getThumbnailUrl = (videoId: string): string => {
//     return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
//   };

//   const extractTranscriptDetails = async (url: string): Promise<string> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       return data.transcriptText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<string> => {
//     try {
//       const prompt = `
//         You are a YouTube video summarizer. You will be taking the transcript text
//         and summarizing the entire video and providing the important summary in points
//         within 250 words. Please provide the summary of the text given here: ${transcriptText}
//       `;

//       const response = await chatSession.sendMessage(prompt);
//       const summaryText = await response.response.text();
//       return summaryText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary('');

//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       const thumbnailUrl = getThumbnailUrl(videoId);
//       setVideoThumbnail(thumbnailUrl);
      
//       const transcriptText = await extractTranscriptDetails(youtubeLink);
//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summary = await generateSummary(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Transcript to Detailed Notes Converter
//       </h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link (e.g., https://www.youtube.com/watch?v=...)"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>
//       {videoThumbnail && (
//         <div className="mb-6">
//           <img
//             src={videoThumbnail}
//             alt="YouTube Video Thumbnail"
//             className="w-full h-auto rounded-lg"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               const videoId = extractVideoId(youtubeLink);
//               target.src = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
//             }}
//           />
//         </div>
//       )}
//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
//           loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Get Detailed Notes'}
//       </button>
      
//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}
      
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Notes:</h2>
//           <div className="text-lg whitespace-pre-wrap bg-gray-50 p-6 rounded-lg">
//             {summary}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;
































//old perfect code



// "use client";
// import { useState } from 'react';
// import { chatSession } from '@/utils/AiModel';

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const extractVideoId = (url: string): string => {
//     try {
//       const urlObj = new URL(url);
//       // Handle both youtube.com and youtu.be URLs
//       if (urlObj.hostname === 'youtu.be') {
//         return urlObj.pathname.slice(1);
//       }
//       const searchParams = new URLSearchParams(urlObj.search);
//       return searchParams.get('v') || '';
//     } catch (error) {
//       console.error('Error parsing URL:', error);
//       return '';
//     }
//   };

//   const getThumbnailUrl = (videoId: string): string => {
//     return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
//   };

//   const extractTranscriptDetails = async (url: string): Promise<string> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       return data.transcriptText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<string> => {
//     try {
//       const prompt = `Summarize the transcript of this YouTube video in a structured, bullet-point format. Each section should have clear headings and detailed subpoints. Do not use paragraphs or long text blocks.
//       I dont want anything in bold. i want proper gaps and lines between multiple paragraphs 
//       write it in the form of research paper 
//       highlight important things 
      
// Transcript for analysis:
// ${transcriptText}
// `;

//       const response = await chatSession.sendMessage(prompt);
//       const summaryText = await response.response.text();
//       return summaryText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary('');

//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       const thumbnailUrl = getThumbnailUrl(videoId);
//       setVideoThumbnail(thumbnailUrl);
      
//       const transcriptText = await extractTranscriptDetails(youtubeLink);
//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summary = await generateSummary(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Video Analysis & Summary
//       </h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link (e.g., https://www.youtube.com/watch?v=...)"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>
//       {videoThumbnail && (
//         <div className="mb-6">
//           <img
//             src={videoThumbnail}
//             alt="YouTube Video Thumbnail"
//             className="w-full h-auto rounded-lg"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               const videoId = extractVideoId(youtubeLink);
//               target.src = `https://i.ytimg.com/vi/${videoId}/default.jpg`;
//             }}
//           />
//         </div>
//       )}
//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
//           loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Analyzing Video...' : 'Generate Comprehensive Summary'}
//       </button>
      
//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}
      
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Video Analysis:</h2>
//           <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg">
//             {summary}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;
  

// acha chal raha hai




// "use client";
// import { useState, useEffect, useRef } from 'react';
// import { chatSession } from '@/utils/AiModel';
// import YouTube from 'react-youtube';

// interface VideoMetadata {
//   title: string;
//   description: string;
//   channelTitle: string;
//   publishedAt: string;
// }

// interface TranscriptItem {
//   text: string;
//   start: number;
//   duration: number;
// }

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoThumbnail, setVideoThumbnail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
//   const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
//   const [playerReady, setPlayerReady] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
//   const playerRef = useRef<any>(null);

//   const extractVideoId = (url: string): string => {
//     try {
//       const urlObj = new URL(url);
//       if (urlObj.hostname === 'youtu.be') {
//         return urlObj.pathname.slice(1);
//       }
//       const searchParams = new URLSearchParams(urlObj.search);
//       return searchParams.get('v') || '';
//     } catch (error) {
//       console.error('Error parsing URL:', error);
//       return '';
//     }
//   };

//   const fetchVideoMetadata = async (videoId: string) => {
//     try {
//       const response = await fetch(`/api/videoMetadata?videoId=${videoId}`);
//       if (!response.ok) throw new Error('Failed to fetch video metadata');
//       const data = await response.json();
//       setMetadata(data);
//     } catch (error) {
//       console.error('Error fetching metadata:', error);
//       setError('Failed to fetch video metadata');
//     }
//   };

//   const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       setTranscript(data.transcript);
//       return data.transcript;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<string> => {
//     try {
//       const prompt = `Summarize the transcript of this YouTube video in a structured, bullet-point format. Each section should have clear headings and detailed subpoints. Do not use paragraphs or long text blocks.
//       I dont want anything in bold. i want proper gaps and lines between multiple paragraphs 
//       write it in the form of research paper 
//       highlight important things 
      
//       Transcript for analysis:
//       ${transcriptText}`;

//       const response = await chatSession.sendMessage(prompt);
//       const summaryText = await response.response.text();
//       return summaryText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     }
//   };

//   const handleChatSubmit = async () => {
//     if (!chatMessage.trim()) return;

//     const newMessage = { role: 'user', content: chatMessage };
//     setChatHistory(prev => [...prev, newMessage]);
    
//     try {
//       const prompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
//       Context from transcript:
//       ${transcript.map(t => t.text).join(' ')}`;

//       const response = await chatSession.sendMessage(prompt);
//       const answerText = await response.response.text();
      
//       setChatHistory(prev => [...prev, { role: 'assistant', content: answerText }]);
//     } catch (error) {
//       setChatHistory(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error while processing your question.' 
//       }]);
//     }
    
//     setChatMessage('');
//   };

//   const handleTimeClick = (startTime: number) => {
//     if (playerRef.current?.internalPlayer) {
//       playerRef.current.internalPlayer.seekTo(startTime);
//     }
//   };

//   const handlePlayerReady = (event: any) => {
//     playerRef.current = event.target;
//     setPlayerReady(true);
//   };

//   const handlePlayerStateChange = (event: any) => {
//     const time = Math.floor(event.target.getCurrentTime());
//     setCurrentTime(time);
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary('');

//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
//       setVideoThumbnail(thumbnailUrl);
      
//       await fetchVideoMetadata(videoId);
//       const transcriptItems = await extractTranscriptDetails(youtubeLink);
//       const transcriptText = transcriptItems.map(item => item.text).join(' ');

//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summary = await generateSummary(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Video Analysis & Summary
//       </h1>
      
//       {/* Input Section */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link"
//           value={youtubeLink}
//           onChange={(e) => setYoutubeLink(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
//           loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Analyzing Video...' : 'Generate Comprehensive Summary'}
//       </button>

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Video Player and Metadata Section */}
//       {playerReady && metadata && (
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-4">
//             <YouTube
//               videoId={extractVideoId(youtubeLink)}
//               opts={{
//                 height: '390',
//                 width: '640',
//                 playerVars: {
//                   autoplay: 0,
//                 }
//               }}
//               onReady={handlePlayerReady}
//               onStateChange={handlePlayerStateChange}
//             />
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h2 className="text-xl font-semibold">{metadata.title}</h2>
//               <p className="text-gray-600">{metadata.channelTitle}</p>
//               <p className="text-sm text-gray-500">
//                 Published: {new Date(metadata.publishedAt).toLocaleDateString()}
//               </p>
//               <p className="mt-2">{metadata.description}</p>
//             </div>
//           </div>

//           {/* Transcript Section */}
//           <div className="h-[600px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-4">Interactive Transcript</h3>
//             {transcript.map((item, index) => (
//               <div
//                 key={index}
//                 className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${
//                   currentTime >= item.start && 
//                   currentTime < item.start + item.duration ? 
//                   'bg-yellow-100' : ''
//                 }`}
//                 onClick={() => handleTimeClick(item.start)}
//               >
//                 <span className="text-gray-500 text-sm">
//                   {Math.floor(item.start / 60)}:{(item.start % 60).toString().padStart(2, '0')}
//                 </span>
//                 <span className="ml-2">{item.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Summary Section */}
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Video Analysis:</h2>
//           <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg">
//             {summary}
//           </div>
//         </div>
//       )}

//       {/* Chat Interface */}
//       {transcript.length > 0 && (
//         <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">Ask Questions About the Video</h2>
//           <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
//             {chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg ${
//                   msg.role === 'user' ? 
//                   'bg-blue-100 ml-12' : 
//                   'bg-gray-100 mr-12'
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               className="flex-1 p-3 border border-gray-300 rounded-lg"
//               placeholder="Ask a question about the video..."
//               value={chatMessage}
//               onChange={(e) => setChatMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
//             />
//             <button
//               onClick={handleChatSubmit}
//               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;


















//best out of all


// "use client";
// import { useState, useEffect, useRef } from 'react';
// import { chatSession } from '@/utils/AiModel';
// import YouTube from 'react-youtube';

// interface VideoMetadata {
//   title: string;
//   description: string;
//   channelTitle: string;
//   publishedAt: string;
// }

// interface TranscriptItem {
//   text: string;
//   start: number;
//   duration: number;
// }

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<string>('');
//   const [videoId, setVideoId] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
//   const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
//   const playerRef = useRef<any>(null);

//   const extractVideoId = (url: string): string => {
//     if (!url) return '';
    
//     try {
//       // Handle full URLs
//       if (url.startsWith('http://') || url.startsWith('https://')) {
//         const urlObj = new URL(url);
//         if (urlObj.hostname === 'youtu.be') {
//           return urlObj.pathname.slice(1);
//         }
//         const searchParams = new URLSearchParams(urlObj.search);
//         return searchParams.get('v') || '';
//       }
      
//       // Handle video ID directly
//       if (url.length === 11) {
//         return url;
//       }
      
//       // Handle various YouTube URL formats without protocol
//       if (url.includes('youtu.be/')) {
//         return url.split('youtu.be/')[1]?.split('?')?.[0] || '';
//       }
      
//       if (url.includes('youtube.com/watch')) {
//         const videoIdMatch = url.match(/[?&]v=([^&]+)/);
//         return videoIdMatch?.[1] || '';
//       }
      
//       if (url.includes('youtube.com/embed/')) {
//         return url.split('embed/')?.[1]?.split('?')?.[0] || '';
//       }
      
//       // If no match found, return empty string
//       return '';
//     } catch (error) {
//       console.error('Error parsing YouTube URL:', error);
//       return '';
//     }
//   };

//   // Effect to fetch metadata when videoId changes
//   useEffect(() => {
//     const fetchMetadata = async () => {
//       if (!videoId) return;
      
//       try {
//         const response = await fetch(`/api/videoMetadata?videoId=${videoId}`);
//         if (!response.ok) throw new Error('Failed to fetch video metadata');
//         const data = await response.json();
//         setMetadata(data);
//       } catch (error) {
//         console.error('Error fetching metadata:', error);
//         setError('Failed to fetch video metadata');
//       }
//     };

//     fetchMetadata();
//   }, [videoId]);

//   // Update videoId when link changes
//   useEffect(() => {
//     const id = extractVideoId(youtubeLink);
//     setVideoId(id);
//   }, [youtubeLink]);

//   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newLink = e.target.value;
//     setYoutubeLink(newLink);
//   };

//   const handlePlayerReady = (event: any) => {
//     playerRef.current = event.target;
//   };

//   const handlePlayerStateChange = (event: any) => {
//     const time = Math.floor(event.target.getCurrentTime());
//     setCurrentTime(time);
//   };

//   const handleTimeClick = (startTime: number) => {
//     if (playerRef.current?.internalPlayer) {
//       playerRef.current.internalPlayer.seekTo(startTime);
//     }
//   };

//   const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
//     try {
//       const videoId = extractVideoId(url);
//       if (!videoId) throw new Error('Invalid YouTube URL');

//       const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       setTranscript(data.transcript);
//       return data.transcript;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<string> => {
//     try {
//       const prompt = `Summarize the transcript of this YouTube video in a structured, bullet-point format. Each section should have clear headings and detailed subpoints. Do not use paragraphs or long text blocks.
//       I dont want anything in bold. i want proper gaps and lines between multiple paragraphs 
//       write it in the form of research paper 
//       highlight important things 
      
//       Transcript for analysis:
//       ${transcriptText}`;

//       const response = await chatSession.sendMessage(prompt);
//       const summaryText = await response.response.text();
//       return summaryText;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     }
//   };

//   const handleChatSubmit = async () => {
//     if (!chatMessage.trim()) return;

//     const newMessage = { role: 'user', content: chatMessage };
//     setChatHistory(prev => [...prev, newMessage]);
    
//     try {
//       const prompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
//       Context from transcript:
//       ${transcript.map(t => t.text).join(' ')}`;

//       const response = await chatSession.sendMessage(prompt);
//       const answerText = await response.response.text();
      
//       setChatHistory(prev => [...prev, { role: 'assistant', content: answerText }]);
//     } catch (error) {
//       setChatHistory(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error while processing your question.' 
//       }]);
//     }
    
//     setChatMessage('');
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary('');

//       const id = extractVideoId(youtubeLink);
//       if (!id) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       setVideoId(id);
//       const transcriptItems = await extractTranscriptDetails(youtubeLink);
//       const transcriptText = transcriptItems.map(item => item.text).join(' ');

//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summary = await generateSummary(transcriptText);
//       setSummary(summary);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6">
//         YouTube Video Analysis & Summary
//       </h1>
      
//       {/* Input Section */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Enter YouTube Video Link"
//           value={youtubeLink}
//           onChange={handleLinkChange}
//         />
//       </div>

//       {/* Video Player and Metadata Section - Show as soon as valid videoId exists */}
//       {videoId && (
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-4">
//             <div className="relative pt-[56.25%] w-full">
//               <YouTube
//                 videoId={videoId}
//                 opts={{
//                   height: '100%',
//                   width: '100%',
//                   playerVars: {
//                     autoplay: 0,
//                   }
//                 }}
//                 onReady={handlePlayerReady}
//                 onStateChange={handlePlayerStateChange}
//                 className="absolute top-0 left-0 w-full h-full"
//               />
//             </div>
            
//             {metadata && (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h2 className="text-xl font-semibold">{metadata.title}</h2>
//                 <p className="text-gray-600">{metadata.channelTitle}</p>
//                 <p className="text-sm text-gray-500">
//                   Published: {new Date(metadata.publishedAt).toLocaleDateString()}
//                 </p>
//                 <p className="mt-2 line-clamp-3 hover:line-clamp-none">
//                   {metadata.description}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Transcript Section - Only show when transcript is available */}
//           {/* {transcript.length > 0 && (
//             <div className="h-[600px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
//               <h3 className="text-lg font-semibold mb-4">Interactive Transcript</h3>
//               {transcript.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${
//                     currentTime >= item.start && 
//                     currentTime < item.start + item.duration ? 
//                     'bg-yellow-100' : ''
//                   }`}
//                   onClick={() => handleTimeClick(item.start)}
//                 >
//                   <span className="text-gray-500 text-sm">
//                     {Math.floor(item.start / 60)}:{(item.start % 60).toString().padStart(2, '0')}
//                   </span>
//                   <span className="ml-2">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           )} */}
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         className={`w-full p-3 bg-blue-500 text-white rounded-lg mt-4 ${
//           loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
//         }`}
//         disabled={loading}
//       >
//         {loading ? 'Analyzing Video...' : 'Generate Comprehensive Summary'}
//       </button>

//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Summary Section */}
//       {summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Detailed Video Analysis:</h2>
//           <div className="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg">
//             {summary}
//           </div>
//         </div>
//       )}

//       {/* Chat Interface */}
//       {transcript.length > 0 && (
//         <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">Ask Questions About the Video</h2>
//           <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
//             {chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg ${
//                   msg.role === 'user' ? 
//                   'bg-blue-100 ml-12' : 
//                   'bg-gray-100 mr-12'
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               className="flex-1 p-3 border border-gray-300 rounded-lg"
//               placeholder="Ask a question about the video..."
//               value={chatMessage}
//               onChange={(e) => setChatMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
//             />
//             <button
//               onClick={handleChatSubmit}
//               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;

















































//yahi neeche waala code hai best 












"use client";
import { useState, useEffect, useRef } from 'react';
import { chatSession } from '@/utils/AiModel';
import YouTube from 'react-youtube';
import TextToSpeech from "@/components/TextToSpeech";
import { LampDemo } from '@/components/lamp';
import QuizComponent from '@/components/QuizComponents';

// Add this state variable in the YouTubeSummaryPage component


interface VideoMetadata {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
}

interface TranscriptItem {
  text: string;
  start: number;
  duration: number;
}

interface SummarySection {
  title: string;
  key_points: string[];
  subsections?: Array<{
    subtitle: string;
    points: string[];
  }>;
}

interface VideoSummary {
  title: string;
  sections: SummarySection[];
}

const SummaryDisplay = ({ summary }: { summary: VideoSummary }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">{summary.title}</h1>
      
      <div className="space-y-12">
        {summary.sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-700">Key Points</h3>
                <div className="grid gap-3">
                  {section.key_points.map((point, pointIndex) => (
                    <div
                      key={pointIndex}
                      className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 transition-all duration-200 hover:bg-blue-100"
                    >
                      <span className="text-blue-500 mt-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {section.subsections && section.subsections.length > 0 && (
                <div className="space-y-6 mt-6">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="space-y-3">
                      <h4 className="text-lg font-medium text-gray-700 border-l-4 border-blue-500 pl-3">
                        {subsection.subtitle}
                      </h4>
                      <div className="grid gap-2 pl-4">
                        {subsection.points.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                          >
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <p>{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const YouTubeSummaryPage = () => {
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [summary, setSummary] = useState<VideoSummary | null>(null);
  const [videoId, setVideoId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  

  const extractVideoId = (url: string): string => {
    if (!url) return '';
    
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
          return urlObj.pathname.slice(1);
        }
        const searchParams = new URLSearchParams(urlObj.search);
        return searchParams.get('v') || '';
      }
      
      if (url.length === 11) {
        return url;
      }
      
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1]?.split('?')?.[0] || '';
      }
      
      if (url.includes('youtube.com/watch')) {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch?.[1] || '';
      }
      
      if (url.includes('youtube.com/embed/')) {
        return url.split('embed/')?.[1]?.split('?')?.[0] || '';
      }
      
      return '';
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!videoId) return;
      
      try {
        const response = await fetch(`/api/videoMetadata?videoId=${videoId}`);
        if (!response.ok) throw new Error('Failed to fetch video metadata');
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setError('Failed to fetch video metadata');
      }
    };

    fetchMetadata();
  }, [videoId]);

  useEffect(() => {
    const id = extractVideoId(youtubeLink);
    setVideoId(id);
  }, [youtubeLink]);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(e.target.value);
  };

  const handlePlayerReady = (event: any) => {
    playerRef.current = event.target;
  };

  const handlePlayerStateChange = (event: any) => {
    setCurrentTime(Math.floor(event.target.getCurrentTime()));
  };

  const handleTimeClick = (startTime: number) => {
    if (playerRef.current?.internalPlayer) {
      playerRef.current.internalPlayer.seekTo(startTime);
    }
  };

  // const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
  //   try {
  //     const videoId = extractVideoId(url);
  //     if (!videoId) throw new Error('Invalid YouTube URL');

  //     const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);
  //     console.log(response);
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.error || 'Failed to fetch transcript');
  //     }
      
  //     const data = await response.json();
  //     setTranscript(data.transcript);
  //     return data.transcript;
  //   } catch (error) {
  //     const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
  //     throw new Error(errorMessage);
  //   }
  // };

  const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
    try {
      if (!url) throw new Error('No URL provided');
  
      // Use POST instead of GET and send the "link" in the body
      const response = await fetch(`/api/youtubeTranscript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: url })
      });
      
      console.log(response);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transcript');
      }
      
      const data = await response.json();
      setTranscript(data.transcript);
      return data.transcript;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
      throw new Error(errorMessage);
    }
  };
  
  const generateSummary = async (transcriptText: string): Promise<VideoSummary> => {
    try {
      const prompt = `Analyze the following video transcript and provide a detailed summary in JSON format. The response should be properly formatted JSON following this structure:
      {
        "title": "Main title of the video content",
        "sections": [
          {
            "title": "Section title",
            "key_points": ["Important point 1", "Important point 2"],
            "subsections": [
              {
                "subtitle": "Subsection title",
                "points": ["Detailed point 1", "Detailed point 2"]
              }
            ]
          }
        ]
      }

      Make sure to:
      1. Include 3-5 main sections
      2. Each section should have 2-4 key points
      3. Include relevant subsections where appropriate
      4. Keep points concise but informative
      5. Ensure the JSON is properly formatted and valid

      Transcript for analysis:
      ${transcriptText}`;

    
    const response = await chatSession.sendMessage(prompt);
    const summaryText = await response.response.text();
    
    console.log("Received summary text:", summaryText);  // Check the content

    // Remove unwanted characters like markdown code blocks
    const cleanedSummaryText = summaryText.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(cleanedSummaryText) as VideoSummary;
    } catch (parseError) {
      console.error('Error parsing summary JSON:', parseError);
      throw new Error('Failed to parse summary response');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
    throw new Error(errorMessage);
    }
  };

  const handleChatSubmit = async () => {
  if (!chatMessage.trim()) return;

  const newMessage = { role: 'user', content: chatMessage };
  setChatHistory(prev => [...prev, newMessage]);

  try {
//     const prompt = `
// You are a helpful AI that answers questions based on YouTube video transcripts. Your tone is clear, concise, and conversational. Organize the response with short paragraphs or bullet points. Avoid repeating the question. Here's the context:

// User Question:
// "${chatMessage}"

// Transcript:
// ${transcript.map(t => t.text).join(' ')}
// `;
const prompt = `
You are a helpful AI that answers user questions based on YouTube video transcripts. 
Respond in a clear, concise, and conversational tone.

Instructions:
- Structure your answer using short paragraphs or bullet points.
- Do not repeat the user question.
- Bold important keywords or concepts using plain text only (no markdown or symbols like **).
- Avoid using asterisks, hashtags, or special characters.
- Provide references or learning resources if relevant.
- Ensure the answer is directly useful and easy to read in a modern UI.

User Question:
"${chatMessage}"

Transcript Context:
${transcript.map(t => t.text).join(' ')}
`;


    const response = await chatSession.sendMessage(prompt);
    const rawAnswer = await response.response.text();

    // Optional: improve formatting with line breaks
    const formattedAnswer = rawAnswer
      .replace(/\*\*(.*?)\*\*/g, (_:string, bold: string) => `**${bold.trim()}**`) // Keep bold
      .replace(/(\d+\.)(\s+)/g, '\n$1 ') // Numbered list fix
      .replace(/\n{2,}/g, '\n') // Collapse double newlines
      .trim();

    setChatHistory(prev => [...prev, { role: 'assistant', content: formattedAnswer }]);
  } catch (error) {
    setChatHistory(prev => [
      ...prev,
      { role: 'assistant', content: '⚠️ Sorry, something went wrong. Please try again.' }
    ]);
  }

  setChatMessage('');
};

  // const handleChatSubmit = async () => {
  //   if (!chatMessage.trim()) return;

  //   const newMessage = { role: 'user', content: chatMessage };
  //   setChatHistory(prev => [...prev, newMessage]);
    
  //   try {
  //     const prompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
  //     Context from transcript:
  //     ${transcript.map(t => t.text).join(' ')}`;

  //     const response = await chatSession.sendMessage(prompt);
  //     const answerText = await response.response.text();
      
  //     setChatHistory(prev => [...prev, { role: 'assistant', content: answerText }]);
  //   } catch (error) {
  //     setChatHistory(prev => [...prev, { 
  //       role: 'assistant', 
  //       content: 'Sorry, I encountered an error while processing your question.' 
  //     }]);
  //   }
    
  //   setChatMessage('');
  // };



  //ye best hai
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      setSummary(null);

      const id = extractVideoId(youtubeLink);
      if (!id) {
        throw new Error('Invalid YouTube URL. Please check the URL and try again.');
      }

      setVideoId(id);
      const transcriptItems = await extractTranscriptDetails(youtubeLink);
      const transcriptText = transcriptItems.map(item => item.text).join(' ');

      if (!transcriptText) {
        throw new Error('No transcript available for this video.');
      }

      const summaryData = await generateSummary(transcriptText);
      setSummary(summaryData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  
  
  return (
    <>
    <div>
    <LampDemo/>
    </div>
    <div className="max-w-full mx-auto p-8">
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-900 p-6 flex flex-col items-center justify-center space-y-10 rounded-lg">
  <h1 className="text-5xl font-extrabold bg-clip-text text-black drop-shadow-xl text-center">
    YouTube Video Analysis & Smart Summary
  </h1>

  {/* Input Section */}
  <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-purple-400">
    <input
      type="text"
      className="w-full p-4 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-500 font-medium"
      placeholder="Paste YouTube Video Link Here..."
      value={youtubeLink}
      onChange={handleLinkChange}
    />
  </div>

  {/* Video Section */}
  {videoId && (
    <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-purple-300 rounded-3xl p-6 shadow-lg flex flex-col items-center space-y-6">
      {/* YouTube Video */}
      <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
        <YouTube
          videoId={videoId}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: { autoplay: 0 },
          }}
          onReady={handlePlayerReady}
          onStateChange={handlePlayerStateChange}
          className="w-full h-full"
        />
      </div>

      {/* Manual Component Section */}
      <div className="text-white text-center space-y-4">
        <h2 className="text-3xl font-semibold">What does this do?</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Our tool analyzes any YouTube video using advanced NLP and summarization techniques.
          Instantly get a concise summary of long videos and even ask follow-up questions using our integrated chatbot.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          <div className="bg-white  rounded-xl p-4 shadow-md backdrop-blur-lg">
            <h3 className="text-xl font-bold text-black">🎥 Video Summarizer</h3>
            <p className="text-lg text-black mt-2">
              Automatically generates bullet-point summaries and highlights from any YouTube video.
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md backdrop-blur-lg">
            <h3 className="text-xl font-bold text-black">🤖 AI Chatbot</h3>
            <p className="text-lg text-black mt-2 ">
              Ask any question about the video content and get contextual answers using our GPT-based chatbot.
            </p>
          </div>
        </div>
      </div>

      {/* Metadata */}
      {metadata && (
        <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-3xl text-black">
          <h2 className="text-2xl font-semibold">{metadata.title}</h2>
          <p className="text-sm text-black">Channel: {metadata.channelTitle}</p>
          <p className="text-sm text-black">
            Published on: {new Date(metadata.publishedAt).toLocaleDateString()}
          </p>
          <p className="mt-2 text-black line-clamp-3 hover:line-clamp-none">
            {metadata.description}
          </p>
        </div>
      )}
    </div>
  )}
</div>



      <button
        onClick={handleSubmit}
        className={`w-full p-3 bg-purple-500 text-white rounded-lg mt-4 ${
          loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-400'
        }`}
        disabled={loading}
      >
        {loading ? 'Analyzing Video...' : 'Generate Comprehensive Summary'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Detailed Video Analysis:</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <SummaryDisplay summary={summary} />
          </div>
        </div>
      )}

      {/* new */}
       {summary && (
  <div className="mt-4 flex justify-center">
    <button
      onClick={() => setShowQuiz(!showQuiz)}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
    >
      {showQuiz ? 'Hide Quiz' : '📝 Test Your Knowledge with a Quiz'}
    </button>
  </div>
)}
{/* Quiz Component */}
{showQuiz && transcript.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Knowledge Check Quiz:</h2>
    <QuizComponent 
      transcript={transcript} 
      videoTitle={metadata?.title || 'YouTube Video'}
    />
  </div>
)}

      {transcript.length > 0 && (
  <div className="mt-12 bg-gradient-to-br from-purple-100/60 via-purple-50/60 to-white/60 border border-purple-200 rounded-2xl shadow-xl p-6 backdrop-blur-md w-full max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
      💬 Ask Questions About the Video
    </h2>

    {/* Chat History */}
    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl max-w-[80%] ${
            msg.role === 'user'
              ? 'bg-purple-200 text-purple-900 ml-auto rounded-br-none'
              : 'bg-white/60 text-gray-800 mr-auto rounded-bl-none'
          } shadow-md backdrop-blur-sm border border-purple-100`}
        >
          {msg.content}
        </div>
      ))}
    </div>

    {/* Chat Input */}
    <div className="flex items-center gap-4 mt-4">
      <input
        type="text"
        className="flex-1 p-4 rounded-xl border border-purple-300 bg-white/80 placeholder-purple-500 text-purple-900 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        placeholder="Ask a question about the video..."
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleChatSubmit();
          }
        }}
      />
      <button
        onClick={handleChatSubmit}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
        disabled={!chatMessage.trim()}
      >
        Send
      </button>
    </div>

    {/* Info or Tips (Manual Components) */}
    <div className="mt-8 bg-white/50 rounded-xl p-4 border border-purple-200 text-purple-800 shadow-sm text-sm space-y-2">
      <p>✨ <strong>Tip:</strong> Ask things like:</p>
      <ul className="list-disc list-inside text-purple-700">
        <li>“What was the main topic discussed?”</li>
        <li>“Summarize the key points in 5 bullet points.”</li>
        <li>“Explain the speaker’s opinion on [topic].”</li>
      </ul>
    </div>
  </div>
)}


      {/* {transcript.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ask Questions About the Video</h2>
          <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  msg.role === 'user' ? 
                  'bg-blue-100 ml-12' : 
                  'bg-gray-100 mr-12'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
           

              <input
                type="text"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="Ask a question about the video..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleChatSubmit();
                  }
                }}
              />
              <button
                onClick={handleChatSubmit}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!chatMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )} */}
  
        
      </div>
      </>
    );
  };
  
  export default YouTubeSummaryPage;

// "use client";
// import { useState, useEffect, useRef } from 'react';
// import { chatSession } from '@/utils/AiModel';
// import YouTube from 'react-youtube';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { 
//   BookOpen, 
//   Brain, 
//   Check, 
//   ChevronRight, 
//   FileQuestion,
//   Lightbulb,
//   RefreshCw,
//   Video
// } from "lucide-react";

// interface VideoMetadata {
//   title: string;
//   description: string;
//   channelTitle: string;
//   publishedAt: string;
// }

// interface TranscriptItem {
//   text: string;
//   start: number;
//   duration: number;
// }

// interface SummarySection {
//   title: string;
//   key_points: string[];
//   subsections?: Array<{
//     subtitle: string;
//     points: string[];
//   }>;
// }

// interface VideoSummary {
//   title: string;
//   sections: SummarySection[];
// }

// interface QuizQuestion {
//   type: 'objective' | 'subjective';
//   question: string;
//   options?: string[];
//   correctAnswer: string;
//   explanation: string;
//   topic: string;
// }

// interface FlashCard {
//   front: string;
//   back: string;
//   topic: string;
// }

// interface QuizResult {
//   totalQuestions: number;
//   correctAnswers: number;
//   weakTopics: string[];
//   strengths: string[];
// }

// interface RelatedVideo {
//   id: string;
//   title: string;
//   thumbnail: string;
// }

// const SummaryDisplay = ({ summary }: { summary: VideoSummary }) => {
//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">{summary.title}</h1>
      
//       <div className="space-y-12">
//         {summary.sections.map((section, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//               <h2 className="text-xl font-semibold text-white">
//                 {section.title}
//               </h2>
//             </div>
            
//             <div className="p-6 space-y-6">
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-gray-700">Key Points</h3>
//                 <div className="grid gap-3">
//                   {section.key_points.map((point, pointIndex) => (
//                     <div
//                       key={pointIndex}
//                       className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 transition-all duration-200 hover:bg-blue-100"
//                     >
//                       <span className="text-blue-500 mt-1">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-gray-700">{point}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {section.subsections && section.subsections.length > 0 && (
//                 <div className="space-y-6 mt-6">
//                   {section.subsections.map((subsection, subIndex) => (
//                     <div key={subIndex} className="space-y-3">
//                       <h4 className="text-lg font-medium text-gray-700 border-l-4 border-blue-500 pl-3">
//                         {subsection.subtitle}
//                       </h4>
//                       <div className="grid gap-2 pl-4">
//                         {subsection.points.map((point, pointIndex) => (
//                           <div
//                             key={pointIndex}
//                             className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
//                           >
//                             <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
//                             <p>{point}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<VideoSummary | null>(null);
//   const [videoId, setVideoId] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
//   const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);

//   const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
//   const [showingResults, setShowingResults] = useState(false);
//   const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
//   const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
//   const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
//   const [showingFlashcardAnswer, setShowingFlashcardAnswer] = useState(false);
//   const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
//   const [showQuiz, setShowQuiz] = useState(false);

//   const playerRef = useRef<any>(null);

//   const extractVideoId = (url: string): string => {
//     if (!url) return '';
    
//     try {
//       if (url.startsWith('http://') || url.startsWith('https://')) {
//         const urlObj = new URL(url);
//         if (urlObj.hostname === 'youtu.be') {
//           return urlObj.pathname.slice(1);
//         }
//         const searchParams = new URLSearchParams(urlObj.search);
//         return searchParams.get('v') || '';
//       }
      
//       if (url.length === 11) {
//         return url;
//       }
      
//       if (url.includes('youtu.be/')) {
//         return url.split('youtu.be/')[1]?.split('?')?.[0] || '';
//       }
      
//       if (url.includes('youtube.com/watch')) {
//         const videoIdMatch = url.match(/[?&]v=([^&]+)/);
//         return videoIdMatch?.[1] || '';
//       }
      
//       if (url.includes('youtube.com/embed/')) {
//         return url.split('embed/')?.[1]?.split('?')?.[0] || '';
//       }
      
//       return '';
//     } catch (error) {
//       console.error('Error parsing YouTube URL:', error);
//       return '';
//     }
//   };

//   useEffect(() => {
//     const fetchMetadata = async () => {
//       if (!videoId) return;
      
//       try {
//         const response = await fetch(`/api/videoMetadata?videoId=${videoId}`);
//         if (!response.ok) throw new Error('Failed to fetch video metadata');
//         const data = await response.json();
//         setMetadata(data);
//       } catch (error) {
//         console.error('Error fetching metadata:', error);
//         setError('Failed to fetch video metadata');
//       }
//     };

//     fetchMetadata();
//   }, [videoId]);

//   useEffect(() => {
//     const id = extractVideoId(youtubeLink);
//     setVideoId(id);
//   }, [youtubeLink]);

//   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setYoutubeLink(e.target.value);
//   };

//   const handlePlayerReady = (event: any) => {
//     playerRef.current = event.target;
//   };

//   const handlePlayerStateChange = (event: any) => {
//     setCurrentTime(Math.floor(event.target.getCurrentTime()));
//   };

//   const handleTimeClick = (startTime: number) => {
//     if (playerRef.current?.internalPlayer) {
//       playerRef.current.internalPlayer.seekTo(startTime);
//     }
//   };

//   const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
//     try {
//       if (!url) throw new Error('No URL provided');
  
//       const response = await fetch(`/api/youtubeTranscript`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ link: url })
//       });
      
//       console.log(response);
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch transcript');
//       }
      
//       const data = await response.json();
//       setTranscript(data.transcript);
//       return data.transcript;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//       throw new Error(errorMessage);
//     }
//   };
  
//   const generateQuizQuestions = async (transcriptText: string) => {
//     try {
//       const prompt = `Based on this transcript, generate a quiz with 5 multiple choice questions and 3 open-ended questions.`;

//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt, transcript: transcriptText })
//       });
      
//       const data = await response.json();
//       setQuizQuestions(data.questions);
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//       setError('Failed to generate quiz questions');
//     }
//   };

//   const generateSummary = async (transcriptText: string) => {
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           type: 'summary',
//           transcript: transcriptText 
//         })
//       });
      
//       return await response.json();
//     } catch (error) {
//       throw new Error('Failed to generate summary');
//     }
//   };

//   const handleChatSubmit = async () => {
//     if (!chatMessage.trim()) return;

//     const newMessage = { role: 'user', content: chatMessage };
//     setChatHistory(prev => [...prev, newMessage]);
    
//     try {
//       const prompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
//       Context from transcript:
//       ${transcript.map(t => t.text).join(' ')}`;

//       const response = await chatSession.sendMessage(prompt);
//       const answerText = await response.response.text();
      
//       setChatHistory(prev => [...prev, { role: 'assistant', content: answerText }]);
//     } catch (error) {
//       setChatHistory(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error while processing your question.' 
//       }]);
//     }
    
//     setChatMessage('');
//   };

//   const generateFlashcards = async (transcriptText: string) => {
//     try {
//       const prompt = `Create 10 flashcards from this transcript. Format as JSON:
//       {
//         "flashcards": [
//           {
//             "front": "Question or concept",
//             "back": "Answer or explanation",
//             "topic": "Related topic"
//           }
//         ]
//       }
      
//       Transcript: ${transcriptText}`;

//       const response = await chatSession.sendMessage(prompt);
//       const flashcardData = JSON.parse(await response.response.text());
//       setFlashcards(flashcardData.flashcards);
//     } catch (error) {
//       console.error('Error generating flashcards:', error);
//     }
//   };

//   const handleQuizSubmit = async () => {
//     const correctCount = Object.entries(userAnswers).reduce((count, [index, answer]) => {
//       const question = quizQuestions[parseInt(index)];
//       return count + (answer === question.correctAnswer ? 1 : 0);
//     }, 0);

//     const topics = quizQuestions.map(q => q.topic);
//     const weakTopics = topics.filter(topic => {
//       const questionsOnTopic = quizQuestions.filter(q => q.topic === topic);
//       const correctOnTopic = questionsOnTopic.filter(q => 
//         userAnswers[quizQuestions.indexOf(q)] === q.correctAnswer
//       );
//       return correctOnTopic.length / questionsOnTopic.length < 0.6;
//     });

//     const strengths = topics.filter(topic => !weakTopics.includes(topic));

//     setQuizResults({
//       totalQuestions: quizQuestions.length,
//       correctAnswers: correctCount,
//       weakTopics,
//       strengths
//     });
//     setShowingResults(true);
//   };

//   const handleAnswerSubmit = (answer: string) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [currentQuestionIndex]: answer
//     }));
//   };

//   const generateRelatedVideos = async () => {
//     try {
//       const prompt = `Based on the video content about "${metadata?.title}", suggest 3 related educational videos. Format as JSON:
//       {
//         "videos": [
//           {
//             "id": "youtube_video_id",
//             "title": "Video title",
//             "thumbnail": "thumbnail_url"
//           }
//         ]
//       }`;

//       const response = await chatSession.sendMessage(prompt);
//       const videosData = JSON.parse(await response.response.text());
//       setRelatedVideos(videosData.videos);
//     } catch (error) {
//       console.error('Error generating related videos:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSummary(null);
//       setQuizQuestions([]);
//       setFlashcards([]);
//       setRelatedVideos([]);

//       const id = extractVideoId(youtubeLink);
//       if (!id) {
//         throw new Error('Invalid YouTube URL. Please check the URL and try again.');
//       }

//       setVideoId(id);
//       const transcriptItems = await extractTranscriptDetails(youtubeLink);
//       const transcriptText = transcriptItems.map(item => item.text).join(' ');

//       if (!transcriptText) {
//         throw new Error('No transcript available for this video.');
//       }

//       const summaryData = await generateSummary(transcriptText);
//       setSummary(summaryData);

//       await Promise.all([
//         generateQuizQuestions(transcriptText),
//         generateFlashcards(transcriptText),
//         generateRelatedVideos()
//       ]);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
//             Video Learning Assistant
//           </h1>
//           <p className="text-lg text-gray-600">
//             Transform any YouTube video into an interactive learning experience
//           </p>
//         </div>

//         <div className="relative mb-8">
//           <input
//             type="text"
//             className="w-full p-4 pr-12 text-lg border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
//             placeholder="Enter YouTube Video Link..."
//             value={youtubeLink}
//             onChange={handleLinkChange}
//           />
//           <Button
//             onClick={handleSubmit}
//             className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
//             disabled={loading}
//           >
//             {loading ? (
//               <RefreshCw className="w-5 h-5 animate-spin" />
//             ) : (
//               <ChevronRight className="w-5 h-5" />
//             )}
//           </Button>
//         </div>

//         {error && (
//           <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
//             {error}
//           </div>
//         )}

//         {videoId && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//             <div className="space-y-6">
//               <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
//                 <YouTube
//                   videoId={videoId}
//                   opts={{
//                     height: '100%',
//                     width: '100%',
//                     playerVars: { autoplay: 0 }
//                   }}
//                   onReady={handlePlayerReady}
//                   onStateChange={handlePlayerStateChange}
//                   className="w-full h-full"
//                 />
//               </div>

//               {metadata && (
//                 <Card className="p-6 bg-white/50 backdrop-blur-sm">
//                   <h2 className="text-xl font-semibold mb-2">{metadata.title}</h2>
//                   <p className="text-gray-600">{metadata.channelTitle}</p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     Published: {new Date(metadata.publishedAt).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-700 line-clamp-3 hover:line-clamp-none transition-all">
//                     {metadata.description}
//                   </p>
//                 </Card>
//               )}
//             </div>

//             <div className="space-y-6">
//               {summary && (
//                 <>
//                   <Card className="p-6 bg-white/50 backdrop-blur-sm">
//                     <div className="flex items-center gap-2 mb-4">
//                       <BookOpen className="w-5 h-5 text-purple-600" />
//                       <h2 className="text-xl font-semibold">Summary</h2>
//                     </div>
//                     <SummaryDisplay summary={summary} />
//                   </Card>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Button
//                       onClick={() => setShowQuiz(true)}
//                       className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
//                     >
//                       <FileQuestion className="w-4 h-4 mr-2" />
//                       Take Quiz
//                     </Button>
//                     <Button
//                       onClick={() => setShowingFlashcardAnswer(false)}
//                       className="w-full bg-white text-purple-600 border-2 border-purple-200"
//                     >
//                       <Brain className="w-4 h-4 mr-2" />
//                       Study Flashcards
//                     </Button>
//                   </div>
//                 </>
//               )}

//               {showQuiz && quizQuestions.length > 0 && !showingResults && (
//                 <Card className="p-6 bg-white/50 backdrop-blur-sm">
//                   <div className="mb-4">
//                     <Progress value={(currentQuestionIndex / quizQuestions.length) * 100} />
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">
//                     Question {currentQuestionIndex + 1} of {quizQuestions.length}
//                   </h3>
//                   <p className="text-gray-700 mb-4">
//                     {quizQuestions[currentQuestionIndex].question}
//                   </p>
//                   {quizQuestions[currentQuestionIndex].type === 'objective' ? (
//                     <div className="space-y-2">
//                       {quizQuestions[currentQuestionIndex].options?.map((option, i) => (
//                         <Button
//                           key={i}
//                           onClick={() => handleAnswerSubmit(option)}
//                           className={`w-full justify-start ${
//                             userAnswers[currentQuestionIndex] === option
//                               ? 'bg-purple-100 text-purple-700'
//                               : 'bg-white text-gray-700'
//                           }`}
//                           variant="outline"
//                         >
//                           {option}
//                         </Button>
//                       ))}
//                     </div>
//                   ) : (
//                     <textarea
//                       className="w-full p-3 border border-gray-200 rounded-lg"
//                       rows={4}
//                       placeholder="Enter your answer..."
//                       onChange={(e) => handleAnswerSubmit(e.target.value)}
//                       value={userAnswers[currentQuestionIndex] || ''}
//                     />
//                   )}
//                   <div className="flex justify-between mt-6">
//                     <Button
//                       onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
//                       disabled={currentQuestionIndex === 0}
//                     >
//                       Previous
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         if (currentQuestionIndex < quizQuestions.length - 1) {
//                           setCurrentQuestionIndex(prev => prev + 1);
//                         } else {
//                           handleQuizSubmit();
//                         }
//                       }}
//                     >
//                       {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next'}
//                     </Button>
//                   </div>
//                 </Card>
//               )}

//               {showingResults && quizResults && (
//                 <Card className="p-6 bg-white/50 backdrop-blur-sm">
//                   <h3 className="text-xl font-semibold mb-4">Quiz Results</h3>
//                   <div className="space-y-4">
//                     <div className="text-center">
//                       <p className="text-3xl font-bold text-purple-600">
//                         {Math.round((quizResults.correctAnswers / quizResults.totalQuestions) * 100)}%
//                       </p>
//                       <p className="text-gray-600">
//                         {quizResults.correctAnswers} out of {quizResults.totalQuestions} correct
//                       </p>
//                     </div>

//                     {quizResults.weakTopics.length > 0 && (
//                       <div>
//                         <h4 className="font-semibold text-gray-700 mb-2">Areas to Review:</h4>
//                         <ul className="list-disc list-inside text-gray-600">
//                           {quizResults.weakTopics.map((topic, i) => (
//                             <li key={i}>{topic}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     <Button
//                       onClick={() => {
//                         setShowingResults(false);
//                         setCurrentQuestionIndex(0);
//                         setUserAnswers({});
//                       }}
//                       className="w-full"
//                     >
//                       Retry Quiz
//                     </Button>
//                   </div>
//                 </Card>
//               )}
//             </div>
//           </div>
//         )}

//         {flashcards.length > 0 && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-semibold mb-6">Flashcards</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {flashcards.slice(0, 3).map((card, index) => (
//                 <Card
//                   key={index}
//                   className={`p-6 h-64 cursor-pointer transition-all duration-500 ${
//                     showingFlashcardAnswer
//                       ? 'bg-purple-50'
//                       : 'bg-white hover:shadow-lg'
//                   }`}
//                   onClick={() => setShowingFlashcardAnswer(!showingFlashcardAnswer)}
//                 >
//                   <div className="h-full flex items-center justify-center text-center">
//                     <p className="text-lg">
//                       {showingFlashcardAnswer ? card.back : card.front}
//                     </p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {relatedVideos.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-semibold mb-6">Related Videos</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {relatedVideos.map((video, index) => (
//                 <Card key={index} className="overflow-hidden">
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="font-semibold line-clamp-2">{video.title}</h3>
//                     <Button
//                       variant="link"
//                       className="mt-2"
//                       onClick={() => setYoutubeLink(`https://youtube.com/watch?v=${video.id}`)}
//                     >
//                       Watch Now
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {transcript.length > 0 && (
//           <Card className="mt-8 p-6 bg-white/50 backdrop-blur-sm">
//             <h2 className="text-2xl font-semibold mb-4">Ask Questions</h2>
//             <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
//               {chatHistory.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 rounded-xl ${
//                     msg.role === 'user'
//                       ? 'bg-purple-100 ml-12'
//                       : 'bg-gray-100 mr-12'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 className="flex-1 p-3 border border-gray-200 rounded-xl"
//                 placeholder="Ask a question about the video..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     handleChatSubmit();
//                   }
//                 }}
//               />
//               <Button
//                 onClick={handleChatSubmit}
//                 disabled={!chatMessage.trim()}
//                 className="bg-gradient-to-r from-purple-600 to-blue-600"
//               >
//                 Send
//               </Button>
//             </div>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default YouTubeSummaryPage;








// "use client";
// import { useState, useEffect, useRef } from 'react';
// import YouTube from 'react-youtube';

// interface VideoMetadata {
//   title: string;
//   description: string;
//   channelTitle: string;
//   publishedAt: string;
// }

// interface TranscriptItem {
//   text: string;
//   start: number;
//   duration: number;
// }

// interface SummarySection {
//   title: string;
//   key_points: string[];
//   subsections?: Array<{
//     subtitle: string;
//     points: string[];
//   }>;
// }

// interface VideoSummary {
//   title: string;
//   sections: SummarySection[];
// }

// const SummaryDisplay = ({ summary }: { summary: VideoSummary }) => {
//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">{summary.title}</h1>
      
//       <div className="space-y-12">
//         {summary.sections.map((section, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
//               <h2 className="text-xl font-semibold text-white">
//                 {section.title}
//               </h2>
//             </div>
            
//             <div className="p-6 space-y-6">
//               <div className="space-y-3">
//                 <h3 className="text-lg font-medium text-gray-700">Key Points</h3>
//                 <div className="grid gap-3">
//                   {section.key_points.map((point, pointIndex) => (
//                     <div
//                       key={pointIndex}
//                       className="flex items-start gap-3 bg-blue-50 rounded-lg p-4 transition-all duration-200 hover:bg-blue-100"
//                     >
//                       <span className="text-blue-500 mt-1">
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-gray-700">{point}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {section.subsections && section.subsections.length > 0 && (
//                 <div className="space-y-6 mt-6">
//                   {section.subsections.map((subsection, subIndex) => (
//                     <div key={subIndex} className="space-y-3">
//                       <h4 className="text-lg font-medium text-gray-700 border-l-4 border-blue-500 pl-3">
//                         {subsection.subtitle}
//                       </h4>
//                       <div className="grid gap-2 pl-4">
//                         {subsection.points.map((point, pointIndex) => (
//                           <div
//                             key={pointIndex}
//                             className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
//                           >
//                             <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
//                             <p>{point}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const YouTubeSummaryPage = () => {
//   const [youtubeLink, setYoutubeLink] = useState<string>('');
//   const [summary, setSummary] = useState<VideoSummary | null>(null);
//   const [videoId, setVideoId] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
//   const playerRef = useRef<any>(null);

//   const extractVideoId = (url: string): string => {
//     if (!url) return '';
//     try {
//       if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0] || '';
//       if (url.includes('youtube.com/watch')) return new URL(url).searchParams.get('v') || '';
//       return url;
//     } catch (error) {
//       console.error('Error parsing YouTube URL:', error);
//       return '';
//     }
//   };

//   useEffect(() => {
//     setVideoId(extractVideoId(youtubeLink));
//   }, [youtubeLink]);

//   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setYoutubeLink(e.target.value);
//   };

//   const fetchTranscriptFromAssemblyAI = async (videoId: string): Promise<TranscriptItem[]> => {
//     try {
//       setLoading(true);
//       const uploadResponse = await fetch('/api/uploadToAssemblyAI', {
//         method: 'POST',
//         body: JSON.stringify({ videoId }),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!uploadResponse.ok) throw new Error('Failed to upload video to AssemblyAI');

//       const { transcriptId } = await uploadResponse.json();

//       let transcriptResponse;
//       do {
//         await new Promise(resolve => setTimeout(resolve, 5000)); // Polling every 5 sec
//         transcriptResponse = await fetch(`/api/youtubeTranscript?transcriptId=${transcriptId}`);
//       } while ((await transcriptResponse.json()).status !== "completed");

//       const transcriptData = await transcriptResponse.json();
//       setTranscript(transcriptData.transcript);
//       return transcriptData.transcript;
//     } catch (error) {
//       setError('Error fetching transcript');
//       throw new Error('Error fetching transcript');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<VideoSummary> => {
//     try {
//       const response = await fetch('/api/summarizeText', {
//         method: 'POST',
//         body: JSON.stringify({ text: transcriptText }),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error('Failed to generate summary');

//       return await response.json();
//     } catch (error) {
//       throw new Error('Failed to generate summary');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!videoId) return setError('Invalid YouTube link');

//     try {
//       const transcriptData = await fetchTranscriptFromAssemblyAI(videoId);
//       const transcriptText = transcriptData.map(item => item.text).join(' ');
//       const summaryData = await generateSummary(transcriptText);
//       setSummary(summaryData);
//     } catch (error) {
//       setError('Failed to process video');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">YouTube Video Summarizer</h1>
//       <input
//         type="text"
//         placeholder="Enter YouTube link"
//         value={youtubeLink}
//         onChange={handleLinkChange}
//         className="w-full p-2 border rounded-lg mb-4"
//       />
//       <button
//         onClick={handleSubmit}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Summarize"}
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {videoId && (
//         <YouTube videoId={videoId} onReady={(event) => (playerRef.current = event.target)} />
//       )}
//       {summary && <SummaryDisplay summary={summary} />}
//     </div>
//   );
// };

// export default YouTubeSummaryPage;


// 'use client';

// import { useState } from 'react';

// export default function Page() {
//     const [videoId, setVideoId] = useState('');
//     const [transcript, setTranscript] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const fetchTranscript = async () => {
//         setLoading(true);
//         setError('');

//         if (!videoId) {
//             setError('Please enter a YouTube video ID.');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`/api/youtubeTranscript?videoId=${videoId}`);

//             if (!response.ok) {
//                 throw new Error('Failed to fetch transcript');
//             }

//             const data = await response.json();
//             setTranscript(data.transcriptText);
//         } catch (err) {
            
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1>YouTube Transcript Extractor</h1>
//             <input
//                 type="text"
//                 placeholder="Enter YouTube Video ID"
//                 value={videoId}
//                 onChange={(e) => setVideoId(e.target.value)}
//             />
//             <button onClick={fetchTranscript} disabled={loading}>
//                 {loading ? 'Fetching...' : 'Get Transcript'}
//             </button>

//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {transcript && (
//                 <div>
//                     <h2>Transcript</h2>
//                     <p>{transcript}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
