import React from "react";
import NavItem from "./NavItem";
import styles from "./NavDesktop.module.scss";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavDesktop = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <div className={styles.Container}>
      <div className={styles.NavItems}>
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
              title="Logout"
              variant="Filled"
              to="/"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <NavItem
              title="Login"
              variant="Filled"
              to="/auth"
              onClick={() => setActive("login")}
            />
          </>
        )}
      </div>
      <div className={styles.Cart}>
        <NavItem
          
          variant="Filled"
          to="/cart"
          icon={<FontAwesomeIcon icon={faShoppingCart} size="xs" />}
        />
      </div>
    </div>
  );
};

export default NavDesktop;
