import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'

const TopicDescription = () => {
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)

const handleInputChange=(fieldName,value)=>{
 setUserCourseInput(prev=>({
  ...prev,
  [fieldName]:value
 }))
}

  return (
    <div className='mx-20 lg:mx-44'>
        {/* topic */}
        <div className='mt-5'> 
            <label> Write the topic for which you want to generate the Course</label>
            <Input placeholder='Topic'defaultValue={userCourseInput?.topic} onChange={(e)=>handleInputChange('topic',e.target.value)} />
        </div>
        <div className='mt-5'>
            <label>Tell us more about your course ,what you want to include in the course</label>
            <Textarea placeholder='Course Description'
            defaultValue={userCourseInput?.description} onChange={(e)=>handleInputChange('description',e.target.value)} />
        </div>
       

        {/* text area desc */}
        
    </div>
  )
}

export default TopicDescription