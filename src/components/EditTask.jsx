import React from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
const EditTask = ({ onClose, taskData }) => {
  console.log("not edited data", taskData);

  return (
    <div className=" fixed flex flex-col bg-orange-50  border-orange-300 border-1 rounded-xl shadow-lg w-1/3 h-[95%]">
      <div className="p-11 flex flex-col h-full  mb-12">
        <div className="flex w-full justify-center ">
          <h1 className="text-xl font-bold">Edit Task</h1>
        </div>
        <div className="w-full">
          <Form className="flex flex-col mt-9 " method="post">
            <div className="font-light flex p-6 flex-col ">
              {/* this will have the id of the task which will be used when we are going to update the data for the 
              specific task this willl be HIDDEN it is just for our reference*/}
              <input
                hidden={true}
                name="id"
                type="text"
                defaultValue={taskData.id}
              />

              <input
                hidden={true}
                name="uid"
                type="text"
                defaultValue={taskData.uid}
              />
              <label className="mt-2" htmlFor="title">
                Title
              </label>
              <input
                className="rounded-md mt-2 h-10  placeholder:text-slate-200 placeholder:italic"
                type="text"
                id="title"
                name="title"
                placeholder="Enter task's title"
                defaultValue={taskData.title}
              />
              <label className="mt-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="rounded-md mt-2   placeholder:text-slate-200 placeholder:italic"
                name="description"
                id="description"
                rows={8}
                cols={40}
                placeholder="Enter task's description"
                defaultValue={taskData.description}
              />

              <label className="mt-7" htmlFor="cars">
                Task Status:
              </label>

              <select
                className="rounded-md mt-2 h-10 "
                name="status"
                id="status"
                defaultValue={taskData.status}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="mt-10 mx-11 h-10 bg-orange-400 bg-opacity-70 rounded-lg w-full font-bold  active:bg-opacity-35"
                type="submit"
              >
                Edit Task
              </button>
              <button
                className="mt-10 mx-11 h-10 text-red-400 bg-transparent  rounded-lg w-full font-bold  active:bg-opacity-35"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
