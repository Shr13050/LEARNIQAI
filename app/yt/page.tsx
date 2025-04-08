"use client";
import { useState, useEffect, useRef } from 'react';
import { chatSession } from '@/utils/AiModel';
import YouTube from 'react-youtube';
import TextToSpeech from "@/components/TextToSpeech";
import { LampDemo } from '@/components/ui/lamp';

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

interface TranscriptResponse {
  transcript: TranscriptItem[];
  metadata: {
    videoId: string;
    captionId: string;
    totalSegments: number;
    trackKind: string;
  };
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

// SummaryDisplay component remains unchanged
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
  const [transcriptMetadata, setTranscriptMetadata] = useState<TranscriptResponse['metadata'] | null>(null);

  const playerRef = useRef<any>(null);

  // extractVideoId function remains unchanged
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


  // Metadata fetch effect remains unchanged
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

  // VideoId effect remains unchanged
  useEffect(() => {
    const id = extractVideoId(youtubeLink);
    setVideoId(id);
  }, [youtubeLink]);

  // Event handlers remain unchanged
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

  // Updated transcript extraction function
  const extractTranscriptDetails = async (url: string): Promise<TranscriptItem[]> => {
    try {
        const videoId = extractVideoId(url);
        if (!videoId) throw new Error('Invalid YouTube URL');

        const response = await fetch(`/api/getTranscript?videoId=${videoId}`);
        const data = await response.json();

        console.log('Full transcript response:', data);  // Add this line for debugging

        if (!response.ok || data.error) {
            throw new Error(data.error || 'Failed to fetch transcript');
        }

        return data.transcript;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
        console.error('Transcript extraction error:', errorMessage);
        throw new Error(errorMessage);
    }
};



  // generateSummary function remains unchanged
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


  // handleChatSubmit function with improved context
  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;

    const newMessage = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, newMessage]);
    
    try {
      const contextPrompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
      Video Context:
      Title: ${metadata?.title || 'Unknown'}
      Channel: ${metadata?.channelTitle || 'Unknown'}
      Caption Type: ${transcriptMetadata?.trackKind || 'Unknown'}
      
      Transcript Content:
      ${transcript.map(t => t.text).join(' ')}`;

      const response = await chatSession.sendMessage(contextPrompt);
      const answerText = await response.response.text();
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: answerText }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error while processing your question.' 
      }]);
    }
    
    setChatMessage('');
  };

  // handleSubmit function remains unchanged
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

  // Render function
  return (
    <div className="max-w-6xl mx-auto p-8">
      <LampDemo/>
      <h1 className="text-4xl font-semibold text-center mb-6">
        YouTube Video Analysis & Summary
      </h1>
      
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter YouTube Video Link"
          value={youtubeLink}
          onChange={handleLinkChange}
        />
      </div>

      {videoId && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative pt-[56.25%] w-full">
              <YouTube
                videoId={videoId}
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    autoplay: 0,
                  }
                }}
                onReady={handlePlayerReady}
                onStateChange={handlePlayerStateChange}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            
            {metadata && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold">{metadata.title}</h2>
                <p className="text-gray-600">{metadata.channelTitle}</p>
                <p className="text-sm text-gray-500">
                  Published: {new Date(metadata.publishedAt).toLocaleDateString()}
                </p>
                {transcriptMetadata && (
                  <p className="text-sm text-gray-500">
                    Caption Type: {transcriptMetadata.trackKind}
                  </p>
                )}
                <p className="mt-2 line-clamp-3 hover:line-clamp-none">
                  {metadata.description}
                </p>
              </div>
            )}
          </div>

          {transcript.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Transcript Timeline</h3>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {transcript.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded cursor-pointer hover:bg-blue-50 ${
                      currentTime >= item.start && currentTime < item.start + item.duration
                        ? 'bg-blue-100'
                        : 'bg-gray-50'
                    }`}
                    onClick={() => handleTimeClick(item.start)}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {Math.floor(item.start / 60)}:{(item.start % 60).toString().padStart(2, '0')}
                    </span>
                    <p className="ml-2 text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`w-full p-3 bg-blue-500 text-white rounded-lg mt-4 ${
          loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
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

      {transcript.length > 0 && (
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
      )}
    </div>
  );
};

export default YouTubeSummaryPage;


// import { useState, useEffect, useRef } from 'react';
// import { chatSession } from '@/utils/AiModel';
// import YouTube from 'react-youtube';
// import TextToSpeech from "@/components/TextToSpeech";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Search, Send, VideoIcon, Calendar, User, MessageSquare, ChevronRight, FileText, PlayCircle } from "lucide-react";
// // Added Badge Component with proper TypeScript types
// interface BadgeProps {
//   children: React.ReactNode;
//   variant?: "default" | "outline";
//   className?: string;
// }

