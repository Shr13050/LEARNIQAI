import React, { use, useContext } from 'react'
import CategoryList from '@/app/create-course/_shared/CategoryList'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext'

const SelectCategory = () => {

  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)

  const handleCategoryChange=(category)=>{
    setUserCourseInput(prev=>({
      ...prev,
      category:category 
    }))

  }



  return (
    <div className='grid grid-col-3 gap-10 md:px-20' >

        {CategoryList.map((item,index)=>(
            <div key={index } className={`flex flex-col p-5 border items-center hover:border-purple-950 hover:bg-blue-300 cursor-pointer ${userCourseInput?.category==item.name && 'border-purple-500 bg-blue-400'}`}
            
            onClick={()=>handleCategoryChange(item.name)}>
                <Image src={item.icon} width={70} height={70} alt='img'  />
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default SelectCategory