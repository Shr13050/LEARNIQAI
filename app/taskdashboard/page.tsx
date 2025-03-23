// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from "date-fns";
// import { Task } from "./page"; // Import Task type from main page

// // Import charts from recharts
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area
// } from "recharts";

// // Define colors for charts
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];
// const TASK_STATUS_COLORS = ["#4CAF50", "#F44336"]; // Completed, Not Completed

// const TaskDashboard = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedTimeRange, setSelectedTimeRange] = useState<string>("7days");
//   const router = useRouter();

//   // Load tasks data when component mounts
//   useEffect(() => {
//     setIsLoading(true);
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       try {
//         const parsedTasks = JSON.parse(savedTasks);
//         setTasks(parsedTasks);
//       } catch (e) {
//         console.error("Error loading tasks:", e);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const goBack = () => {
//     router.push('/');
//   };

//   // Filter tasks based on selected time range
//   const getFilteredTasks = () => {
//     const today = new Date();
//     let startDate = new Date();
    
//     switch (selectedTimeRange) {
//       case "7days":
//         startDate.setDate(today.getDate() - 7);
//         break;
//       case "30days":
//         startDate.setDate(today.getDate() - 30);
//         break;
//       case "90days":
//         startDate.setDate(today.getDate() - 90);
//         break;
//       case "thisMonth":
//         startDate = startOfMonth(today);
//         break;
//       case "allTime":
//         return tasks;
//       default:
//         startDate.setDate(today.getDate() - 7);
//     }
    
//     return tasks.filter(task => {
//       const taskDate = parseISO(task.date);
//       return taskDate >= startDate && taskDate <= today;
//     });
//   };

//   // Prepare data for completion rate by day chart
//   const getCompletionRateByDayData = () => {
//     const filteredTasks = getFilteredTasks();
//     const tasksGroupedByDate: { [key: string]: { total: number; completed: number } } = {};
    
//     filteredTasks.forEach(task => {
//       if (!tasksGroupedByDate[task.date]) {
//         tasksGroupedByDate[task.date] = { total: 0, completed: 0 };
//       }
//       tasksGroupedByDate[task.date].total += 1;
//       if (task.completed) {
//         tasksGroupedByDate[task.date].completed += 1;
//       }
//     });
    
//     return Object.entries(tasksGroupedByDate)
//       .map(([date, counts]) => ({
//         date: format(parseISO(date), "MM/dd"),
//         completionRate: Math.round((counts.completed / counts.total) * 100) || 0,
//         total: counts.total,
//         completed: counts.completed
//       }))
//       .sort((a, b) => {
//         // Sort by date (ascending)
//         const dateA = parseISO(a.date);
//         const dateB = parseISO(b.date);
//         return dateA.getTime() - dateB.getTime();
//       });
//   };

//   // Prepare data for tasks by status pie chart
//   const getTasksByStatusData = () => {
//     const filteredTasks = getFilteredTasks();
//     const completed = filteredTasks.filter(task => task.completed).length;
//     const notCompleted = filteredTasks.length - completed;
    
//     return [
//       { name: "Completed", value: completed },
//       { name: "Not Completed", value: notCompleted }
//     ];
//   };

//   // Prepare productivity trend data (tasks per day)
//   const getProductivityTrendData = () => {
//     const filteredTasks = getFilteredTasks();
//     const tasksGroupedByDate: { [key: string]: number } = {};
    
//     filteredTasks.forEach(task => {
//       if (!tasksGroupedByDate[task.date]) {
//         tasksGroupedByDate[task.date] = 0;
//       }
//       tasksGroupedByDate[task.date] += 1;
//     });
    
//     return Object.entries(tasksGroupedByDate)
//       .map(([date, count]) => ({
//         date: format(parseISO(date), "MM/dd"),
//         tasks: count
//       }))
//       .sort((a, b) => {
//         // Sort by date (ascending)
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return dateA.getTime() - dateB.getTime();
//       });
//   };

//   // Calculate daily completion statistics as a heatmap-like data structure
//   const getCompletionHeatmapData = () => {
//     const filteredTasks = getFilteredTasks();
//     const today = new Date();
//     let startDate: Date;
    
//     if (selectedTimeRange === "thisMonth") {
//       startDate = startOfMonth(today);
//     } else if (selectedTimeRange === "30days") {
//       startDate = new Date();
//       startDate.setDate(today.getDate() - 30);
//     } else {
//       startDate = new Date();
//       startDate.setDate(today.getDate() - 7);
//     }
    
//     const days = eachDayOfInterval({ start: startDate, end: today });
    
//     const tasksGroupedByDate: { [key: string]: { total: number; completed: number } } = {};
    
//     days.forEach(day => {
//       const dateKey = format(day, "yyyy-MM-dd");
//       tasksGroupedByDate[dateKey] = { total: 0, completed: 0 };
//     });
    
//     filteredTasks.forEach(task => {
//       if (tasksGroupedByDate[task.date]) {
//         tasksGroupedByDate[task.date].total += 1;
//         if (task.completed) {
//           tasksGroupedByDate[task.date].completed += 1;
//         }
//       }
//     });
    
//     return Object.entries(tasksGroupedByDate)
//       .map(([date, counts]) => ({
//         date: format(parseISO(date), "MM/dd"),
//         value: counts.total > 0 
//           ? Math.round((counts.completed / counts.total) * 100) 
//           : 0,
//         total: counts.total,
//         completed: counts.completed
//       }))
//       .sort((a, b) => {
//         // Sort by date (ascending)
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return dateA.getTime() - dateB.getTime();
//       });
//   };

//   // Calculate task growth over time
//   const getTaskGrowthData = () => {
//     const filteredTasks = getFilteredTasks();
    
//     // Sort tasks by creation date
//     const sortedTasks = [...filteredTasks].sort((a, b) => a.createdAt - b.createdAt);
    
//     let cumulativeTotal = 0;
//     let cumulativeCompleted = 0;
//     const growthData: { date: string; totalTasks: number; completedTasks: number }[] = [];
    
//     // Group by date to show cumulative growth
//     const tasksByDate: { [key: string]: { total: number; completed: number } } = {};
    
//     sortedTasks.forEach(task => {
//       if (!tasksByDate[task.date]) {
//         tasksByDate[task.date] = { total: 0, completed: 0 };
//       }
//       tasksByDate[task.date].total += 1;
//       if (task.completed) {
//         tasksByDate[task.date].completed += 1;
//       }
//     });
    
//     Object.entries(tasksByDate)
//       .sort(([dateA], [dateB]) => {
//         return parseISO(dateA).getTime() - parseISO(dateB).getTime();
//       })
//       .forEach(([date, counts]) => {
//         cumulativeTotal += counts.total;
//         cumulativeCompleted += counts.completed;
//         growthData.push({
//           date: format(parseISO(date), "MM/dd"),
//           totalTasks: cumulativeTotal,
//           completedTasks: cumulativeCompleted
//         });
//       });
    
//     return growthData;
//   };

//   // Get summary statistics
//   const getSummaryStats = () => {
//     const filteredTasks = getFilteredTasks();
//     const totalTasks = filteredTasks.length;
//     const completedTasks = filteredTasks.filter(task => task.completed).length;
//     const completionRate = totalTasks > 0 
//       ? Math.round((completedTasks / totalTasks) * 100) 
//       : 0;
    
//     // Count unique days
//     const uniqueDays = new Set(filteredTasks.map(task => task.date)).size;
    
//     // Calculate average tasks per day
//     const tasksPerDay = uniqueDays > 0 
//       ? Math.round((totalTasks / uniqueDays) * 10) / 10 
//       : 0;
    
//     return {
//       totalTasks,
//       completedTasks,
//       completionRate,
//       uniqueDays,
//       tasksPerDay
//     };
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
//         <div className="text-xl">Loading task data...</div>
//       </div>
//     );
//   }

//   const summaryStats = getSummaryStats();

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Task Dashboard</h1>
//         <div className="flex gap-4 items-center">
//           <select
//             className="bg-white border rounded p-2"
//             value={selectedTimeRange}
//             onChange={(e) => setSelectedTimeRange(e.target.value)}
//           >
//             <option value="7days">Last 7 Days</option>
//             <option value="30days">Last 30 Days</option>
//             <option value="90days">Last 90 Days</option>
//             <option value="thisMonth">This Month</option>
//             <option value="allTime">All Time</option>
//           </select>
//           <button 
//             onClick={goBack}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
//           >
//             Back to Tasks
//           </button>
//         </div>
//       </div>

//       {/* Summary Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Tasks</h3>
//           <p className="text-3xl font-bold">{summaryStats.totalTasks}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Completed Tasks</h3>
//           <p className="text-3xl font-bold">{summaryStats.completedTasks}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Completion Rate</h3>
//           <p className="text-3xl font-bold">{summaryStats.completionRate}%</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-2 text-gray-700">Tasks Per Day</h3>
//           <p className="text-3xl font-bold">{summaryStats.tasksPerDay}</p>
//         </div>
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Completion Rate by Day */}
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Completion Rate by Day</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={getCompletionRateByDayData()}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
//                 <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="completionRate" 
//                   stroke="#8884d8" 
//                   activeDot={{ r: 8 }}
//                   name="Completion Rate"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Task Distribution by Status */}
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Status Distribution</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={getTasksByStatusData()}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {getTasksByStatusData().map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={TASK_STATUS_COLORS[index % TASK_STATUS_COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [value, 'Tasks']} />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Productivity Trend */}
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Productivity Trend</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={getProductivityTrendData()}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => [value, 'Tasks']} />
//                 <Legend />
//                 <Bar dataKey="tasks" fill="#82ca9d" name="Tasks" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Task Growth Over Time */}
//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Growth Over Time</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart
//                 data={getTaskGrowthData()}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Area 
//                   type="monotone" 
//                   dataKey="totalTasks" 
//                   stackId="1"
//                   stroke="#8884d8" 
//                   fill="#8884d8" 
//                   name="Total Tasks"
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="completedTasks" 
//                   stackId="2"
//                   stroke="#82ca9d" 
//                   fill="#82ca9d" 
//                   name="Completed Tasks"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Daily Completion Heatmap */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-700">Daily Completion Rates</h3>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={getCompletionHeatmapData()}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis domain={[0, 100]} label={{ value: 'Completion %', angle: -90, position: 'insideLeft' }} />
//               <Tooltip 
//                 formatter={(value, name, props) => {
//                   return [
//                     `${value}% (${props.payload.completed}/${props.payload.total})`,
//                     'Completion Rate'
//                   ];
//                 }}
//               />
//               <Legend />
//               <Bar 
//                 dataKey="value" 
//                 name="Completion Rate" 
//                 fill="#8884d8"
//               >
//                 {getCompletionHeatmapData().map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={`rgb(${255 - Math.floor(entry.value * 2.55)}, ${255 - Math.floor(entry.value * 2.55)}, 255)`} 
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* No Data Warning */}
//       {summaryStats.totalTasks === 0 && (
//         <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-800">
//           <h3 className="font-bold mb-2">No Task Data</h3>
//           <p>There are no tasks in the selected time period. Try selecting a different time range or add some tasks.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskDashboard;
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { format, parseISO, startOfMonth, eachDayOfInterval } from "date-fns";
// import type { Task } from "../todo/page"; // Import Task as a type

