// "use client";
// import { FileClock, Home, Settings,BookKey } from 'lucide-react';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// const SideBar = () => {
//   const [isClient, setIsClient] = useState(false);
//   const [path, setPath] = useState("");

//   const MenuList = [
//     {
//       name: 'Home',
//       icon: Home,
//       path: '/courseDashboard',
//     },
//     {
//       name: 'Explore',
//       icon: BookKey,
//       path: '/courseDashboard/Explore',
//     },
//     {
//       name: 'Setting',
//       icon: Settings,
//       path: '/courseDashboard/setting',
//     },
//   ];

//   // Ensure code runs only on the client side by using useEffect
 

//   return (
//     <div className="h-screen p-5 shadow-sm border">
//       <div className="flex justify-center">
//         <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
//       </div>
//       <hr className="my-3 border" />
//       <div className="mt-3">
//         {MenuList.map((menu, index) => (
//           <div
//             className={`flex gap-2 mt-5 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer
//             ${path === menu.path && 'bg-primary text-white'}`}
//             key={index}
//           >
//             <menu.icon />
//             <h2>{menu.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SideBar;

"use client";
import { FileClock, Home, Settings, BookKey } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathname = usePathname(); // Get the current path

  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/courseDashboard",
    },
    {
      name: "Explore",
      icon: BookKey,
      path: "/courseDashboard/Explore",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/courseDashboard/setting",
    },
  ];

  return (
    <div className="h-screen p-5 shadow-sm border">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
      </div>
      <hr className="my-3 border" />
      <div className="mt-3">
        {MenuList.map((menu) => (
          <Link href={menu.path} key={menu.path}>
            <div
              className={`flex gap-2 mt-5 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                pathname === menu.path ? "bg-primary text-white" : ""
              }`}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
