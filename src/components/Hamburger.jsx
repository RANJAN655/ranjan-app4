import { useEffect, useState } from "react";

function Hamburger({onToggle}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(onToggle) onToggle(open)
  },[open,onToggle])

  return (
    <div className="relative ">
      {/* hidden checkbox */}
      <input
        type="checkbox"
         id="menu-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
        className="hidden"
      />

      {/* Hamburger Button */}
      <label
        htmlFor="menu-toggle"
        className={`
          flex justify-center  items-center cursor-pointer
          w-10 h-10   hover:bg-black/25  rounded-full
        `}
      >
        <span
          className={`
            relative flex items-center justify-center 
            w-5 h-[2.5px] rounded-4xl bg-black  transition-all duration-200
            ${open ? "bg-transparent dark:bg-transparent" : "dark:bg-white"}
          `}
        >
          <span
            className={`dark:bg-white
              absolute w-5 h-[2.5px] rounded-4xl bg-black transition-all duration-200
              ${open ? "rotate-45 top-0" : "-top-[7px]"}
            `}
          ></span>

          <span
            className={`dark:bg-white
              absolute w-5 h-[2.5px] rounded-2xl bg-black transition-all duration-200
              ${open ? "-rotate-45 " : "top-[7px]"}
            `}
          ></span>
        </span>
      </label>

      {/* Dropdown menu */}
      
    </div>
  );
}

export default Hamburger;
