// components/LikeButton.jsx
import React, { useEffect, useState } from "react"; // react basics
import appwriteService from "../../appwrite/config"; // our service file
import { useSelector } from "react-redux"; // to get logged-in user from redux

export default function LikeButton({ postId }) {
  // get user data from redux store (assumes you store auth.userData)
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id; // safe access, undefined if not logged in

  // React state to track liked status and count
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true); // optional: show spinner during initial load

  // effect: run when component mounts or when postId or userId changes
  useEffect(() => {
    let mounted = true; // avoid state updates after unmount

    async function init() {
      setLoading(true); // start loading
      // fetch likes count
      try {
        const likes = await appwriteService.getLikesCount(postId);
        if (!mounted) return;
        setCount(likes);
        // check if current user has liked this post
        const isLiked = await appwriteService.isLiked(postId, userId);
        if (!mounted) return;
        setLiked(isLiked);
      } catch (err) {
        console.error("Like init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    // cleanup
    return () => {
      mounted = false;
    };
  }, [postId, userId]);

  // toggles like on click
  const toggleLike = async () => {
    // require login
    if (!userId) {
      return alert("Please login to like posts");
    }

    // optimistic UI update: change UI immediately (gives snappy feel)
    if (liked) {
      setLiked(false);
      setCount((c) => Math.max(0, c - 1)); // safe decrement
    } else {
      setLiked(true);
      setCount((c) => c + 1); // increment
    }

    try {
      // call backend to persist change
      if (liked) {
        // if UI showed liked true, we need to remove it on server
        await appwriteService.unlikePost(postId, userId);
      } else {
        // otherwise create like
        await appwriteService.likePost(postId, userId);
      }
    } catch (err) {
      // on error revert optimistic update and show console error
      console.error("Toggle like error:", err);
      // revert
      setLiked((prev) => !prev);
      setCount((c) => (liked ? c + 1 : Math.max(0, c - 1)));
      alert("Could not update like. Try again.");
    }
  };

  // render simple button
  return (
    <button
      onClick={toggleLike} // click handler
      disabled={loading} // disable while initial loading
      className={` font-bold text-5 px-2 py-1 rounded-full flex items-center gap-2  bg-black/40 dark:bg-white/40
        ${liked? "bg-green-200 text-black dark:bg-green-200 dark:text-black": " "}
        `}
      aria-pressed={liked} // accessibility
    >
      {/* show thumbs up and text based on liked state */}
      <span>{liked ? "👍" : "👍"}</span>
      {/* show count */}
      <span className="text-sm opacity-70"> {count} </span>
    </button>
  );
}
