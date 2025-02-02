// // app/api/youtubeTranscript/route.ts
// import { NextResponse } from 'next/server';
// import YouTubeTranscriptApi from 'youtube-transcript-api';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const videoId = searchParams.get('videoId');

//     if (!videoId) {
//       return NextResponse.json(
//         { error: 'Invalid or missing videoId' },
//         { status: 400 }
//       );
//     }

//     const transcript = await YouTubeTranscriptApi.getTranscript(videoId);
//     const transcriptText = transcript.map((item) => item.text).join(' ');

//     return NextResponse.json({ transcriptText });
//   } catch (error) {
//     console.error('Error extracting transcript:', error);
//     return NextResponse.json(
//       { error: 'Error extracting transcript' },
//       { status: 500 }
//     );
//   }
// }

// app/api/youtubeTranscript/route.ts
















// import { NextResponse } from 'next/server';
// import { YoutubeTranscript } from 'youtube-transcript';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const videoId = searchParams.get('videoId');

//     if (!videoId) {
//       return NextResponse.json(
//         { error: 'Invalid or missing videoId' },
//         { status: 400 }
//       );
//     }

//     const transcript = await YoutubeTranscript.fetchTranscript(videoId);
//     const transcriptText = transcript
//       .map((item: { text: string }) => item.text)
//       .join(' ');

//     return NextResponse.json({ transcriptText });
//   } catch (error) {
//     console.error('Error extracting transcript:', error);
//     return NextResponse.json(
//       { error: 'Error extracting transcript' },
//       { status: 500 }
//     );
//   }
// }




























 //correct code 

