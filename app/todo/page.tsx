

// "use client";

// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format } from "date-fns";
// import { FloatingDockDemo } from "@/components/floatingdock";

// const ToDoWithCalendarAndTimer = () => {
//   // State for the to-do list
//   const [tasks, setTasks] = useState<{ date: string; task: string }[]>([]);
//   const [currentTask, setCurrentTask] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [formattedDate, setFormattedDate] = useState<string>("");
//   const [isClient, setIsClient] = useState(false);
//   const [mountingKey, setMountingKey] = useState<string>("");

//   // Timer states
//   const [timerMinutes, setTimerMinutes] = useState(0);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);

//   // Initialize client-side state
//   useEffect(() => {
//     setIsClient(true);
//     setSelectedDate(new Date());
//     setMountingKey(Math.random().toString(36));
    
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         setTasks(JSON.parse(savedTasks));
//       } catch (e) {
//         console.error("Error loading tasks:", e);
//         setTasks([]);
//       }
//     }
//   }, []);

//   // Save tasks to local storage
//   useEffect(() => {
//     if (isClient && tasks.length > 0) {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
//   }, [tasks, isClient]);

//   // Update formattedDate when selectedDate changes
//   useEffect(() => {
//     if (selectedDate) {
//       setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
//     }
//   }, [selectedDate]);

//   // Timer functionality
//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (timerActive) {
//       timer = setInterval(() => {
//         setTimerSeconds((prev) => {
//           if (prev === 0) {
//             if (timerMinutes === 0) {
//               setTimerActive(false);
//               return 0;
//             }
//             return 59;
//           }
//           return prev - 1;
//         });

//         setTimerMinutes((prevMinutes) => {
//           if (prevMinutes === 0 && timerSeconds === 0) {
//             setTimerActive(false);
//             return 0;
//           }
//           return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [timerActive, timerSeconds, timerMinutes]);

//   // Add task
//   const addTask = () => {
//     if (currentTask.trim() !== "" && formattedDate) {
//       setTasks([...tasks, { date: formattedDate, task: currentTask }]);
//       setCurrentTask("");
//     }
//   };

//   // Delete task
//   const deleteTask = (index: number) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   // Filter tasks by date
//   const filteredTasks = formattedDate
//     ? tasks.filter((task) => task.date === formattedDate)
//     : [];

//   if (!isClient || !mountingKey) {
//     return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <h1 className="text-center text-3xl font-bold mb-5">
//         To-Do List with Calendar & Timer
//       </h1>
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Calendar Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-1/3">
//           <Calendar
//             onChange={(value) => {
//               if (value instanceof Date) {
//                 setSelectedDate(value);
//               }
//             }}
//             value={selectedDate}
//             className="custom-calendar"
//           />
//           <p className="text-center mt-3">
//             Selected Date: {formattedDate || "None"}
//           </p>
//         </div>

//         {/* To-Do List Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
//           <h2 className="text-xl font-bold mb-3">
//             Tasks for {formattedDate || "today"}
//           </h2>
//           <div className="flex gap-2 mb-3">
//             <input
//               key={`task-input-${mountingKey}`}
//               type="text"
//               value={currentTask}
//               onChange={(e) => setCurrentTask(e.target.value)}
//               placeholder="Add a task..."
//               className="flex-grow p-2 border rounded"
//               autoComplete="off"
//               data-form-type="other"
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add
//             </button>
//           </div>
//           <ul className="space-y-2">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task, index) => (
//                 <li
//                   key={`task-${index}-${mountingKey}`}
//                   className="flex justify-between items-center p-2 border rounded"
//                 >
//                   <span>{task.task}</span>
//                   <button
//                     onClick={() => deleteTask(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No tasks for this date.</p>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Timer Section */}
//       <div className="bg-white p-5 rounded shadow mt-5">
//         <h2 className="text-xl font-bold mb-3">Task Timer</h2>
//         <div className="flex gap-2 mb-3">
//           <input
//             key={`timer-min-${mountingKey}`}
//             type="number"
//             value={timerMinutes}
//             onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 0)}
//             placeholder="Minutes"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <input
//             key={`timer-sec-${mountingKey}`}
//             type="number"
//             value={timerSeconds}
//             onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10) || 0)}
//             placeholder="Seconds"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <button
//             onClick={() => setTimerActive(true)}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Start
//           </button>
//           <button
//             onClick={() => setTimerActive(false)}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Stop
//           </button>
//           <button
//             onClick={() => {
//               setTimerMinutes(0);
//               setTimerSeconds(0);
//               setTimerActive(false);
//             }}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//         <div className="text-center text-lg font-bold">
//           {String(timerMinutes).padStart(2, "0")}:
//           {String(timerSeconds).padStart(2, "0")}
//         </div>
//       </div>
//       <FloatingDockDemo/>
//     </div>
//   );
// };

// export default ToDoWithCalendarAndTimer;


// // task track done right
// "use client";

// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format } from "date-fns";
// import { FloatingDockDemo } from "@/components/floatingdock";

// const ToDoWithCalendarAndTimer = () => {
//   // Enhanced task type with completion status and unique ID
//   type Task = {
//     id: string;
//     date: string;
//     task: string;
//     completed: boolean;
//     createdAt: number;
//   };

//   // State for the to-do list
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [currentTask, setCurrentTask] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [formattedDate, setFormattedDate] = useState<string>("");
//   const [isClient, setIsClient] = useState(false);
//   const [mountingKey, setMountingKey] = useState<string>("");
//   const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
//   const [editingText, setEditingText] = useState("");

//   // Stats state
//   const [totalCompleted, setTotalCompleted] = useState(0);
//   const [daysTracked, setDaysTracked] = useState(0);
//   const [dailyPerformance, setDailyPerformance] = useState(0);

//   // Timer states
//   const [timerMinutes, setTimerMinutes] = useState(0);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);

//   // Initialize client-side state
//   useEffect(() => {
//     setIsClient(true);
//     setSelectedDate(new Date());
//     setMountingKey(Math.random().toString(36));
    
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         setTasks(JSON.parse(savedTasks));
//       } catch (e) {
//         console.error("Error loading tasks:", e);
//         setTasks([]);
//       }
//     }
//   }, []);

//   // Save tasks to local storage
//   useEffect(() => {
//     if (isClient && tasks.length > 0) {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
//   }, [tasks, isClient]);

//   // Update formattedDate when selectedDate changes
//   useEffect(() => {
//     if (selectedDate) {
//       setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
//     }
//   }, [selectedDate]);

