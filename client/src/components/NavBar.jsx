import { Link,useNavigate } from "react-router-dom";
import {useEffect} from 'react'
import {useAuth} from '../context/AuthContext'

const NavBar = () => {
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useAuth();
  useEffect(() => {
    if (isAuthenticated) navigate("/login");
    console.log(isAuthenticated)
  }, [isAuthenticated]);
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <ul className="p-2">
                <li>
                  <Link to={"/add-task"}>New tasks</Link>
                </li>
                <li>
                  <Link to={"/tasks"}>Tasks</Link>
                </li>
              </ul>
            </li>
            <button onClick={()=>{
          logout()
          console.log(isAuthenticated)
          }}>salir</button>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Tasks Mern</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/add-task"}>New tasks</Link>
          </li>
          <li>
            <Link to={"/tasks"}>Tasks</Link>
          </li>
        </ul>
        <button onClick={()=>{
          logout()
          console.log(isAuthenticated)
          }}>salir</button>
      </div>
    </div>
  );
};
export default NavBar;
