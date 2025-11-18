import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home,List,ImagePlus,AArrowDown, Angry } from "lucide-react"; // icons
import {Container} from './index'

function Sidebar({ sidebarOpen }) {
   const iconMap = {
      "Home": Home,
      "All Posts": List,
      "Add Post": ImagePlus,
      "Signup":AArrowDown,
      "Login":Angry,
  
      // add more mappings here as needed
    };
  

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]



  return (
    <>
      {/* ---------- MINI SIDEBAR (ALWAYS VISIBLE) ---------- */}
      <aside className="W-8 mt-24 ml-1 hidden sm:flex" >
        <nav className='flex'>
          <ul className='flex flex-col gap-4 mt-5'>

            {navItems.map((item) => {

  // ❗ Only show items that are active
  if (!item.active) return null;

  // ✔ Always store icon for matching item
  const Icon = iconMap[item.name];

  return (
    <li key={item.name} className="flex flex-col items-center gap-2">

      {/* ✔ show icon */}
      {/* {Icon && <Icon size={20} className="text-white" aria-hidden="true" />} */}

      {/* ✔ show button */}
      <button
        onClick={() => navigate(item.slug)}
        className=" flex justify-center items-center flex-col px-3 py-2.5 duration-200 bg-transparent  hover:bg-white/20 transition-all duration-75 rounded-xl"
      >
        {Icon && <Icon size={22} className="text-white" aria-hidden="true" />}
       <p className="text-[10px] mt-1">{item.name}</p>
      </button>

    </li>
  );
})}

          </ul>
          
        </nav>


        
        </aside>
     
      {/* ---------- FULL SIDEBAR (ONLY WHEN OPEN) ---------- */}
      <aside
        className={`fixed top-16 left-0 h-full bg-[#212121] w-[240px] z-40 
                    transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0 translate-y-11" : "-translate-x-full"}`}
      >
        <div className="mt-16 p-4">
          <a href="/" className="block py-2 hover:bg-[#383838] rounded px-3">Home</a>
          <a href="/posts" className="block py-2 hover:bg-[#383838] rounded px-3">All Posts</a>
          <a href="/logout" className="block py-2 hover:bg-[#383838] rounded px-3">Logout</a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
