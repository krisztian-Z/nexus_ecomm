"use client";
import React from "react";

import NavDesktop from "./NavDesktop";
import { NavMobile } from "./NavMovile";

import styles from "./NavigationBar.module.scss";
import Logo from "./Logo";

const title = <>Shop</>;
const NavigationBar = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  console.log(setActive);

  return (
    <div className={styles.Container}>
      <div className={styles.Left}>
        <Logo />
      </div>
      <div className={styles.Right}>
        <NavMobile
          active={active}
          setActive={setActive}
          user={user}
          handleLogout={handleLogout}
        />
        <NavDesktop
          active={active}
          setActive={setActive}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
