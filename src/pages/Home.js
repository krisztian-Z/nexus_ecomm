import React from 'react';
import './Home.css';
const Home= ({ setActive }) => {
  return (
    <div className="homepage">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Welcome to Nexus</h1>
          <p>This is the Nexus company homepage, your one-stop solution for laptops and mobiles.</p>
          <button onClick={() => setActive('products')}>Shop Now</button>
        </div>
        <img src="/images/laptop.png" alt="Laptop" className="laptop-img" />
      </div>
      
      
      <section className="best-deals">
        <h2>Best Deals</h2>
        <div className="deals-container">
          <div className="deal-card">
            <img src="/images/deal1.jpg" alt="Deal 1" />
            <h3>Product Name</h3>
            <p>Description of the product.</p>
            <button>View Details</button>
          </div>
          <div className="deal-card">
            <img src="/images/deal2.jpg" alt="Deal 2" />
            <h3>Product Name</h3>
            <p>Description of the product.</p>
            <button>View Details</button>
          </div>
        </div>
      </section>
  
     

     
    </div>
  );
};

export default Home;
