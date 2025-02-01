

"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FloatingDockDemo } from "@/components/floatingdock";

const ToDoWithCalendarAndTimer = () => {
  // State for the to-do list
  const [tasks, setTasks] = useState<{ date: string; task: string }[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [mountingKey, setMountingKey] = useState<string>("");

  // Timer states
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize client-side state
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
  }, []);

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

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerActive) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev === 0) {
            if (timerMinutes === 0) {
              setTimerActive(false);
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
  }, [timerActive, timerSeconds, timerMinutes]);

  // Add task
  const addTask = () => {
    if (currentTask.trim() !== "" && formattedDate) {
      setTasks([...tasks, { date: formattedDate, task: currentTask }]);
      setCurrentTask("");
    }
  };

  // Delete task
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Filter tasks by date
  const filteredTasks = formattedDate
    ? tasks.filter((task) => task.date === formattedDate)
    : [];

  if (!isClient || !mountingKey) {
    return <div className="min-h-screen bg-gray-100 p-5">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-center text-3xl font-bold mb-5">
        To-Do List with Calendar & Timer
      </h1>
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
        </div>

        {/* To-Do List Section */}
        <div className="bg-white p-5 rounded shadow w-full lg:w-2/3">
          <h2 className="text-xl font-bold mb-3">
            Tasks for {formattedDate || "today"}
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              key={`task-input-${mountingKey}`}
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="Add a task..."
              className="flex-grow p-2 border rounded"
              autoComplete="off"
              data-form-type="other"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <li
                  key={`task-${index}-${mountingKey}`}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{task.task}</span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks for this date.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-white p-5 rounded shadow mt-5">
        <h2 className="text-xl font-bold mb-3">Task Timer</h2>
        <div className="flex gap-2 mb-3">
          <input
            key={`timer-min-${mountingKey}`}
            type="number"
            value={timerMinutes}
            onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10) || 0)}
            placeholder="Minutes"
            className="w-20 p-2 border rounded"
            autoComplete="off"
            data-form-type="other"
          />
          <input
            key={`timer-sec-${mountingKey}`}
            type="number"
            value={timerSeconds}
            onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10) || 0)}
            placeholder="Seconds"
            className="w-20 p-2 border rounded"
            autoComplete="off"
            data-form-type="other"
          />
          <button
            onClick={() => setTimerActive(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={() => setTimerActive(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Stop
          </button>
          <button
            onClick={() => {
              setTimerMinutes(0);
              setTimerSeconds(0);
              setTimerActive(false);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <div className="text-center text-lg font-bold">
          {String(timerMinutes).padStart(2, "0")}:
          {String(timerSeconds).padStart(2, "0")}
        </div>
      </div>
      <FloatingDockDemo/>
    </div>
  );
};

export default ToDoWithCalendarAndTimer;


