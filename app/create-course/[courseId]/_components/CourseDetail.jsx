import { BarChart, BarChart2, Clock, ListCheck, PlayCircleIcon } from "lucide-react";
import React from "react";

function CourseDetail({course}) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3 grid grid-cols-2 md:grid-cols-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div>
          <BarChart className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-gray-400">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.difficulty}</h2>
          </div>
        </div>
      </div>
    
      <div className="grid grid-cols-2 md:grid-cols-3">
        <div>
          <Clock className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-gray-400">Estimated Time</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.course?.duration}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3">
        <div>
          <ListCheck className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-gray-400">Number of chapters</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.course?.number_of_chapters}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3">
        <div>
          <PlayCircleIcon className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm text-gray-400">Videos</h2>
            <h2 className="font-medium text-lg">{course?.addVideo}</h2>
          </div>
        </div>
      </div>
         
    </div>
  );
}

export default CourseDetail;