//   // Calculate statistics whenever tasks change
//   useEffect(() => {
//     // Count total completed tasks
//     const completed = tasks.filter(task => task.completed).length;
//     setTotalCompleted(completed);
    
//     // Count unique days that have tasks
//     const uniqueDays = new Set(tasks.map(task => task.date)).size;
//     setDaysTracked(uniqueDays);
    
//     // Calculate daily performance for the selected date
//     if (formattedDate) {
//       const tasksForDay = tasks.filter(task => task.date === formattedDate);
//       const completedForDay = tasksForDay.filter(task => task.completed).length;
//       const performancePercentage = tasksForDay.length > 0 
//         ? Math.round((completedForDay / tasksForDay.length) * 100) 
//         : 0;
//       setDailyPerformance(performancePercentage);
//     }
//   }, [tasks, formattedDate]);

//   // Timer functionality
//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (timerActive) {
//       timer = setInterval(() => {
//         setTimerSeconds((prev) => {
//           if (prev === 0) {
//             if (timerMinutes === 0) {
//               setTimerActive(false);
//               return 0;
//             }
//             return 59;
//           }
//           return prev - 1;
//         });

//         setTimerMinutes((prevMinutes) => {
//           if (prevMinutes === 0 && timerSeconds === 0) {
//             setTimerActive(false);
//             return 0;
//           }
//           return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [timerActive, timerSeconds, timerMinutes]);

//   // Add task
//   const addTask = () => {
//     if (currentTask.trim() !== "" && formattedDate) {
//       const newTask: Task = {
//         id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//         date: formattedDate,
//         task: currentTask,
//         completed: false,
//         createdAt: Date.now()
//       };
//       setTasks([...tasks, newTask]);
//       setCurrentTask("");
//     }
//   };

//   // Delete task
//   const deleteTask = (id: string) => {
//     setTasks(tasks.filter(task => task.id !== id));
//     if (editingTaskId === id) {
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Toggle task completion
//   const toggleTaskCompletion = (id: string) => {
//     setTasks(
//       tasks.map(task => 
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Start editing a task
//   const startEditingTask = (task: Task) => {
//     setEditingTaskId(task.id);
//     setEditingText(task.task);
//   };

//   // Save edited task
//   const saveEditedTask = () => {
//     if (editingTaskId && editingText.trim() !== "") {
//       setTasks(
//         tasks.map(task =>
//           task.id === editingTaskId ? { ...task, task: editingText } : task
//         )
//       );
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingTaskId(null);
//     setEditingText("");
//   };

//   // Filter tasks by date
//   const filteredTasks = formattedDate
//     ? tasks.filter((task) => task.date === formattedDate)
//     : [];

//   if (!isClient || !mountingKey) {
//     return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <h1 className="text-center text-3xl font-bold mb-5">
//         To-Do List with Calendar & Timer
//       </h1>
      
//       {/* Statistics Dashboard */}
//       <div className="bg-white p-5 rounded shadow mb-5">
//         <h2 className="text-xl font-bold mb-3">Your Progress Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
//             <div className="text-gray-600">Total Tasks Completed</div>
//           </div>
//           <div className="bg-green-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-green-600">{daysTracked}</div>
//             <div className="text-gray-600">Days Tracked</div>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-purple-600">{dailyPerformance}%</div>
//             <div className="text-gray-600">Today's Performance</div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Calendar Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-1/3">
//           <Calendar
//             onChange={(value) => {
//               if (value instanceof Date) {
//                 setSelectedDate(value);
//               }
//             }}
//             value={selectedDate}
//             className="custom-calendar"
//           />
//           <p className="text-center mt-3">
//             Selected Date: {formattedDate || "None"}
//           </p>
//         </div>

//         {/* To-Do List Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
//           <h2 className="text-xl font-bold mb-3">
//             Tasks for {formattedDate || "today"}
//           </h2>
//           <div className="flex gap-2 mb-3">
//             <input
//               key={`task-input-${mountingKey}`}
//               type="text"
//               value={currentTask}
//               onChange={(e) => setCurrentTask(e.target.value)}
//               placeholder="Add a task..."
//               className="flex-grow p-2 border rounded"
//               autoComplete="off"
//               data-form-type="other"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') addTask();
//               }}
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add
//             </button>
//           </div>
          
//           <div className="space-y-2 mt-4">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <div
//                   key={`task-${task.id}-${mountingKey}`}
//                   className={`p-3 border rounded ${
//                     task.completed ? "bg-green-50 border-green-200" : "bg-white"
//                   }`}
//                 >
//                   {editingTaskId === task.id ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={editingText}
//                         onChange={(e) => setEditingText(e.target.value)}
//                         className="flex-grow p-2 border rounded"
//                         autoFocus
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') saveEditedTask();
//                           if (e.key === 'Escape') cancelEditing();
//                         }}
//                       />
//                       <button
//                         onClick={saveEditedTask}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <input
//                           type="checkbox"
//                           checked={task.completed}
//                           onChange={() => toggleTaskCompletion(task.id)}
//                           className="h-5 w-5 text-blue-600 cursor-pointer"
//                         />
//                         <span className={task.completed ? "line-through text-gray-500" : ""}>
//                           {task.task}
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => startEditingTask(task)}
//                           className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-300 rounded"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteTask(task.id)}
//                           className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 p-4 text-center border rounded">
//                 No tasks for this date. Add a task to get started!
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Timer Section */}
//       <div className="bg-white p-5 rounded shadow mt-5">
//         <h2 className="text-xl font-bold mb-3">Task Timer</h2>
//         <div className="flex gap-2 mb-3">
//           <input
//             key={`timer-min-${mountingKey}`}
//             type="number"
//             value={timerMinutes}
//             onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 0)}
//             placeholder="Minutes"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <input
//             key={`timer-sec-${mountingKey}`}
//             type="number"
//             value={timerSeconds}
//             onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10) || 0)}
//             placeholder="Seconds"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <button
//             onClick={() => setTimerActive(true)}
//             disabled={timerActive || (timerMinutes === 0 && timerSeconds === 0)}
//             className={`text-white px-4 py-2 rounded ${timerActive || (timerMinutes === 0 && timerSeconds === 0) 
//               ? "bg-green-300" 
//               : "bg-green-500 hover:bg-green-600"}`}
//           >
//             Start
//           </button>
//           <button
//             onClick={() => setTimerActive(false)}
//             disabled={!timerActive}
//             className={`text-white px-4 py-2 rounded ${!timerActive 
//               ? "bg-red-300" 
//               : "bg-red-500 hover:bg-red-600"}`}
//           >
//             Stop
//           </button>
//           <button
//             onClick={() => {
//               setTimerMinutes(0);
//               setTimerSeconds(0);
//               setTimerActive(false);
//             }}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//         <div className="text-center text-3xl font-bold">
//           {String(timerMinutes).padStart(2, "0")}:
//           {String(timerSeconds).padStart(2, "0")}
//         </div>
//       </div>
//       {/* <FloatingDockDemo/> */}
//     </div>
//   );
// };

