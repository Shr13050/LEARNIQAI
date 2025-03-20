import { CheckCircle2, TimerIcon } from 'lucide-react'
import React from 'react'


function ChapterList({course}) {
  return (
    <div className='mt-3'>
        <h2>Chapters</h2>
        <div className='mt-2' >
            {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
                <div className='border p-5 rounded-lg mb-2 flex justify-between items-center' key={index}>
                <div className='flex gap-2 items-center' >
                    <h2 className='bg-primary h-10 w-10 text-white rounded-full text-center p-2 '>{index+1}</h2>
                    <div >
                        <h2 className='font-medium text-lg '>{chapter.chapter_name} </h2>
                        <p className='text-sm text-gray-400'>{chapter.about}</p>
                        {/* <p className='flex gap-2 text-primary items-center'> <TimerIcon/>{chapter.duration}</p> */}
                    </div>
                </div>
                <CheckCircle2 className='text-3xl text-gray-400 flex-none'/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterList