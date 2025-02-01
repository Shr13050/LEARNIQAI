// "use client"
// import { user } from '@/convex/schema'
// import { db } from '@/utils/db'
// import { CourseList } from '@/utils/schema'
// import { useUser } from '@clerk/nextjs'
// import { eq } from 'drizzle-orm'
// import React, { useEffect } from 'react'

// function UserCourseList() {

//     useEffect(()=>{
//      user && getUserCourses
//     },[user])
//     const getUserCourses=async()=>{
//         const {user}=useUser();
//         const result=await db.select().from(CourseList)
//         .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
//         console.log(result);
//     }
//   return (
//     <div>UserCourseList</div>
//   )
// }

// export default UserCourseList
"use client";

import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from '../_components/CourseCard'

function UserCourseList() {
  const { user } = useUser(); // Use Hook at top level
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress));

    console.log("Fetched Courses:", result);
    setCourseList(result);
  };

  return (
    <div>
      <h2 className="font-bold text-lg mt-4">My Course List</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {courseList.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default UserCourseList;
