import React, { useContext } from "react";
import { Context } from "../index";
import Loader from "./Loader";
import "../styles/ProfileStyles.css";

const Profile = () => {
  const { loading, user, isAuthenticated } = useContext(Context);
  return loading ? (
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  ) : (
    <div class="profile-container">
      <div class="profile-content">
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
