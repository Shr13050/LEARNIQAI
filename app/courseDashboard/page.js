import React from "react";
import SideBar from "../courseGenerator/_components/SideBar";
import { UserButton } from "@clerk/nextjs";
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const courseDashboard = () => {
  return (
    <div>
      {/* <UserButton/> */}
      <AddCourse/>

      {/* display list of course */}
      <UserCourseList/>
      
    </div>
  );
};

export default courseDashboard;
