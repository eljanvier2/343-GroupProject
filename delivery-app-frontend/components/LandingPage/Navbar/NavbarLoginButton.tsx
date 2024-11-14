import React, { useEffect, useState } from "react";
import Image from "next/image";
import Arrow from "@/public/icons/diagarrow.svg";
import { auth } from "../../../lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const NavbarLoginButton: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set `isAuthenticated` to true if user is logged in, false otherwise
    });
    return () => unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await signOut(auth); // Log out the user if they are logged in
      router.push("/"); // Redirect to the homepage after logout
    } else {
      router.push("/signin"); // Redirect to the sign-in page if the user is not logged in
    }
  };

  return (
    <div
      className="flex items-center justify-center space-x-6 h-full cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={handleAuthAction}
    >
      <div className="text-customBlack uppercase text-xl font-medium">
        {isAuthenticated ? "Log Out" : "Log In"}
      </div>
      <div className="border border-customBlack rounded-full px-6 py-2">
        <Image src={Arrow} alt="arrow" width={20} height={20} />
      </div>
    </div>
  );
};

export default NavbarLoginButton;
