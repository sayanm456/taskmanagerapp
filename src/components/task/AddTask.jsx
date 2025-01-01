import React, { useContext, useEffect, useRef, useState } from "react";
import TaskContext from "../../contexts/tasks/TaskContext";
import AuthContext from "../../contexts/auth/AuthContext";

const AddTask = () => {
  const ref = useRef(null);
  const { createTask } = useContext(TaskContext);
  const { users, getUsers } = useContext(AuthContext);

  const [newtask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "To Do",
    priority: "Medium",
    assigned_user: {
      _id: "",
      name: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getUsers();
  }, []);

  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      due_date: "",
      status: "To Do",
      priority: "Medium",
      assigned_user: {
        _id: "",
        name: "",
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'assigned_user') {
      const selectedUser = users.find(user => user._id === value);
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: {
          _id: selectedUser._id,
          name: selectedUser.name
        }
      }));
    } else {
      setNewTask((prevTask) => ({
        ...prevTask,
        [name]: value
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    createTask(newtask.title, newtask.description, newtask.due_date, newtask.status, newtask.priority, newtask.assigned_user);
    resetForm();

  };

  const handleOpenModal = () => {
    ref.current.removeAttribute('aria-hidden');
    ref.current.classList.remove("hidden");
    setIsOpen(false)
  };

  const handleCloseModal = () => {
    ref.current.setAttribute('aria-hidden', 'true');
    ref.current.classList.add("hidden");
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-row-reverse mr-4 mt-3">
        <div className="flex">
          {/* Modal Toggle Button */}
          <button
            type="button"
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            data-bs-toggle="modal"
            onClick={handleOpenModal}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-serif rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New Task
          </button>
        </div>

        {/* Modal */}
        <div
          ref={ref}
          id="default-modal"
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden pl-80 fixed top-0 right-0 left-0 z-50 justify-center items-end md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <form className="sticky space-y-4">
              <div className="pl-4 pb-2 mt-5 grid grid-cols-5 gap-x-3 gap-y-5 sm:grid-cols-6">

                {/* Title */}
                <div className="col-span-full">
                  <label htmlFor="title" className="block text-sm/6 font-serif text-gray-900">
                    Title
                  </label>
                  <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={newtask.title}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      placeholder="title"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm/6 font-serif text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      name="description"
                      id="description"
                      value={newtask.description}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      placeholder="description"
                      onChange={handleChange}
                      required/>
                  </div>
                </div>

                {/* Due Date */}
                <div className="col-span-full">
                  <label htmlFor="due_date" className="block text-sm/6 font-serif text-gray-900">
                    Due Date
                  </label>
                  <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="date"
                      name="due_date"
                      id="due_date"
                      value={newtask.due_date}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                  <label htmlFor="status" className="block text-sm/6 font-serif text-gray-900">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={newtask.status}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-none sm:text-sm/6"
                    onChange={handleChange}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="col-span-3">
                  <label htmlFor="priority" className="block text-sm/6 font-serif text-gray-900">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newtask.priority}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-none sm:text-sm/6"
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Assigned User */}
                <div className="col-span-full">
                  <label htmlFor="assigned_user" className="block text-sm/6 font-serif text-gray-900">
                    Assigned To:
                  </label>
                  <select
                    id="assigned_user"
                    name="assigned_user"
                    value={newtask.assigned_user._id || ""}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-none sm:text-sm/6"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Assigned User</option>
                    {users?.length === 0 && <option>--No User Available--</option>}
                    {users?.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="col-span-8 px-4 py-3 gap-x-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-serif rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={newtask.title.length < 5 || newtask.description.length < 5 || !newtask.due_date || !newtask.assigned_user._id}
                    onClick={handleClick}
                    type="button"
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-serif rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
