// import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { DialogFooter, DialogClose } from '@radix-ui/react-dialog';

// function UploadPdfDialog({children}) {
//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         {children}
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         {/* Overlay styles */}
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />

//         {/* Dialog content styles */}
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">Upload PDF File</Dialog.Title>
//           <Dialog.Description className="mt-2 text-sm text-gray-600">
             
//              <div >
//              <h2>Select File to upload</h2>
//                 <div className='flex gap-2  p-3 rounded-md border'>
                    
//                     <input type='file' />
//                 </div>
//                 <div className='mt-2'>
//                     <label>
//                         File Name
//                     </label>
//                     <Input placeholder='FileName'/>
//                 </div>
//                 <div>
                
//                 </div>
              
//              </div>

//           </Dialog.Description>
//           <DialogFooter className="sm:justify-start mt-4 flex justify-end">
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </Button>
//             </DialogClose>
//           </DialogFooter>

         
          
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default UploadPdfDialog;

// "use client"
// import React, { useState } from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { Loader } from 'lucide-react';

// function UploadPdfDialog({ children }) {

// const generateUploadUrl=useMutation(api.pdfStorage.generateUploadUrl)
// const [file,setFile]=useState();
// const[loading,setLoading]=useState(false);
// const OnFileSelect=(event)=>{
//     setFile(event.target.files[0]);

// }
// const OnUpload =async()=>{
//   setLoading(true);
//   // Step 1: Get a short-lived upload URL
//   const postUrl = await generateUploadUrl();

//   // Step 2: POST the file to the URL
//   const result = await fetch(postUrl, {
//     method: "POST",
//     headers: { "Content-Type": file?.type },
//     body: file,
//   });
//   const { storageId } = await result.json();
//   console.log('storageId',storageId)

//   setLoading(false);

// }

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>
//         {children}
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         {/* Overlay styles */}
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />

//         {/* Dialog content styles */}
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">Upload PDF File</Dialog.Title>
//           {/* Instead of Dialog.Description directly, wrap the content in a div */}
//           <div className="mt-2 text-sm text-gray-600">
//             <h2 className="text-lg font-medium">Select File to Upload</h2>
//             <div className="flex gap-2 p-3 rounded-md border">
//               <input type="file" className="file:border-none file:cursor-pointer" />
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium">File Name</label>
//               <Input placeholder="FileName" className="mt-1"  accept='application/pdf'
//                onChange={(event)=>OnFileSelect(event)}/>
//             </div>
//           </div>

//           {/* Footer with Close button */}
//           <div className="sm:justify-start mt-4 flex justify-end">
//             <Dialog.Close asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </Button>
              
//             </Dialog.Close>
//             <Button className='ml-3' onClick={OnUpload}>
//             {loading?<Loader className='animate-spin'/>:'Upload'}

//                 Upload
//               </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default UploadPdfDialog;



//badhiya code h



// "use client";
// import React, { useState } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Loader } from "lucide-react";

// function UploadPdfDialog({ children }) {
//   const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
//   const [file, setFile] = useState();
//   const [loading, setLoading] = useState(false);

//   const OnFileSelect = (event) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     } else {
//       console.error("No file selected");
//     }
//   };

//   const OnUpload = async () => {
//     try {
//       setLoading(true);

//       // Step 1: Get a short-lived upload URL
//       const postUrl = await generateUploadUrl();

//       // Step 2: POST the file to the URL
//       const result = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": file?.type },
//         body: file,
//       });

//       if (!result.ok) throw new Error("File upload failed");

//       const { storageId } = await result.json();
//       console.log("File uploaded successfully. Storage ID:", storageId);

//     } catch (error) {
//       console.error("Error during file upload:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>{children}</Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">
//             Upload PDF File
//           </Dialog.Title>
//           <div className="mt-2 text-sm text-gray-600">
//             <h2 className="text-lg font-medium">Select File to Upload</h2>
//             <div className="flex-col gap-5 mt-2 p-3 rounded-md border">
//               <Input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={(event) => OnFileSelect(event)}
//                 className="file:border-none file:cursor-pointer"
//               />
//               <Input placeholder="filename" type="text"/>
//             </div>
//           </div>
//           <div className="sm:justify-start mt-4 flex justify-end">
//             <Dialog.Close asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </Button>
//             </Dialog.Close>
//             <Button className="ml-3" onClick={OnUpload}>
//               {loading ? <Loader className="animate-spin" /> : "Upload"}
//             </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default UploadPdfDialog;


// "use client";
// import React, { useState } from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { Loader } from 'lucide-react';
// import { uuid } from 'drizzle-orm/pg-core';
// import { useUser } from '@clerk/nextjs';

// function UploadPdfDialog({ children }) {
//   const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("");
//   const [loading, setLoading] = useState(false);
//   const{user}=useUser;
//   const AddFileEntry=useMutation(api.pdfStorage.AddFileEntryToDb)

