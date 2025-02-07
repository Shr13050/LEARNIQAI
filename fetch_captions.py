# from youtube_transcript_api import YouTubeTranscriptApi
# import sys
# import json

# def get_transcript(video_id):
#     try:
#         transcript = YouTubeTranscriptApi.get_transcript(video_id)
#         return json.dumps(transcript, indent=4)
#     except Exception as e:
#         return json.dumps({"error": str(e)})

# if __name__ == "__main__":
#     video_id = sys.argv[1]  # Command-line argument se video ID lega
#     print(get_transcript(video_id))


from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
import sys
import json

def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return json.dumps({
            "transcript": transcript,
            "metadata": {
                "videoId": video_id,
                "totalSegments": len(transcript),
                "trackKind": "standard"  # You might want to dynamically determine this
            }
        })
    except TranscriptsDisabled:
        return json.dumps({
            "error": "Transcripts are disabled for this video.",
            "transcript": [],
            "metadata": {}
        })
    except Exception as e:
        return json.dumps({
            "error": str(e),
            "transcript": [],
            "metadata": {}
        })

if __name__ == "__main__":
    video_id = sys.argv[1]
    print(get_transcript(video_id))
