import React, { useState } from "react";
import { handleLogin } from "../utilities/apis/login-api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState("password");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const result = await handleLogin(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      console.log("Login sucessful");
      nav("/productPage");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-full h-full md:w-1/2 flex flex-col bg-surface p-8">
          <div className="text-2xl font-bold text-primary mb-10">
          ⭐Revuhub
          </div>
          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">
              Login to your account
            </h1>
            <p className="text-secondary mb-6">
              Enter your email and password to access your
              dashboard.
            </p>
            <form
              onSubmit={submitHandler}
              class="w-full max-w-sm space-y-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Password"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-secondary"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      lock
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <a
                  href="#"
                  className="text-primary hover:text-primary-hover"
                >
                  Forgot Password?
                </a>
              </div>
              <button type="submit">Login</button>
            </form>

            {error && (
              <p style={{ color: "red" }} className="mt-2">
                {error}
              </p>
            )}
          </div>
        </div>
        <div class="flex flex-col justify-center items-center bg-primary-light  text-center p-8">
        <h2 class="text-3xl font-bold mb-4">Understand What People Really Think</h2>
<p class="text-lg text-primary max-w-md">
  Analyze customer reviews, spot trends, and get actionable insights to improve your product and user experience.
</p>
          <img
            src="./dashbord.png"
            alt="Dashboard"
            class="w-full  rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
