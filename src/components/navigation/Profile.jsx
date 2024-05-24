import React from "react";
import { MdDelete } from "react-icons/md"; 
import { FaEdit } from "react-icons/fa";

const Profile = ({ user }) => {
  return (
    <div className="profile-arrange  ">
      <div className="profile-logo image-header-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="logo"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginTop: "12px",
          }}
        />
      </div>
      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
        {user?.displayName}
      </p>
      
    </div>
  );
};

export default Profile;
