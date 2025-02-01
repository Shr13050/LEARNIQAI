// voiceContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const VoiceContext = createContext({
  isVoiceReady: false,
});

export function VoiceProvider({ children }) {
  const [isVoiceReady, setIsVoiceReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.responsiveVoice && !document.getElementById('responsive-voice-script')) {
      const script = document.createElement("script");
      script.id = 'responsive-voice-script';
      script.src = "https://code.responsivevoice.org/responsivevoice.js?key=jZHlCG0m";
      script.async = true;
      
      script.onload = () => {
        // Check if ResponsiveVoice is loaded and initialized
        const checkVoiceReady = setInterval(() => {
          if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
            setIsVoiceReady(true);
            clearInterval(checkVoiceReady);
          }
        }, 100);

        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkVoiceReady), 10000);
      };
      
      document.body.appendChild(script);

      return () => {
        const script = document.getElementById('responsive-voice-script');
        if (script) {
          document.body.removeChild(script);
        }
      };
    } else if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
      setIsVoiceReady(true);
    }
  }, []);

  return (
    <VoiceContext.Provider value={{ isVoiceReady }}>
      {children}
    </VoiceContext.Provider>
  );
}

export const useVoice = () => useContext(VoiceContext);

