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



























import { NextResponse } from 'next/server';
import { getSubtitles } from 'youtube-captions-scraper';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid or missing videoId' },
        { status: 400 }
      );
    }

    // Fetch subtitles using youtube-captions-scraper
    const subtitles = await getSubtitles({
      videoID: videoId,
      lang: 'en' // Default language is English
    });
    

    // Process transcript to include start time and duration
    const transcript = subtitles.map(sub => ({
      text: sub.text,
      start: sub.start, // Already in seconds
      duration: sub.dur // Already in seconds
    }));

    // Generate full transcript text
    const transcriptText = transcript.map(item => item.text).join(' ');

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

 //correct code 

// app/api/youtubeTranscript/route.ts
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

//     const rawTranscript = await YoutubeTranscript.fetchTranscript(videoId);
    
//     // Process transcript to include timing information
//     const transcript = rawTranscript.map((item: TranscriptItem) => ({
//       text: item.text,
//       start: item.offset / 1000, // Convert offset from ms to seconds
//       duration: item.duration / 1000 // Convert duration from ms to seconds
//     }));

//     // Also provide the full text for the summary generation
//     const transcriptText = transcript
//       .map(item => item.text)
//       .join(' ');

//     return NextResponse.json({
//       transcript,
//       transcriptText,
//       metadata: {
//         totalDuration: transcript.reduce((acc, item) => acc + item.duration, 0),
//         segmentCount: transcript.length
//       }
//     });
//   } catch (error) {
//     console.error('Error extracting transcript:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Error extracting transcript';
    
//     return NextResponse.json(
//       { 
//         error: errorMessage,
//         details: error instanceof Error ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }




// // For this example you need the node-fetch npm package: `npm i node-fetch`
// export const runtime = 'nodejs';

// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const videoId = searchParams.get('videoId');
//   if (!videoId) {
//     return NextResponse.json({ error: 'Invalid or missing videoId' }, { status: 400 });
//   }
//   try {
//     // Launch Puppeteer with no-sandbox for deployment environments like Vercel
//     const browser = await puppeteer.launch({
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });
//     const page = await browser.newPage();
    
//     const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//     await page.goto(videoUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
//     // Depending on YouTube's UI, you may need to click the "..." button to open the transcript.
//     // For example:
//     // await page.click('button[aria-label="More actions"]');
//     // await page.waitForSelector('ytd-menu-service-item-renderer');
//     // await page.click('ytd-menu-service-item-renderer:nth-child(3)'); // Assuming transcript is the 3rd option

//     // Wait for the transcript container to load (you may need to adjust the selector)
//     await page.waitForSelector('ytd-transcript-renderer', { timeout: 15000 });
    
//     // Extract transcript data from the page.
//     // The actual selectors may change if YouTube updates their layout.
//     const transcript = await page.evaluate(() => {
//       // This example assumes transcript segments are rendered as <ytd-transcript-segment-renderer> elements.
//       const segments = document.querySelectorAll('ytd-transcript-segment-renderer');
//       return Array.from(segments).map(segment => {
//         // Adjust the selectors based on the page structure.
//         const textEl = segment.querySelector('#segment-text');
//         const timeEl = segment.querySelector('#segment-start-time');
//         return {
//           text: textEl ? textEl.innerText : '',
//           // You might later parse the time strings into seconds if needed.
//           start: timeEl ? timeEl.innerText : ''
//         };
//       });
//     });
    
//     await browser.close();
    
//     return NextResponse.json({
//       transcript,
//       metadata: { segmentCount: transcript.length }
//     });
//   } catch (error) {
//     console.error('Error scraping transcript:', error);
//     return NextResponse.json(
//       { error: error.message, details: error.stack },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';

// const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// interface CaptionTrack {
//   id: string;
//   snippet: {
//     language: string;
//     trackKind: string;
//   };
// }

// interface TranscriptSegment {
//   text: string;
//   start: number;
//   duration: number;
// }

// async function fetchCaptionTracks(videoId: string): Promise<CaptionTrack[]> {
//   const response = await fetch(
//     `${BASE_URL}/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
//   );
  
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error?.message || 'Failed to fetch captions');
//   }
  
//   const data = await response.json();
//   return data.items || [];
// }

// async function downloadTranscript(captionId: string): Promise<string> {
//   const response = await fetch(
//     `${BASE_URL}/captions/${captionId}?tfmt=sbv&key=${YOUTUBE_API_KEY}`
//   );
  
//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error?.message || 'Failed to download transcript');
//   }
  
//   return response.text();
// }

// function parseTimestamp(timestamp: string): number {
//   const [hours, minutes, seconds] = timestamp.split(':').map(Number);
//   return hours * 3600 + minutes * 60 + seconds;
// }

// function parseSBVTranscript(sbvContent: string): TranscriptSegment[] {
//   const lines = sbvContent.trim().split('\n');
//   const segments: TranscriptSegment[] = [];
  
//   for (let i = 0; i < lines.length; i += 3) {
//     if (i + 2 >= lines.length) break;
    
//     const timeLine = lines[i + 1];
//     const text = lines[i + 2];
    
//     // Parse time range (format: HH:MM:SS.mmm,HH:MM:SS.mmm)
//     const [startTime, endTime] = timeLine.split(',').map(time => {
//       const timestamp = time.split('.')[0]; // Remove milliseconds
//       return parseTimestamp(timestamp);
//     });
    
//     segments.push({
//       text: text.trim(),
//       start: startTime,
//       duration: endTime - startTime
//     });
//   }
  
//   return segments;
// }

// export async function GET(request: Request) {
//   try {
//     // Extract videoId from query parameters
//     const { searchParams } = new URL(request.url);
//     const videoId = searchParams.get('videoId');

//     if (!videoId) {
//       return NextResponse.json(
//         { error: 'Missing videoId parameter' },
//         { status: 400 }
//       );
//     }

//     if (!YOUTUBE_API_KEY) {
//       return NextResponse.json(
//         { error: 'YouTube API key not configured' },
//         { status: 500 }
//       );
//     }

//     // 1. Fetch available caption tracks
//     const captionTracks = await fetchCaptionTracks(videoId);
    
//     // 2. Find English caption track (prefer manual over ASR)
//     const englishTrack = captionTracks.find(
//       track => track.snippet.language === 'en' && track.snippet.trackKind !== 'ASR'
//     ) || captionTracks.find(
//       track => track.snippet.language === 'en'
//     );

//     if (!englishTrack) {
//       return NextResponse.json(
//         { error: 'No English captions found' },
//         { status: 404 }
//       );
//     }

//     // 3. Download and parse the transcript
//     const rawTranscript = await downloadTranscript(englishTrack.id);
//     const transcript = parseSBVTranscript(rawTranscript);

//     // 4. Return formatted response
//     return NextResponse.json({
//       transcript,
//       metadata: {
//         videoId,
//         captionId: englishTrack.id,
//         totalSegments: transcript.length,
//         trackKind: englishTrack.snippet.trackKind
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching transcript:', error);
    
//     if (error instanceof Error) {
//       // Handle specific API errors
//       if (error.message.includes('quotaExceeded')) {
//         return NextResponse.json(
//           { error: 'YouTube API quota exceeded' },
//           { status: 429 }
//         );
//       }
      
//       return NextResponse.json(
//         { error: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }