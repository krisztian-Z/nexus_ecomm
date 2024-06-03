import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import styles from "./NavDesktop.module.scss";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
//import { auth } from "../../firebase//"; 

const NavDesktop = ({ active, setActive, user, handleLogout }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const adminEmails = [
        process.env.REACT_APP_ADMIN_EMAIL_1,
        process.env.REACT_APP_ADMIN_EMAIL_2,
      ];
      setIsAdmin(adminEmails.includes(user.email));
    }
  }, [user]);

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
      {/* Conditionally render the Cart link based on isAdmin state */}
      {!isAdmin && (
        <div className={styles.Cart}>
          <NavItem
            variant="Filled"
            to="/cart"
            icon={<FontAwesomeIcon icon={faShoppingCart} size="xs" />}
          />
        </div>
      )}
    </div>
  );
};

export default NavDesktop;