// const Badge: React.FC<BadgeProps> = ({ 
//   children, 
//   variant = "default", 
//   className = "" 
// }) => {
//   const variantClasses: Record<string, string> = {
//     default: "bg-indigo-100 text-indigo-800",
//     outline: "bg-transparent border border-gray-200 text-gray-800",
//   };
  
//   return (
//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
//       {children}
//     </span>
//   );
// };

// // Added Separator Component with proper TypeScript types
// interface SeparatorProps {
//   className?: string;
// }

// const Separator: React.FC<SeparatorProps> = ({ className = "" }) => {
//   return <div className={`h-px bg-gray-200 ${className}`} />;
// };

// // Added ScrollArea Component with proper TypeScript types
// interface ScrollAreaProps {
//   children: React.ReactNode;
//   className?: string;
//   [x: string]: any; // For rest props
// }

// const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = "", ...props }) => {
//   return (
//     <div className={`overflow-auto ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

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

// interface TranscriptResponse {
//   transcript: TranscriptItem[];
//   metadata: {
//     videoId: string;
//     captionId: string;
//     totalSegments: number;
//     trackKind: string;
//   };
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
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">{summary.title}</h1>
      
//       <div className="space-y-8">
//         {summary.sections.map((section, index) => (
//           <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
//             <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
//               <CardTitle className="text-xl font-semibold flex items-center">
//                 <FileText className="mr-2 h-5 w-5" />
//                 {section.title}
//               </CardTitle>
//             </CardHeader>
            
//             <CardContent className="p-6 bg-white">
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
//                     <ChevronRight className="mr-1 h-5 w-5 text-indigo-500" />
//                     Key Points
//                   </h3>
//                   <div className="grid gap-3">
//                     {section.key_points.map((point, pointIndex) => (
//                       <div
//                         key={pointIndex}
//                         className="flex items-start gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:translate-x-1"
//                       >
//                         <span className="text-indigo-500 mt-1 flex-shrink-0">
//                           <ChevronRight className="h-5 w-5" />
//                         </span>
//                         <p className="text-gray-700">{point}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {section.subsections && section.subsections.length > 0 && (
//                   <div className="space-y-6 mt-6">
//                     <Separator className="my-4 bg-indigo-100" />
//                     {section.subsections.map((subsection, subIndex) => (
//                       <div key={subIndex} className="space-y-3">
//                         <h4 className="text-lg font-medium text-gray-800 border-l-4 border-purple-500 pl-3">
//                           {subsection.subtitle}
//                         </h4>
//                         <div className="grid gap-3 pl-4">
//                           {subsection.points.map((point, pointIndex) => (
//                             <div
//                               key={pointIndex}
//                               className="flex items-center gap-3 text-gray-700 pl-2 transition-all duration-200 hover:text-indigo-700"
//                             >
//                               <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
//                               <p>{point}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
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
//   const [transcriptMetadata, setTranscriptMetadata] = useState<TranscriptResponse['metadata'] | null>(null);
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

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
//         const videoId = extractVideoId(url);
//         if (!videoId) throw new Error('Invalid YouTube URL');

//         const response = await fetch(`/api/getTranscript?videoId=${videoId}`);
//         const data = await response.json();

//         console.log('Full transcript response:', data);

//         if (!response.ok || data.error) {
//             throw new Error(data.error || 'Failed to fetch transcript');
//         }
        
//         setTranscript(data.transcript);
//         setTranscriptMetadata(data.metadata);
        
//         return data.transcript;
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'Failed to extract transcript';
//         console.error('Transcript extraction error:', errorMessage);
//         throw new Error(errorMessage);
//     }
//   };

//   const generateSummary = async (transcriptText: string): Promise<VideoSummary> => {
//     try {
//       setIsProcessing(true);
//       const prompt = `Analyze the following video transcript and provide a detailed summary in JSON format. The response should be properly formatted JSON following this structure:
//       {
//         "title": "Main title of the video content",
//         "sections": [
//           {
//             "title": "Section title",
//             "key_points": ["Important point 1", "Important point 2"],
//             "subsections": [
//               {
//                 "subtitle": "Subsection title",
//                 "points": ["Detailed point 1", "Detailed point 2"]
//               }
//             ]
//           }
//         ]
//       }

//       Make sure to:
//       1. Include 3-5 main sections
//       2. Each section should have 2-4 key points
//       3. Include relevant subsections where appropriate
//       4. Keep points concise but informative
//       5. Ensure the JSON is properly formatted and valid

//       Transcript for analysis:
//       ${transcriptText}`;

    
//       const response = await chatSession.sendMessage(prompt);
//       const summaryText = await response.response.text();
      
