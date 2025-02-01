import Link from "next/link";
import React from "react";

function CourseCard({ course }) {
  return (
    <div className="shadow-lg rounded-lg hover:scale-105 transition-all cursor-pointer">
      <div className="p-3">
        <Link href={'/course/'+course?.courseId}> <h2 className="font-medium text-lg">{course?.courseOutput?.course?.course_name}</h2></Link>
        <div className="flex gap-1 bg-slate-200 rounded-lg p-2 font-bold text-gray-600">
            <h2>Chapters:</h2>
            <h2>{course?.courseOutput?.course?.number_of_chapters}</h2>
        </div>
        <div>
            <h2 className="text-primary bg-purple-300 my-3 rounded-md border p-1">{course?.category}</h2>
            <h2 className="mt-2">{course?.difficulty} Course</h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
