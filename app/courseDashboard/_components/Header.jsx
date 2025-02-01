import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center shadow-md p-6'> 
        <Image src={'/logo.svg'} width={60} height={50} alt='favicon'/>
        <UserButton/>
    </div>
  )
}

export default Header