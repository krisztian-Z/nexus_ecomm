import React, { useState } from 'react';
import './About.css'; 
 
const About = () => {
  
  const [showServices, setShowServices] = useState(false);

  const servicesList = [
    { title: "Exclusive Warranty", description: "Each device comes with a one-year exclusive warranty, ensuring your peace of mind with every purchase." },
    { title: "Customer Service", description: "Our dedicated customer service team is available 24/7 to help you with any inquiries or issues you may encounter." },
    { title: "Repair Network", description: "Access to a wide network of service centers for quick and reliable repairs." },
    { title: "Software Updates", description: "Regular software updates to keep your devices secure and performing optimally." },
    { title: "Trade-In Program", description: "Upgrade your old devices with our trade-in program, offering you discounts on your next purchase." },
    
  ];
  

  return (
    <div className="about-container">
      <div className="about-section box">
        <h1>About Us</h1>
        <p className='about-text'>
        
  Founded amidst Manchester's vibrant tech revolution, Nexus, Inc. stands as a pillar of innovation in consumer electronics. Over the past decade, our dedication to redefining user experience has driven us to create laptops and smartphones that surpass conventional expectations. Our products are a testament to our commitment to technology that integrates seamlessly into daily life, combining groundbreaking features with reliability and style. As Nexus continues to evolve, our passion for challenging the status quo and exploring new possibilities fuels our journey forward.


        </p>
      </div>

      <div className="mission-section box">
      <h2>Our Mission</h2>
        <p>
  Nexus, Inc.'s mission transcends the creation of exceptional electronics; it's about empowering people and communities through innovative technology. We believe in harnessing the power of tech to address societal challenges, enhance lifestyles, and promote environmental sustainability. Our approach to design and manufacturing emphasizes energy efficiency and aims to minimize our ecological footprint. By advancing the forefront of technology, we are committed to products that not only fulfill the needs of our users but also foster a more sustainable and inclusive future. In every endeavor, our goal is to inspire and lead by example, advocating for a world where technology and sustainability go hand in hand.
</p>

      </div>

      <div className="services-section box">
        <h2>What services do we offer?</h2>
        <button className="services-question-button" onClick={() => setShowServices(!showServices)}>
         <strong>See our services</strong> 
        </button>
        {showServices && (
          <div className="services-answer">
            <ul>
              {servicesList.map((service, index) => (
                <li key={index}>
                  <strong>{service.title}</strong>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="contact-section box">
        <h2>Contact Us</h2>
        <p>If you have any questions or need further information, please reach out to us:</p>
        <ul className="contact-info">
          <li><strong>Email:</strong> support@nexusinc.com</li>
          <li><strong>Phone:</strong> +44 20 7946 0321</li>
          <li><strong>Address:</strong> 789 Innovation Road, Manchester Science Park, Manchester, M15 6GZ, United Kingdom</li>
          <li>
            <strong>Follow us on social media:</strong>
            <a href="http://twitter.com/nexusinc" target="_blank" rel="noopener noreferrer">Twitter</a>,
            <a href="http://facebook.com/nexusinc" target="_blank" rel="noopener noreferrer">Facebook</a>,
            <a href="http://instagram.com/nexusinc" target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
