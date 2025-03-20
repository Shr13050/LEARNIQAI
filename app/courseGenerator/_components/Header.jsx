import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 shadow-md'>
        <Image src={'/plhdashboard2.png'} width={50} height={50} alt='image'/>
        <Button>Get Started</Button>
    </div>
  )
}

export default Header