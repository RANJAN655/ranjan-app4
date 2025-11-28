import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header} from "./components/index";
import { Outlet } from "react-router-dom";
import {Sidebar,Sidebar2,Sidebar3} from "./components/index";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
    <div className="w-full min-h-screen p-0 m-0  dark:bg-[#0f0f0fb1]
    pb-20 bg-gray-500 ">
      
        {/* Header controls sidebar */}
        <Header onToggle={(open) => setSidebarOpen(open)} />

        <div className="flex  w-full transition-all duration-300 h-auto">
          {/* Sidebar */}
          <Sidebar 
                className={`${sidebarOpen ? "max-[800px]:hidden transition-all duration-75 " : ""}`} 
                  sidebarOpen={sidebarOpen}
                       />
          <Sidebar3  className="max-[500px]:hidden transition-all duration-75" />
          {/* Main content (moves when sidebar opens) */}
          <main
            className={` flex-auto transition-all duration-300 ${
              sidebarOpen ? "ml-[240px] max-[800px]:ml-[70px] max-[500px]:ml-[0px] " : "ml-[70px] max-[500px]:ml-[0px]"
            } p-2`}
          >
            <Outlet />
          </main>
        </div>

          <Sidebar2/>
    </div>
  );
}

export default App;
