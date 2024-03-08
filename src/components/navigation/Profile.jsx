import React from "react";

const Profile = ({ user }) => {
  return (
    <>
      <div className="profile-logo">
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
    </>
  );
};

export default Profile;
