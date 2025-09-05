import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 flex flex-col sm:flex-row justify-between items-center !px-4 !py-3 sm:!px-6 sm:!py-4 bg-oxford_blue text-platinum shadow-md z-50">
      <Link to="/" className="text-3xl font-bold font-lambu tracking-wide">
        Blogspot
      </Link>

      <div className="flex gap-8 items-center font-lato text-lg">
        <Link
          to="/blogs"
          className="hover:text-orange_web transition-colors duration-200"
        >
          Blogs
        </Link>

        {isLoggedIn ? (
          <Link
            to="/dashboard"
            className="font-semibold text-orange_web hover:underline hover:decoration-2"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-semibold text-orange_web hover:underline hover:decoration-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
