import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginPages = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singin, isAuthenticated, errors: loginErrors } = useAuth();
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-md p-10 rounded-md bg-gray-900">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        {loginErrors.map((err, i) => (
          <div key={i} className="my-5 bg-red-500 p-2 text-white">
            {err}
          </div>
        ))}
        <form
          onSubmit={handleSubmit(async (values) => {
            singin(values);
          })}
          className="flex flex-col items-center justify-center gap-9 w-[20rem] text-gray-950 "
        >
          <input
            className="w-full h-10 rounded-md text-white outline-none bg-gray-800 p-2"
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-600 tracking-wide font-bold">
              Email is required
            </p>
          )}
          <input
            className="w-full h-10 rounded-md text-white outline-none bg-gray-800 p-2"
            type="password"
            name="password"
            placeholder="contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-600 tracking-wide font-bold">
              Password is required
            </p>
          )}
          <button className="px-8 py-2 bg-zinc-800 border border-gray-500 text-lg font-medium text-white rounded">
            Login
          </button>
        </form>
        <Link to={"/register"}>si no estas registrado</Link>
      </div>
    </div>
  );
};
