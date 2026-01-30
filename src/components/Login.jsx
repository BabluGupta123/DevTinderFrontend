import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setError("");

      if (!emailId || !password) {
        return setError("Email and Password are required");
      }

      if (!isLogin) {
        if (!firstName || !lastName) {
          return setError("All fields are required");
        }

        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/signup`,
          { firstName, lastName, emailId, password, gender },
          { withCredentials: true },
        );
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <fieldset className="fieldset bg-base-200 rounded-box w-80 border p-6">
        <legend className="fieldset-legend text-lg font-bold text-center">
          {isLogin ? "Login" : "Signup"}
        </legend>

        <div className="flex justify-center mb-4">
          <button
            className={`btn btn-sm mr-2 ${isLogin ? "btn-primary" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn btn-sm ${!isLogin ? "btn-primary" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {!isLogin && (
          <>
            <label className="label">First Name</label>
            <input
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Gender</label>
            <select
              className="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button className="btn btn-neutral mt-4 w-full" onClick={handleAuth}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