// export default ToDoWithCalendarAndTimer;


// //perfect code till voice 

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format } from "date-fns";
// import { FloatingDockDemo } from "@/components/floatingdock";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const ToDoWithCalendarAndTimer = () => {
//   // Enhanced task type with completion status and unique ID
//   type Task = {
//     id: string;
//     date: string;
//     task: string;
//     completed: boolean;
//     createdAt: number;
//   };

//   // State for the to-do list
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [currentTask, setCurrentTask] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [formattedDate, setFormattedDate] = useState<string>("");
//   const [isClient, setIsClient] = useState(false);
//   const [mountingKey, setMountingKey] = useState<string>("");
//   const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
//   const [editingText, setEditingText] = useState("");

//   // Voice recognition states
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(false);
//   const [voiceMessage, setVoiceMessage] = useState("");
  
//   // Speech recognition reference
//   const recognitionRef = useRef<any>(null);

//   // Stats state
//   const [totalCompleted, setTotalCompleted] = useState(0);
//   const [daysTracked, setDaysTracked] = useState(0);
//   const [dailyPerformance, setDailyPerformance] = useState(0);

//   // Timer states
//   const [timerMinutes, setTimerMinutes] = useState(0);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);

//   // Initialize client-side state and speech recognition
//   useEffect(() => {
//     setIsClient(true);
//     setSelectedDate(new Date());
//     setMountingKey(Math.random().toString(36));
    
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         setTasks(JSON.parse(savedTasks));
//       } catch (e) {
//         console.error("Error loading tasks:", e);
//         setTasks([]);
//       }
//     }

//     // Initialize speech recognition
//     if (typeof window !== 'undefined') {
//       // Check for browser support
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = false;
//         recognitionRef.current.interimResults = false;
        
//         // Set up speech recognition event handlers
//         recognitionRef.current.onresult = (event: any) => {
//           const transcript = event.results[0][0].transcript;
//           setCurrentTask(transcript);
//           setVoiceMessage(`Recognized: "${transcript}"`);
          
//           // Auto-add the task after a short delay
//           setTimeout(() => {
//             if (formattedDate && transcript.trim() !== "") {
//               const newTask: Task = {
//                 id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//                 date: formattedDate,
//                 task: transcript,
//                 completed: false,
//                 createdAt: Date.now()
//               };
//               setTasks(prevTasks => [...prevTasks, newTask]);
//               setCurrentTask("");
//               setVoiceMessage("Task added!");
//             }
//           }, 1000);
//         };
        
//         recognitionRef.current.onerror = (event: any) => {
//           setVoiceMessage("Error: " + event.error);
//           setIsListening(false);
//         };
        
//         recognitionRef.current.onend = () => {
//           setIsListening(false);
//         };
        
//         setVoiceSupported(true);
//       }
//     }
//   }, []);

//   // Start or stop voice recognition
//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setVoiceMessage("");
//     } else {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setVoiceMessage("Listening...");
//       } catch (err) {
//         console.error("Speech recognition error:", err);
//         setVoiceMessage("Error starting speech recognition");
//       }
//     }
//   };

//   // Save tasks to local storage
//   useEffect(() => {
//     if (isClient && tasks.length > 0) {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
//   }, [tasks, isClient]);

//   // Update formattedDate when selectedDate changes
//   useEffect(() => {
//     if (selectedDate) {
//       setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
//     }
//   }, [selectedDate]);

//   // Calculate statistics whenever tasks change
//   useEffect(() => {
//     // Count total completed tasks
//     const completed = tasks.filter(task => task.completed).length;
//     setTotalCompleted(completed);
    
//     // Count unique days that have tasks
//     const uniqueDays = new Set(tasks.map(task => task.date)).size;
//     setDaysTracked(uniqueDays);
    
//     // Calculate daily performance for the selected date
//     if (formattedDate) {
//       const tasksForDay = tasks.filter(task => task.date === formattedDate);
//       const completedForDay = tasksForDay.filter(task => task.completed).length;
//       const performancePercentage = tasksForDay.length > 0 
//         ? Math.round((completedForDay / tasksForDay.length) * 100) 
//         : 0;
//       setDailyPerformance(performancePercentage);
//     }
//   }, [tasks, formattedDate]);

//   // Timer functionality
//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (timerActive) {
//       timer = setInterval(() => {
//         setTimerSeconds((prev) => {
//           if (prev === 0) {
//             if (timerMinutes === 0) {
//               setTimerActive(false);
//               return 0;
//             }
//             return 59;
//           }
//           return prev - 1;
//         });

//         setTimerMinutes((prevMinutes) => {
//           if (prevMinutes === 0 && timerSeconds === 0) {
//             setTimerActive(false);
//             return 0;
//           }
//           return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [timerActive, timerSeconds, timerMinutes]);

//   // Add task
//   const addTask = () => {
//     if (currentTask.trim() !== "" && formattedDate) {
//       const newTask: Task = {
//         id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//         date: formattedDate,
//         task: currentTask,
//         completed: false,
//         createdAt: Date.now()
//       };
//       setTasks([...tasks, newTask]);
//       setCurrentTask("");
//     }
//   };

//   // Delete task
//   const deleteTask = (id: string) => {
//     setTasks(tasks.filter(task => task.id !== id));
//     if (editingTaskId === id) {
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Toggle task completion
//   const toggleTaskCompletion = (id: string) => {
//     setTasks(
//       tasks.map(task => 
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Start editing a task
//   const startEditingTask = (task: Task) => {
//     setEditingTaskId(task.id);
//     setEditingText(task.task);
//   };

//   // Save edited task
//   const saveEditedTask = () => {
//     if (editingTaskId && editingText.trim() !== "") {
//       setTasks(
//         tasks.map(task =>
//           task.id === editingTaskId ? { ...task, task: editingText } : task
//         )
//       );
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingTaskId(null);
//     setEditingText("");
//   };

