import React, { useEffect, useState, useContext } from "react";
import NavItem from "./NavItem";
import styles from "./NavDesktop.module.scss";
import Profile from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../../src/pages/Cart/CartContext"; // Ensure the correct path

const NavDesktop = ({ active, setActive, user, handleLogout }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { totalItems } = useContext(CartContext); // Access totalItems from CartContext

  useEffect(() => {
    if (user) {
      const adminEmails = [
        process.env.REACT_APP_ADMIN_EMAIL_1,
        process.env.REACT_APP_ADMIN_EMAIL_2,
      ];
      setIsAdmin(adminEmails.includes(user.email));
    }
  }, [user]);

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
        {user ? (
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
          <NavItem
            title="Login"
            variant="Filled"
            to="/auth"
            onClick={() => setActive("login")}
          />
        )}
      </div>
      {!isAdmin && (
        <div className={styles.Cart}>
          <NavItem
            variant="Filled"
            to="/cart"
            icon={<FontAwesomeIcon icon={faShoppingCart} size="xs" />}
            isCart // Pass the isCart prop to show cart item count
          />
          <span className={styles.CartCount}>{totalItems}</span> {/* Display total items in cart */}
        </div>
      )}
    </div>
  );
};

export default NavDesktop;
