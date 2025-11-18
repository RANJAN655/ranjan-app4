import React from 'react'

function Search2() {
  return (
    <div>




import React, { useState } from "react";
import { Search, Mic } from "lucide-react";

function YouTubeSearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-[clamp(1px,50vw,60vw)] flex gap-4 justify-center items-center
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
  );
}

export default YouTubeSearchBar;


    </div>
  )
}

export default Search2