//   // Filter tasks by date
//   const filteredTasks = formattedDate
//     ? tasks.filter((task) => task.date === formattedDate)
//     : [];

//   if (!isClient || !mountingKey) {
//     return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <h1 className="text-center text-3xl font-bold mb-5">
//         To-Do List with Calendar & Timer
//       </h1>
      
//       {/* Statistics Dashboard */}
//       <div className="bg-white p-5 rounded shadow mb-5">
//         <h2 className="text-xl font-bold mb-3">Your Progress Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
//             <div className="text-gray-600">Total Tasks Completed</div>
//           </div>
//           <div className="bg-green-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-green-600">{daysTracked}</div>
//             <div className="text-gray-600">Days Tracked</div>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-purple-600">{dailyPerformance}%</div>
//             <div className="text-gray-600">Today's Performance</div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Calendar Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-1/3">
//           <Calendar
//             onChange={(value) => {
//               if (value instanceof Date) {
//                 setSelectedDate(value);
//               }
//             }}
//             value={selectedDate}
//             className="custom-calendar"
//           />
//           <p className="text-center mt-3">
//             Selected Date: {formattedDate || "None"}
//           </p>
//         </div>

//         {/* To-Do List Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
//           <h2 className="text-xl font-bold mb-3">
//             Tasks for {formattedDate || "today"}
//           </h2>
          
//           {/* Voice Input Section */}
//           <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3">
//             <div className="flex items-center gap-2 mb-2">
//               <button
//                 onClick={toggleListening}
//                 disabled={!voiceSupported}
//                 className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
//                   isListening 
//                     ? "bg-red-500 hover:bg-red-600" 
//                     : voiceSupported 
//                       ? "bg-blue-500 hover:bg-blue-600" 
//                       : "bg-gray-400"
//                 }`}
//               >
//                 <span className={`inline-block w-3 h-3 rounded-full ${isListening ? "bg-red-300 animate-pulse" : "bg-white"}`}></span>
//                 {isListening ? "Stop" : "Add Task by Voice"}
//               </button>
//               <span className="text-sm italic text-gray-600">{voiceMessage}</span>
//             </div>
//             {!voiceSupported && (
//               <p className="text-sm text-orange-600">
//                 Voice recognition is not supported in your browser. Try Chrome, Edge, or Safari.
//               </p>
//             )}
//           </div>
          
//           {/* Regular Input */}
//           <div className="flex gap-2 mb-3">
//             <input
//               key={`task-input-${mountingKey}`}
//               type="text"
//               value={currentTask}
//               onChange={(e) => setCurrentTask(e.target.value)}
//               placeholder="Add a task..."
//               className="flex-grow p-2 border rounded"
//               autoComplete="off"
//               data-form-type="other"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') addTask();
//               }}
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add
//             </button>
//           </div>
          
//           <div className="space-y-2 mt-4">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <div
//                   key={`task-${task.id}-${mountingKey}`}
//                   className={`p-3 border rounded ${
//                     task.completed ? "bg-green-50 border-green-200" : "bg-white"
//                   }`}
//                 >
//                   {editingTaskId === task.id ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={editingText}
//                         onChange={(e) => setEditingText(e.target.value)}
//                         className="flex-grow p-2 border rounded"
//                         autoFocus
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') saveEditedTask();
//                           if (e.key === 'Escape') cancelEditing();
//                         }}
//                       />
//                       <button
//                         onClick={saveEditedTask}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <input
//                           type="checkbox"
//                           checked={task.completed}
//                           onChange={() => toggleTaskCompletion(task.id)}
//                           className="h-5 w-5 text-blue-600 cursor-pointer"
//                         />
//                         <span className={task.completed ? "line-through text-gray-500" : ""}>
//                           {task.task}
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => startEditingTask(task)}
//                           className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-300 rounded"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteTask(task.id)}
//                           className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 p-4 text-center border rounded">
//                 No tasks for this date. Add a task to get started!
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Timer Section */}
//       <div className="bg-white p-5 rounded shadow mt-5">
//         <h2 className="text-xl font-bold mb-3">Task Timer</h2>
//         <div className="flex gap-2 mb-3">
//           <input
//             key={`timer-min-${mountingKey}`}
//             type="number"
//             value={timerMinutes}
//             onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 0)}
//             placeholder="Minutes"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <input
//             key={`timer-sec-${mountingKey}`}
//             type="number"
//             value={timerSeconds}
//             onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10) || 0)}
//             placeholder="Seconds"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <button
//             onClick={() => setTimerActive(true)}
//             disabled={timerActive || (timerMinutes === 0 && timerSeconds === 0)}
//             className={`text-white px-4 py-2 rounded ${timerActive || (timerMinutes === 0 && timerSeconds === 0) 
//               ? "bg-green-300" 
//               : "bg-green-500 hover:bg-green-600"}`}
//           >
//             Start
//           </button>
//           <button
//             onClick={() => setTimerActive(false)}
//             disabled={!timerActive}
//             className={`text-white px-4 py-2 rounded ${!timerActive 
//               ? "bg-red-300" 
//               : "bg-red-500 hover:bg-red-600"}`}
//           >
//             Stop
//           </button>
//           <button
//             onClick={() => {
//               setTimerMinutes(0);
//               setTimerSeconds(0);
//               setTimerActive(false);
//             }}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//         <div className="text-center text-3xl font-bold">
//           {String(timerMinutes).padStart(2, "0")}:
//           {String(timerSeconds).padStart(2, "0")}
//         </div>
//       </div>
//       <FloatingDockDemo/>
//     </div>
//   );
// };

// export default ToDoWithCalendarAndTimer;


// //till date best 

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { format } from "date-fns";
// import { FloatingDockDemo } from "@/components/floatingdock";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// // Define Task type at the module level so it can be exported
// export type Task = {
//   id: string;
//   date: string;
//   task: string;
//   completed: boolean;
//   createdAt: number;
// };

// const ToDoWithCalendarAndTimer = () => {
//   // State for the to-do list
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [currentTask, setCurrentTask] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [formattedDate, setFormattedDate] = useState<string>("");
//   const [isClient, setIsClient] = useState(false);
//   const [mountingKey, setMountingKey] = useState<string>("");
//   const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
//   const [editingText, setEditingText] = useState("");
//   const router = useRouter();

