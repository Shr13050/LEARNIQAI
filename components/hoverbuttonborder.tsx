// "use client";
// import React from "react";
// import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

// export function HoverBorderGradientDemo() {
//   return (
//     <div className=" mt-5 flex gap-1 justify-center text-center">
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Personalized Learning Hub
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Smart PDF Tutor
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Research Paper Summarizer
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Career-Ready Resume Optimizer
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         AI Content Creator
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Personal Productivity Planner
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         GitHub Repository Assistant
//       </HoverBorderGradient>
//       <HoverBorderGradient
//         containerClassName="rounded-full"
//         as="button"
//         className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
//       >
        
//         Video Insight Extractor
//       </HoverBorderGradient>
//     </div>
//   );
// }

// const AceternityLogo = () => {
//   return (
//     <svg
//       width="66"
//       height="65"
//       viewBox="0 0 66 65"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-3 w-3 text-black dark:text-white"
//     >
//       <path
//         d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
//         stroke="currentColor"
//         strokeWidth="15"
//         strokeMiterlimit="3.86874"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

"use client";
import React from "react";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export function HoverBorderGradientDemo() {
  return (
    <div className="mt-5 flex gap-1 justify-center text-center">
      <a href="#plh" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black text-white flex items-center space-x-2"
        >
          Personalized Learning Hub
        </HoverBorderGradient>
      </a>

      <a href="#spt" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Smart PDF Tutor
        </HoverBorderGradient>
      </a>

      <a href="#rps" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
         className="dark:bg-black text-white flex items-center space-x-2"
        >
          Research Paper Summarizer
        </HoverBorderGradient>
      </a>

      <a href="#cro" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Career-Ready Resume Optimizer
        </HoverBorderGradient>
      </a>

      <a href="#acc" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black text-white flex items-center space-x-2"
        >
          AI Content Creator
        </HoverBorderGradient>
      </a>

      <a href="#ppp" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Personal Productivity Planner
        </HoverBorderGradient>
      </a>

      <a href="#gra" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black text-white flex items-center space-x-2"
        >
          GitHub Repository Assistant
        </HoverBorderGradient>
      </a>

      <a href="#vie" className="no-underline">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          Video Insight Extractor
        </HoverBorderGradient>
      </a>
    </div>
  );
}

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-black dark:text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
