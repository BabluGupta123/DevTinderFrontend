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
    <div className="flex flex-wrap  p-4 flex-col  ">
      {connections.map((user) => (
        <div
          key={user._id}
          className="card w-full  bg-base-100 shadow flex flex-row justify-between h-40 border border-gray-500"
        >
          <div className="card-body flex flex-row justify-center items-center">
            <div className="rounded-full bg-red h-full">
              <img
                src={user.photoUrl}
                alt=""
                className="p-2 h-30 w-30 rounded-[50%] my-auto"
              />
            </div>

            <div className="flex items-center flex-col justify-center">
              <h2 className="card-title">
                {user.firstName} {user.lastName}
              </h2>
              <p>{user.about}</p>

              <div className="flex gap-2 text-gray-300">
                <p>{user.age}</p>
                <p>{user.gender}</p>
              </div>
            </div>
          </div>

          <div className="w-[50%] flex items-center pl-20">
            <button className=" btn btn-primary p-4 rounded-2xl">
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
