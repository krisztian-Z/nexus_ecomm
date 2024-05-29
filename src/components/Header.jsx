import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <button
            className="navbar-toggler mt-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle Navigation"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="profile-logo">
              <img
                src="./images/nexus_logo.png"
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginTop: "12px",
                }}
              />
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "home" ? "active" : ""
                  }`}
                  onClick={() => setActive("home")}
                >
                  Home
                </li>
              </Link>

              <Link to="/products" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "products" ? "active" : ""
                  }`}
                  onClick={() => setActive("products")}
                >
                  Products
                </li>
              </Link>

              <Link to="/about" style={{ textDecoration: "none" }}>
                <li
                  className={`nav-item nav-link ${
                    active === "about" ? "active" : ""
                  }`}
                  onClick={() => setActive("about")}
                >
                  About
                </li>
              </Link>
            </ul>
            <div className="row g-3">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {userId ? (
                  <>
                    <div className="profile-logo">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="logo"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginTop: "12px",
                        }}
                      />
                    </div>
                    <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                      {user?.displayName}
                    </p>
                    <li
                      className="nav-item nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <Link to="/auth" style={{ textDecoration: "none" }}>
                    <li
                      className={`nav-item nav-link ${
                        active === "login" ? "active" : ""
                      }`}
                      onClick={() => setActive("login")}
                    >
                      Login
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;




// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/js/bootstrap.bundle";

// const Header = ({ active, setActive, user, handleLogout }) => {
//   const userId = user?.uid;

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid bg-faded padding-media">
//         <div className="container padding-media">
//           <button
//             className="navbar-toggler mt-3"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="true"
//             aria-label="Toggle Navigation"
//           >
//             <span className="fa fa-bars"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <div className="profile-logo">
//               <img
//                 src="./images/nexus_logo.png"
//                 alt="Logo"
//                 style={{
//                   width: "50px", 
//                   height: "50px",
//                   borderRadius: "50%",
//                   marginTop: "12px",
//                 }}
//               />
//             </div>
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <Link to="/" style={{ textDecoration: "none" }}>
//                 <li
//                   className={`nav-item nav-link ${
//                     active === "home" ? "active" : ""
//                   }`}
//                   onClick={() => setActive("home")}
//                 >
//                   Home
//                 </li>
//               </Link>

//               <Link to="/products" style={{ textDecoration: "none" }}>
//                 <li
//                   className={`nav-item nav-link ${
//                     active === "products" ? "active" : ""
//                   }`}
//                   onClick={() => setActive("products")}
//                 >
//                   Products
//                 </li>
//               </Link>

//               <Link to="/about" style={{ textDecoration: "none" }}>
//                 <li
//                   className={`nav-item nav-link ${
//                     active === "about" ? "active" : ""
//                   }`}
//                   onClick={() => setActive("about")}
//                 >
//                   About
//                 </li>
//               </Link>
//             </ul>
//             <div className="row g-3">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 {userId ? (
//                   <>
//                     <div className="profile-logo">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                         alt="logo"
//                         style={{
//                           width: "30px",
//                           height: "30px",
//                           borderRadius: "50%",
//                           marginTop: "12px"
//                         }}
//                       />
//                     </div>
//                     <p style={{marginTop: "12px", marginLeft: "5px"}}>{user?.displayName}</p>
//                     <li className="nav-item nav-link" onClick={handleLogout}>
//                       Logout
//                     </li>
//                   </>
//                 ) : (
//                   <Link to="/auth" style={{ textDecoration: "none" }}>
//                     <li
//                       className={`nav-item nav-link ${
//                         active === "login" ? "active" : ""
//                       }`}
//                       onClick={() => setActive("login")}
//                     >
//                       Login
//                     </li>
//                   </Link>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;



