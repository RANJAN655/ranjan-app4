// components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeBtn";
import SubscribeBtn from "./Subsc";

// PostCard expects props: $id, title, body, authorId, authorName, authorAvatar
export default function PostCard(props) {
  // destructure commonly used fields
  const { $id, title, body, authorId, authorName, authorAvatar,} = props;

  // share handler uses Web Share API if available, otherwise copies URL
  const handleShare = async () => {
    const url = `${window.location.origin}/post/${$id}`; // link to this post
    try {
      if (navigator.share) {
        // native share on mobile/modern browsers
        await navigator.share({ title, url });
      } else {
        // fallback: copy to clipboard
        await navigator.clipboard.writeText(url);
        alert("Post URL copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("Unable to share");
    }
  };

//   const currentUser =  authService.getCurrentUser();
// console.log(currentUser.$id); // ⭐ authorId


  return (
    <div className=" rounded  w-full flex gap-1 ">


      {/* header: author and subscribe button */}
      {/* <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div>
            <Link to={`/profile/${authorId}`} className="font-semibold">{authorName || "Unknown"}
            <img 
              src={
                    authorAvatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${authorName || "User"}`
                   }
                    alt={authorName}
                   className="w-10 h-10 rounded-full"
                   />
              </Link>
            <div className="text-sm text-gray-500">2.3k views • 2 days ago</div>
          </div>
        </div>

    
        <SubscribeBtn channelId={props.userId} />

      </div> */}

      {/* content */}
      <p className="text-sm mb-3">{body?.slice(0, 150)}{body?.length > 150 ? "..." : ""}</p>

      {/* actions row */}
      <div className="flex gap-3 items-center">
        <LikeButton postId={$id} />
        <SubscribeBtn channelId={props.userId} />

        
        <button onClick={handleShare} className="px-3 py-1 rounded bg-blue-500 text-white">Share</button>
        <Link to={`/post/${$id}`} className="px-3 py-1 rounded bg-gray-100">Read</Link>

        
      </div>
    </div>
  );
}
