import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!feed) getFeed();
  }, []);

  if (!feed || feed.length === 0) return <div>No users found</div>;

  return (
    <div className="flex justify-center mt-5">
      <UserCard user={feed[0]} />
    </div>
  );
};
