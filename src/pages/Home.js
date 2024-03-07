import React from 'react';


const HomePage = ({ setActive, active, user, handleLogout }) => {
  return (
    <div>
     
      <div className="homepage-content">
        {/* Homepage content goes here */}
        <h1>Welcome to Nexus</h1>
        <p>This is the Nexus company homepage, your one-stop solution for laptops and mobiles.</p>
      </div>
    </div>
  );
};

export default HomePage;
