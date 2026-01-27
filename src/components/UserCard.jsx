import React from "react";

export const UserCard = ({ user }) => {
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

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};
