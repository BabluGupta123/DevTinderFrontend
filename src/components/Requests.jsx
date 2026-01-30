import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/requests/received`,
        { withCredentials: true },
      );

      const requestList = res.data.data || res.data;

      dispatch(addRequests(requestList));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const reviewRequest = async (status, fromUserId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/review/${status}/${fromUserId}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(fromUserId));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (requests.length === 0) {
      fetchRequests();
    }
  }, []);

  if (!Array.isArray(requests)) return null;
  if (requests.length === 0)
    return (
      <div className="flex justify-center mt-10 font-bold text-2xl">
        No pending requests
      </div>
    );

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {requests.map((req) => (
        <div key={req._id} className="card w-80 bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title">
              {req.fromUserId.firstName} {req.fromUserId.lastName}
            </h2>

            <p>{req.fromUserId.about}</p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-success btn-sm"
                onClick={() => reviewRequest("accepted", req.fromUserId._id)}
              >
                Accept
              </button>

              <button
                className="btn btn-error btn-sm"
                onClick={() => reviewRequest("rejected", req.fromUserId._id)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
