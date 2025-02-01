"use client";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { CourseList } from "@/utils/schema";
import { eq, and } from "drizzle-orm";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { Copy } from "lucide-react";

function FinishScreen({ params }) {
  const { user } = useUser();
  const unwrappedParams = use(params);
  const [course, setCourse] = useState([]);

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

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7 ">
      <h2 className="text-center font-bold text-2xl my-3">
        Congratulation ! Your Course is ready
      </h2>

      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course Url:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded-sm flex justify-between">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        
      </h2>
    </div>
  );
}

export default FinishScreen;
