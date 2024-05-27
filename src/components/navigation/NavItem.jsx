import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavItem.module.scss';

const NavItem = ({ title, variant, to, onClick, icon, isCart }) => {
  return (
    <Link 
      to={to} 
      className={`${styles.NavItem} ${styles[variant]} ${isCart ? styles['NavItem--cart'] : ''}`} 
      onClick={onClick}
    >
      {icon && <span className={styles.Icon}>{icon}</span>}
      {title && <span className={styles.Title}>{title}</span>}
    </Link>
  );
};

export default NavItem;
