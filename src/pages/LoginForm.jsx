import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams(formData).toString();
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbyi-ysub8pQLjD3--FF8g5DsossxCbMz9_96RU1FdvF1Y2UDWRdVpCQO2ohNwsxjNqSvA/exec?email=test@gmail.com&password=1234`
      );
      const result = await response.json();

      if (result.status === "success") {
        navigate("/dashboard");
      } else {
        setMessage("❌ " + result.message);
      }
    } catch (error) {
      setMessage("❌ Error: Could not connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-platinum z-[100] flex flex-col items-center !p-12">
      <h1 className="font-lambu text-5xl font-bold">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="w-4/5 flex flex-col items-center !mt-20 font-lato gap-8"
      >
        <label className="flex flex-col w-3/5 gap-2">
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="!p-3 bg-white rounded-md"
            required
          />
        </label>

        <label className="flex flex-col w-3/5 gap-2">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="!p-3 bg-white rounded-md"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="font-bold text-xl !pl-5 !pr-5 !pt-2.5 !pb-2.5 bg-oxford_blue text-platinum rounded-4xl cursor-pointer shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "Checking..." : "Continue"}
        </button>

        {message && (
          <p
            className={`mt-2 text-center ${
              message.startsWith("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <Link
          to="/signup"
          className="hover:underline hover:decoration-1 cursor-pointer"
        >
          Don't Have an Account? Create Account
        </Link>
      </form>

      <Link to="/">
        <img
          src="/close.png"
          alt="close"
          className="absolute z-50 top-5 right-5 w-10 h-10"
        />
      </Link>
    </div>
  );
}

export default LoginForm;
