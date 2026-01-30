import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connetionSlice";

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

  if (!connections) return <div>Loading connections...</div>;
  if (connections.length === 0) return <div>No connections found</div>;

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
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoUrl || "https://via.placeholder.com/150"}
                    alt="profile"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold leading-tight">
                  {user.firstName} {user.lastName}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span>{user.age}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="capitalize">{user.gender}</span>
                </div>

                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {user.about}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <button className="btn btn-primary btn-sm">Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
