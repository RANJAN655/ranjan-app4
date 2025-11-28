import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home,List,ImagePlus,AArrowDown, Angry, LogOut} from "lucide-react"; // icons
import {Container} from './index'
import { LogoutBtn } from "./index"

function Sidebar({ sidebarOpen,className }) {

  
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
      
     
      {/* ---------- FULL SIDEBAR (ONLY WHEN OPEN) ---------- */}
      <aside
        className={`z-10 fixed top-6 left-0 h-full
          bg-[#212121] w-[240px]   transition-all  duration-300
          
          ${sidebarOpen ? "translate-x-0 translate-y-11" : "-translate-x-full"}
          ${className}
          `}
      >
        <nav className='flex'>
          <ul className='flex flex-col gap-4 mt-5 ml-10'>

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
          <p className="text-[15px] mt-1">{item.name}</p>
         </button>

        </li>
          );
      })}

        {authStatus &&(
          <div className=" flex flex-col justify-center items-center gap-1">
            <LogOut/>
            <LogoutBtn />

          </div>
        )}
        </ul>
        

          
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
