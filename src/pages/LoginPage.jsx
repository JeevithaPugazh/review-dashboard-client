import React, { useState } from "react";
import { handleLogin } from "../utilities/apis/login-api";
import { useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";
import Password from "../component/Password";

function LoginPage() {
    const [isSignup, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
    const [confirmShowPassword, setConfirmShowPassword] =
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
          {
            isSignup ? <SignupPage setIsSignUp={setIsSignUp}/> :
          
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
              className="w-full max-w-sm space-y-4"
            >
           
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              
              <Password password={password} setPassword={setPassword}/>
              <div class="float-right">
              
              <button type="button" onClick={()=> setIsSignUp(true)} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Signup</button>
              <button type="submit" class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
              </div>
            </form>

            {error && (
              <p style={{ color: "red" }} className="mt-2">
                {error}
              </p>
            )}
          </div>
          }
        </div>
        <div className="flex flex-col justify-center items-center bg-primary-light  text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Understand What People Really Think</h2>
<p className="text-lg text-primary max-w-md">
  Analyze customer reviews, spot trends, and get actionable insights to improve your product and user experience.
</p>
          <img
            src="./dashbord.png"
            alt="Dashboard"
            className="w-full  rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
