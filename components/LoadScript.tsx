"use client";
import { useEffect } from "react";

const LoadScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://code.responsivevoice.org/responsivevoice.js?key=jZHlCG0m";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI needed
};

export default LoadScript;
