import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 

// Initial state for the form fields
const initialState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  // State to manage form fields and sign-up/sign-in toggle
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  
  // Destructuring state for easier access to form fields
  const { email, password, firstName, confirmPassword } = state;
  
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      // Sign in logic
      if (email && password) {
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          setUser(user);
          setActive("home");
          navigate("/");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("All fields are mandatory!");
      }
    } else {
      // Sign up logic
      if (password !== confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
      if (firstName && email && password) {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: `${firstName}` });
          setUser(user);
          setActive("home");
          navigate("/");
          toast.success("Sign-up successful! Please sign in.");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("All fields are mandatory!");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setUser(user);
      setActive("home");
      navigate("/");
      toast.success("Sign-in successful with Google!");
    } catch (error) {
      toast.error("Authentication with Google failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12 text-center">
          <div className="text-center heading py-2">
            {!signUp ? "Sign-In" : "Sign-Up"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
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
              <div className="col-12 py-3 text-center">
                <button
                  className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                  type="submit"
                >
                  {!signUp ? "Sign-in" : "Sign-up"}
                </button>
                <button
                  type="button"
                  className="btn btn-google-sign-in"
                  onClick={handleGoogleSignIn}
                  style={{ marginLeft: "10px", backgroundColor: "#db4437", color: "white" }}
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

