import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home,List,ImagePlus,AArrowDown, Angry } from "lucide-react"; // icons
import {Container} from './index'

function Sidebar() {
  console.log("SIDEBAR2 RENDERED");

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
      <aside className="
  fixed bottom-0 left-0 right-0 z-50
  bg-white/80 dark:bg-gray-700 
  border-t border-gray-500
  flex items-center justify-around
  h-16
  pb-[env(safe-area-inset-bottom)]
  backdrop-blur-md sm:hidden
">

      <nav className='flex'>
          <ul className='flex  gap-24 '>

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
      <div
        onClick={() => navigate(item.slug)}
        className=" flex justify-center items-center flex-col px-3 py-0 transition-all duration-75 
         dark:hover:bg-white/20 hover:bg-black/40  rounded-xl"
      >
        {Icon && <Icon size={20} className="text-black dark:text-white font-extrabold" aria-hidden="true" />}
       <p className="text-[9px] mt-1 text-black dark:text-white">{item.name}</p>
      </div>

    </li>
  );
})}

          </ul>
          
        </nav>


        
        </aside>
     
      {/* ---------- FULL SIDEBAR (ONLY WHEN OPEN) ---------- */}
      
    </>
  );
}

export default Sidebar;
