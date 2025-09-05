import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      {/* Section 1 */}
      <div className="w-screen h-screen bg-oxford_blue relative flex flex-col items-center justify-center !px-4">
        <h1 className="text-orange_web font-lambu text-5xl sm:text-7xl lg:text-[10rem] text-center">
          Blogspot
        </h1>
        <h2
          className="text-platinum text-lg sm:text-2xl lg:text-3xl text-center z-20 mt-4"
          style={{
            textShadow:
              "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
          }}
        >
          Because Every Thought Matters
        </h2>
        <img
          src="/pen.png"
          alt="pen"
          className="fixed z-10 pointer-events-none 
                     top-1/3 sm:top-1/4 lg:top-1/5 
                     left-2/3 -translate-x-1/2"
          style={{
            width: "30rem",
            maxWidth: "90vw",
            transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
          }}
        />
      </div>

      {/* Section 2 */}
      <div className="w-screen h-screen bg-oxford_blue relative flex flex-col items-center justify-center !px-4 text-center">
        <div>
          <h1 className="text-orange_web font-lambu text-3xl sm:text-5xl lg:text-6xl !pt-2">
            Read Blogs, Write Blogs
          </h1>
          <h2
            className="text-platinum text-base sm:text-xl lg:text-2xl mt-2 z-20"
            style={{
              textShadow:
                "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
            }}
          >
            Whatever Your Heart Beats For...
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 !mt-6">
          <Link
            to="/blogs"
            className="!px-6 !py-3 rounded-2xl bg-orange_web text-white font-lambu font-semibold text-lg text-center"
          >
            Read Blogs
          </Link>
          <Link
            to="/login"
            className="!px-6 !py-3 rounded-2xl border-2 border-orange_web text-platinum font-lato font-semibold text-lg text-center"
          >
            Create Your Own Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
