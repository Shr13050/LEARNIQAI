// "use client";
// import { db } from "@/utils/db";
// import { Chapters, CourseList } from "@/utils/schema";
// import { and, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import ChapterListCard from './_component/ChapterListCard'
// import ChapterContent from './_component/ChapterContent'

// function CourseStart({ params }) {
//   const [courseId, setCourseId] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [selectedChapter,setSelectedChapter]=useState();

//   useEffect(() => {
//     async function fetchParams() {
//       const resolvedParams = await params;
//       setCourseId(resolvedParams?.courseId);
//     }
//     fetchParams();
//   }, [params]);

//   useEffect(() => {
//     if (courseId) {
//       GetCourse();
//     }
//   }, [courseId]);

//   const GetCourse = async () => {
//     const result = await db
//       .select()
//       .from(CourseList)
//       .where(eq(CourseList?.courseId, courseId));
//     console.log(result);
//     setCourse(result[0]);
//   };

//   const GetSelectedChapterContent=async(chapterId)=>{
//     const result= await db.select().from(Chapters)
//     .where(and(eq(Chapters?.chapterId,chapterId),
//     eq(Chapters?.courseId,course?.courseId)))

//     console.log(result)
    
//   }

//   return (
//     <div>
//       {/* chapterlist sidebar */}
//       <div className="md:w-64 hidden md:block h-screen  border-r-4 ">
//         <h2 className="font-bold text-lg bg-primary p-3 text-white">
//           {course?.courseOutput?.course?.course_name}
//         </h2>

//         <div>
//             {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
//                 <div key={index} className={ `cursor-pointer hover:bg-purple-200 ${selectedChapter?.chapter_name==chapter?.chapter_name && 'bg-purple-300' }`}
//                 onClick={()=>{setSelectedChapter(chapter)
//                     GetSelectedChapterContent(index)
//                 }}
//                 >
//                     <ChapterListCard chapter={chapter} index={index}/>
//                 </div>
//             ))}
//         </div>
//       </div>

//       <div className="md:w-64">
//         <ChapterContent chapter={selectedChapter} />
//       </div>
//     </div>
//   );
// }

// export default CourseStart;






//correct code
// "use client"
// import { db } from "@/utils/db";
// import { Chapters, CourseList } from "@/utils/schema";
// import { and, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import ChapterListCard from './_component/ChapterListCard';
// import ChapterContent from './_component/ChapterContent';

// function CourseStart({ params }) {
//   const [course, setCourse] = useState();
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [chapterContent, setChapterContent] = useState();

//   // Unwrap params using React.use
//   const courseId = React.use(params)?.courseId;

//   useEffect(() => {
//     if (courseId) {
//       GetCourse(courseId); // Directly pass courseId after unwrapping params
//     }
//   }, [courseId]); // Trigger when courseId changes

//   const GetCourse = async (courseId) => {
//     const result = await db
//       .select()
//       .from(CourseList)
//       .where(eq(CourseList?.courseId, courseId));
//     // console.log(result);
//     setCourse(result[0]);
//     GetSelectedChapterContent(0);
//   };

//   const GetSelectedChapterContent = async (chapterId) => {
//     const result = await db
//       .select()
//       .from(Chapters)
//       .where(and(eq(Chapters?.chapterId, chapterId), eq(Chapters?.courseId, course?.courseId)));
//       setChapterContent(result[0]);
//       console.log(result);
//      // Store the fetched chapter content
//   };

//   return (
//     <div className="grid grid-cols-[auto,1fr] h-screen">
//       {/* chapterlist sidebar */}
//       <div className=" hidden md:block h-screen border-r-4 shadow-sm">
//         <h2 className="font-bold text-lg bg-primary p-3 text-white">
//           {course?.courseOutput?.course?.course_name}
//         </h2>

