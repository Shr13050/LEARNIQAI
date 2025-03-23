import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='p-4 flex justify-between shadow-md '>
       <Image src={'/pdfai.png'} alt="logo" width={70} height={70} />
       <UserButton/>
    </div>
  )
}

export default WorkspaceHeader