import React from "react";
import clsx from "clsx";

import styles from "./NavItem.module.scss";

const NavItem = ({ title, variant = "Filled", to = "/", onClick }) => {
  return (
    <a
      href={to}
      className={clsx(styles.NavItem, styles[variant])}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

export default NavItem;
