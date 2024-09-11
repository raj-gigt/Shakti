import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username: username, password: password });

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_BACKEND}/discom/signin`,
        {
          headers: {
            username: username,
            password: password,
          },
        }
      );
      if (res.data.message == "success") {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">Shakti One</h1>
        <h2 className="text-2xl font-semibold text-white mt-2">
          DISCOM Portal
        </h2>
      </div>
      <form
        className="bg-white p-6 rounded shadow-md max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 text-center text-gray-800">Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-2 w-full border rounded text-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border rounded text-gray-800"
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition-colors duration-300">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
