import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
  adminPassword: "",
};

// List of admin emails
const adminEmails = [
  process.env.REACT_APP_ADMIN_EMAIL_1,
  process.env.REACT_APP_ADMIN_EMAIL_2,
  // Add more admin email addresses if needed
];

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const { email, password, firstName, confirmPassword, adminPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      // Regular user login
      loginWithEmailAndPassword(email, password);
    } else {
      handleSignUp();
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!email || !adminPassword) {
      toast.error("All fields are required for admin login.");
      return;
    }
    // Admin login
    loginWithEmailAndPassword(email, adminPassword, true);
  };

  const loginWithEmailAndPassword = async (email, password, isAdmin = false) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (isAdmin) {
        // Admin-specific checks
        if (!adminEmails.includes(user.email)) {
          toast.error("Unauthorized access. Not an admin.");
          auth.signOut();
          return;
        }
        if (adminPassword !== process.env.REACT_APP_ADMIN_PASSWORD) {
          toast.error("Invalid admin password.");
          auth.signOut();
          return;
        }
        // Set admin display name to "Admin"
        await updateProfile(user, { displayName: "Admin" });
      }
      setUser(user);
      setActive("home");
      navigate("/");
      toast.success(`Sign-in successful${isAdmin ? " as Admin" : ""}!`);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        firstName: user.displayName || "",
        email: user.email,
        createdAt: new Date(),
      });

      setUser(user);
      setActive("home");
      navigate("/");
      toast.success("Sign-in successful with Google!");
    } catch (error) {
      toast.error("Authentication with Google failed. Please try again.");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!firstName || !email || !password) {
      toast.error("All fields are mandatory!");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        firstName: firstName,
        email: email,
        createdAt: new Date(),
      });

      await updateProfile(user, { displayName: firstName });

      setUser(user);
      setActive("home");
      navigate("/");
      toast.success("Sign-up successful! Please sign in.");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    console.error("Authentication error:", error); // Log the error to console for debugging
    switch (error.code) {
      case 'auth/email-already-in-use':
        toast.error("This email is already in use.");
        break;
      case 'auth/invalid-email':
        toast.error("Invalid email address.");
        break;
      case 'auth/operation-not-allowed':
        toast.error("Operation not allowed.");
        break;
      case 'auth/weak-password':
        toast.error("The password is too weak.");
        break;
      case 'auth/missing-password':
        toast.error("Missing password. Please enter your password.");
        break;
      default:
        toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container authSignup">
        <div className="col-12 text-center">
          <div className="text-center heading py-2 signupSize">
            {!signUp ? "Sign-In" : "Sign-Up"}
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row" onSubmit={handleAuth}>
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="col-12 py-3">
                <input
                  type="email"
                  className="form-control input-text-box"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 py-3">
                <input
                  type="password"
                  className="form-control input-text-box"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              {signUp && (
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {!signUp && (
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="Admin Password (if admin)"
                    name="adminPassword"
                    value={adminPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!signUp ? "Sign-in" : "Sign-up"}
                </button>
                {!signUp && (
                  <button
                    type="button"
                    className="btn btn-admin-sign-in"
                    onClick={handleAdminLogin}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#333",
                      color: "white",
                    }}
                  >
                    Admin Sign-in
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-google-sign-in"
                  onClick={handleGoogleSignIn}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#db4437",
                    color: "white",
                  }}
                >
                  Sign in with Google
                </button>
              </div>
            </form>
            <div className="text-center justify-content-center mt-2 pt-2">
              {!signUp ? (
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <span
                    className="link-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?
                  <span
                    style={{ cursor: "pointer", color: "#298af2" }}
                    onClick={() => setSignUp(false)}
                  >
                    Sign In
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;





// import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";

// const initialState = {
//   firstName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const Auth = ({ setActive, setUser }) => {
//   const [state, setState] = useState(initialState);
//   const [signUp, setSignUp] = useState(false);
//   const navigate = useNavigate();

//   const { email, password, firstName, confirmPassword } = state;

//   const handleChange = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     if (!signUp) {
//       loginWithEmailAndPassword(email, password, false);
//     } else {
//       handleSignUp();
//     }
//   };

//   const handleAdminLogin = (e) => {
//     e.preventDefault();
//     loginWithEmailAndPassword(email, password, true);
//   };

//   const loginWithEmailAndPassword = async (email, password, isAdmin) => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, email, password);
//       // Admin check could be enhanced with secure server-side logic
//       if (isAdmin && !user.email.includes("@admin.com")) {
//         toast.error("Unauthorized access. Not an admin.");
//         return;
//       }
//       setUser(user);
//       setActive("home");
//       navigate("/");
//       toast.success(`Sign-in successful${isAdmin ? " as Admin" : ""}!`);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       // Sign in with Google authentication provider
//       const { user } = await signInWithPopup(auth, provider);
  
//       // Add the user to the "users" collection in Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         firstName: user.displayName || "", // It might be null, so we use an empty string as fallback
//         email: user.email,
//         createdAt: new Date(),
//         // Other user details you may want to add
//       });
  
//       // Set the user state and navigate to home page
//       setUser(user);
//       setActive("home");
//       navigate("/");
//       toast.success("Sign-in successful with Google!");
//     } catch (error) {
//       // Handle Google authentication errors
//       toast.error("Authentication with Google failed. Please try again.");
//     }
//   };
  

//   // const handleGoogleSignIn = async () => {
//   //   const provider = new GoogleAuthProvider();
//   //   try {
//   //     const { user } = await signInWithPopup(auth, provider);
//   //     setUser(user);
//   //     setActive("home");
//   //     navigate("/");
//   //     toast.success("Sign-in successful with Google!");
//   //   } catch (error) {
//   //     toast.error("Authentication with Google failed. Please try again.");
//   //   }
//   // };

//   const handleSignUp = async () => {
//     // Check if passwords match
//     if (password !== confirmPassword) {
//       toast.error("Passwords don't match!");
//       return;
//     }
//     // Check if all fields are filled
//     if (!firstName || !email || !password) {
//       toast.error("All fields are mandatory!");
//       return;
//     }
//     try {
//       // Create user in Firebase authentication
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // Add user to the "users" collection in Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         firstName: firstName,
//         email: email,
//         createdAt: new Date(),
//       });

//       // Update user profile with the first name
//       await updateProfile(user, { displayName: firstName });

//       // Set the user and redirect to the home page
//       setUser(user);
//       setActive("home");
//       navigate("/");
//       toast.success("Sign-up successful! Please sign in.");
//     } catch (error) {
//       console.error("Error signing up user:", error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="container-fluid mb-4">
//       <div className="container authSignup">
//         <div className="col-12 text-center">
//           <div className="text-center heading py-2 signupSize">
//             {!signUp ? "Sign-In" : "Sign-Up"}
//           </div>
//         </div>
//         <div className="row justify-content-center align-items-center">
//           <div className="col-10 col-md-8 col-lg-6">
//             <form className="row" onSubmit={handleAuth}>
//               {signUp && (
//                 <div className="col-12 py-3">
//                   <input
//                     type="text"
//                     className="form-control input-text-box"
//                     placeholder="First Name"
//                     name="firstName"
//                     value={firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="col-12 py-3">
//                 <input
//                   type="email"
//                   className="form-control input-text-box"
//                   placeholder="Email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-12 py-3">
//                 <input
//                   type="password"
//                   className="form-control input-text-box"
//                   placeholder="Password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               {signUp && (
//                 <div className="col-12 py-3">
//                   <input
//                     type="password"
//                     className="form-control input-text-box"
//                     placeholder="Confirm Password"
//                     name="confirmPassword"
//                     value={confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="col-12 py-3 text-center">
//                 <button
//                   className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
//                   type="submit"
//                 >
//                   {!signUp ? "Sign-in" : "Sign-up"}
//                 </button>
//                 {!signUp && (
//                   <button
//                     type="button"
//                     className="btn btn-admin-sign-in"
//                     onClick={handleAdminLogin}
//                     style={{
//                       marginLeft: "10px",
//                       backgroundColor: "#333",
//                       color: "white",
//                     }}
//                   >
//                     Admin Sign-in
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-google-sign-in"
//                   onClick={handleGoogleSignIn}
//                   style={{
//                     marginLeft: "10px",
//                     backgroundColor: "#db4437",
//                     color: "white",
//                   }}
//                 >
//                   Sign in with Google
//                 </button>
//               </div>
//             </form>
//             <div className="text-center justify-content-center mt-2 pt-2">
//               {!signUp ? (
//                 <p className="small fw-bold mt-2 pt-1 mb-0">
//                   Don't have an account?
//                   <span
//                     className="link-danger"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => setSignUp(true)}
//                   >
//                     Sign Up
//                   </span>
//                 </p>
//               ) : (
//                 <p className="small fw-bold mt-2 pt-1 mb-0">
//                   Already have an account?
//                   <span
//                     style={{ cursor: "pointer", color: "#298af2" }}
//                     onClick={() => setSignUp(false)}
//                   >
//                     Sign In
//                   </span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;