//   const onFileSelect = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onUpload = async () => {
//     if (!file || !filename) {
//       alert("Please select a file and enter a filename before uploading.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Step 1: Get a short-lived upload URL
//       const postUrl = await generateUploadUrl({ filename });

//       // Step 2: POST the file to the URL
//       const result = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": file.type },
//         body: file,
//       });

//       const { storageId } = await result.json();
//       console.log("File uploaded successfully with storageId:", storageId);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("Failed to upload the file. Please try again.");
//     } 
//     // Step 3: Save the newly allocated storage id to the database
//  const fileId=uuid();

//  const resp=await AddFileEntry({
//   fileId:fileId,
//   storageId:storageId,
//   fileName:filename??'Untitled File',
//   createdBy:user?.primaryEmailAddress?.emailAddress


//  })



//     setLoading(false);
//   };

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>{children}</Dialog.Trigger>
//       <Dialog.Portal>
//         {/* Overlay styles */}
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />

//         {/* Dialog content styles */}
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">Upload PDF File</Dialog.Title>
//           <div className="mt-2 text-sm text-gray-600">
//             <h2 className="text-lg font-medium">Select File to Upload</h2>
//             <div className="flex gap-2 p-3 rounded-md border">
//               <input type="file" accept="application/pdf" className="file:border-none file:cursor-pointer" onChange={onFileSelect} />
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium">File Name</label>
//               <Input
//                 placeholder="Enter filename"
//                 className="mt-1"
//                 value={filename}
//                 onChange={(event) => setFilename(event.target.value)}
//               />
//             </div>
//           </div>

//           {/* Footer with Close button */}
//           <div className="sm:justify-start mt-4 flex justify-end">
//             <Dialog.Close asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </Button>
//             </Dialog.Close>
//             <Button className="ml-3" onClick={onUpload} disabled={loading}>
//               {loading ? <Loader className="animate-spin" /> : 'Upload'}
//             </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default UploadPdfDialog;


// "use client";

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAction, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Loader } from "lucide-react";
// import { uuid } from "drizzle-orm/pg-core";
// import { useUser } from "@clerk/nextjs";
// import axios from 'axios';


// function UploadPdfDialog({ children }) {
//   const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
//   const AddFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
// const getFileUrl=useMutation(api.pdfStorage.getFileUrl)
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("");
//   const [loading, setLoading] = useState(false);
//   const embeddDocument=useAction(api.myActions.ingest);
//   const { user } = useUser();
  

//   const onFileSelect = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onUpload = async () => {
//     if (!file || !filename) {
//       alert("Please select a file and enter a filename before uploading.");
//       return;
//     }
  
//     setLoading(true);
  
//     let fileUrl = ""; // Declare fileUrl outside the try block
  
//     try {
//       // Step 1: Get a short-lived upload URL
//       const postUrl = await generateUploadUrl({ filename });
  
//       // Step 2: POST the file to the URL
//       const result = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": file.type },
//         body: file,
//       });
  
//       const response = await result.json();
//       if (!response || !response.storageId) {
//         throw new Error("Upload response does not include storageId");
//       }
  
//       const { storageId } = response;
//       console.log("File uploaded successfully with storageId:", storageId);
  
//       // Step 3: Save the newly allocated storageId to the database
//       const fileId = uuidv4();
//       fileUrl = await getFileUrl({ storageId }); // Assign value to fileUrl
//       const userEmail = user?.primaryEmailAddress?.emailAddress || "Unknown";
  
//       const resp = await AddFileEntry({
//         fileId: fileId,
//         storageId: storageId,
//         fileName: filename || "Untitled File",
//         fileUrl: fileUrl,
//         createdBy: userEmail,
//       });
  
//       console.log("Database entry response:", resp);
  
//       alert("File uploaded and database updated successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert(`Failed to upload the file: ${error.message}`);
//     } finally {
//       if (fileUrl) { // Ensure fileUrl is defined
//         const ApiResponse = await axios.get('/api/processPdf?pdfUrl=' + fileUrl);
//         console.log(ApiResponse.data.result);
//        await embeddDocument({
//       splitText:ApiResponse.data.result,
//       fileId:fileId
//      });
//       }
//       setLoading(false);
//     }
//   };
  

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger asChild>{children}</Dialog.Trigger>
//       <Dialog.Portal>
//         {/* Overlay styles */}
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />

//         {/* Dialog content styles */}
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">Upload PDF File</Dialog.Title>
//           <div className="mt-2 text-sm text-gray-600">
//             <h2 className="text-lg font-medium">Select File to Upload</h2>
//             <div className="flex gap-2 p-3 rounded-md border">
//               <input
//                 type="file"
//                 accept="application/pdf"
//                 className="file:border-none file:cursor-pointer"
//                 onChange={onFileSelect}
//               />
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium">File Name</label>
//               <Input
//                 placeholder="Enter filename"
//                 className="mt-1"
//                 value={filename}
//                 onChange={(event) => setFilename(event.target.value)}
//               />
//             </div>
//           </div>

