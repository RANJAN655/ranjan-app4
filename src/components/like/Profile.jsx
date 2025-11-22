// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";  
import SubscribeBtn from "./Subsc";
import PostCard from "./PostCar";

export default function ProfilePage() {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const prof = await appwriteService.getProfileByUserId(userId);
        const userPosts = await appwriteService.getPostsByUser(userId);

        setProfile(prof);
        setPosts(userPosts.documents || []);
      } catch (error) {
        console.error("Profile load error:", error);
      }

      setLoading(false);
    }

    load();
  }, [userId]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Banner */}
      <div className="h-40 bg-gray-200 rounded mb-4 flex items-end">
        <img 
          src={profile?.avatar || "/default-avatar.png"}
          alt={profile?.username}
          className="w-24 h-24 rounded-full border-4 -mb-12 ml-6" 
        />
      </div>

      {/* Name + Subscribe */}
      <div className="flex items-center justify-between mb-6 mt-8">
        <div>
          <h2 className="text-2xl font-bold">{profile?.username || "No name"}</h2>
          <p className="text-sm text-gray-600">{profile?.bio || "No bio"}</p>
        </div>

        <SubscribeBtn channelId={userId} />
      </div>

      {/* User Posts */}
      <h3 className="font-semibold mb-3">Posts</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.length === 0 && <div>No posts yet</div>}
        {posts.map((p) => (
          <PostCard key={p.$id} {...p} />
        ))}
      </div>

    </div>
  );
}
