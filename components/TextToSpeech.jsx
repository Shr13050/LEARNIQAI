// "use client";
// import { useState } from "react";

// const TextToSpeech = ({ text }) => {
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const speakText = () => {
//     if ("speechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       speech.lang = "en-GB"; // Set language to UK English
//       speech.rate = 1; // Adjust speed
//       speech.volume = 1; // Adjust volume
//       setIsSpeaking(true);

//       speech.onend = () => setIsSpeaking(false);
//       window.speechSynthesis.speak(speech);
//     } else {
//       console.error("Text-to-Speech is not supported in this browser.");
//     }
//   };

//   return (
//     <button
//       onClick={speakText}
//       disabled={isSpeaking}
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//     >
//       {isSpeaking ? "Speaking..." : "Play Audio"}
//     </button>
//   );
// };

// export default TextToSpeech;

// "use client";
// import { useState, useEffect } from "react";

// const TextToSpeech = ({ text }) => {
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   useEffect(() => {
//     // Check if ResponsiveVoice is loaded
//     if (!window.responsiveVoice) {
//       const script = document.createElement("script");
//       script.src = "https://code.responsivevoice.org/responsivevoice.js?key=jZHlCG0m";
//       script.async = true;
//       document.body.appendChild(script);

//       return () => {
//         if (document.body.contains(script)) {
//           document.body.removeChild(script);
//         }
//       };
//     }
//   }, []);

//   const speakText = () => {
//     if (window.responsiveVoice) {
//       setIsSpeaking(true);
      
//       window.responsiveVoice.speak(text, "UK English Female", {
//         pitch: 1,
//         rate: 1,
//         volume: 1,
//         onend: () => setIsSpeaking(false),
//         onerror: (error) => {
//           console.error("Speech error:", error);
//           setIsSpeaking(false);
//         }
//       });
//     } else {
//       console.error("ResponsiveVoice is not loaded yet");
//     }
//   };

//   const stopSpeaking = () => {
//     if (window.responsiveVoice && isSpeaking) {
//       window.responsiveVoice.cancel();
//       setIsSpeaking(false);
//     }
//   };

//   return (
//     <button
//       onClick={isSpeaking ? stopSpeaking : speakText}
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//       disabled={!window.responsiveVoice}
//     >
//       {isSpeaking ? "Stop Speaking" : "Play Audio"}
//     </button>
//   );
// };

// export default TextToSpeech;

// "use client";
// import { useState } from "react";
// import { useVoice } from "@/components/VoiceContext";

// const TextToSpeech = ({ text }) => {
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const { isVoiceReady } = useVoice();

//   const speakText = () => {
//     if (window.responsiveVoice && isVoiceReady) {
//       setIsSpeaking(true);
      
//       window.responsiveVoice.speak(text, "UK English Female", {
//         pitch: 1,
//         rate: 1,
//         volume: 1,
//         onend: () => setIsSpeaking(false),
//         onerror: (error) => {
//           console.error("Speech error:", error);
//           setIsSpeaking(false);
//         }
//       });
//     }
//   };

//   const stopSpeaking = () => {
//     if (window.responsiveVoice && isSpeaking) {
//       window.responsiveVoice.cancel();
//       setIsSpeaking(false);
//     }
//   };

//   return (
//     <button
//       onClick={isSpeaking ? stopSpeaking : speakText}
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//       disabled={!isVoiceReady}
//     >
//       {!isVoiceReady ? "Loading Voice..." : isSpeaking ? "Stop Speaking" : "Play Audio"}
//     </button>
//   );
// };

// export default TextToSpeech;

// components/TextToSpeech.tsx
"use client";
import { useState, useEffect } from "react";



const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Cleanup on unmount or text change
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text]);

  // const speakText = () => {
  //   if ("speechSynthesis" in window) {
  //     // Cancel any ongoing speech
  //     window.speechSynthesis.cancel();

  //     const speech = new SpeechSynthesisUtterance(text);
  //     speech.lang = "en-GB";
  //     speech.rate = 1;
  //     speech.pitch = 1;
  //     speech.volume = 1;

  //     speech.onstart = () => {
  //       setIsSpeaking(true);
  //       setIsPaused(false);
  //     };

  //     speech.onend = () => {
  //       setIsSpeaking(false);
  //       setIsPaused(false);
  //     };

  //     speech.onerror = (event) => {
  //       console.error("Speech error:", event);
  //       setIsSpeaking(false);
  //       setIsPaused(false);
  //     };

  //     window.speechSynthesis.speak(speech);
  //   } else {
  //     console.error("Text-to-Speech is not supported in this browser.");
  //     alert("Text-to-Speech is not supported in your browser.");
  //   }
  // };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
  
      const maxChunkLength = 200; // Split text into 200-character chunks
      const textChunks = text.match(new RegExp(`.{1,${maxChunkLength}}`, "g")) || [];
  
      let index = 0;
      const speakNextChunk = () => {
        if (index < textChunks.length) {
          const speech = new SpeechSynthesisUtterance(textChunks[index]);
          speech.lang = "en-GB";
          speech.rate = 1;
          speech.pitch = 1;
          speech.volume = 1;
  
          speech.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
          };
  
          speech.onend = () => {
            index++;
            if (index < textChunks.length) {
              speakNextChunk(); // Speak the next chunk
            } else {
              setIsSpeaking(false);
              setIsPaused(false);
            }
          };
  
          speech.onerror = (event) => {
            console.error("Speech error:", event);
            setIsSpeaking(false);
            setIsPaused(false);
          };
  
          window.speechSynthesis.speak(speech);
        }
      };
  
      speakNextChunk();
    } else {
      console.error("Text-to-Speech is not supported in this browser.");
      alert("Text-to-Speech is not supported in your browser.");
    }
  };
  

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const pauseSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  return (
    <div className="space-x-2">
      {!isSpeaking ? (
        <button
          onClick={speakText}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!text}
        >
          Play Audio
        </button>
      ) : (
        <>
          {!isPaused ? (
            <button
              onClick={pauseSpeaking}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={resumeSpeaking}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Resume
            </button>
          )}
          <button
            onClick={stopSpeaking}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default TextToSpeech;