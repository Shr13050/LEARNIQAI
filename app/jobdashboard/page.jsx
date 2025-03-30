// // 'use client';

// // import { useState } from 'react';
// // import { Send } from 'lucide-react';

// // export default function ChatbotPage() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
    
// //     if (!input.trim()) return;

// //     // Prepare user message
// //     const userMessage = { 
// //       role: 'user', 
// //       content: input 
// //     };

// //     // Update messages and reset input
// //     setMessages(prevMessages => [...prevMessages, userMessage]);
// //     setInput('');
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const response = await fetch('/api/chat', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ 
// //           messages: [...messages, userMessage] 
// //         }),
// //       });

// //       // Parse response
// //       const data = await response.json();

// //       // Handle error responses
// //       if (!response.ok) {
// //         throw new Error(data.error || 'Something went wrong');
// //       }

// //       // Add AI response to messages
// //       const aiMessage = { 
// //         role: 'assistant', 
// //         content: data.message 
// //       };
// //       setMessages(prevMessages => [...prevMessages, aiMessage]);

// //     } catch (error) {
// //       console.error('Message send error:', error);
      
// //       // Set error state
// //       setError(error.message);
      
// //       // Add error message to chat
// //       setMessages(prevMessages => [...prevMessages, { 
// //         role: 'assistant', 
// //         content: `Error: ${error.message}` 
// //       }]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-100">
// //       {/* Error Banner */}
// //       {error && (
// //         <div className="bg-red-100 text-red-800 p-3 text-center">
// //           {error}
// //         </div>
// //       )}

// //       {/* Message Container */}
// //       <div className="flex-grow overflow-y-auto p-4 space-y-4">
// //         {messages.map((msg, index) => (
// //           <div 
// //             key={index} 
// //             className={`flex ${
// //               msg.role === 'user' 
// //                 ? 'justify-end' 
// //                 : 'justify-start'
// //             }`}
// //           >
// //             <div 
// //               className={`max-w-[70%] p-3 rounded-lg ${
// //                 msg.role === 'user' 
// //                   ? 'bg-blue-500 text-white' 
// //                   : 'bg-white text-gray-800 border'
// //               }`}
// //             >
// //               {msg.content}
// //             </div>
// //           </div>
// //         ))}
        
// //         {/* Loading Indicator */}
// //         {isLoading && (
// //           <div className="flex justify-start">
// //             <div className="bg-white text-gray-800 border p-3 rounded-lg">
// //               Typing...
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Message Input Form */}
// //       <form 
// //         onSubmit={handleSendMessage} 
// //         className="bg-white border-t p-4 flex items-center space-x-2"
// //       >
// //         <input 
// //           type="text"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Type your message..."
// //           className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <button 
// //           type="submit" 
// //           disabled={!input.trim() || isLoading}
// //           className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
// //         >
// //           <Send size={20} />
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobListings = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [
            { 
              role: 'user', 
              content: input 
            }
          ]
        }),
      });

      // Parse response
      const data = await response.json();

      // Handle error responses
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Update jobs state
      if (data.data && Array.isArray(data.data)) {
        setJobs(data.data);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 text-center mb-4">
          {error}
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={fetchJobListings} className="mb-6 flex">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste job listings text..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={!input.trim() || isLoading}
          className="bg-blue-500 text-white p-2 rounded-r-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-gray-600">
          Processing job listings...
        </div>
      )}

      {/* Job Listings Table */}
      {jobs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Job Type</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Apply</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{job.jobType}</td>
                  <td className="p-3">{job.experience}</td>
                  <td className="p-3">
                    <a 
                      href={job.applyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Apply Now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { Send, X } from 'lucide-react';

// const TECH_FIELDS = [
//   'AI/ML', 'Frontend Development', 'Backend Development', 
//   'Full Stack', 'Cloud Computing', 'Data Science', 
//   'Cybersecurity', 'DevOps'
// ];

// export default function JobMateChatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [stage, setStage] = useState('welcome');
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [jobListings, setJobListings] = useState([]);

//   // Initial welcome message
//   useEffect(() => {
//     const welcomeMessage = {
//       role: 'assistant',
//       content: "Hi there! I'm JobMate, your AI career companion. What's your name?"
//     };
//     setMessages([welcomeMessage]);
//   }, []);

//   const sendMessage = async (userInput, contextOverride = null) => {
//     const userMessage = { role: 'user', content: userInput };
//     const updatedMessages = [...messages, userMessage];
    
//     setMessages(updatedMessages);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           messages: updatedMessages,
//           context: contextOverride || stage
//         }),
//       });

//       const data = await response.json();

//       if (data.error) throw new Error(data.error);

//       // Handle different stages
//       const assistantMessage = { 
//         role: 'assistant', 
//         content: data.message || JSON.stringify(data)
//       };

//       setMessages(prev => [...prev, assistantMessage]);

//       // Stage transitions
//       if (stage === 'welcome') {
//         setStage('interests');
//       } else if (stage === 'interests' && selectedInterests.length > 0) {
//         setStage('jobSearch');
//       }

//     } catch (error) {
//       console.error('Message send error:', error);
//       const errorMessage = { 
//         role: 'assistant', 
//         content: `Oops! Something went wrong: ${error.message}`
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInterestSelection = (field) => {
//     setSelectedInterests(prev => 
//       prev.includes(field) 
//         ? prev.filter(f => f !== field)
//         : [...prev, field]
//     );
//   };

//   const renderContent = () => {
//     switch(stage) {
//       case 'welcome':
//         return null;
      
//       case 'interests':
//         return (
//           <div className="p-4 space-y-2">
//             <p className="text-gray-700 mb-2">
//               Select the tech fields that interest you:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {TECH_FIELDS.map(field => (
//                 <button
//                   key={field}
//                   onClick={() => handleInterestSelection(field)}
//                   className={`
//                     px-3 py-1 rounded-full text-sm 
//                     ${selectedInterests.includes(field) 
//                       ? 'bg-blue-500 text-white' 
//                       : 'bg-gray-200 text-gray-700'}
//                   `}
//                 >
//                   {field}
//                 </button>
//               ))}
//             </div>
//             {selectedInterests.length > 0 && (
//               <button
//                 onClick={() => sendMessage('Find jobs for my selected interests', 'jobSearch')}
//                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Search Jobs for Selected Fields
//               </button>
//             )}
//           </div>
//         );
      
//       case 'jobSearch':
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Job Listings</h2>
//             {/* Job Listings Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full bg-white shadow-md rounded-lg">
//                 <thead className="bg-blue-500 text-white">
//                   <tr>
//                     <th className="p-3 text-left">Job Title</th>
//                     <th className="p-3 text-left">Company</th>
//                     <th className="p-3 text-left">Location</th>
//                     <th className="p-3 text-left">Skills</th>
//                     <th className="p-3 text-left">Deadline</th>
//                     <th className="p-3 text-left">Apply</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {jobListings.map((job, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-100">
//                       <td className="p-3">{job.title}</td>
//                       <td className="p-3">{job.company}</td>
//                       <td className="p-3">{job.location}</td>
//                       <td className="p-3">{job.skills}</td>
//                       <td className="p-3">{job.deadline}</td>
//                       <td className="p-3">
//                         <a 
//                           href={job.applyLink} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-blue-500 hover:underline"
//                         >
//                           Apply
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Messages Container */}
//       <div className="flex-grow overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`flex ${
//               msg.role === 'user' ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div 
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 msg.role === 'user' 
//                   ? 'bg-blue-500 text-white' 
//                   : 'bg-white text-gray-800 border'
//               }`}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}
        
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white text-gray-800 border p-3 rounded-lg">
//               Typing...
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Interactive Content Area */}
//       {renderContent()}

//       {/* Message Input */}
//       <form 
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (input.trim()) sendMessage(input);
//         }}
//         className="bg-white border-t p-4 flex items-center space-x-2"
//       >
//         <input 
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button 
//           type="submit" 
//           disabled={!input.trim() || isLoading}
//           className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
//         >
//           <Send size={20} />
//         </button>
//       </form>
//     </div>
//   );
// }

