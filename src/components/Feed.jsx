import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFromFeed } from "../utils/feedSlice";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data || res.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleAction = async (status, toUserId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeFromFeed(toUserId));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (feed.length === 0) getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return (
      <div className="flex justify-center text-2xl mt-10">No users found</div>
    );

  return (
    <div className="flex justify-center mt-5">
      <UserCard
        user={feed[0]}
        onInterested={() => handleAction("interested", feed[0]._id)}
        onIgnore={() => handleAction("ignored", feed[0]._id)}
      />
    </div>
  );
};
