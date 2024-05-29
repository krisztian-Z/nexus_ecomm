import { useEffect } from "react";
import { auth } from "../firebase"; 

const Initializer = () => {
  useEffect(() => {
    const signOutUser = async () => {
      await auth.signOut();
    };
    signOutUser();
  }, []);

  return null; // This component doesn't render anything
};

export default Initializer;
