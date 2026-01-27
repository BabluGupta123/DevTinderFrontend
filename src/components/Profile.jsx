import React from "react";
import EditProfile from "./EditProfile";
import { UserCard } from "./UserCard";
import { useSelector } from "react-redux";

export const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex justify-center items-center m-10 gap-15">
      <EditProfile></EditProfile>
    </div>
  );
};
