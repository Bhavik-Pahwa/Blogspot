import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../pages/LoginForm";

function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const p = Math.min(scrollY / pageHeight, 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotation = -(progress * 30);
  const translateX = progress * 300;
  const translateY = progress * 200;

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="w-screen h-screen bg-oxford_blue relative flex flex-col items-center justify-around">
        <h1 className="text-orange_web flex text-[10rem] font-lambu">
          Blogspot
        </h1>
        <h2 className="text-platinum text-3xl text-shadow-lg/50 z-20"   style={{
    textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
  }}>
          Because Every Thought Matters
        </h2>

        <img
          src="/pen.png"
          alt="pen"
          className="fixed top-1/10 w-lg left-2/5 z-10 pointer-events-none"
          style={{
            transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
          }}
        />
      </div>

      <div className="w-screen h-screen bg-oxford_blue relative flex flex-col items-center justify-around">
          <div>
            <h1 className="text-orange_web flex text-[3rem] font-lambu !pt-2">
              Read Blogs, Write Blogs
            </h1>
            <h2 className="text-platinum text-4xl text-shadow-lg/50 !pt-2 text-shadow-orange_web z-20" style={{
    textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
  }}>
              Whatever Your Heart Beats For...
            </h2>
          </div>
        <div className="flex w-full gap-5 justify-center">
          <Link to="/blogs" className="!p-5 rounded-2xl bg-orange_web text-white font-lambu font-semibold text-lg">Read Blogs</Link>
          <Link to="/Login" className="!p-5 rounded-2xl border-2 border-orange_web text-platinum font-lato font-semibold text-lg cursor-pointer">Create Your Own Blogs</Link>
        </div>
		
      </div>
	  </div>
  );
}
export default Hero;
