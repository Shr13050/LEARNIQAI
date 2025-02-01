declare module 'youtube-transcript-api' {
    export interface TranscriptItem {
      text: string;
      start: number;
      duration: number;
    }
  
    class YouTubeTranscriptApi {
      static getTranscript(videoId: string): Promise<TranscriptItem[]>;
    }
  
    export default YouTubeTranscriptApi;
  }
  