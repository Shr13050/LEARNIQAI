import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Created By Shreya Anand ❤️","LEARNIQAI isn't just a tool; it’s your AI-powered companion, transforming the way you learn, grow, and succeed", "With LEARNIQAI, knowledge isn’t just absorbed—it’s personalized, accelerated, and transformed into success.", "Why study harder when you can study smarter? LEARNIQAI personalizes your learning journey, making success inevitable.", "Created By Shreya Anand ❤️"];

  return (
    <div className="h-[7rem] flex justify-center items-center px-4 bg-black">
      <div className="text-4xl mx-auto font-normal  text-white">
      
        <FlipWords words={words} className="text-white" /> <br />
       
      </div>
    </div>
  );
}
