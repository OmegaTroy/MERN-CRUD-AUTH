import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const TasksFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, editTask } = useTasks();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("done", task.done);
      }
    };
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data, even) => {
    even.preventDefault();
    // const { elements } = even.currentTarget;

    if (params.id) {
      editTask(params.id, data);
    } else {
      createTask(data);
    }
    const input = even.target.children[0];
    const textarea = even.target.children[1];

    input.value = "";
    textarea.value = "";
    navigate("/tasks");
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
            type="text"
            name="title"
            placeholder="Escribe un titulo"
            autoFocus
            {...register("title", { required: true })}
          />
          <textarea
            rows="3"
            name="description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
            placeholder="Escribe una descricción"
            {...register("description", { required: true })}
          ></textarea>
          <button className="btn btn-secondary">Save</button>
        </form>
      </div>
    </div>
  );
};
