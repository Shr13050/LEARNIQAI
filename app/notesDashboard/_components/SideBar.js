"use client"
import { Button } from '@/components/ui/button';
import { FileClock, Home, Layout, Settings } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UploadPdfDialog from './UploadPdfDialog'

const SideNav = () => {
  const [isClient, setIsClient] = useState(false);
  const [path, setPath] = useState("");

  const MenuList = [
    {
      name: 'Workspace',
      icon: Layout,
      path: '/notesDashboard',
    },
    
  ];

  // Ensure code runs only on the client side by using useEffect
 

  return (
    <div className="h-screen p-5 shadow-sm border">
      <div className="flex justify-center">
        <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
      </div>
      <div>
       
        <UploadPdfDialog>
        <Button className='w-full mt-3'>+Upload Pdf</Button>
        </UploadPdfDialog>

      </div>
      <hr className="my-3 border" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <div
            className={`flex gap-2 mt-5 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer
            ${path === menu.path && 'bg-primary text-white'}`}
            key={index}
          >
            <menu.icon />
            <h2>{menu.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;