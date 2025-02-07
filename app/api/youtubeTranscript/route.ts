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




























//  //correct code 

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
