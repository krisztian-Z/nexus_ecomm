import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; 

const Dashboard = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.menuItem}>
                <button>Laptops</button>
                <div className={styles.subMenu}>
                    <Link to="/laptops/mac">Mac</Link>
                    <Link to="/laptops/pc">PC</Link>
                </div>
            </div>
            <div className={styles.menuItem}>
                <button>Phones</button>
                <div className={styles.subMenu}>
                    <Link to="/phones/apple">Apple</Link>
                    <Link to="/phones/android">Android</Link>
                </div>
            </div>
            <div className={styles.menuItem}>
                <button>Trending</button>
                <div className={styles.subMenu}>
                    <Link to="/trending/latest">Latest Products</Link>
                    <Link to="/trending/popular">What's Popular</Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;