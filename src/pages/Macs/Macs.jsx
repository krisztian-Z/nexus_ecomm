import React, { useState, useEffect } from "react";
import "../Other/OtherLaptops.css";
import { db } from "../../firebase";
import { writeBatch, doc } from "firebase/firestore";

const ProductCard = ({ product, user }) => {
  const ratingValue = parseFloat(product.ratings.split("/")[0]);
  const totalReviews = product.ratings.match(/\((\d+)\sreviews\)/)[1];

  const starPercentage = (ratingValue / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Price: &#8356;{product.price}</p>
        <p className="stock">Stock: {product.stock}</p>
        <div className="rating">
          <div className="star-ratings-css">
            <div
              className="star-ratings-css-top"
              style={{ width: starPercentageRounded }}
            >
              <span>★★★★★</span>
            </div>
            <div className="star-ratings-css-bottom">
              <span>★★★★★</span>
            </div>
          </div>

          <span className="total">({totalReviews} reviews)</span>
        </div>

        {
      user.email.includes("admin.com") ? <> <div className="updateicons">
          <button className="updateButton">update</button>
          <button
            style={{ backgroundColor: "rgb(211, 48, 48) " }}
            className="updateButton"
          >
            delete
          </button>
        </div>
        </>   : <button className="add-to-cart">Add to Cart</button>   }
         
      </div>
        
    </div>
  );
};

const Macs = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm here

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://nexus2024.onrender.com/api/macs");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Save to Firestore using batch
        const batch = writeBatch(db);
        data.forEach((product) => {
          const docRef = doc(db, "macs", product._id);
          batch.set(docRef, product);
        });
        await batch.commit();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="title-and-search">
        <h1 className="products-title">MacBook Laptops</h1>
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              setFilteredProducts(products);
            } else {
              const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(value.toLowerCase())
              );
              setFilteredProducts(filtered);
            }
          }}
          value={searchTerm}
          className="search-input"
        />
      </div>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Macs;
