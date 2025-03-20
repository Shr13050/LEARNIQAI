import { Clock10 } from 'lucide-react'
import React from 'react'

function ChapterListCard({chapter,index}) {
  return ( 
    <div className='grid grid-cols-5 border m-1 shadow-sm p-2'>
        <div>
         <h2 className='p-2 bg-primary text-white rounded-full text-center font-bold m-2'>{index+1}</h2>
        </div>
        <div className='col-span-4 '>
            <h2 className='font-bold'>{chapter?.chapter_name}</h2>
             {/* <h2 className='text-gray-500 flex gap-2 '><Clock10/>{chapter?.duration}</h2> */}
        </div>
        
    </div>
  )
}

export default ChapterListCard