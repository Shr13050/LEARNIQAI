// import { ChartBarStacked, ListChecks, NotebookText } from "lucide-react";
// import React from "react";

// const CreateCourse = () => {
//   const StepperOption = [
//     {
//       id: 1,
//       name: "Category",
//       icon: ChartBarStacked,
//     },
//     {
//       id: 2,
//       name: "Topic & Description",
//       icon: NotebookText,
//     },
//     {
//       id: 3,
//       name: "Options",
//       icon: ListChecks,
//     },
//   ];
//   return (
//     <div>
//       {/* stepper */}
//       <div className="flex flex-col justify-center items-center mt-10">
//         <h2 className="text-4xl text-primary font-medium">Create Course</h2>
//         <div>{StepperOption.map((item,index)=>(
//             <div>
//                 <div>
//                 {item.icon}
//                 </div>
//             </div>
//         ))}</div>
//       </div>

//       {/* components */}

//       {/* next and prev button */}
//     </div>
//   );
// };

// export default CreateCourse;

// import { ChartBarStacked, ListChecks, NotebookText } from "lucide-react";
// import React from "react";

// const CreateCourse = () => {
//   const StepperOption = [
//     {
//       id: 1,
//       name: "Category",
//       icon: ChartBarStacked,
//     },
//     {
//       id: 2,
//       name: "Topic & Description",
//       icon: NotebookText,
//     },
//     {
//       id: 3,
//       name: "Options",
//       icon: ListChecks,
//     },
//   ];

//   return (
//     <div>
//       {/* Stepper */}
//       <div className="flex flex-col justify-center items-center mt-10">
//         <h2 className="text-4xl text-primary font-medium">Create Course</h2>
//         <div className="flex gap-4 mt-6">
//           {StepperOption.map((item) => (
//             <div key={item.id} className="flex flex-col items-center">
//               <div className="text-2xl text-primary">
//                 {/* Render the icon */}
//                 <item.icon />
//               </div>
//               <h3 className="text-sm mt-2 font-medium">{item.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Components */}

//       {/* Next and Prev Buttons */}
//     </div>
//   );
// };

// export default CreateCourse;
// "use client";
// import { Button } from "@/components/ui/button";
// import { ChartBarStacked, ListChecks, NotebookText } from "lucide-react";
// import React, { useContext, useEffect, useState } from "react";
// import SelectCategory from './_components/SelectCategory'
// import TopicDescription from './_components/TopicDescription'
// import SelectOption from './_components/SelectOption'
// import { UserInputContext } from '@/app/_context/UserInputContext'
// import {GenerateCourseLayout_AI} from '@/configs/AiModel'
// const CreateCourse = () => {
//   const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)
//   const StepperOption = [
//     {
//       id: 1,
//       name: "Category",
//       icon: ChartBarStacked,
//     },
//     {
//       id: 2,
//       name: "Topic & Description",
//       icon: NotebookText,
//     },
//     {
//       id: 3,
//       name: "Options",
//       icon: ListChecks,
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading,setLoading]=useState(false);


// useEffect(()=>{
// console.log(userCourseInput)
// },[userCourseInput])


// const GenerateCourseLayout=async()=>{
//     setLoading(true);
//     const BASIC_PROMPT='Generate a course tutorial on following detail with field, as course name, description, along with chapter name, about, duration:'
//     const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', topic: ' + userCourseInput?.topic + ', difficulty: ' + userCourseInput?.difficulty + ', duration: ' + userCourseInput?.duration + ', number of chapters: ' + userCourseInput?.numofChapters + ', in JSON format';
//     const FINAL_PROMPT= BASIC_PROMPT+USER_INPUT_PROMPT;
//     console.log(FINAL_PROMPT);
//     const result= await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
//     console.log(result.response.text());
//     console.log(JSON.parse(result.response.text()))
//     setLoading(false);

// }


