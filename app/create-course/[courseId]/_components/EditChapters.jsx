// "use client";

// import { useState } from "react";
// import { Dialog } from "@radix-ui/react-dialog";

// import { Edit } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// const EditChapterDialog = () => {
//   const [open, setOpen] = useState(false);
//   const [chapterName, setChapterName] = useState("");
//   const [chapterDescription, setChapterDescription] = useState("");

//   const handleUpdate = () => {
//     console.log("Updated Chapter:", { chapterName, chapterDescription });
//     setOpen(false); // Close the dialog after updating
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <Dialog.Trigger asChild>
//         <Button variant="outline" onClick={() => setOpen(true)}>
//           <Edit className="w-5 h-5 mr-2" /> 
//         </Button>
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
//         <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-96">
//           <Dialog.Title className="text-lg font-semibold">
//             Edit Chapter
//           </Dialog.Title>
//           <div className="mt-2 space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Chapter Name</label>
//               <Input
//                 placeholder="Enter chapter name"
//                 value={chapterName}
//                 onChange={(e) => setChapterName(e.target.value)}
//                 className="mt-1 w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">
//                 Chapter Description
//               </label>
//               <Textarea
//                 placeholder="Enter chapter description"
//                 value={chapterDescription}
//                 onChange={(e) => setChapterDescription(e.target.value)}
//                 className="mt-1 w-full"
//               />
//             </div>
//           </div>
//           <div className="mt-4 flex justify-end gap-2">
//             <Dialog.Close asChild>
//               <Button variant="secondary" className="bg-gray-500 hover:bg-gray-600">
//                 Close
//               </Button>
//             </Dialog.Close>
//             <Button className="bg-primary" onClick={handleUpdate}>
//               Update
//             </Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog>
//   );
// };

// export default EditChapterDialog;
