"use client";
import { useState, useEffect, useRef } from 'react';
import { chatSession } from '@/utils/AiModel';
import YouTube from 'react-youtube';
import TextToSpeech from "@/components/TextToSpeech";

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