// // Import charts from recharts
// import {
//   LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
//   CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

// const TaskDashboard = () => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedTimeRange, setSelectedTimeRange] = useState<string>("7days");
//   const router = useRouter();

//   useEffect(() => {
//     setIsLoading(true);
//     try {
//       const savedTasks = localStorage.getItem("tasks");
//       if (savedTasks) setTasks(JSON.parse(savedTasks));
//     } catch (e) {
//       console.error("Error loading tasks:", e);
//     }
//     setIsLoading(false);
//   }, []);

//   const goBack = () => router.push("/");

//   const getFilteredTasks = () => {
//     const today = new Date();
//     let startDate = new Date();

//     switch (selectedTimeRange) {
//       case "7days": startDate.setDate(today.getDate() - 7); break;
//       case "30days": startDate.setDate(today.getDate() - 30); break;
//       case "90days": startDate.setDate(today.getDate() - 90); break;
//       case "thisMonth": startDate = startOfMonth(today); break;
//       case "allTime": return tasks;
//       default: startDate.setDate(today.getDate() - 7);
//     }

//     return tasks.filter(task => {
//       const taskDate = parseISO(task.date);
//       return taskDate >= startDate && taskDate <= today;
//     });
//   };

//   const getCompletionRateByDayData = () => {
//     const filteredTasks = getFilteredTasks();
//     const tasksGroupedByDate: Record<string, { total: number; completed: number }> = {};

