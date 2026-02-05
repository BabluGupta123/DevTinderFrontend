import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connetionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/connections`,
        { withCredentials: true },
      );

      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!connections) {
      fetchConnections();
    }
  }, []);

  if (!connections)
    return <div className="text-center mt-10">Loading connections...</div>;
  if (connections.length === 0)
    return <div className="text-center mt-10">No connections found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      {connections.map((user) => (
        <div
          key={user._id}
          className="card bg-base-200 shadow-md border border-base-300"
        >
          <div className="card-body flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoUrl || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  {user.age && <span>{user.age}</span>}
                  {user.age && user.gender && (
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  )}
                  {user.gender && (
                    <span className="capitalize">{user.gender}</span>
                  )}
                </div>

                {user.about && (
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {user.about}
                  </p>
                )}
              </div>
            </div>

            <Link
              to={`/chat/${user._id}/${user.firstName}`}
              className="btn btn-primary btn-sm"
            >
              Message
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
