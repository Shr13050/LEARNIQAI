// import React from 'react'
// import { TEMPLATE } from './TemplateListSection'
// import Image from 'next/image'
// import Link from 'next/link'

// const TemplateCard = (item:TEMPLATE) => {
//   return (
//     <Link href={'/dashboard/content'+item?.slug}>
//     <div className='p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer m-3 hover:scale-105 transition-all'>
//         <Image src={item.icon} alt='icon' width={50} height={50}/>
//         <h2 className='font-medium text-lg'>{item.name}</h2>
//         <p className='text-gray-500 line-clamp-1'>{item.desc}</p>
//     </div>
//     </Link>
//   )
// }

// export default TemplateCard

import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image';
import Link from 'next/link';

const TemplateCard = (item: TEMPLATE) => {
  return (
    <Link href={'/dashboard/content/'+item.slug}>
      <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer m-3 hover:scale-105 transition-all">
        <div className='flex items-center justify-center'><Image src={item.icon} alt="icon" width={80} height={80} /></div>
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-1">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
