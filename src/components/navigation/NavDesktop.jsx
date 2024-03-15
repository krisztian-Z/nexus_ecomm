import React from "react";

import NavItem from "./NavItem";

import styles from "./NavDesktop.module.scss";
import Profile from "./Profile";

const NavDesktop = ({ active, setActive, user, handleLogout }) => {
  console.log(setActive);
  const userId = user?.uid;
  return (
    <div className={styles.Container}>
      <NavItem
        title="Home"
        variant="Outlined"
        to="/"
        onClick={() => setActive("home")}
      />
      <NavItem
        title="Laptops"
        variant="Outlined"
        to="/products"
        onClick={() => setActive("products")}
      />
      <NavItem
        title="About"
        variant="Outlined"
        to="/about"
        onClick={() => setActive("about")}
      />
      {userId ? (
        <>
          <Profile user={user} />
          <NavItem
            title="Log Out"
            variant="Filled"
            to="/"
            onClick={handleLogout}
          />
        </>
      ) : (
        <>
          <NavItem
            title="Log In"
            variant="Filled"
            to="/auth"
            onClick={() => setActive("login")}
          />
        </>
      )}
    </div>
  );
};

export default NavDesktop;
