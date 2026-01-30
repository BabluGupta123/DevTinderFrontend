import React from "react";

export const UserCard = ({ user, onInterested, onIgnore }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-200 w-96 shadow-xl overflow-hidden">
      <figure className="h-72 w-full bg-base-300 overflow-hidden">
        <img
          src={user.photoUrl || "https://via.placeholder.com/400"}
          alt="Profile"
          className="w-full h-full object-cover object-top"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm text-gray-500">
          {user.age} • <span className="capitalize">{user.gender}</span>
        </p>

        <p className="text-sm text-gray-400 line-clamp-3">{user.about}</p>

        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-error flex-1 mr-2"
            onClick={onIgnore}
          >
            Ignore
          </button>

          <button className="btn btn-primary flex-1" onClick={onInterested}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