//           {/* Footer with Close button */}
//           <div className="sm:justify-start mt-4 flex justify-end">
//             <Dialog.Close asChild>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Close
//               </Button>
//             </Dialog.Close>
//             <Button className="ml-3" onClick={onUpload} disabled={loading}>
//               {loading ? <Loader className="animate-spin" /> : "Upload"}
//             </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }

// export default UploadPdfDialog;





















"use client"; 

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from 'axios';
import { useRouter } from "next/navigation";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();
  const [open,setOpen]=useState(false);
  const router= useRouter()
  
  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  // const onUpload = async () => {
  //   if (!file || !filename) {
  //     alert("Please select a file and enter a filename before uploading.");
  //     return;
  //   }
  
  //   setLoading(true);
  
  //   let fileUrl = "";
  //   let fileId = uuidv4(); // Generate fileId outside the try block so it's available for embeddDocument
  
  //   try {
  //     // Step 1: Get a short-lived upload URL
  //     const postUrl = await generateUploadUrl({ filename });
  
  //     // Step 2: POST the file to the URL
  //     const result = await fetch(postUrl, {
  //       method: "POST",
  //       headers: { "Content-Type": file.type },
  //       body: file,
  //     });
  
  //     const response = await result.json();
  //     if (!response || !response.storageId) {
  //       throw new Error("Upload response does not include storageId");
  //     }
  
  //     const { storageId } = response;
  //     console.log("File uploaded successfully with storageId:", storageId);
  
  //     // Step 3: Save the newly allocated storageId to the database
  //     fileUrl = await getFileUrl({ storageId }); // Assign value to fileUrl
  //     const userEmail = user?.primaryEmailAddress?.emailAddress || "Unknown";
  
  //     const resp = await AddFileEntry({
  //       fileId: fileId,
  //       storageId: storageId,
  //       fileName: filename || "Untitled File",
  //       fileUrl: fileUrl,
  //       createdBy: userEmail,
  //     });
  
  //     console.log("Database entry response:", resp);
  
  //     alert("File uploaded and database updated successfully!");
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     alert(`Failed to upload the file: ${error.message}`);
  //   } finally {
  //     if (fileUrl) { // Ensure fileUrl is defined
  //       const ApiResponse = await axios.get('/api/processPdf?pdfUrl=' + fileUrl);
  //       console.log(ApiResponse.data.result);
        
  //       // Pass fileId and split text to embeddDocument after the file is uploaded
  //       await embeddDocument({
  //         splitText: ApiResponse.data.result,
  //         fileId: fileId
  //       });
  //     }
  //     setLoading(false);
  //   }
  // };
  const onUpload = async () => {
    if (!file || !filename) {
      alert("Please select a file and enter a filename before uploading.");
      return;
    }
  
    setLoading(true);
    let fileUrl = "";
    let fileId = uuidv4();
  
    
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl({ filename });
  
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
  
      const response = await result.json();
      if (!response || !response.storageId) {
        throw new Error("Upload response does not include storageId");
      }
  
      const { storageId } = response;
      console.log("File uploaded successfully with storageId:", storageId);
  
      // Step 3: Get file URL and save to database
      fileUrl = await getFileUrl({ storageId });
      const userEmail = user?.primaryEmailAddress?.emailAddress || "Unknown";
  
      const resp = await AddFileEntry({
        fileId: fileId,
        storageId: storageId,
        fileName: filename || "Untitled File",
        fileUrl: fileUrl,
        createdBy: userEmail,
      });
  
      console.log("Database entry response:", resp);
      
  
      alert("File uploaded and database updated successfully!");
  
      // Step 4: Process PDF and embed document
     
        
          const ApiResponse = await axios.get('/api/processPdf?pdfUrl='+fileUrl);
          console.log("PDF Processing Result:", ApiResponse.data.result);
         const embdeddResult= embeddDocument({
            splitText:ApiResponse.data.result,
            fileId:fileId
          });
          console.log(embdeddResult);
      setLoading(false);
      setOpen(false);
      router.replace('/workspace/'+fileId)

    
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
      <Button onClick={()=>setOpen(true)} className="w-full">+ Upload your PDF File</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
          <Dialog.Title className="text-lg font-semibold">Upload PDF File</Dialog.Title>
          <div className="mt-2 text-sm text-gray-600">
            <h2 className="text-lg font-medium">Select File to Upload</h2>
            <div className="flex gap-2 p-3 rounded-md border">
              <input
                type="file"
                accept="application/pdf"
                className="file:border-none file:cursor-pointer"
                onChange={onFileSelect}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium">File Name</label>
              <Input
                placeholder="Enter filename"
                className="mt-1"
                value={filename}
                onChange={(event) => setFilename(event.target.value)}
              />
            </div>
          </div>
          <div className="sm:justify-start mt-4 flex justify-end">
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="secondary"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </Button>
            </Dialog.Close>
            <Button className="ml-3" onClick={onUpload} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Upload"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default UploadPdfDialog;
