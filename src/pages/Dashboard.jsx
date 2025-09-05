import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ blogs, setBlogs }) {
  const navigate = useNavigate();
  const [showWriter, setShowWriter] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [
    "Personal",
    "Self-Improvement",
    "Travel",
    "Tech",
    "Poem",
    "Storytelling",
    "Miscellaneous",
  ];

  const getTagStyles = (tag) => {
    const schemes = {
      Personal: { bg: "rgba(255,0,0,0.1)", text: "#991b1b" },
      Tech: { bg: "rgba(0,47,255,0.1)", text: "#3b82f6" },
      "Self-Improvement": { bg: "rgba(0,255,42,0.1)", text: "#22c55e" },
      Poem: { bg: "rgba(255,0,255,0.1)", text: "#ec4899" },
      Travel: { bg: "rgba(128,0,128,0.1)", text: "#a855f7" },
      Storytelling: { bg: "rgba(255,255,0,0.1)", text: "#eab308" },
      Miscellaneous: { bg: "rgba(128,128,128,0.1)", text: "#9ca3af" },
    };
    return schemes[tag] || { bg: "rgba(0,0,0,0.1)", text: "#000" };
  };

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, [setBlogs]);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingBlog) {
      const updatedBlogs = blogs.map((b) =>
        b.id === editingBlog.id ? { ...b, title, content, tags: selectedTags } : b
      );
      setBlogs(updatedBlogs);
      setEditingBlog(null);
    } else {
      const newBlog = {
        id: Date.now(),
        title,
        content,
        tags: selectedTags.length ? selectedTags : ["Personal"],
        comments: [],
      };
      setBlogs([newBlog, ...blogs]);
    }

    setTitle("");
    setContent("");
    setSelectedTags([]);
    setShowWriter(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setSelectedTags(blog.tags);
    setShowWriter(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="!p-8 w-screen relative h-screen bg-gray-900 text-white">
      <button
        onClick={handleLogout}
        className="text-xl font-oswald text-platinum underline decoration-1 underline-offset-4 absolute cursor-pointer transition-all duration-200 ease-in-out"
      >
        Logout
      </button>

      <div className="right-8 absolute w-[20%] flex justify-around items-center">
        <button
          onClick={() => setShowWriter(true)}
          className="text-xl font-oswald text-platinum underline decoration-1 underline-offset-4 cursor-pointer transition-all duration-200 ease-in-out"
        >
          Write
        </button>
        <button
          onClick={() => navigate("/blogs")}
          className="text-xl font-oswald text-platinum underline decoration-1 underline-offset-4 cursor-pointer transition-all duration-200 ease-in-out"
        >
          Read
        </button>
      </div>

      <h1 className="text-4xl w-full flex justify-center text-white font-lambu font-bold">
        Dashboard
      </h1>

      {/* My Blogs Section */}
      <div className="!mt-10">
        <h2 className="text-2xl font-bold !mb-4">My Blogs</h2>
        {blogs.length === 0 ? (
          <p className="!m-0">No blogs yet. Click “Write” to add one!</p>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 !p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold !m-0">{blog.title}</h3>
                <p className="text-gray-300 !mt-2 !mb-0">{blog.content}</p>
                <div className="flex gap-2 !mt-2 flex-wrap">
                  {blog.tags.map((tag) => {
                    const { bg, text } = getTagStyles(tag);
                    return (
                      <span
                        key={tag}
                        className="!px-2 !py-1 rounded text-sm"
                        style={{ backgroundColor: bg, color: text }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                {/* Edit/Delete Buttons */}
                <div className="flex gap-2 !mt-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-600 !px-3 !py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-600 !px-3 !py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup Overlay */}
      {showWriter && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="w-[80%] h-[80%] bg-white rounded-2xl shadow-2xl !p-6 flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowWriter(false);
                setEditingBlog(null);
              }}
              className="self-end text-red-600 font-bold text-lg !mb-2"
            >
              ✕
            </button>

            {/* Blog Form */}
            <h2 className="text-2xl font-oswald !mb-4 text-black">
              {editingBlog ? "Edit Blog" : "Write a New Blog"}
            </h2>
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md !p-2 !mb-3 w-full text-oxford_blue"
            />
            <textarea
              placeholder="Write your blog here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-md !p-2 flex-1 resize-none w-full text-oxford_blue"
            />

            {/* Tag Selection */}
            <div className="!mt-4">
              <h3 className="text-lg font-semibold !mb-2 text-black">
                Select Tags:
              </h3>
              <div className="flex gap-2 flex-wrap">
                {allTags.map((tag) => {
                  const { bg, text } = getTagStyles(tag);
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="!px-3 !py-1 rounded-md text-sm border"
                      style={{
                        backgroundColor: isSelected ? bg : "#f3f4f6",
                        color: isSelected ? text : "#111",
                        borderColor: isSelected ? text : "#ccc",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Publish Button */}
            <button
              onClick={handlePublish}
              className="!mt-4 bg-orange_web text-white !px-4 !py-2 rounded-md self-end"
            >
              {editingBlog ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
