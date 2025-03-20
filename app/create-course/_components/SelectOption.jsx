// import React, { useState } from 'react';
// import * as Select from '@radix-ui/react-select';

// function SelectOption() {
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // Sample categories, you can replace this with your actual data
//   const categories = [
//     { id: 1, name: 'Beginner' },
//     { id: 2, name: 'Intermediate ' },
//     { id: 3, name: 'Advance ' },
//   ];

//   // Find the selected category object
//   const selectedCategoryObj = categories.find(cat => cat.id === parseInt(selectedCategory));

//   return (
//     <div>
//       <div className='grid grid-cols-2 gap-10'>
//         <div className='flex flex-col'>
//             <label>Course Difficulty level</label>
//         <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
//           <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded bg-white">
//             {selectedCategoryObj ? selectedCategoryObj.name : "Select Category"}
//           </Select.Trigger>

//           <Select.Content className="w-56 mt-2 bg-white border rounded shadow-lg">
//             {categories.map(category => (
//               <Select.Item key={category.id} value={category.id.toString()} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 {category.name}
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Root>
//         </div>
//       </div>

//       <div className='grid grid-cols-2 gap-10'>
//         <div className='flex flex-col'>
//             <label>Course Duration</label>
//         <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
//           <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded bg-white">
//             {selectedCategoryObj ? selectedCategoryObj.name : "Select Category"}
//           </Select.Trigger>

//           <Select.Content className="w-56 mt-2 bg-white border rounded shadow-lg">
//             {categories.map(category => (
//               <Select.Item key={category.id} value={category.id.toString()} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 {category.name}
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Root>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SelectOption;

// import React, { useContext, useState } from 'react';
// import * as Select from '@radix-ui/react-select';
// import { UserInputContext } from '@/app/_context/UserInputContext';

// function SelectOption() {

//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [selectedAddVideo, setSelectedAddVideo] = useState('');
//   const [numChapters, setNumChapters] = useState(1);  // State for number of chapters

//   // Categories for Course Difficulty
//   const difficultyCategories = [
//     { id: 1, name: 'Beginner' },
//     { id: 2, name: 'Intermediate' },
//     { id: 3, name: 'Advanced' },
//   ];

//   // Categories for Course Duration
//   const durationCategories = [
//     { id: 1, name: '2 hours' },
//     { id: 2, name: '5 hours' },
//     { id: 3, name: 'More than 5 hours' },
//   ];

//   // Options for "Add Video"
//   const addVideoOptions = [
//     { id: 1, name: 'Yes' },
//     { id: 2, name: 'No' },
//   ];

//   // Find the selected difficulty category
//   const selectedCategoryObj = difficultyCategories.find(cat => cat.id === parseInt(selectedCategory));

//   // Find the selected duration category
//   const selectedDurationObj = durationCategories.find(cat => cat.id === parseInt(selectedDuration));

//   // Find the selected add video option
//   const selectedAddVideoObj = addVideoOptions.find(option => option.id === parseInt(selectedAddVideo));

// const {userCourseInput,setUserCourseInput}=useContext(UserInputContext)

// const handleInputChange=(fieldName,value)=>{
//  setUserCourseInput(prev=>({
//   ...prev,
//   [fieldName]:value
//  }))
// }
 
 
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       {/* Course Difficulty Level Selection */}
//       <div className="flex flex-col space-y-4">
//         <label className="text-lg font-semibold text-gray-700">Course Difficulty Level</label>
//         <Select.Root value={selectedCategory} onValueChange={setSelectedCategory}>
//           <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
//             {selectedCategoryObj ? selectedCategoryObj.name : "Select Difficulty"}
//           </Select.Trigger>
//           <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
//             {difficultyCategories.map(category => (
//               <Select.Item key={category.id} value={category.id.toString()} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 {category.name}
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Root>
//       </div>

//       {/* Course Duration Selection */}
//       <div className="flex flex-col space-y-4">
//         <label className="text-lg font-semibold text-gray-700">Course Duration</label>
//         <Select.Root value={selectedDuration} onValueChange={setSelectedDuration}>
//           <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
//             {selectedDurationObj ? selectedDurationObj.name : "Select Duration"}
//           </Select.Trigger>
//           <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
//             {durationCategories.map(category => (
//               <Select.Item key={category.id} value={category.id.toString()} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 {category.name}
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Root>
//       </div>

