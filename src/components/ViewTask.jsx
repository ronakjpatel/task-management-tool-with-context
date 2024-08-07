import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import ViewModal from "../Modal/ViewModal";
import EditTask from "./EditTask";
import { useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TaskContext } from "../store/TaskContextProvider";

const ViewTask = () => {
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  // const tasks = useSelector((state) => state.reducer1.tasks);

  const editedData = useActionData();
  const navigate = useNavigate();
  const { tasks, deleteTask, initialLoad, editTask } = useContext(TaskContext);

  useEffect(() => {
    if (editedData) {
      const payload = { id: editedData.id, newTaskData: editedData };
      // dispatch(taskActions.editTask(payload));
      editTask(payload);

      toast("Task Edited Successfully");
      //closing the already Opened Modal
      setOpen(false);
      navigate("/viewtask");
    }
  }, [editedData, open]);

  //dispatching this action on every render of this component just to state variable in sync with local storage
  // dispatch(taskActions.initialLoad());

  initialLoad();

  function handleOnClose() {
    setOpen(false);
  }

  //This function retuns the Tailwind CSS bg colour property depending on the status passed
  function getColor(statusType) {
    if (statusType === "Completed") {
      return "bg-green-400";
    } else if (statusType === "To Do") {
      return "bg-red-400";
    } else if (statusType === "In Progress") {
      return "bg-yellow-400";
    }
  }

  //function to dipatch the delete action for the given taskId
  function handleOnDelete(taskId) {
    const res = confirm("Are you sure you want to delete ?");

    if (res) {
      // dispatch(taskActions.deleteTask(taskId));
      deleteTask(taskId);
      toast("Task Removed Successfully");
    }
  }

  return (
    <>
      <div className="flex flex-col bg-orange-50 border border-orange-300 rounded-xl shadow-lg w-3/4 h-3/4 mx-auto my-40 p-4">
        <div className="w-full bg-orange-400 rounded-md mb-1 p-2 sticky top-0 text-lg">
          <div className="flex justify-around font-bold text-center">
            <div>Task Title</div>
            <div>Task Description</div>
            <div>Status</div>
          </div>
        </div>

        <ul className="flex flex-col overflow-hidden overflow-y-scroll h-full overflow-x-auto">
          {/* will be shown if tasks array is empty */}
          {tasks.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <div>There are no tasks. Please add them ...</div>
            </div>
          )}

          {tasks.map(
            (eachTask) =>
              eachTask.uid === localStorage.getItem("loggedInUserId") && (
                <li
                  key={eachTask.id}
                  className="mt-3 hover:cursor-pointer hover:shadow-2xl hover:border hover:rounded hover:opacity-80 font-thin w-full rounded-sm bg-orange-100 shadow-md mb-5 p-7 border-b-[1px] border-black"
                >
                  {/* This is the Modal component rendering at the root level so placing anywhere should be fine */}
                  <ViewModal isOpen={open}>
                    <EditTask onClose={handleOnClose} taskData={currentTask} />
                  </ViewModal>
                  <div className="flex justify-between p-2">
                    <div className="w-1/3 text-justify m-2">
                      {eachTask.title}
                    </div>
                    <div className="w-1/3 text-justify m-2">
                      {eachTask.description}
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`flex justify-center items-center font-medium mt-2 h-10 rounded-md placeholder:font-thin opacity-80 w-32 pb-2 italic ${getColor(
                          eachTask.status
                        )} `}
                      >
                        <span>{eachTask.status}</span>
                      </div>

                      <MdDelete
                        size={32}
                        className="ml-3  hover:text-red-600 "
                        onClick={() => {
                          console.log("task id", eachTask.id);
                          handleOnDelete(eachTask.id);
                        }}
                      />
                      <MdEditSquare
                        size={28}
                        className="ml-3 hover:text-indigo-400"
                        onClick={() => {
                          setOpen(true);
                          setCurrentTask(eachTask);
                        }}
                      />
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default ViewTask;

export async function handleEditedData({ request }) {
  const data = await request.formData();
  const editedData = Object.fromEntries(data.entries());
  return editedData;
}
