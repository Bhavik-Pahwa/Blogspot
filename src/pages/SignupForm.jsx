import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams({ ...formData, action: "signup" }).toString();
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxY1Wt2G-HlAR1jPcc-5guXC1bq3sN-fcrWEydhV_IOqUCUgi58QfMlWQ7GhkSoGewvyw/exec?${params}`
      );
      const result = await response.json();
      setMessage(result.message);
    } catch {
      setMessage("❌ Error: Could not connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-platinum z-[100] flex flex-col items-center !p-12">
      <h1 className="font-lambu text-5xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-4/5 flex flex-col items-center !mt-10 font-lato gap-4">
        <label className="flex flex-col w-3/5 gap-1">
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="!p-3 bg-white rounded-md" required />
        </label>
        <label className="flex flex-col w-3/5 gap-1">
          Email Address
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="!p-3 bg-white rounded-md" required />
        </label>
        <label className="flex flex-col w-3/5 gap-1">
          Age
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="!p-3 bg-white rounded-md" required />
        </label>
        <label className="flex flex-col w-3/5 gap-1">
          Set Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="!p-3 bg-white rounded-md" required />
        </label>
        <button type="submit" disabled={isLoading} className="font-bold text-xl !pl-5 !pr-5 !pt-2.5 !pb-2.5 bg-oxford_blue text-platinum rounded-4xl cursor-pointer shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50">
          {isLoading ? "Registering..." : "Register"}
        </button>
        {message && <p className={`mt-2 text-center ${message.startsWith("❌") ? "text-red-600" : "text-green-600"}`}>{message}</p>}
        <Link to="/login" className="hover:underline hover:decoration-1 cursor-pointer">Already Have an Account? Sign In</Link>
      </form>
      <Link to="/"><img src="/close.png" alt="close" className="absolute z-50 top-5 right-5 w-10 h-10" /></Link>
    </div>
  );
}

export default SignupForm;
