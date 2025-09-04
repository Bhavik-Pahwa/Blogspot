import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

function Blogs() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const containerRef = useRef(null);
  const currentIndex = useRef(0);
  let scrollAccumulator = 0;
  let touchStartY = 0;

  useEffect(() => {
    const container = containerRef.current;
    const sections = container.querySelectorAll(".section");

    const handleScroll = (e) => {
      if (isAnimating) return;
      scrollAccumulator += e.deltaY;
      if (scrollAccumulator > 80 && currentIndex.current < sections.length - 1) {
        currentIndex.current++;
        triggerScroll();
      } else if (scrollAccumulator < -80 && currentIndex.current > 0) {
        currentIndex.current--;
        triggerScroll();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimating) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (deltaY > 60 && currentIndex.current < sections.length - 1) {
        currentIndex.current++;
        triggerScroll();
      } else if (deltaY < -60 && currentIndex.current > 0) {
        currentIndex.current--;
        triggerScroll();
      }
    };

    function triggerScroll() {
      setIsAnimating(true);
      sections[currentIndex.current].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      scrollAccumulator = 0;
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAnimating]);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-hidden">
      <div className="section w-screen h-screen relative">
        <Navbar />
        <div className="flex w-screen h-full justify-center items-center z-20">
          <h1 className="font-lambu text-8xl text-orange_web">
            Read Recent Blogs
          </h1>
        </div>
        <img
          src="/downward-arrow (2).png"
          className="absolute top-1/2 left-1/2 -translate-1/2 z-10 opacity-20"
        />
      </div>
      <div className="section relative w-screen h-screen shadow-2xl bg-gray-900 z-[100] flex justify-between">
        <div className="w-1/3 h-screen relative shadow-2xl">
          <div className="absolute !p-2.5 flex w-full bg-orange_web rounded-md top-1/2 -translate-y-1/2 left-[20px] flex-col justify-between">
            <h1 className="font-oswald text-3xl flex justify-center w-full !pb-3">
              Filter Results
            </h1>
            <div className="flex flex-col gap-2 !pb-3">
              <p
                onClick={() => toggleFilter("Personal")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Personal")
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Personal
              </p>
              <p
                onClick={() => toggleFilter("Self-Improvement")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Self-Improvement")
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Self-Improvement
              </p>
              <p
                onClick={() => toggleFilter("Travel")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Travel")
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Travel
              </p>
              <p
                onClick={() => toggleFilter("Tech")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Tech")
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Tech
              </p>
              <p
                onClick={() => toggleFilter("Poem")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Poem")
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Poem
              </p>
              <p
                onClick={() => toggleFilter("Storytelling")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Storytelling")
                    ? "bg-yellow-500 text-black shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Storytelling
              </p>
              <p
                onClick={() => toggleFilter("Miscellaneous")}
                className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                  activeFilters.includes("Miscellaneous")
                    ? "bg-gray-500 text-white shadow-lg"
                    : "bg-amber-300"
                }`}
              >
                Miscellaneous
              </p>
            </div>
            <div>
              Selected:{" "}
              <span className="font-bold">
                {activeFilters.join(", ") || "None"}
              </span>
            </div>
          </div>
        </div>
        <div className="blogs flex w-1/2 h-screen flex-col items-center overflow-y-scroll gap-y-6 text-white z-[100] !p-2.5 font-lato">
          <h1 className="text-4xl font-lambu font-bold">Blogs Area</h1>
          <div className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl">
            <h1 className="font-bold text-2xl !pb-3">Blog#1</h1>
            <h3 className="!pb-3 text-gray-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
              dolorum, pariatur molestias reprehenderit officia repellendus,
              voluptas corrupti aperiam minus ab voluptatum exercitationem?
              Officiis, eligendi ullam. Tenetur quidem adipisci perferendis
              esse?
            </h3>
            <h2 className="font-oswald flex items-center gap-1">
              <img src="/tag.png" alt="" className="h-8" />
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 text-red-800 bg-[rgba(255,0,0,0.1)] rounded-sm">
                Personal
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,47,255,0.1)] text-blue-500 rounded-sm">
                Tech
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,255,42,0.1)] text-green-500 rounded-sm">
                Self-Improvement
              </p>
            </h2>
          </div>
          <div className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl">
            <h1 className="font-bold text-2xl !pb-3">Blog#2</h1>
            <h3 className="!pb-3 text-gray-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
              dolorum, pariatur molestias reprehenderit officia repellendus,
              voluptas corrupti aperiam minus ab voluptatum exercitationem?
              Officiis, eligendi ullam. Tenetur quidem adipisci perferendis
              esse?
            </h3>
            <h2 className="font-oswald flex items-center gap-1">
              <img src="/tag.png" alt="" className="h-8" />
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 text-red-800 bg-[rgba(255,0,0,0.1)] rounded-sm">
                Personal
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,47,255,0.1)] text-blue-500 rounded-sm">
                Tech
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,255,42,0.1)] text-green-500 rounded-sm">
                Self-Improvement
              </p>
            </h2>
          </div>
          <div className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl">
            <h1 className="font-bold text-2xl !pb-3">Blog#3</h1>
            <h3 className="!pb-3 text-gray-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
              dolorum, pariatur molestias reprehenderit officia repellendus,
              voluptas corrupti aperiam minus ab voluptatum exercitationem?
              Officiis, eligendi ullam. Tenetur quidem adipisci perferendis
              esse?
            </h3>
            <h2 className="font-oswald flex items-center gap-1">
              <img src="/tag.png" alt="" className="h-8" />
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 text-red-800 bg-[rgba(255,0,0,0.1)] rounded-sm">
                Personal
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,47,255,0.1)] text-blue-500 rounded-sm">
                Tech
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,255,42,0.1)] text-green-500 rounded-sm">
                Self-Improvement
              </p>
            </h2>
          </div>
          <div className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl">
            <h1 className="font-bold text-2xl !pb-3">Blog#4</h1>
            <h3 className="!pb-3 text-gray-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
              dolorum, pariatur molestias reprehenderit officia repellendus,
              voluptas corrupti aperiam minus ab voluptatum exercitationem?
              Officiis, eligendi ullam. Tenetur quidem adipisci perferendis
              esse?
            </h3>
            <h2 className="font-oswald flex items-center gap-1">
              <img src="/tag.png" alt="" className="h-8" />
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 text-red-800 bg-[rgba(255,0,0,0.1)] rounded-sm">
                Personal
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,47,255,0.1)] text-blue-500 rounded-sm">
                Tech
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,255,42,0.1)] text-green-500 rounded-sm">
                Self-Improvement
              </p>
            </h2>
          </div>
          <div className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl">
            <h1 className="font-bold text-2xl !pb-3">Blog#5</h1>
            <h3 className="!pb-3 text-gray-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae,
              dolorum, pariatur molestias reprehenderit officia repellendus,
              voluptas corrupti aperiam minus ab voluptatum exercitationem?
              Officiis, eligendi ullam. Tenetur quidem adipisci perferendis
              esse?
            </h3>
            <h2 className="font-oswald flex items-center gap-1">
              <img src="/tag.png" alt="" className="h-8" />
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 text-red-800 bg-[rgba(255,0,0,0.1)] rounded-sm">
                Personal
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,47,255,0.1)] text-blue-500 rounded-sm">
                Tech
              </p>
              <p className="!pl-1 !pr-1 !pt-0 !pb-0 bg-[rgba(0,255,42,0.1)] text-green-500 rounded-sm">
                Self-Improvement
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
