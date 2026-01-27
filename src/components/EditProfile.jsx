import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { UserCard } from "./UserCard";
import SelfProfile from "./SelfProfile";

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        age,
        photoUrl,
        about,
        gender,
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/profile/edit`,
        payload,
        { withCredentials: true },
      );

      dispatch(addUser(res.data.user || res.data));
      setError("");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center gap-10">
      <fieldset className="fieldset bg-base-200 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Edit Profile</legend>

        <input
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="input"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <input
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          className="input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
          Save Profile
        </button>
      </fieldset>

      <SelfProfile
        user={{ firstName, lastName, age, gender, about, photoUrl }}
      />
    </div>
  );
};

export default EditProfile;
