import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, }) {
  const previewUrl = appwriteService.getFilePreview(featuredImage); // full file URL
  // append mode=admin if needed
  const imageUrl = previewUrl.includes("?")
    ? previewUrl + "&mode=admin"
    : previewUrl + "?mode=admin";

  return (
    <Link to={`/post/${$id}`}>
        <div className=" p-2 w-full flex flex-col justify-center items-start
         hover:bg-black/20  rounded dark:hover:bg-white/10  ">
          <img src={imageUrl} className="rounded-xl" alt={title} />
        <h2 className="text-xl  text-black dark:text-white font-bold">{title}</h2>
        </div>

    </Link>
  );
}

export default PostCard;
