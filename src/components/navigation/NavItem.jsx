// NavItem.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavItem.module.scss';
import { CartContext } from '../../../src/pages/Cart/CartContext'; // Ensure the correct path

const NavItem = ({ title, variant, to, onClick, icon, isCart }) => {
  const { totalItems } = useContext(CartContext);

  return (
    <Link 
      to={to} 
      className={`${styles.NavItem} ${styles[variant]} ${isCart ? styles['NavItem--cart'] : ''}`} 
      onClick={onClick}
    >
      {icon && <span className={styles.Icon}>{icon}</span>}
      {title && <span className={styles.Title}>{title}</span>}
      {isCart && totalItems > 0 && (
        <span className={styles.Badge}>{totalItems}</span>
      )}
    </Link>
  );
};

export default NavItem;