// // app/api/youtubeTranscript/route.ts
import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid or missing videoId' },
        { status: 400 }
      );
    }

    const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Process transcript to include timing information
    const transcript = rawTranscript.map((item: TranscriptItem) => ({
      text: item.text,
      start: item.offset / 1000, // Convert offset from ms to seconds
      duration: item.duration / 1000 // Convert duration from ms to seconds
    }));

    // Also provide the full text for the summary generation
    const transcriptText = transcript
      .map(item => item.text)
      .join(' ');

    return NextResponse.json({
      transcript,
      transcriptText,
      metadata: {
        totalDuration: transcript.reduce((acc, item) => acc + item.duration, 0),
        segmentCount: transcript.length
      }
    });
  } catch (error) {
    console.error('Error extracting transcript:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error extracting transcript';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}



// import { NextResponse } from 'next/server';
// import { YoutubeTranscript } from 'youtube-transcript';

// interface TranscriptItem {
//   text: string;
//   duration: number;
//   offset: number;
// }

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const videoId = searchParams.get('videoId');

//     if (!videoId) {
//       return NextResponse.json(
//         { error: 'Invalid or missing videoId' },
//         { status: 400 }
//       );
//     }

//     // Add more detailed error handling and validation
//     const isValidVideoId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);
//     if (!isValidVideoId) {
//       return NextResponse.json(
//         { error: 'Invalid video ID format' },
//         { status: 400 }
//       );
//     }

//     try {
//       const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId, {
//         lang: 'en', // Specify language preference
//       });

//       if (!rawTranscript || rawTranscript.length === 0) {
//         return NextResponse.json(
//           { 
//             error: 'No transcript available',
//             details: 'The video might not have captions enabled or they might be disabled for this region.'
//           },
//           { status: 404 }
//         );
//       }

//       // Process transcript to include timing information
//       const transcript = rawTranscript.map((item: TranscriptItem) => ({
//         text: item.text,
//         start: Math.round(item.offset / 1000), // Round to nearest second
//         duration: Math.round(item.duration / 1000)
//       }));

//       // Also provide the full text for the summary generation
//       const transcriptText = transcript
//         .map(item => item.text)
//         .join(' ')
//         .replace(/\s+/g, ' ') // Normalize whitespace
//         .trim();

//       if (!transcriptText) {
//         return NextResponse.json(
//           { error: 'Empty transcript content' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         transcript,
//         transcriptText,
//         metadata: {
//           totalDuration: transcript.reduce((acc, item) => acc + item.duration, 0),
//           segmentCount: transcript.length,
//           languageCode: 'en'
//         }
//       });
//     } catch (transcriptError) {
//       // Handle specific YouTube transcript errors
//       const errorMessage = transcriptError instanceof Error ? transcriptError.message : 'Unknown error';
      
//       if (errorMessage.includes('disabled')) {
//         return NextResponse.json(
//           { 
//             error: 'Transcript disabled',
//             details: 'Captions/transcripts are disabled for this video'
//           },
//           { status: 403 }
//         );
//       }

//       if (errorMessage.includes('not found')) {
//         return NextResponse.json(
//           { 
//             error: 'Video not found',
//             details: 'The specified video could not be found or is private'
//           },
//           { status: 404 }
//         );
//       }

//       throw transcriptError; // Re-throw for general error handling
//     }
//   } catch (error) {
//     console.error('Error extracting transcript:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
//     return NextResponse.json(
//       { 
//         error: 'Failed to extract transcript',
//         details: errorMessage,
//         stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// import { google } from 'googleapis';

// const youtube = google.youtube('v3');

// export async function getYouTubeCaptions(videoId: string) {
//   try {
//     // Make sure the API key is set correctly in your environment
//     const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    
//     if (!apiKey) {
//       throw new Error('API key not found. Please check your environment variables.');
//     }

//     // Fetch captions using the YouTube API
//     const response = await youtube.captions.list({
//       part: ['snippet'],
//       videoId: videoId,
//       key: apiKey,
//     });

//     // Check if captions are found and return them
//     if (response.data.items && response.data.items.length > 0) {
//       return response.data.items;
//     } else {
//       throw new Error('No captions found for this video.');
//     }
//   } catch (error) {
//     console.error('Error fetching captions:', error);
//     throw new Error('Failed to fetch captions');
//   }
// }









// // pages/api/youtubeTranscript.ts
// import { google } from 'googleapis';
// import axios from 'axios';

// const youtube = google.youtube('v3');

// async function getCaptionId(videoId: string, apiKey: string) {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`
//     );

//     const captions = response.data.items;
//     if (!captions || captions.length === 0) {
//       throw new Error('No captions found');
//     }

//     // Prefer English captions if available
//     const englishCaption = captions.find(
//       (caption: any) => caption.snippet.language === 'en'
//     );
//     return englishCaption ? englishCaption.id : captions[0].id;
//   } catch (error) {
//     console.error('Error fetching caption ID:', error);
//     throw error;
//   }
// }

// async function getCaptionText(videoId: string) {
//   try {
//     const apiKey = process.env.YOUTUBE_API_KEY;
//     if (!apiKey) {
//       throw new Error('YouTube API key not found');
//     }

//     // First try to get captions through the Data API
//     const captionId = await getCaptionId(videoId, apiKey);

//     // Get video details to include title and metadata
//     const videoResponse = await axios.get(
//       `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
//     );

//     const videoDetails = videoResponse.data.items[0].snippet;

//     // Fetch the actual transcript using a third-party service
//     // Note: Using multiple fallback methods
//     const transcriptResponse = await axios.get(
//       `https://youtubetranscript.com/?v=${videoId}`
//     );

//     // Parse the response and convert to our desired format
//     const rawTranscript = transcriptResponse.data;
//     const parsedTranscript = rawTranscript.map((item: any, index: number) => ({
//       text: item.text,
//       start: item.start || index * 2, // Fallback timing if not provided
//       duration: item.duration || 2
//     }));

//     return {
//       transcript: parsedTranscript,
//       videoDetails: {
//         title: videoDetails.title,
//         description: videoDetails.description,
//         channelTitle: videoDetails.channelTitle,
//         publishedAt: videoDetails.publishedAt
//       }
//     };
//   } catch (error) {
//     console.error('Error fetching captions:', error);
//     throw error;
//   }
// }

// export default async function handler(req: any, res: any) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { videoId } = req.query;

//   if (!videoId) {
//     return res.status(400).json({ error: 'Video ID is required' });
//   }

//   try {
//     const data = await getCaptionText(videoId);
//     res.status(200).json(data);
//   } catch (error: any) {
//     res.status(500).json({
//       error: 'Failed to fetch transcript',
//       details: error.message
//     });
//   }
// }