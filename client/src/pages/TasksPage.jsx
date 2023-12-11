import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

export const TasksPage = () => {
  const { getTasks, tasks, deleteTask, editTask } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  const handleChange = (id, done) => {
    tasks.map((task) => {
      if (task._id === id) {
        editTask(id, { done: !done });
      }
    });
  };
  return (
    <>
      <div className="px-6 grid grid-cols-4 gap-5 mt-10">
        {tasks.length === 0 ? (
          <h2>no hay tareas</h2>
        ) : (
          tasks.map((task) => (
            <div
              className="card w-72 bg-neutral text-neutral-content"
              key={task._id}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <input
                  type="checkbox"
                  id="checked"
                  className="checkbox checkbox-sm"
                  name="done"
                  defaultChecked={task.done}
                  onChange={() => handleChange(task._id, task.done)}
                />
                <div className="card-actions justify-end">
                  <Link to={`/tasks/${task._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-ghost"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