//     filteredTasks.forEach(task => {
//       if (!tasksGroupedByDate[task.date]) tasksGroupedByDate[task.date] = { total: 0, completed: 0 };
//       tasksGroupedByDate[task.date].total++;
//       if (task.completed) tasksGroupedByDate[task.date].completed++;
//     });

//     return Object.entries(tasksGroupedByDate)
//       .map(([date, counts]) => ({
//         date,
//         completionRate: Math.round((counts.completed / counts.total) * 100) || 0,
//         total: counts.total,
//         completed: counts.completed,
//       }))
//       .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
//         <div className="text-xl">Loading task data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-5">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Task Dashboard</h1>
//         <button onClick={goBack} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//           Back to Tasks
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskDashboard;
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO, startOfMonth } from "date-fns";
import type { Task } from "../todo/page";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("7days");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (e) {
      console.error("Error loading tasks:", e);
    }
    setIsLoading(false);
  }, []);

  const goBack = () => router.push("/");

  const getFilteredTasks = () => {
    const today = new Date();
    let startDate = new Date();

    switch (selectedTimeRange) {
      case "7days": startDate.setDate(today.getDate() - 7); break;
      case "30days": startDate.setDate(today.getDate() - 30); break;
      case "90days": startDate.setDate(today.getDate() - 90); break;
      case "thisMonth": startDate = startOfMonth(today); break;
      case "allTime": return tasks;
      default: startDate.setDate(today.getDate() - 7);
    }

    return tasks.filter(task => {
      const taskDate = parseISO(task.date);
      return taskDate >= startDate && taskDate <= today;
    });
  };

  const getCompletionRateByDayData = () => {
    const filteredTasks = getFilteredTasks();
    const tasksGroupedByDate: Record<string, { total: number; completed: number }> = {};

    filteredTasks.forEach(task => {
      if (!tasksGroupedByDate[task.date]) tasksGroupedByDate[task.date] = { total: 0, completed: 0 };
      tasksGroupedByDate[task.date].total++;
      if (task.completed) tasksGroupedByDate[task.date].completed++;
    });

    return Object.entries(tasksGroupedByDate)
      .map(([date, counts]) => ({
        date,
        completionRate: Math.round((counts.completed / counts.total) * 100) || 0,
        total: counts.total,
        completed: counts.completed,
      }))
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  };

  const chartData = getCompletionRateByDayData();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-5 flex items-center justify-center">
        <div className="text-xl">Loading task data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Dashboard</h1>
        <button onClick={goBack} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Back to Tasks
        </button>
      </div>

      {/* Line Chart - Task Completion Trends */}
      <div className="bg-white p-5 rounded shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Completion Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completionRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Total vs Completed Tasks */}
      <div className="bg-white p-5 rounded shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Total vs Completed Tasks</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="completed" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Completed vs Pending Tasks */}
      {/* <div className="bg-white p-5 rounded shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Completion Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={[
              { name: "Completed", value: completedTasks },
              { name: "Pending", value: pendingTasks }
            ]} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label dataKey={""}>
              {[
                { name: "Completed", color: COLORS[1] },
                { name: "Pending", color: COLORS[3] }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

      {/* Area Chart - Task Completion Trends */}
      {/* <div className="bg-white p-5 rounded shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Completion Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="completionRate" stroke="#8884d8" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default TaskDashboard;