//   // Voice recognition states
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSupported, setVoiceSupported] = useState(false);
//   const [voiceMessage, setVoiceMessage] = useState("");
  
//   // Speech recognition reference
//   const recognitionRef = useRef<any>(null);

//   // Stats state
//   const [totalCompleted, setTotalCompleted] = useState(0);
//   const [daysTracked, setDaysTracked] = useState(0);
//   const [dailyPerformance, setDailyPerformance] = useState(0);

//   // Timer states
//   const [timerMinutes, setTimerMinutes] = useState(0);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);

//   // Initialize client-side state and speech recognition
//   useEffect(() => {
//     setIsClient(true);
//     setSelectedDate(new Date());
//     setMountingKey(Math.random().toString(36));
    
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         setTasks(JSON.parse(savedTasks));
//       } catch (e) {
//         console.error("Error loading tasks:", e);
//         setTasks([]);
//       }
//     }

//     // Initialize speech recognition
//     if (typeof window !== 'undefined') {
//       // Check for browser support
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition();
//         recognitionRef.current.continuous = false;
//         recognitionRef.current.interimResults = false;
        
//         // Set up speech recognition event handlers
//         recognitionRef.current.onresult = (event: any) => {
//           const transcript = event.results[0][0].transcript;
//           setCurrentTask(transcript);
//           setVoiceMessage(`Recognized: "${transcript}"`);
          
//           // Auto-add the task after a short delay
//           setTimeout(() => {
//             if (formattedDate && transcript.trim() !== "") {
//               const newTask: Task = {
//                 id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//                 date: formattedDate,
//                 task: transcript,
//                 completed: false,
//                 createdAt: Date.now()
//               };
//               setTasks(prevTasks => [...prevTasks, newTask]);
//               setCurrentTask("");
//               setVoiceMessage("Task added!");
//             }
//           }, 1000);
//         };
        
//         recognitionRef.current.onerror = (event: any) => {
//           setVoiceMessage("Error: " + event.error);
//           setIsListening(false);
//         };
        
//         recognitionRef.current.onend = () => {
//           setIsListening(false);
//         };
        
//         setVoiceSupported(true);
//       }
//     }
//   }, []);

//   // Start or stop voice recognition
//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setVoiceMessage("");
//     } else {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setVoiceMessage("Listening...");
//       } catch (err) {
//         console.error("Speech recognition error:", err);
//         setVoiceMessage("Error starting speech recognition");
//       }
//     }
//   };

//   // Save tasks to local storage
//   useEffect(() => {
//     if (isClient && tasks.length > 0) {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//     }
//   }, [tasks, isClient]);

//   // Update formattedDate when selectedDate changes
//   useEffect(() => {
//     if (selectedDate) {
//       setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
//     }
//   }, [selectedDate]);

//   // Calculate statistics whenever tasks change
//   useEffect(() => {
//     // Count total completed tasks
//     const completed = tasks.filter(task => task.completed).length;
//     setTotalCompleted(completed);
    
//     // Count unique days that have tasks
//     const uniqueDays = new Set(tasks.map(task => task.date)).size;
//     setDaysTracked(uniqueDays);
    
//     // Calculate daily performance for the selected date
//     if (formattedDate) {
//       const tasksForDay = tasks.filter(task => task.date === formattedDate);
//       const completedForDay = tasksForDay.filter(task => task.completed).length;
//       const performancePercentage = tasksForDay.length > 0 
//         ? Math.round((completedForDay / tasksForDay.length) * 100) 
//         : 0;
//       setDailyPerformance(performancePercentage);
//     }
//   }, [tasks, formattedDate]);

//   // Timer functionality
//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (timerActive) {
//       timer = setInterval(() => {
//         setTimerSeconds((prev) => {
//           if (prev === 0) {
//             if (timerMinutes === 0) {
//               setTimerActive(false);
//               return 0;
//             }
//             return 59;
//           }
//           return prev - 1;
//         });

//         setTimerMinutes((prevMinutes) => {
//           if (prevMinutes === 0 && timerSeconds === 0) {
//             setTimerActive(false);
//             return 0;
//           }
//           return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [timerActive, timerSeconds, timerMinutes]);

//   // Navigate to dashboard with task data
//   const goToDashboard = () => {
//     // We'll save tasks to localStorage before navigating
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     router.push('/taskdashboard');
//   };

//   // Add task
//   const addTask = () => {
//     if (currentTask.trim() !== "" && formattedDate) {
//       const newTask: Task = {
//         id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//         date: formattedDate,
//         task: currentTask,
//         completed: false,
//         createdAt: Date.now()
//       };
//       setTasks([...tasks, newTask]);
//       setCurrentTask("");
//     }
//   };

//   // Delete task
//   const deleteTask = (id: string) => {
//     setTasks(tasks.filter(task => task.id !== id));
//     if (editingTaskId === id) {
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Toggle task completion
//   const toggleTaskCompletion = (id: string) => {
//     setTasks(
//       tasks.map(task => 
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   // Start editing a task
//   const startEditingTask = (task: Task) => {
//     setEditingTaskId(task.id);
//     setEditingText(task.task);
//   };

//   // Save edited task
//   const saveEditedTask = () => {
//     if (editingTaskId && editingText.trim() !== "") {
//       setTasks(
//         tasks.map(task =>
//           task.id === editingTaskId ? { ...task, task: editingText } : task
//         )
//       );
//       setEditingTaskId(null);
//       setEditingText("");
//     }
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingTaskId(null);
//     setEditingText("");
//   };

//   // Filter tasks by date
//   const filteredTasks = formattedDate
//     ? tasks.filter((task) => task.date === formattedDate)
//     : [];

//   if (!isClient || !mountingKey) {
//     return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-3xl font-bold">
//           To-Do List with Calendar & Timer
//         </h1>
//         <button
//           onClick={goToDashboard}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
//         >
//           <span className="mr-2">📊</span> Task Dashboard
//         </button>
//       </div>
      
//       {/* Statistics Dashboard */}
//       <div className="bg-white p-5 rounded shadow mb-5">
//         <h2 className="text-xl font-bold mb-3">Your Progress Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
//             <div className="text-gray-600">Total Tasks Completed</div>
//           </div>
//           <div className="bg-green-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-green-600">{daysTracked}</div>
//             <div className="text-gray-600">Days Tracked</div>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-md text-center">
//             <div className="text-3xl font-bold text-purple-600">{dailyPerformance}%</div>
//             <div className="text-gray-600">Today's Performance</div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Calendar Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-1/3">
//           <Calendar
//             onChange={(value) => {
//               if (value instanceof Date) {
//                 setSelectedDate(value);
//               }
//             }}
//             value={selectedDate}
//             className="custom-calendar"
//           />
//           <p className="text-center mt-3">
//             Selected Date: {formattedDate || "None"}
//           </p>
//         </div>

