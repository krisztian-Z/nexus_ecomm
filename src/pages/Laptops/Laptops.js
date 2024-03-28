import React, { useState, useEffect } from 'react';
import './Laptops.css';
import axios from "axios"

const ProductCard = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.title}  />
      <h2>{product.title}</h2>
      <p>
        {showMore ? product.description : `${product.description.substring(0, 100)}...`}
        <span onClick={toggleShowMore} style={{ color: 'blue', cursor: 'pointer' }}>
          {showMore ? ' Read Less' : ' Read More...'}
        </span>
      </p>
      <p>Price: &#8364;{product.price}</p>
      
    </div>
  );
};

const LaptopsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [macData, setMacData]  = useState("")

  useEffect(() => {
    const initGetTransc = async () => {
      
      try {
        const response = await axios.get(
          "https://nexusserver-zzlm.onrender.com" +
            `/api/getalllaptop`,
         
        );
     setMacData(response.data)
    

      } catch (err) {
        
          console.log(err);
       
      }
    }

    initGetTransc()

  }, []);
  

 // if (loading) return <p>Loading...</p>;
 // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="products-title">Available MacBooks </h1>
      <div className="products-container">
      {
          Object.keys(macData).map((data, index) =>   {
            return ( 
            
            
             <ProductCard key={index} product={macData[data]} />
            
            )
          })
        }
       
        {/*products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
        <p>
              {macData[Object.keys(macData)]?.price}
              
            </p>
        */}
        {
          Array(3).map((data, index) =>   <p>fgt</p>)
        }
      </div>
    </div>
  );
};

export default LaptopsPage;