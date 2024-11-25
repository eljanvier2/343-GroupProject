import React, { useEffect, useState } from "react";
import Navbar from "@/components/LandingPage/Navbar/Navbar";
import Footer from "@/components/LandingPage/Footer/Footer";
import Login from "@/components/Global/Login/LoginComponent";
import SignUp from "@/components/Global/Login/SignupComponent";
import Chatbot from "@/components/Chatbot/Chatbot";
import { useRouter } from "next/router";
import { User } from "@/data";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (value: any) => void;
  user: User | null;
}

const Layout = ({
  children,
  isAuthenticated,
  setIsAuthenticated,
  setUser,
  user,
}: LayoutProps): JSX.Element => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLogin]);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
    }
  }, [isAuthenticated]);

  const handleBackgroundClick = (): void => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleModalClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div className="relative">
      <Navbar
        showLogin={(value: boolean) => {
          setShowLogin(value);
        }}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {showLogin && (
        <div
          className="absolute z-10 flex items-center justify-center top-0 left-0 w-full h-[100vh] bg-black bg-opacity-50"
          onClick={handleBackgroundClick}>
          <div onClick={handleModalClick}>
            {showSignup ? (
              <SignUp
                showSignup={(value: boolean) => {
                  setShowSignup(false);
                }}
              />
            ) : (
              <Login
                showSignup={(value: boolean) => {
                  setShowSignup(value);
                }}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
                user={user}
              />
            )}
          </div>
        </div>
      )}

      <div className="w-full px-32">{children}</div>
      <Chatbot />
      {currentRoute === "/" && <Footer />}
    </div>
  );
};

export default Layout;
