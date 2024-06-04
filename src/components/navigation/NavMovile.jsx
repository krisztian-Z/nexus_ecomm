import { useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";
import NavItem from "./NavItem";
import styles from "./NavMobile.module.scss";
import Profile from "./Profile";

export const NavMobile = ({ active, setActive, user, handleLogout }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className={styles.Container}>
      <div className={styles.Hamburger}>
        <Hamburger toggled={isOpen} size={40} toggle={setOpen} color={"black"} />
      </div>
      {isOpen && (
        <>
          <div className={styles.Overlay}>
            <div className={styles.NavWrapper}>
              <NavItem title="Home" variant="Outlined" to="/" onClick={() => setActive("home")} />
              <NavItem title="Laptops" variant="Outlined" to="/products" onClick={() => setActive("products")} />
              <NavItem title="About" variant="Outlined" to="/about" onClick={() => setActive("about")} />
              <NavItem title="Cart" variant="Outlined" to="/cart" />
              {user ? (
                <>
                  <Profile user={user} />
                  <NavItem title="Log Out" variant="Filled" to="/" onClick={handleLogout} />
                </>
              ) : (
                <NavItem title="Log In" variant="Filled" to="/auth" onClick={() => setActive("login")} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
