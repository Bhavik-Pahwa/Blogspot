import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [commentText, setCommentText] = useState("");

  const containerRef = useRef(null);
  const currentIndex = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);
  let scrollAccumulator = 0;
  let touchStartY = 0;

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));

    if (storedBlogs && storedBlogs.length > 0) {
      setBlogs(storedBlogs);
    } else {
      const dummyBlogs = [
        {
          id: 1,
          title: "Journey into React",
          content:
            "React makes building UIs so much fun! Here's a story about how I started learning React and built my first app...",
          tags: ["Tech", "Storytelling"],
          comments: [{ id: 101, text: "Great write-up!" }],
        },
        {
          id: 2,
          title: "My Travel to Goa",
          content:
            "Goa was an amazing experience! Beaches, food, culture, and more. This blog covers my 5-day trip and highlights.",
          tags: ["Travel", "Personal"],
          comments: [],
        },
        {
          id: 3,
          title: "Self-Improvement Tips",
          content:
            "Here are 5 actionable tips for becoming more productive, focused, and balanced in life.",
          tags: ["Self-Improvement"],
          comments: [],
        },
      ];
      setBlogs(dummyBlogs);
      localStorage.setItem("blogs", JSON.stringify(dummyBlogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

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
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredBlogs =
    activeFilters.length === 0
      ? blogs
      : blogs.filter((blog) =>
          blog.tags.some((tag) => activeFilters.includes(tag))
        );

  const getTagStyle = (tag) => ({
    backgroundColor:
      tag === "Personal"
        ? "rgba(255,0,0,0.1)"
        : tag === "Tech"
        ? "rgba(0,47,255,0.1)"
        : tag === "Self-Improvement"
        ? "rgba(0,255,42,0.1)"
        : tag === "Poem"
        ? "rgba(255,0,255,0.1)"
        : tag === "Travel"
        ? "rgba(128,0,128,0.1)"
        : tag === "Storytelling"
        ? "rgba(255,255,0,0.1)"
        : "rgba(128,128,128,0.1)",
    color:
      tag === "Personal"
        ? "#991b1b"
        : tag === "Tech"
        ? "#3b82f6"
        : tag === "Self-Improvement"
        ? "#22c55e"
        : tag === "Poem"
        ? "#ec4899"
        : tag === "Travel"
        ? "#a855f7"
        : tag === "Storytelling"
        ? "#eab308"
        : "#9ca3af",
  });

  const getPreview = (content) => {
    if (!content) return "";
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const updatedBlogs = blogs.map((b) =>
      b.id === selectedBlog.id
        ? {
            ...b,
            comments: [...(b.comments || []), { id: Date.now(), text: commentText }],
          }
        : b
    );
    setBlogs(updatedBlogs);

    const updatedBlog = updatedBlogs.find((b) => b.id === selectedBlog.id);
    setSelectedBlog(updatedBlog);

    setCommentText("");
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
        {/* Filter Sidebar */}
        <div className="w-1/3 h-screen relative shadow-2xl">
          <div className="absolute !p-2.5 flex w-full bg-orange_web rounded-md top-1/2 -translate-y-1/2 left-[20px] flex-col justify-between">
            <h1 className="font-oswald text-3xl flex justify-center w-full !pb-3">
              Filter Results
            </h1>
            <div className="flex flex-col gap-2 !pb-3">
              {[
                "Personal",
                "Self-Improvement",
                "Travel",
                "Tech",
                "Poem",
                "Storytelling",
                "Miscellaneous",
              ].map((tag) => (
                <p
                  key={tag}
                  onClick={() => toggleFilter(tag)}
                  className={`cursor-pointer !p-2 text-lg rounded-2xl transition ${
                    activeFilters.includes(tag)
                      ? "bg-gray-800 text-white shadow-lg"
                      : "bg-amber-300"
                  }`}
                >
                  {tag}
                </p>
              ))}
            </div>
            <div className="!m-0">
              Selected:{" "}
              <span className="font-bold">
                {activeFilters.join(", ") || "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Blogs List */}
        <div className="blogs flex w-1/2 h-screen flex-col items-center overflow-y-scroll gap-y-6 text-white z-[100] !p-2.5 font-lato">
          <h1 className="text-4xl font-lambu font-bold !m-0">Blogs Area</h1>

          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="blog w-full rounded-xl bg-[rgba(255,255,255,0.1)] !p-2 shadow-xl cursor-pointer hover:scale-[1.01] transition"
              >
                <h1 className="font-bold text-2xl !pb-3 !m-0">{blog.title}</h1>
                <h3 className="!pb-3 text-gray-200 !m-0">
                  {getPreview(blog.content)}
                </h3>
                <h2 className="font-oswald flex items-center gap-1 !m-0">
                  <img src="/tag.png" alt="" className="h-8" />
                  {blog.tags.map((tag) => (
                    <p
                      key={tag}
                      className="!pl-1 !pr-1 !pt-0 !pb-0 rounded-sm"
                      style={getTagStyle(tag)}
                    >
                      {tag}
                    </p>
                  ))}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-400 !m-0">No blogs found.</p>
          )}
        </div>
      </div>

      {selectedBlog && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-[200]"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="w-[80%] max-h-[80%] overflow-y-auto bg-white text-black rounded-xl shadow-xl !p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-red-600 font-bold text-lg"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold !m-0">{selectedBlog.title}</h2>
            <div className="!mt-3 flex gap-2 flex-wrap">
              {selectedBlog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm !px-3 !py-1 rounded-full"
                  style={getTagStyle(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="!mt-4 !mb-0 text-lg leading-relaxed whitespace-pre-line">
              {selectedBlog.content}
            </p>
            <div className="!mt-6 border-t !pt-4">
              <h3 className="text-xl font-bold !mb-2">Comments</h3>

              <div className="flex flex-col gap-2 !mb-3">
                {(selectedBlog.comments || []).length > 0 ? (
                  selectedBlog.comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-gray-100 !p-2 rounded-md text-sm !m-0"
                    >
                      {c.text}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm !m-0">No comments yet.</p>
                )}
              </div>

              {/* Add new comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded !px-2 !py-1"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-orange_web text-white !px-3 !py-1 rounded"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
