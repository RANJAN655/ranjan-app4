// components/SubscribeBtn.jsx
import React, { useEffect, useState } from "react";
import subscriptionService from "../../appwrite/config";
import { useSelector } from "react-redux";

export default function SubscribeBtn({ channelId }) {
  const user = useSelector((state) => state.auth.userData);
  const userId = user?.$id;

  const [subscribed, setSubscribed] = useState(false);
  const [subsCount, setSubsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // INITIAL LOAD
  useEffect(() => {
    if (!channelId) return;

    let mounted = true;

    async function load() {
      setLoading(true);

      const count = await subscriptionService.subscribersCount(channelId);
      if (mounted) setSubsCount(count);

      if (userId) {
        const isSub = await subscriptionService.isSubscribed(channelId, userId);
        if (mounted) setSubscribed(isSub);
      } else {
        if (mounted) setSubscribed(false);
      }

      if (mounted) setLoading(false);
    }

    load();
    return () => (mounted = false);
  }, [channelId, userId]);

  // TOGGLE SUBSCRIBE
  const toggleSubscribe = async () => {
    if (!userId) return alert("Login first");

    const previous = subscribed;

    // OPTIMISTIC UI
    setSubscribed(!previous);
    setSubsCount((c) => (previous ? c - 1 : c + 1));

    try {
      if (previous) {
        await subscriptionService.unsubscribe(channelId, userId);
      } else {
        await subscriptionService.subscribe(channelId, userId);
      }
    } catch (err) {
      console.log("Toggle subscribe error:", err);

      // REVERT ON ERROR
      setSubscribed(previous);
      setSubsCount((c) => (previous ? c + 1 : c - 1));
    }
  };

  return (
    <button
      disabled={loading}
      onClick={toggleSubscribe}
      className={
        subscribed
          ? "px-4 py-1 rounded-full bg-green-600"
          : "px-4 py-1 rounded-full bg-red-600 text-white"
      }
    >
      {subscribed ? "Subscribed ✓" : "Subscribe"} • {subsCount}
    </button>
  );
}