//       {/* Add Video Selection */}
//       <div className="flex flex-col space-y-4">
//         <label className="text-lg font-semibold text-gray-700">Add Video</label>
//         <Select.Root value={selectedAddVideo} onValueChange={setSelectedAddVideo}>
//           <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
//             {selectedAddVideoObj ? selectedAddVideoObj.name : "Select Yes/No"}
//           </Select.Trigger>
//           <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
//             {addVideoOptions.map(option => (
//               <Select.Item key={option.id} value={option.id.toString()} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
//                 {option.name}
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Root>
//       </div>

//       {/* Number of Chapters Input */}
//       <div className="flex flex-col space-y-4">
//         <label className="text-lg font-semibold text-gray-700">No of Chapters</label>
//         <input
//           type="number"
//           value={numChapters}
//           onChange={(e) => setNumChapters(e.target.value)}
//           min="1"
//           className="px-4 py-2 border rounded-md bg-white shadow-md text-gray-700"
//         />
//       </div>
//     </div>
//   );
// }

// export default SelectOption;




import React, { useContext, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectOption() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedAddVideo, setSelectedAddVideo] = useState('');
  const [numChapters, setNumChapters] = useState(1);

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  // Categories for Course Difficulty
  const difficultyCategories = [
    { id: 1, name: 'Beginner' },
    { id: 2, name: 'Intermediate' },
    { id: 3, name: 'Advanced' },
  ];

  // Categories for Course Duration
  const durationCategories = [
    { id: 1, name: '2 hours' },
    { id: 2, name: '5 hours' },
    { id: 3, name: 'More than 5 hours' },
  ];

  // Options for "Add Video"
  const addVideoOptions = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
  ];

  // Handle input changes and update the context with the selected name
  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Course Difficulty Level Selection */}
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700">Course Difficulty Level</label>
        <Select.Root
          value={selectedCategory}
          onValueChange={(value) => {
            const selectedCategoryName = difficultyCategories.find(
              (cat) => cat.id.toString() === value
            )?.name;
            setSelectedCategory(value);
            handleInputChange('difficulty', selectedCategoryName);
          }}
        >
          <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
            {selectedCategory
              ? difficultyCategories.find((cat) => cat.id.toString() === selectedCategory)?.name
              : 'Select Difficulty'}
          </Select.Trigger>
          <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
            {difficultyCategories.map((category) => (
              <Select.Item
                key={category.id}
                value={category.id.toString()}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {category.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {/* Course Duration Selection */}
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700">Estimated Learning Time</label>
        <Select.Root
          value={selectedDuration}
          onValueChange={(value) => {
            const selectedDurationName = durationCategories.find(
              (cat) => cat.id.toString() === value
            )?.name;
            setSelectedDuration(value);
            handleInputChange('duration', selectedDurationName);
          }}
        >
          <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
            {selectedDuration
              ? durationCategories.find((cat) => cat.id.toString() === selectedDuration)?.name
              : 'Select Duration'}
          </Select.Trigger>
          <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
            {durationCategories.map((category) => (
              <Select.Item
                key={category.id}
                value={category.id.toString()}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {category.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {/* Add Video Selection */}
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700">Add Video</label>
        <Select.Root
          value={selectedAddVideo}
          onValueChange={(value) => {
            const selectedAddVideoName = addVideoOptions.find(
              (option) => option.id.toString() === value
            )?.name;
            setSelectedAddVideo(value);
            handleInputChange('addVideo', selectedAddVideoName);
          }}
          
        >
          <Select.Trigger className="inline-flex items-center px-4 py-2 border rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50">
            {selectedAddVideo
              ? addVideoOptions.find((option) => option.id.toString() === selectedAddVideo)?.name
              : 'Select Yes/No'}
          </Select.Trigger>
          <Select.Content className="w-56 mt-2 bg-white border rounded-md shadow-lg">
            {addVideoOptions.map((option) => (
              <Select.Item
                key={option.id}
                value={option.id.toString()}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {option.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>

      {/* Number of Chapters Input */}
      <div className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700">No of Chapters</label>
        <input
          type="number"
          value={numChapters}
          onChange={(e) => {
            setNumChapters(e.target.value);
            handleInputChange('numofChapters', e.target.value);
          }}
          min="1"
          className="px-4 py-2 border rounded-md bg-white shadow-md text-gray-700"
        />
      </div>
    </div>
  );
}

export default SelectOption;
