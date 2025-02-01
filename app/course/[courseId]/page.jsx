"use client";

import React, { useEffect, use, useState } from "react";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { eq } from "drizzle-orm";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import Header from "@/app/courseDashboard/_components/Header";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";

function Course({ params }) {
    const [course,setCourse]=useState();
    const unwrappedParams = use(params); // Unwrap params

    const GetCourse = async () => {
        if (!db || !unwrappedParams?.courseId) return;

        const result = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList.courseId, unwrappedParams.courseId));
        setCourse(result[0]);
        console.log(result);
    };

    useEffect(() => {
        if (unwrappedParams?.courseId) {
            GetCourse();
        }
    }, [unwrappedParams]);

    return <div>
        <Header/>
         <div className="px-10 p-10 md:px-20 lg:px-44">
         <CourseBasicInfo course={course}/>
         <CourseDetail course={course}/>
         <ChapterList course={course}/>
         </div>
       
    </div>;
}

export default Course;