//       console.log("Received summary text:", summaryText);

//       // Remove unwanted characters like markdown code blocks
//       const cleanedSummaryText = summaryText.replace(/```json|```/g, "").trim();

//       try {
//         return JSON.parse(cleanedSummaryText) as VideoSummary;
//       } catch (parseError) {
//         console.error('Error parsing summary JSON:', parseError);
//         throw new Error('Failed to parse summary response');
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';
//       throw new Error(errorMessage);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleChatSubmit = async () => {
//     if (!chatMessage.trim()) return;

//     const newMessage = { role: 'user', content: chatMessage };
//     setChatHistory(prev => [...prev, newMessage]);
    
//     try {
//       const contextPrompt = `Based on the video transcript and summary, please answer this question: ${chatMessage}
      
//       Video Context:
//       Title: ${metadata?.title || 'Unknown'}
//       Channel: ${metadata?.channelTitle || 'Unknown'}
//       Caption Type: ${transcriptMetadata?.trackKind || 'Unknown'}
      
//       Transcript Content:
//       ${transcript.map(t => t.text).join(' ')}`;

//       const response = await chatSession.sendMessage(contextPrompt);
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
//       setSummary(null);

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
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
//         {/* Enhanced Header Section */}
//         <div className="text-center space-y-4">
//           <div className="inline-block p-2 bg-indigo-50 rounded-full mb-2">
//             <VideoIcon className="h-8 w-8 text-indigo-500" />
//           </div>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Video Insight Craft
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Transform any YouTube video into comprehensive insights, summaries, and interactive Q&A
//           </p>
//           <div className="flex justify-center gap-2 pt-2">
//             <Badge variant="default" className="bg-indigo-100 text-indigo-800">AI-Powered Analysis</Badge>
//             <Badge variant="default" className="bg-purple-100 text-purple-800">Interactive Summary</Badge>
//             <Badge variant="default" className="bg-blue-100 text-blue-800">Video Q&A</Badge>
//           </div>
//         </div>
        
