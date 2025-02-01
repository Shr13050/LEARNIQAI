// "use client"
// import { db } from "@/utils/db";
// import { CourseList } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { eq,and } from "drizzle-orm";
// import { useEffect, useState } from "react";
// import {use} from "react"
// import CourseBasicInfo from './_components/CourseBasicInfo'


// const CourseLayout = ({ params }) => {
//   const { user } = useUser();
//   const unwrappedParams = use(params);
//   const [course,setCourse]=useState([]);
//   useEffect(()=>{
//     unwrappedParams && GetCourse();
//   },[unwrappedParams])




//   const GetCourse = async () => {
//     const result = await db
//       .select()
//       .from(CourseList)
//       .where(
//         and(eq(CourseList.courseId, unwrappedParams?.courseId)),
//         eq(CourseList?.createdBy, user.primaryEmailAddress?.emailAddress)
//       );
//       setCourse(result[0]);
//       console.log(result);
//   };
//   return <div className="mt-10 px-7 md:px-20 lg:px-44" >
//     <h2 className="font-bold text-center text-2xl">Course Layout</h2>
//   {/* BASIC INFO */}
//   <CourseBasicInfo course={course} />


//  {/* COURSE DETAIL */}

//  {/* {LIST OF CHAPTERS} */}


//   </div>;
// };

// export default CourseLayout;

// "use client";
// import { db } from "@/utils/db";
// import { CourseList } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { eq, and } from "drizzle-orm";
// import { useEffect, useState } from "react";
// import { use } from "react";
// import CourseBasicInfo from "./_components/CourseBasicInfo";
// import CourseDetail from "./_components/CourseDetail";
// import ChapterList from "./_components/ChapterList";
// import { Button } from "@/components/ui/button";
// import {GenerateChapterContent_AI} from '@/configs/AiModel'

// const CourseLayout = ({ params }) => {
//   const { user } = useUser();
//   const unwrappedParams = use(params);
//   const [course, setCourse] = useState([]);
//   const [loading,setLoading]= useState(false);

//   useEffect(() => {
//     if (unwrappedParams && user?.primaryEmailAddress?.emailAddress) {
//       GetCourse();
//     }
//   }, [unwrappedParams, user]);

//   const GetCourse = async () => {
//     if (!user?.primaryEmailAddress?.emailAddress) return; // ✅ Ensure user is defined before querying

//     try {
//       const result = await db
//         .select()
//         .from(CourseList)
//         .where(
//           and(
//             eq(CourseList.courseId, unwrappedParams?.courseId),
//             eq(CourseList?.createdBy, user.primaryEmailAddress?.emailAddress) // ✅ Safe access
//           )
//         );

//       setCourse(result[0] || {}); // ✅ Avoid setting undefined
//       console.log(result);
//     } catch (error) {
//       console.error("Error fetching course:", error);
//     }
//   };

// const GenerateChapterContent=()=>{
//     setLoading(true)
//     const chapters=course?.courseOutput?.course?.chapters;
//     chapters.forEach(async(chapter,index) => {
//         const PROMPT ='Explain the concept in detail on the topic:'+course?.name +',Chapter :' +chapter?.chapter_name
//         +' ,in json format with list of array with field as title, explanation on given chapter in detail, code example(Code field in <precode> format) if applicable '
//         console.log(PROMPT);
//         if(index==0){
//             try{
//              const result= await GenerateChapterContent_AI.sendMessage(PROMPT);
//                console.log(result.response?.text());
//                //Generate video url


//                //save chapter content+video url
//              setLoading(false)
//             }catch(e)
//             {
//                 setLoading(false); 
//              console.log(e)
//             }
//         }
//     });
// }



//   return (
//     <div className="mt-10 px-7 md:px-20 lg:px-44">
//       <h2 className="font-bold text-center text-2xl">Course Layout</h2>

//       {/* BASIC INFO */}
//       <CourseBasicInfo course={course} />
      
//       {/* COURSE DETAIL */}
//       <CourseDetail  course={course}  />

//       {/* {LIST OF CHAPTERS} */}

//       <ChapterList course={course}   />

//       <Button onClick={GenerateChapterContent} className="my-10">Generate Course content</Button>
//     </div>
//   );
// };

// export default CourseLayout;

"use client";
import { db } from "@/utils/db";
import { Chapters, CourseList } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { useEffect, useState } from "react";
import { use } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import service from '@/configs/service'
import { useRouter } from "next/navigation";


const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const unwrappedParams = use(params);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  useEffect(() => {
    if (unwrappedParams && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [unwrappedParams, user]);

  const GetCourse = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, unwrappedParams?.courseId),
            eq(CourseList?.createdBy, user.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0] || {});
      console.log(result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    for (const [index, chapter] of chapters.entries()) {
      const PROMPT = `Explain the concept in detail on the topic: ${course?.name}, Chapter: ${chapter?.chapter_name}, in JSON format with list of array with field as title, explanation on given chapter in detail, code example (Code field in <precode> format) if applicable.`;
      console.log(PROMPT);
     
        try {
            //generate video url
            let videoId='';
            service.getVideos(course?.name +':'+ chapter?.chapter_name).then(resp=>{
                console.log(resp);
                videoId=resp[0]?.id?.videoId
               })
    
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result.response?.text());
          const content=JSON.parse(result.response?.text())

          
          
           //save in db
           await db.insert(Chapters).values({
            chapterId:index,
            courseId:course?.courseId,
            content:content,
            videoId:videoId
           })
           setLoading(false);
        } catch (e) {
          console.log(e);
        }
        await db.update(CourseList).set({
            publish:true
        })
        router.replace('/create-course/'+course?.courseId+"/finish")
      
    }
    
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
            <img src="/loading.gif" alt="Loading..." width={80} height={80} className="rounded-full" />
          </div>
        </div>
      )}

      <Button onClick={GenerateChapterContent} className="my-10">Generate Course Content</Button>
    </div>
  );
};

export default CourseLayout;
