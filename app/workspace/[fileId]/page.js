// "use client"
// import { useParams } from 'next/navigation'
// import React from 'react'
// import WorkspaceHeader from '../_components/WorkspaceHeader';
// import PdfViewer from '../_components/PdfViewer'
// import {useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';


// function Workspace() {
// const{fileId}=useParams();
// const fileInfo=useQuery(api.pdfStorage.GetFileRecord,{
//   fileId:fileId
// })
// // const GetFileInfo=async()=>{
// //   const result= await GetFileInfo({fileId:fileId})
// // }
//   return (
//     <div>
//         <WorkspaceHeader/>
//         <div>
//           <div>
//             {/* Text Editor */}
//           </div>
//           <div>
//             {/* Pdf Viewer */}
//             <PdfViewer fileUrl={fileInfo.fileUrl} />
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Workspace

"use client";

import { useParams } from "next/navigation";
import React from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from '../_components/TextEditor'

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.pdfStorage.GetFileRecord, {
    fileId: fileId,
  });

  // Render a loading state while fileInfo is undefined
  if (!fileInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-5" >
        <div>Text Editor

          <TextEditor/>
        </div>
        <div>
          
          {fileInfo[0]?.fileUrl ? (
            <PdfViewer fileUrl={fileInfo[0].fileUrl} />
          ) : (
            <div>No PDF available to display.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workspace;