//         {/* Enhanced URL Input */}
//         <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative flex-grow">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="text"
//                   className="pl-10 pr-4 py-6 border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-full"
//                   placeholder="Paste YouTube video URL or ID here..."
//                   value={youtubeLink}
//                   onChange={handleLinkChange}
//                 />
//               </div>
//               <Button 
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`py-6 px-8 ${loading ? 'bg-indigo-300' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'} text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex-shrink-0`}
//               >
//                 {loading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Analyzing...</span>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <VideoIcon className="h-5 w-5" />
//                     <span>Analyze Video</span>
//                   </div>
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {error && (
//           <Card className="border-none border-l-4 border-l-red-500 bg-red-50 shadow-md">
//             <CardContent className="p-4 flex items-center gap-3">
//               <div className="p-2 rounded-full bg-red-100">
//                 <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <p className="text-red-600 font-medium">{error}</p>
//             </CardContent>
//           </Card>
//         )}

//         {loading && !error && (
//           <Card className="border-none shadow-lg bg-white">
//             <CardContent className="p-8">
//               <div className="flex flex-col items-center justify-center space-y-4">
//                 <div className="relative">
//                   <div className="h-16 w-16 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin"></div>
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500">
//                     <VideoIcon className="h-6 w-6" />
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-medium text-gray-800">Processing Video</h3>
//                 <div className="w-full max-w-md bg-gray-100 rounded-full h-2.5">
//                   <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full animate-pulse"></div>
//                 </div>
//                 <p className="text-gray-600 text-center max-w-md">
//                   {isProcessing ? 'Analyzing content and generating insights...' : 'Fetching video transcript and metadata...'}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {videoId && !loading && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card className="border-none shadow-lg overflow-hidden bg-white">
//               <CardContent className="p-0">
//                 <div className="relative pt-[56.25%] w-full">
//                   <YouTube
//                     videoId={videoId}
//                     opts={{
//                       height: '100%',
//                       width: '100%',
//                       playerVars: {
//                         autoplay: 0,
//                       }
//                     }}
//                     onReady={handlePlayerReady}
//                     onStateChange={handlePlayerStateChange}
//                     className="absolute top-0 left-0 w-full h-full"
//                   />
//                 </div>
                
//                 {metadata && (
//                   <div className="p-5 space-y-3">
//                     <h2 className="text-xl font-semibold line-clamp-2">{metadata.title}</h2>
//                     <div className="flex flex-wrap gap-2">
//                       <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50">
//                         <User className="h-3 w-3" />
//                         {metadata.channelTitle}
//                       </Badge>
//                       <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50">
//                         <Calendar className="h-3 w-3" />
//                         {new Date(metadata.publishedAt).toLocaleDateString()}
//                       </Badge>
//                       {transcriptMetadata && (
//                         <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50">
//                           <FileText className="h-3 w-3" />
//                           {transcriptMetadata.trackKind} captions
//                         </Badge>
//                       )}
//                     </div>
                    
//                     <Separator className="my-3" />
                    
//                     <div className="text-sm text-gray-600 line-clamp-3 hover:line-clamp-none transition-all duration-300">
//                       {metadata.description}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {transcript.length > 0 && (
//               <Card className="border-none shadow-lg bg-white">
//                 <CardHeader className="pb-0 pt-5">
//                   <CardTitle className="text-xl font-semibold flex items-center gap-2">
//                     <FileText className="h-5 w-5 text-indigo-500" />
//                     Transcript Timeline
//                   </CardTitle>
//                   <CardDescription>
//                     Click on any segment to jump to that timestamp in the video
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-5">
//                   <ScrollArea className="h-[400px] pr-4">
//                     <div className="space-y-2">
//                       {transcript.map((item, index) => (
//                         <div
//                           key={index}
//                           className={`p-3 rounded-lg flex gap-3 cursor-pointer transition-all duration-200 hover:bg-indigo-50 border border-transparent ${
//                             currentTime >= item.start && currentTime < item.start + item.duration
//                               ? 'bg-indigo-100 border-indigo-200'
//                               : 'bg-gray-50'
//                           }`}
//                           onClick={() => handleTimeClick(item.start)}
//                         >
//                           <div className="flex-shrink-0 flex items-center">
//                             <Badge variant="outline" className="bg-white border-indigo-200 flex items-center gap-1">
//                               <PlayCircle className="h-3 w-3 text-indigo-500" />
//                               {formatTime(item.start)}
//                             </Badge>
//                           </div>
//                           <p className="text-gray-700 text-sm">{item.text}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </ScrollArea>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         )}

//         {summary && (
//           <Card className="border-none shadow-lg bg-white">
//             <CardHeader className="pb-0 pt-6 bg-gradient-to-r from-indigo-50 to-purple-50">
//               <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                 <FileText className="h-6 w-6 text-indigo-500" />
//                 Video Analysis & Summary
//               </CardTitle>
//               <CardDescription>
//                 AI-generated comprehensive breakdown of key points and insights
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-6">
//               <SummaryDisplay summary={summary} />
//             </CardContent>
//           </Card>
//         )}

//         {transcript.length > 0 && (
//           <Card className="border-none shadow-lg bg-white">
//             <CardHeader className="pb-0 pt-6 bg-gradient-to-r from-indigo-50 to-purple-50">
//               <CardTitle className="text-2xl font-bold flex items-center gap-2">
//                 <MessageSquare className="h-6 w-6 text-indigo-500" />
//                 Ask Questions About This Video
//               </CardTitle>
//               <CardDescription>
//                 Get AI answers based on the video content and context
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-6">
//               <ScrollArea className="h-[300px] pr-4 mb-4">
//                 <div className="space-y-4">
//                   {chatHistory.length > 0 ? (
//                     chatHistory.map((msg, index) => (
//                       <div
//                         key={index}
//                         className={`p-4 rounded-lg max-w-[85%] ${
//                           msg.role === 'user' ? 
//                           'bg-indigo-100 ml-auto text-gray-800' : 
//                           'bg-gray-100 text-gray-800'
//                         }`}
//                       >
//                         <p className="text-xs font-medium mb-1 text-gray-500">
//                           {msg.role === 'user' ? 'You' : 'AI Assistant'}
//                         </p>
//                         {msg.content}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-8 text-gray-500">
//                       <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
//                       <p>Ask questions about the video content to get AI-powered insights</p>
//                     </div>
//                   )}
//                 </div>
//               </ScrollArea>
              
//               <div className="flex gap-2 mt-3">
//                 <Input
//                   type="text"
//                   className="flex-1 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Ask a question about the video..."
//                   value={chatMessage}
//                   onChange={(e) => setChatMessage(e.target.value)}
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       handleChatSubmit();
//                     }
//                   }}
//                 />
//                 <Button
//                   onClick={handleChatSubmit}
//                   disabled={!chatMessage.trim()}
//                   className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 transition-colors"
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}
        
//         {/* Added Footer Section */}
//         <footer className="text-center text-gray-500 text-sm py-8">
//           <p>Video Insight Craft — AI-powered video analysis tool</p>
//           <div className="flex justify-center gap-2 mt-2">
//             <Badge variant="outline" className="bg-transparent">Privacy First</Badge>
//             <Badge variant="outline" className="bg-transparent">Fast Analysis</Badge>
//             <Badge variant="outline" className="bg-transparent">Interactive Learning</Badge>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default YouTubeSummaryPage;