//   return (
//     <div>
//       {/* Stepper */}
//       <div className="flex flex-col justify-center items-center mt-10">
//         <h2 className="text-4xl text-primary font-medium">Create Course</h2>
//         <div className="flex items-center justify-center mt-6">
//           {StepperOption.map((item, index) => (
//             <React.Fragment key={item.id}>
//               {/* Icon and Label */}
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`text-3xl rounded-full p-3 ${
//                     activeIndex >= index
//                       ? "bg-purple-500 text-white"
//                       : "bg-gray-200 text-primary"
//                   }`}
//                 >
//                   <item.icon />
//                 </div>
//                 <h3 className="text-sm mt-2 font-bold">{item.name}</h3>
//               </div>

//               {/* Connecting Line */}
//               {index < StepperOption.length - 1 && (
//                 <div
//                   className={`w-50 h-[2px] md:w-[100px] rounded-full mx-2 ${
//                     activeIndex > index ? "bg-purple-500" : "bg-gray-300"
//                   }`}
//                 ></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//         <div className="px-10 md:px-20 lg:px-44 mt-10">
//       {/* Component */}
  
//   {activeIndex ==0?<SelectCategory/>:activeIndex==1?<TopicDescription/>:activeIndex==2?<SelectOption/>:null}

       
//       {/* Next Button */}
//       <div className="flex justify-between mt-10">
//         <Button disabled={activeIndex==0} onClick={()=>setActiveIndex(activeIndex-1)}>Previous</Button>
//        { activeIndex<2 &&<Button
//           onClick={() => setActiveIndex((prev) => Math.min(prev + 1, StepperOption.length - 1))}
//         >
//           Next
//         </Button>}
//         {activeIndex==2 &&  <Button
//           onClick={() => GenerateCourseLayout()

//            }
//         >
//           Generate Course Layout
//         </Button>}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCourse;
"use client"
import { Button } from "@/components/ui/button";
import { ChartBarStacked, ListChecks, NotebookText } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '@/app/_context/UserInputContext'
import {GenerateCourseLayout_AI} from '@/configs/AiModel'
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import uuid4 from "uuid4"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
    const{user}=useUser();
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const StepperOption = [
    { id: 1, name: "Category", icon: ChartBarStacked },
    { id: 2, name: "Topic & Description", icon: NotebookText },
    { id: 3, name: "Options", icon: ListChecks },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = 'Generate a course tutorial on following detail with field, as course name, description, along with chapter name, about, duration:';
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', topic: ' + userCourseInput?.topic + ', difficulty: ' + userCourseInput?.difficulty + ', duration: ' + userCourseInput?.duration + ', number of chapters: ' + userCourseInput?.numofChapters + ', in JSON format';
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response.text()));
  };

  const SaveCourseLayoutInDb=async(courseLayout)=>{
    var id =uuid4();
    setLoading(true);
    const result=await db.insert(CourseList).values({
        courseId:id,
        name:userCourseInput?.topic,
        difficulty:userCourseInput?.difficulty,
        category:userCourseInput?.category,
        courseOutput:courseLayout,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        userProfileImage:user?.imageUrl
    
    })
console.log('finish');

    setLoading(false);
    router.replace('/create-course/'+ id);
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex items-center justify-center mt-6">
          {StepperOption.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Icon and Label */}
              <div className="flex flex-col items-center">
                <div
                  className={`text-3xl rounded-full p-3 ${activeIndex >= index ? "bg-purple-500 text-white" : "bg-gray-200 text-primary"}`}
                >
                  <item.icon />
                </div>
                <h3 className="text-sm mt-2 font-bold">{item.name}</h3>
              </div>

              {/* Connecting Line */}
              {index < StepperOption.length - 1 && (
                <div
                  className={`w-50 h-[2px] md:w-[100px] rounded-full mx-2 ${activeIndex > index ? "bg-purple-500" : "bg-gray-300"}`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : activeIndex === 2 ? <SelectOption /> : null}

        {/* Show loading gif with blur effect when loading is true */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center ">
              <img src="/loading.gif" alt="Loading..." width={80} height={80} className="rounded-full" />
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-between mt-10">
          <Button disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
          {activeIndex < 2 && (
            <Button onClick={() => setActiveIndex((prev) => Math.min(prev + 1, StepperOption.length - 1))}>Next</Button>
          )}
          {activeIndex === 2 && (
            <Button onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
