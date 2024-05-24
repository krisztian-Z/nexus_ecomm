import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; 

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.menuItem}>
        <Link to="/laptops">Laptops</Link>
        <div className={styles.subMenu}>
          <Link to="/macs">Mac</Link>
          <Link to="/other">PC</Link>
        </div>
      </div>
      <div className={styles.menuItem}>
        <Link to="/phones">Phones</Link>
        <div className={styles.subMenu}>
          <Link to="/phones/iphone">iPhone</Link>
          <Link to="/phones/android">Android</Link>
        </div>
      </div>
      <div className={styles.menuItem}>
        <Link to="/trending">Trending</Link>
        <div className={styles.subMenu}>
          <Link to="/trending/latest">Latest Products</Link>
          <Link to="/trending/popular">What's Trending</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;