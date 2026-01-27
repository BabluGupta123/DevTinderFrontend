import React from "react";

const SelfProfile = ({ user }) => {
  if (!user) return null;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="mt-5"
          src={user.photoUrl || "https://via.placeholder.com/400"}
          alt="Photo"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>

        <p>
          {user.age} {user.gender}
        </p>

        <p>{user.about}</p>
      </div>
    </div>
  );
};

export default SelfProfile;
