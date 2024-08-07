import React, { useContext } from "react";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TaskContext } from "../store/TaskContextProvider";

const AddTask = () => {
  const { addTask } = useContext(TaskContext);

  const showToastMessage = () => {
    toast("Task Added Successfully");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function handleOnAdd(data) {
    console.log("Add dagta ", data);
    
    addTask(data);
    reset();
    showToastMessage();
  }
  return (
    <div className=" flex flex-col bg-orange-50  border-orange-300 border-1 rounded-xl shadow-lg w-2/3">
      <div className="p-11 flex flex-col h-full  mb-12">
        <div className="flex w-full justify-center ">
          <h1 className="text-xl font-bold">Add New Task</h1>
        </div>
        <div className="w-full">
          <Form
            className="flex flex-col mt-9 "
            method="post"
            onSubmit={handleSubmit(handleOnAdd)}
          >
            <input
              hidden={true}
              name="uid"
              type="text"
              defaultValue={localStorage.getItem("loggedInUserId")}
              {...register("uid")}
            />
            <div className="font-light flex p-6 flex-col ">
              <label className="mt-2" htmlFor="title">
                Title
              </label>
              <input
                className="rounded-md mt-2 h-10  placeholder:text-slate-200 placeholder:italic"
                type="text"
                id="title"
                name="title"
                placeholder="Enter task's title"
                {...register("title", { required: "Title must not be empty" })}
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
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
                {...register("description", {
                  required: "Description must not be empty",
                  validate: (val) => {
                    if (val.length < 10) {
                      return "Description must be at least 10 characters long";
                    }

                    return true;
                  },
                })}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
              <label className="mt-7" htmlFor="cars">
                Task Status:
              </label>

              <select
                className="rounded-md mt-2 h-10 "
                name="status"
                id="status"
                {...register("status")}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-10 mx-11 h-10 bg-orange-400 bg-opacity-70 rounded-lg w-full font-bold  active:bg-opacity-35"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
