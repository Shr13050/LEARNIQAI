// import { Button } from "@/components/ui/button";
// import { Puzzle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// function CourseBasicInfo({ course }) {
//   return (
//     <div>
//       <div className="grid grid-col-1 md:grid-col-2">
//         <div className="p-10 border rounded-xl shadow-sm mt-5">
//           <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.course_name}</h2>
//           <p className="text-sm mt-3">{course?.courseOutput?.course?.description}</p>
//            <h2 className="flex gap-2 mt-5"><Puzzle/>{course?.category}</h2>
//            <Link href={'/course/'+course?.courseId +'/start'}><Button className="w-full mt-5">Start</Button> </Link>
//         </div>
//         {/* <div>
//          <Image src={'/logo.svg'} width={10} height={10} alt="image" className="rounded-xl " />
//         </div> */}
//       </div>
     
//     </div>
//   );
// }

// export default CourseBasicInfo;










// import { Button } from "@/components/ui/button";
// import { Puzzle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";

// function CourseBasicInfo({ course }) {
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
  
//   const handleStart = () => {
//     setLoading(true);
//     setProgress(0);
    
//     // Calculate the interval time to update every 1% (100 steps for 100 seconds)
//     const intervalTime = 1000; // 1 second
    
//     const interval = setInterval(() => {
//       setProgress(prevProgress => {
//         const newProgress = prevProgress + 1;
        
//         // If we reached 100%, clear the interval and redirect
//         if (newProgress >= 100) {
//           clearInterval(interval);
//           window.location.href = `/course/${course?.id}/start`; // Change this URL to your target page
//         }
        
//         return newProgress;
//       });
//     }, intervalTime);
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <div className="flex flex-col gap-4">
//         <h2 className="text-2xl font-bold">
//           {course?.courseOutput?.course?.course_name}
//         </h2>
        
//         <p className="text-gray-600">
//           {course?.courseOutput?.course?.description}
//         </p>
        
//         <div className="text-sm text-blue-600">
//           {course?.category}
//         </div>
        
//         {!loading ? (
//           <Button 
//             onClick={handleStart} 
//             className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
//           >
//             Start
//           </Button>
//         ) : (
//           <div className="mt-4">
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//               <div 
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Loading course...</span>
//               <span>{progress}%</span>
//             </div>
//           </div>
//         )}
        
//         {/* You can uncomment and use this if needed
//         <div>
//           <Image />
//         </div> 
//         */}
//       </div>
//     </div>
//   );
// }

// export default CourseBasicInfo;

import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function CourseBasicInfo({ course }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleStart = () => {
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        
        // When we reach 100%, clear the interval and redirect
        if (newProgress >= 100) {
          clearInterval(interval);
          // Navigate to the start page after loader completes
          window.location.href = `/course/${course?.courseId}/start`;
        }
        
        return newProgress;
      });
    }, 500); // 1000ms = 1 second (100 seconds total)
    
    setIntervalId(interval);
  };

  return (
    <div>
      {/* Loader overlay - shown when loading is true */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Loader */}
          <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Loading Course</h2>
            
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="text-center font-medium text-gray-700">
              {progress}%
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-col-1 md:grid-col-2">
        <div className="p-10 border rounded-xl shadow-sm mt-5">
          <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.course_name}</h2>
          <p className="text-sm mt-3">{course?.courseOutput?.course?.description}</p>
          <h2 className="flex gap-2 mt-5"><Puzzle/>{course?.category}</h2>
          <Button className="w-full mt-5" onClick={handleStart} disabled={loading}>
            {loading ? "Loading..." : "Start"}
          </Button>
        </div>
        {/* <div>
          <Image src={'/logo.svg'} width={10} height={10} alt="image" className="rounded-xl " />
        </div> */}
      </div>
    </div>
  );
}

export default CourseBasicInfo;