//         <div>
//           {course?.courseOutput?.course?.chapters.map((chapter, index) => (
//             <div
//               key={index}
//               className={`cursor-pointer hover:bg-purple-200 ${selectedChapter?.chapter_name === chapter?.chapter_name && 'bg-purple-300'}`}
//               onClick={() => {
//                 setSelectedChapter(chapter);
//                 GetSelectedChapterContent(index); // Pass chapterId for fetching content
//               }}
//             >
//               <ChapterListCard chapter={chapter} index={index} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chapter content */}
//       <div className="flex flex-1 justify-center ">
//         <ChapterContent chapter={selectedChapter} content={chapterContent} /> {/* Pass content to ChapterContent */}
//       </div>
//     </div>
//   );
// }

// export default CourseStart;

 //upar neeche 

"use client";
import { db } from "@/utils/db";
import { Chapters, CourseList } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";
import ChapterContent from "./_component/ChapterContent";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState();

  const courseId = React.use(params)?.courseId;

  useEffect(() => {
    if (courseId) {
      GetCourse(courseId);
    }
  }, [courseId]);

  const GetCourse = async (courseId) => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, courseId));

    setCourse(result[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(eq(Chapters?.chapterId, chapterId), eq(Chapters?.courseId, course?.courseId))
      );
    setChapterContent(result[0]);
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Sidebar - Chapter List */}
      <div className="hidden md:block col-span-3 lg:col-span-3 h-screen border-r-2 shadow-sm overflow-y-auto bg-gray-100">
        <h2 className="font-bold text-lg bg-primary p-3 text-white">
          {course?.courseOutput?.course?.course_name}
        </h2>

        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-200 ${
                selectedChapter?.chapter_name === chapter?.chapter_name && "bg-purple-300"
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Content */}
      <div className="col-span-12 md:col-span-9 lg:col-span-9 flex justify-center overflow-auto p-4">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;


// "use client";
// import { db } from "@/utils/db";
// import { Chapters, CourseList } from "@/utils/schema";
// import { and, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import ChapterListCard from "./_component/ChapterListCard";
// import ChapterContent from "./_component/ChapterContent";

// function CourseStart({ params }) {
//   const [course, setCourse] = useState();
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [chapterContent, setChapterContent] = useState();

//   const courseId = React.use(params)?.courseId;

//   useEffect(() => {
//     if (courseId) {
//       GetCourse(courseId);
//     }
//   }, [courseId]);

//   const GetCourse = async (courseId) => {
//     const result = await db
//       .select()
//       .from(CourseList)
//       .where(eq(CourseList?.courseId, courseId));

//     setCourse(result[0]);
//     GetSelectedChapterContent(0);
//   };

//   const GetSelectedChapterContent = async (chapterId) => {
//     const result = await db
//       .select()
//       .from(Chapters)
//       .where(
//         and(eq(Chapters?.chapterId, chapterId), eq(Chapters?.courseId, course?.courseId))
//       );
//     setChapterContent(result[0]);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar - Chapter List */}
//       <div className="w-1/4 md:w-1/4 lg:w-1/5 h-full border-r-2 shadow-sm overflow-y-auto bg-gray-100 p-2">
//         <h2 className="font-bold text-lg bg-primary p-3 text-white">
//           {course?.courseOutput?.course?.course_name}
//         </h2>

//         <div>
//           {course?.courseOutput?.course?.chapters.map((chapter, index) => (
//             <div
//               key={index}
//               className={`cursor-pointer hover:bg-purple-200 ${
//                 selectedChapter?.chapter_name === chapter?.chapter_name && "bg-purple-300"
//               }`}
//               onClick={() => {
//                 setSelectedChapter(chapter);
//                 GetSelectedChapterContent(index);
//               }}
//             >
//               <ChapterListCard chapter={chapter} index={index} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chapter Content */}
//       <div className="w-3/4 md:w-3/4 lg:w-4/5 flex justify-center overflow-auto p-4">
//         <ChapterContent chapter={selectedChapter} content={chapterContent} />
//       </div>
//     </div>
//   );
// }

// export default CourseStart;