//         {/* To-Do List Section */}
//         <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
//           <h2 className="text-xl font-bold mb-3">
//             Tasks for {formattedDate || "today"}
//           </h2>
          
//           {/* Voice Input Section */}
//           <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3">
//             <div className="flex items-center gap-2 mb-2">
//               <button
//                 onClick={toggleListening}
//                 disabled={!voiceSupported}
//                 className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
//                   isListening 
//                     ? "bg-red-500 hover:bg-red-600" 
//                     : voiceSupported 
//                       ? "bg-blue-500 hover:bg-blue-600" 
//                       : "bg-gray-400"
//                 }`}
//               >
//                 <span className={`inline-block w-3 h-3 rounded-full ${isListening ? "bg-red-300 animate-pulse" : "bg-white"}`}></span>
//                 {isListening ? "Stop" : "Add Task by Voice"}
//               </button>
//               <span className="text-sm italic text-gray-600">{voiceMessage}</span>
//             </div>
//             {!voiceSupported && (
//               <p className="text-sm text-orange-600">
//                 Voice recognition is not supported in your browser. Try Chrome, Edge, or Safari.
//               </p>
//             )}
//           </div>
          
//           {/* Regular Input */}
//           <div className="flex gap-2 mb-3">
//             <input
//               key={`task-input-${mountingKey}`}
//               type="text"
//               value={currentTask}
//               onChange={(e) => setCurrentTask(e.target.value)}
//               placeholder="Add a task..."
//               className="flex-grow p-2 border rounded"
//               autoComplete="off"
//               data-form-type="other"
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') addTask();
//               }}
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Add
//             </button>
//           </div>
          
//           <div className="space-y-2 mt-4">
//             {filteredTasks.length > 0 ? (
//               filteredTasks.map((task) => (
//                 <div
//                   key={`task-${task.id}-${mountingKey}`}
//                   className={`p-3 border rounded ${
//                     task.completed ? "bg-green-50 border-green-200" : "bg-white"
//                   }`}
//                 >
//                   {editingTaskId === task.id ? (
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={editingText}
//                         onChange={(e) => setEditingText(e.target.value)}
//                         className="flex-grow p-2 border rounded"
//                         autoFocus
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') saveEditedTask();
//                           if (e.key === 'Escape') cancelEditing();
//                         }}
//                       />
//                       <button
//                         onClick={saveEditedTask}
//                         className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={cancelEditing}
//                         className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <input
//                           type="checkbox"
//                           checked={task.completed}
//                           onChange={() => toggleTaskCompletion(task.id)}
//                           className="h-5 w-5 text-blue-600 cursor-pointer"
//                         />
//                         <span className={task.completed ? "line-through text-gray-500" : ""}>
//                           {task.task}
//                         </span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => startEditingTask(task)}
//                           className="text-blue-500 hover:text-blue-700 text-sm px-2 py-1 border border-blue-300 rounded"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteTask(task.id)}
//                           className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 p-4 text-center border rounded">
//                 No tasks for this date. Add a task to get started!
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Timer Section */}
//       <div className="bg-white p-5 rounded shadow mt-5">
//         <h2 className="text-xl font-bold mb-3">Task Timer</h2>
//         <div className="flex gap-2 mb-3">
//           <input
//             key={`timer-min-${mountingKey}`}
//             type="number"
//             value={timerMinutes}
//             onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 0)}
//             placeholder="Minutes"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <input
//             key={`timer-sec-${mountingKey}`}
//             type="number"
//             value={timerSeconds}
//             onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10) || 0)}
//             placeholder="Seconds"
//             className="w-20 p-2 border rounded"
//             autoComplete="off"
//             data-form-type="other"
//           />
//           <button
//             onClick={() => setTimerActive(true)}
//             disabled={timerActive || (timerMinutes === 0 && timerSeconds === 0)}
//             className={`text-white px-4 py-2 rounded ${timerActive || (timerMinutes === 0 && timerSeconds === 0) 
//               ? "bg-green-300" 
//               : "bg-green-500 hover:bg-green-600"}`}
//           >
//             Start
//           </button>
//           <button
//             onClick={() => setTimerActive(false)}
//             disabled={!timerActive}
//             className={`text-white px-4 py-2 rounded ${!timerActive 
//               ? "bg-red-300" 
//               : "bg-red-500 hover:bg-red-600"}`}
//           >
//             Stop
//           </button>
//           <button
//             onClick={() => {
//               setTimerMinutes(0);
//               setTimerSeconds(0);
//               setTimerActive(false);
//             }}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//         <div className="text-center text-3xl font-bold">
//           {String(timerMinutes).padStart(2, "0")}:
//           {String(timerSeconds).padStart(2, "0")}
//         </div>
//       </div>
//       <FloatingDockDemo/>
//     </div>
//   );
// };

// export default ToDoWithCalendarAndTimer;


"use client";

import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FloatingDockDemo } from "@/components/floatingdock";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Enhanced Task type with additional properties
export type Task = {
  id: string;
  date: string;
  task: string;
  completed: boolean;
  createdAt: number;
  category: string;
  priority: "low" | "medium" | "high";
  timeSpent: number; // Time spent in minutes
  estimatedTime: number; // Estimated time in minutes
  notes: string;
};

// Default categories
const DEFAULT_CATEGORIES = ["Work", "Personal", "Study", "Health", "Other"];

