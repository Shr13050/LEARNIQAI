import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import { Toaster, toast } from 'sonner';
function Dashboardlayout({children}) {
  return (
    <div>
      <div className='md:w-64 h-screen fixed'>
        <SideBar/>
      </div>
        <div className='md:ml-64'>
          <Header/>
        
     {children}
     </div>
    </div>
  )
}

export default Dashboardlayout