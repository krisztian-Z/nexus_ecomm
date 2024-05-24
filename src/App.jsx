import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Laptops from "./pages/Products/Laptops.jsx";
import NavigationBar from "./components/navigation/NavigationBar.jsx";
import About from "./pages/About/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import Scroll from "./components/Scroll.jsx";
import { auth } from "./firebase.jsx";
import { signOut } from "firebase/auth";
import Footer from "./components/Footer/Footer.jsx";
import Macs from './pages/Macs/Macs.jsx';
import Other from './pages/Other/OtherLaptops.jsx';
import Auth from "./pages/Auth.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx"; 

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

function App() {
  const [active, setActive] = useState("auth");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Logout logic
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };

  return (
    <div className="App">
      <NavigationBar
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />

      <Scroll />
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={<Home setActive={setActive} active={active} user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Laptops />} />
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
        <Route path="/other" element={<Other  user = {user}   />} />
        <Route path="/macs" element={<Macs  user = {user} />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
