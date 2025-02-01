import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseBasicInfo({ course }) {
  return (
    <div>
      <div className="grid grid-col-1 md:grid-col-2">
        <div className="p-10 border rounded-xl shadow-sm mt-5">
          <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.course_name}</h2>
          <p className="text-sm mt-3">{course?.courseOutput?.course?.description}</p>
           <h2 className="flex gap-2 mt-5"><Puzzle/>{course?.category}</h2>
           <Link href={'/course/'+course?.courseId +'/start'}><Button className="w-full mt-5">Start</Button> </Link>
        </div>
        {/* <div>
         <Image src={'/logo.svg'} width={10} height={10} alt="image" className="rounded-xl " />
        </div> */}
      </div>
     
    </div>
  );
}

export default CourseBasicInfo;
