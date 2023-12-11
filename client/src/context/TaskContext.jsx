import { useContext, createContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";
const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("el contexto no existe");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);

  async function editTask(id, task) {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      setErrors([error.response.data]);
    }
  }

  async function getTasks() {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      setErrors([error.response.data]);
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      setErrors([error.response.data]);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status == 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setErrors([error.response.data]);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    return res;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        editTask,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
