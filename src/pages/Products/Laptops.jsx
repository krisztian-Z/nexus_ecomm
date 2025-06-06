import React from 'react';
import { Link } from 'react-router-dom';
import './Laptops.css';

const Laptops = () => {
  return (
    <div className="laptops-page">
      <h1 className="laptops-title">Choose Your Laptop</h1>
      <div className="laptops-container">
        <Link to="/macs" className="laptop-section mac" style={{ textDecoration: 'none' }}>
          <img src='./images/macbook.webp' alt="MacBook" className="laptop-image" />
          <span className="laptop-title">MacBooks</span>
        </Link>
        
        <Link to="/other" className="laptop-section windows" style={{ textDecoration: 'none' }}>
          <img id='image' src="./images/windows.webp" alt="Windows Laptop" className="laptop-image" />
          <span className="laptop-title">Other Laptops</span>
        </Link>
      </div>
    </div>
  );
};

export default Laptops;
