import React, { useEffect, useState } from "react";

import { generateId, updateLocalStorageArray } from "../utils/utilFunctions";
import { createContext } from "react";

export const TaskContext = createContext("");

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("Tasks has been modified, ", tasks);
  }, [tasks]);

  function addTask(payload) {
    const taskData = JSON.parse(JSON.stringify(payload));
    taskData.id = generateId("t");
    const newTasksArr = JSON.parse(JSON.stringify(tasks));
    newTasksArr.push(taskData);

    setTasks(() => newTasksArr);
    console.log("newTasksArr", newTasksArr);

    //   state.tasks.push(taskData);
    //syncing up with local storage
    updateLocalStorageArray(newTasksArr, "tasks");
  }

  function deleteTask(payload) {
    const index = tasks.findIndex((each) => {
      return each.id === payload;
    });
    //simply removing the object present at the index
    console.log("index to be deleted ", index);

    //creating the deep copy
    const newTasksArr = JSON.parse(JSON.stringify(tasks));
    newTasksArr.splice(index, 1);
    // const newTasksArr = [{ ...tasks }];

    setTasks(newTasksArr);
    //syncing up with local storage
    updateLocalStorageArray(newTasksArr, "tasks");
  }

  function editTask(payload) {
    console.log("Edit task has been called");

    const { id, newTaskData } = payload;
    const newTasksArr = JSON.parse(JSON.stringify(tasks));

    //retrieving the id
    const index = tasks.findIndex((each) => each.id === id);
    //setting up the new edited task value obj to the object present at the index
    newTasksArr[index] = newTaskData;

    setTasks(newTasksArr);

    //syncing up with local storage
    updateLocalStorageArray(newTasksArr, "tasks");
  }

  //this action will be dispatched on every render of the view task component
  function initialLoad() {
    console.log("Initial Load is executed ");

    const tempArr = localStorage.getItem("tasks");
    if (tempArr) {
      //this check is neccessary because in case if local state is already upto date (>0 elements)
      // that means the local storage is already in sync to no need to do anything.

      if (tasks.length === 0) {
        const newTasksArr = [];
        const parsedArr = JSON.parse(tempArr);
        parsedArr.map((each) => newTasksArr.push(each));
        setTasks(newTasksArr);
      }
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, initialLoad, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
