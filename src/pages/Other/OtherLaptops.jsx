import React, { useEffect, useState, useContext } from 'react';
import './OtherLaptops.css';
import { db } from '../../firebase'; 
import { writeBatch, doc, updateDoc, increment } from "firebase/firestore";
import { CartContext } from '../Cart/CartContext'; // Import CartContext

const OtherLaptops = ({ user }) => { // Accept user as a prop
  const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://nexus2024.onrender.com/api/windows');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const batch = writeBatch(db);
        data.forEach(product => {
          const docRef = doc(db, 'windows', product._id); 
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

  const handlePurchase = async (product) => {
    try {
      const productRef = doc(db, 'windows', product._id);
      await updateDoc(productRef, {
        stock: increment(-1) // Decrease stock by 1 when purchased
      });
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };

  const ratingValue = (ratings) => ratings ? parseFloat(ratings.split('/')[0]) : 0;
  const totalReviews = (ratings) => {
    const match = ratings ? ratings.match(/\((\d+)\sreviews\)/) : null;
    return match ? match[1] : '0';
  };
  const starPercentage = (ratingValue) => (ratingValue / 5) * 100;
  const starPercentageRounded = (starPercentage) => `${(Math.round(starPercentage / 10) * 10)}%`;
  const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL_1 || user?.email === process.env.REACT_APP_ADMIN_EMAIL_2;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="title-and-search">
        <h1 className="products-title">Windows Laptops</h1>
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
            if (value.trim() === "") {
              setFilteredProducts(products);
            } else {
              const filtered = products.filter(product =>
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
        {filteredProducts.map((product) => {
          const ratingVal = ratingValue(product.ratings);
          const totalRev = totalReviews(product.ratings);
          const starPerc = starPercentage(ratingVal);
          const starPercRounded = starPercentageRounded(starPerc);

          return (
            <div key={product._id} className="product-card">
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
                    <div className="star-ratings-css-top" style={{width: starPercRounded}}>
                      <span>★★★★★</span>
                    </div>
                    <div className="star-ratings-css-bottom">
                      <span>★★★★★</span>
                    </div>
                  </div>
                  <span className='total'>({totalRev} reviews)</span>
                </div>
                {isAdmin && (
                  <div className='updateicons'>
                    <button className='updateButton'>Update</button>
                    <button style={{backgroundColor : "rgb(211, 48, 48)"}} className='updateButton'>Delete</button>
                  </div>
                )}
                {!isAdmin && (
                  <button className="add-to-cart" onClick={() => { addToCart(product); handlePurchase(product); }}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherLaptops;








// cz first attempt
// import React, { useEffect, useState, useContext } from 'react';
// import './OtherLaptops.css';
// import { db } from '../../firebase'; 
// import { writeBatch, doc, updateDoc, FieldValue } from "firebase/firestore";
// import { CartContext } from '../Cart/CartContext'; // Import CartContext

// const ProductCard = ({ product, addToCart, handlePurchase, user }) => { // Pass user as a prop
//   const ratingValue = parseFloat(product.ratings.split('/')[0]);
//   const totalReviews = product.ratings.match(/\((\d+)\sreviews\)/)[1];
//   const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL_1 || user?.email === process.env.REACT_APP_ADMIN_EMAIL_2;

//   const starPercentage = (ratingValue / 5) * 100;
//   const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

//   return (
//     <div className="product-card">
//       <div className="product-image">
//         <img src={product.image} alt={product.title} />
//       </div>
//       <div className="product-info">
//         <h2>{product.title}</h2>
//         <p className="description">{product.description}</p>
//         <p className="price">Price: &#8356;{product.price}</p>
//         <p className="stock">Stock: {product.stock}</p>
//         <div className="rating">
//           <div className="star-ratings-css">
//             <div className="star-ratings-css-top" style={{width: starPercentageRounded}}>
//               <span>★★★★★</span>
//             </div>
//             <div className="star-ratings-css-bottom">
//               <span>★★★★★</span>
//             </div>
//           </div>
//           <span className='total'>({totalReviews} reviews)</span>
//         </div>
//         {isAdmin && (
//           <div className='updateicons'>
//             <button className='updateButton'>update</button>
//             <button style={{backgroundColor : "rgb(211, 48, 48) "}} className='updateButton'>delete</button>
//           </div>
//         )}
//         <button className="add-to-cart" onClick={() => { addToCart(product); handlePurchase(product); }}>Add to Cart</button> {/* Call handlePurchase function */}
//       </div>
//     </div>
//   );
// };

// const OtherLaptops = ({ user }) => { // Accept user as a prop
//   const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://nexus2024.onrender.com/api/windows');
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }
//         const data = await response.json();
//         setProducts(data);
//         setFilteredProducts(data);

//         const batch = writeBatch(db);
//         data.forEach(product => {
//           const docRef = doc(db, 'windows', product._id); 
//           batch.set(docRef, product);
//         });
//         await batch.commit();

//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handlePurchase = async (product) => {
//     try {
//       const productRef = doc(db, 'windows', product._id);
//       await updateDoc(productRef, {
//         stock: FieldValue.increment(-1) // Decrease stock by 1 when purchased
//       });
//     } catch (error) {
//       console.error("Error updating product stock:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <div className="title-and-search">
//         <h1 className="products-title">Windows Laptops</h1>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           onChange={(event) => {
//             const value = event.target.value;
//             setSearchTerm(value);
//             if (value.trim() === "") {
//               setFilteredProducts(products);
//             } else {
//               const filtered = products.filter(product =>
//                 product.title.toLowerCase().includes(value.toLowerCase())
//               );
//               setFilteredProducts(filtered);
//             }
//           }}
//           value={searchTerm}
//           className="search-input"
//         />
//       </div>
      
//       <div className="products-container">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product._id} product={product} addToCart={addToCart} handlePurchase={handlePurchase} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OtherLaptops;





//first attempt
// import React, { useEffect, useState, useContext } from 'react';
// import './OtherLaptops.css';
// import { db } from '../../firebase'; 
// import { writeBatch, doc, updateDoc, FieldValue } from "firebase/firestore";
// import { CartContext } from '../Cart/CartContext'; // Import CartContext

// const ProductCard = ({ product, addToCart, handlePurchase }) => { // Pass handlePurchase as a prop
//   const ratingValue = parseFloat(product.ratings.split('/')[0]);
//   const totalReviews = product.ratings.match(/\((\d+)\sreviews\)/)[1];

//   const starPercentage = (ratingValue / 5) * 100;
//   const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

//   return (
//     <div className="product-card">
//       <div className="product-image">
//         <img src={product.image} alt={product.title} />
//       </div>
//       <div className="product-info">
//         <h2>{product.title}</h2>
//         <p className="description">{product.description}</p>
//         <p className="price">Price: &#8356;{product.price}</p>
//         <p className="stock">Stock: {product.stock}</p>
//         <div className="rating">
//           <div className="star-ratings-css">
//             <div className="star-ratings-css-top" style={{width: starPercentageRounded}}>
//               <span>★★★★★</span>
//             </div>
//             <div className="star-ratings-css-bottom">
//               <span>★★★★★</span>
//             </div>
//           </div>
//           <span className='total'>({totalReviews} reviews)</span>
//         </div>
//         <div className='updateicons'>
//           <button className='updateButton'>update</button>
//           <button style={{backgroundColor : "rgb(211, 48, 48) "}} className='updateButton'>delete</button>
//         </div>
//         <button className="add-to-cart" onClick={() => { addToCart(product); handlePurchase(product); }}>Add to Cart</button> {/* Call handlePurchase function */}
//       </div>
//     </div>
//   );
// };

// const OtherLaptops = () => {
//   const { addToCart } = useContext(CartContext); // Access addToCart from CartContext
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://nexus2024.onrender.com/api/windows');
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }
//         const data = await response.json();
//         setProducts(data);
//         setFilteredProducts(data);

//         const batch = writeBatch(db);
//         data.forEach(product => {
//           const docRef = doc(db, 'windows', product._id); 
//           batch.set(docRef, product);
//         });
//         await batch.commit();

//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handlePurchase = async (product) => {
//     try {
//       const productRef = doc(db, 'windows', product._id);
//       await updateDoc(productRef, {
//         stock: FieldValue.increment(-1) // Decrease stock by 1 when purchased
//       });
//     } catch (error) {
//       console.error("Error updating product stock:", error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <div className="title-and-search">
//         <h1 className="products-title">Windows Laptops</h1>
//         <input
//           type="text"
//           placeholder="Search for products..."
//           onChange={(event) => {
//             const value = event.target.value;
//             setSearchTerm(value);
//             if (value.trim() === "") {
//               setFilteredProducts(products);
//             } else {
//               const filtered = products.filter(product =>
//                 product.title.toLowerCase().includes(value.toLowerCase())
//               );
//               setFilteredProducts(filtered);
//             }
//           }}
//           value={searchTerm}
//           className="search-input"
//         />
//       </div>
      
//       <div className="products-container">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product._id} product={product} addToCart={addToCart} handlePurchase={handlePurchase} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OtherLaptops;
