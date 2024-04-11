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
          <div className="flex-row">
            <div className="about-section box">
            <h1>About Us</h1>
            
<p>
  Founded amidst Manchester's vibrant tech revolution, Nexus, Inc. stands as a pillar of innovation in consumer electronics. Since our inception over a decade ago, we have been committed to redefining the user experience. Our journey began with a passion for blending cutting-edge technology with daily life, which has led to the creation of laptops and smartphones that not only meet but exceed conventional expectations. Today, Nexus products are celebrated for their groundbreaking features, reliability, and stylish design. As we continue to grow and evolve, our passion for innovation remains at the heart of our company, driving us to explore new possibilities and redefine what's possible in consumer technology.
</p>
<img src="/images/office2.jpg" alt="Second Office" className="office-image" style={{ marginTop: '1rem' }} />
          <p></p>
            </div>
            <div className="mission-section box">
            <h2>Our Mission</h2><p>
              <p>
                   
              </p>

              
            </p>
<img src="/images/office.jpg" alt="Office" className="office-image" />

<p>
  Nexus, Inc.'s mission transcends the creation of exceptional electronics; our core objective is to empower individuals and communities through innovative technology. We believe in the potential of technology to solve pressing societal challenges, enhance everyday life, and promote environmental sustainability. Our approach to design and manufacturing is deeply rooted in energy efficiency and reducing our ecological footprint. We are committed to pushing the boundaries of technology, ensuring our products not only meet the needs of our customers but also contribute to a more sustainable and equitable world. Through our efforts, we aim to inspire and lead by example, advocating for a future where technology and sustainability are intertwined.
</p>

            </div>
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
