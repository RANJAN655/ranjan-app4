import React, { useState, useRef, useEffect } from "react";
import { Search, ArrowLeft, Mic } from "lucide-react";

function YouTubeSearchBar() {
  const [focused, setFocused] = useState(false);

  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="flex items-center gap-3 w-[clamp(5vw,50vw,60vw)]">

      {/* ---------------------------------------------------------
           MOBILE FULL SCREEN SEARCH (only appears on mobile)
         --------------------------------------------------------- */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#111827] z-50 transition-all duration-300 
        px-3 py-2 flex items-center gap-3 md:hidden
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      >

        {/* Back button */}
        <ArrowLeft
          className="text-gray-200 w-6 h-6"
          onClick={() => setOpen(false)}
        />

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-full bg-[#1F2937] text-gray-200 pl-10 pr-4 py-2 rounded-full 
                     border border-gray-700 focus:border-blue-500 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Search:", e.target.value);
                setOpen(false);
              }
            }}
          />
        </div>
      </div>

      {/* ---------------------------------------------------------
           NORMAL HEADER (icon on mobile, full search bar on desktop)
         --------------------------------------------------------- */}
      <div className="flex items-center gap-3 w-full md:w-auto ">

        {/* MOBILE SEARCH ICON (desktop hidden) */}
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden flex absolute right-[16vw] top-1/2 -translate-y-1/2 bg-transparent px-2 py-1 
          shadow-black/40 rounded-full shadow-sm dark:shadow-white/10 "
        >
          <Search className="  text-dark font-extrabold dark:text-white  " />
        </button>

        {/* DESKTOP SEARCH BAR (mobile hidden) */}

        <div className="w-[clamp(1px,50vw,60vw)] hidden sm:flex gap-4 justify-center items-center
    ">
      <div className="relative flex w-full">
        
        {/* Search icon inside input */}
        {focused && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}

        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          className={`flex-auto w-[clamp(1px,30vw,40vw)]
            bg-[#111827] text-gray-200 placeholder-gray-400 min-w-0 flex-shrink
            ${focused ? "pl-10" : "pl-4"}
            py-2 rounded-l-full 
            border border-[#1E293B] focus:border-blue-500 
            transition-all duration-300`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* Search button */}
        <button className="bg-[#222B45] border border-[#1E293B] px-5 rounded-r-full hover:bg-blue-500 hover:text-white transition">
          <Search className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      <Mic className="text-red-500 hidden md:block" />
    </div>
        
      </div>
    </div>
  );
}

export default YouTubeSearchBar;
