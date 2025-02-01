// app/api/videoMetadata/route.ts
import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

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

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch video metadata');
    }

    const data = await response.json();
    
    if (!data.items?.[0]) {
      throw new Error('Video not found');
    }

    const { snippet } = data.items[0];
    
    return NextResponse.json({
      title: snippet.title,
      description: snippet.description,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
    });
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return NextResponse.json(
      { error: 'Error fetching video metadata' },
      { status: 500 }
    );
  }
}