const ToDoWithCalendarAndTimer = () => {
  // State for the to-do list
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [mountingKey, setMountingKey] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const router = useRouter();

  // New states for enhanced features
  const [taskCategory, setTaskCategory] = useState("Work");
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskEstimatedTime, setTaskEstimatedTime] = useState(30); // Default 30 minutes
  const [taskNotes, setTaskNotes] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskTimeSpent, setTaskTimeSpent] = useState(0);
  const [sortBy, setSortBy] = useState<"createdAt" | "priority" | "estimatedTime">("createdAt");

  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  
  // Speech recognition reference
  const recognitionRef = useRef<any>(null);

  // Stats state
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [daysTracked, setDaysTracked] = useState(0);
  const [dailyPerformance, setDailyPerformance] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [avgTimePerTask, setAvgTimePerTask] = useState(0);

  // Timer states
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTaskId, setTimerTaskId] = useState<string | null>(null);

  // Initialize client-side state and speech recognition
  useEffect(() => {
    setIsClient(true);
    setSelectedDate(new Date());
    setMountingKey(Math.random().toString(36));
    
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Error loading tasks:", e);
        setTasks([]);
      }
    }

    // Load saved categories
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error("Error loading categories:", e);
      }
    }

    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      // Check for browser support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        
        // Set up speech recognition event handlers
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCurrentTask(transcript);
          setVoiceMessage(`Recognized: "${transcript}"`);
          
          // Auto-add the task after a short delay
          setTimeout(() => {
            if (formattedDate && transcript.trim() !== "") {
              const newTask: Task = {
                id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                date: formattedDate,
                task: transcript,
                completed: false,
                createdAt: Date.now(),
                category: taskCategory,
                priority: taskPriority,
                timeSpent: 0,
                estimatedTime: taskEstimatedTime,
                notes: ""
              };
              setTasks(prevTasks => [...prevTasks, newTask]);
              setCurrentTask("");
              setVoiceMessage("Task added!");
            }
          }, 1000);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          setVoiceMessage("Error: " + event.error);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        setVoiceSupported(true);
      }
    }
  }, []);

  // Save categories to local storage
  useEffect(() => {
    if (isClient && categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isClient]);

  // Start or stop voice recognition
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceMessage("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceMessage("Listening...");
      } catch (err) {
        console.error("Speech recognition error:", err);
        setVoiceMessage("Error starting speech recognition");
      }
    }
  };

  // Save tasks to local storage
  useEffect(() => {
    if (isClient && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  // Update formattedDate when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  // Calculate statistics whenever tasks change
  useEffect(() => {
    // Count total completed tasks
    const completed = tasks.filter(task => task.completed).length;
    setTotalCompleted(completed);
    
    // Count unique days that have tasks
    const uniqueDays = new Set(tasks.map(task => task.date)).size;
    setDaysTracked(uniqueDays);
    
    // Calculate daily performance for the selected date
    if (formattedDate) {
      const tasksForDay = tasks.filter(task => task.date === formattedDate);
      const completedForDay = tasksForDay.filter(task => task.completed).length;
      const performancePercentage = tasksForDay.length > 0 
        ? Math.round((completedForDay / tasksForDay.length) * 100) 
        : 0;
      setDailyPerformance(performancePercentage);
    }

    // Calculate time spent statistics
    const totalTime = tasks.reduce((sum, task) => sum + task.timeSpent, 0);
    setTotalTimeSpent(totalTime);
    setAvgTimePerTask(tasks.length > 0 ? Math.round(totalTime / tasks.length) : 0);
  }, [tasks, formattedDate]);

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerActive) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev === 0) {
            if (timerMinutes === 0) {
              // Timer completed
              if (timerTaskId) {
                // Update the task's time spent
                updateTaskTimeSpent(timerTaskId);
              }
              setTimerActive(false);
              setTimerTaskId(null);
              return 0;
            }
            return 59;
          }
          return prev - 1;
        });

        setTimerMinutes((prevMinutes) => {
          if (prevMinutes === 0 && timerSeconds === 0) {
            setTimerActive(false);
            return 0;
          }
          return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timerSeconds, timerMinutes, timerTaskId]);

  // Update time spent for a task
  const updateTaskTimeSpent = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Calculate time spent in minutes
          const initialMinutes = task.timeSpent || 0;
          
          // Get the initial timer values
          const initialTimerValue = timerMinutes || 0;
          
          return {
            ...task,
            timeSpent: initialMinutes + initialTimerValue
          };
        }
        return task;
      })
    );
  };

  // Start timer for a specific task
  const startTaskTimer = (taskId: string, minutes: number) => {
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setTimerActive(true);
    setTimerTaskId(taskId);
  };

  // Stop timer and update task time
  const stopTaskTimer = () => {
    if (timerTaskId) {
      const elapsedMinutes = taskEstimatedTime - timerMinutes;
      setTasks(prevTasks => 
        prevTasks.map(task => {
          if (task.id === timerTaskId) {
            return {
              ...task,
              timeSpent: (task.timeSpent || 0) + elapsedMinutes
            };
          }
          return task;
        })
      );
    }
    setTimerActive(false);
    setTimerTaskId(null);
  };

  // Add a custom category
  const addCustomCategory = () => {
    if (customCategory.trim() !== "" && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setTaskCategory(customCategory);
      setCustomCategory("");
    }
  };

  // Navigate to dashboard with task data
  const goToDashboard = () => {
    // We'll save tasks to localStorage before navigating
    localStorage.setItem("tasks", JSON.stringify(tasks));
    router.push('/taskdashboard');
  };

  // Add task
  const addTask = () => {
    if (currentTask.trim() !== "" && formattedDate) {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        date: formattedDate,
        task: currentTask,
        completed: false,
        createdAt: Date.now(),
        category: taskCategory,
        priority: taskPriority,
        timeSpent: 0,
        estimatedTime: taskEstimatedTime,
        notes: taskNotes
      };
      setTasks([...tasks, newTask]);
      setCurrentTask("");
      setTaskNotes("");
      setShowAddTaskForm(false);
    }
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setEditingText("");
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Start editing a task
  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.task);
    setTaskCategory(task.category);
    setTaskPriority(task.priority);
    setTaskEstimatedTime(task.estimatedTime);
    setTaskNotes(task.notes);
  };

  // Save edited task
  const saveEditedTask = () => {
    if (editingTaskId && editingText.trim() !== "") {
      setTasks(
        tasks.map(task =>
          task.id === editingTaskId ? { 
            ...task, 
            task: editingText,
            category: taskCategory,
            priority: taskPriority,
            estimatedTime: taskEstimatedTime,
            notes: taskNotes
          } : task
        )
      );
      setEditingTaskId(null);
      setEditingText("");
      setTaskNotes("");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText("");
    setTaskNotes("");
  };

  // Manually update time spent
  const updateManualTimeSpent = (taskId: string, time: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, timeSpent: time } : task
      )
    );
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    if (!formattedDate) return [];
    
    let filtered = tasks.filter((task) => task.date === formattedDate);
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    // Sort tasks
    return filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === "estimatedTime") {
        return a.estimatedTime - b.estimatedTime;
      } else {
        // Default sort by creation date
        return a.createdAt - b.createdAt;
      }
    });
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!isClient || !mountingKey) {
    return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
  }

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">
          Enhanced To-Do List
        </h1>
        <button
          onClick={goToDashboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">📊</span> Task Dashboard
        </button>
      </div>
      
      {/* Statistics Dashboard */}
      <div className="bg-white p-5 rounded shadow mb-5 flex justify-between">
        <h2 className="text-xl font-bold mb-3">Your Progress Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-md text-center">
            <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
            <div className="text-gray-600">Total Completed</div>
          </div>
          <div className="bg-green-50 p-4 rounded-md text-center">
            <div className="text-3xl font-bold text-green-600">{daysTracked}</div>
            <div className="text-gray-600">Days Tracked</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-md text-center">
            <div className="text-3xl font-bold text-purple-600">{dailyPerformance}%</div>
            <div className="text-gray-600">Today's Performance</div>
          </div>
          {/* <div className="bg-amber-50 p-4 rounded-md text-center">
            <div className="text-3xl font-bold text-amber-600">{totalTimeSpent}</div>
            <div className="text-gray-600">Total Minutes Spent</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-md text-center">
            <div className="text-3xl font-bold text-teal-600">{avgTimePerTask}</div>
            <div className="text-gray-600">Avg. Minutes per Task</div>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Calendar Section */}
        <div className="bg-white p-5 rounded shadow w-full lg:w-1/3">
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value);
              }
            }}
            value={selectedDate}
            className="custom-calendar"
          />
          <p className="text-center mt-3">
            Selected Date: {formattedDate || "None"}
          </p>
          
          {/* Active Timer Display */}
          {timerActive && timerTaskId && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-bold text-blue-700">Timer Active</h3>
              <div className="text-center text-2xl font-bold mt-2">
                {String(timerMinutes).padStart(2, "0")}:
                {String(timerSeconds).padStart(2, "0")}
              </div>
              <div className="mt-2 text-sm text-blue-700">
                Tracking time for: {tasks.find(t => t.id === timerTaskId)?.task}
              </div>
              <button
                onClick={stopTaskTimer}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Stop Timer & Save Time
              </button>
            </div>
          )}
        </div>

        {/* To-Do List Section */}
        <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Tasks for {formattedDate || "today"}
            </h2>
            <button
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              <span>{showAddTaskForm ? "Cancel" : "New Task"}</span>
            </button>
          </div>
          
          {/* Task Filters */}
          <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="createdAt">Date Added</option>
                <option value="priority">Priority</option>
                <option value="estimatedTime">Estimated Time</option>
              </select>
            </div>
          </div>
          
          {/* Voice Input Section */}
          <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={toggleListening}
                disabled={!voiceSupported}
                className={`flex items-center gap-2 px-4 py-2 rounded text-white ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : voiceSupported 
                      ? "bg-blue-500 hover:bg-blue-600" 
                      : "bg-gray-400"
                }`}
              >
                <span className={`inline-block w-3 h-3 rounded-full ${isListening ? "bg-red-300 animate-pulse" : "bg-white"}`}></span>
                {isListening ? "Stop" : "Add Task by Voice"}
              </button>
              <span className="text-sm italic text-gray-600">{voiceMessage}</span>
            </div>
            {!voiceSupported && (
              <p className="text-sm text-orange-600">
                Voice recognition is not supported in your browser. Try Chrome, Edge, or Safari.
              </p>
            )}
          </div>
          
          {/* Add Task Form */}
          {showAddTaskForm && (
            <div className="mb-4 p-4 border border-blue-200 rounded bg-blue-50">
              <h3 className="font-bold text-lg mb-3">Add New Task</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full p-2 border rounded"
                  autoComplete="off"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as "low" | "medium" | "high")}
                    className="w-full p-2 border rounded"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (minutes)</label>
                <input
                  type="number"
                  value={taskEstimatedTime}
                  onChange={(e) => setTaskEstimatedTime(parseInt(e.target.value, 10) || 0)}
                  min="0"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <textarea
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Any additional details..."
                ></textarea>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}
          
          {/* Add Custom Category */}
          <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Custom Category</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="New category name..."
                className="flex-grow p-2 border rounded"
              />
              <button
                onClick={addCustomCategory}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Task List */}
          <div className="space-y-2 mt-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={`task-${task.id}-${mountingKey}`}
                  className={`p-3 border rounded ${
                    task.completed ? "bg-green-50 border-green-200" : "bg-white"
                  }`}
                >
                  {editingTaskId === task.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full p-2 border rounded"
                        autoFocus
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value as "low" | "medium" | "high")}
                            className="w-full p-2 border rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (minutes)</label>
                        <input
                          type="number"
                          value={taskEstimatedTime}
                          onChange={(e) => setTaskEstimatedTime(parseInt(e.target.value, 10) || 0)}
                          min="0"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={taskNotes}
                          onChange={(e) => setTaskNotes(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows={2}
                        ></textarea>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={saveEditedTask}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="mt-1"
                          />
                          <div>
                            <p className={`${task.completed ? "line-through text-gray-500" : ""}`}>
                              {task.task}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                              {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1) || "No Priority"}

                              </span>
                              <span className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-200">
                                {task.category}
                              </span>
                              {task.timeSpent > 0 && (
                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 border border-blue-200">
                                  {task.timeSpent} mins spent
                                </span>
                              )}
                              <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 border border-purple-200">
                                Est: {task.estimatedTime} mins
                              </span>
                            </div>
                            
                            {task.notes && (
                              <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                                {task.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => startEditingTask(task)}
                              className="text-blue-500 hover:text-blue-700 p-1"
                              title="Edit task"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Delete task"
                            >
                              🗑️
                            </button>
                          </div>
                          {!timerActive && !task.completed && (
                            <button
                              onClick={() => startTaskTimer(task.id, task.estimatedTime)}
                              className="bg-indigo-500 text-white text-xs px-2 py-1 rounded hover:bg-indigo-600"
                              title="Start timer"
                            >
                              ⏱️ Start
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center">
                <p className="text-gray-500">No tasks for this date. Add a new task!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Floating Dock - only shown on smaller screens */}
      <div className="lg:hidden mt-8">
        {/* <FloatingDockDemo /> */}
      </div>
    </div>
  );
};

export default ToDoWithCalendarAndTimer;