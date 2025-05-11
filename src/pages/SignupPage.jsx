import React, { useState } from "react";
import { createUser } from "../utilities/apis/login-api";
import { useNavigate } from "react-router-dom";
import Password from "../component/Password";

function SignupPage(props) {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const [error, setError] = useState("");
  const nav = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setError("Confirm Password is mismatch");
        return;
    }
    setError("");
    const result = await createUser(name, email, password);
    if (result.error) {
      setError(result.message);
    } else {
      alert("Signup completed");
      props.setIsSignUp(false);
    }
  };
  return (
    <>
          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2">
              Create your account
            </h1>
            <p className="text-secondary mb-6">
            Enter your Name, Email and password to signup your
              account.
            </p>
            <form
              onSubmit={submitHandler}
              className="w-full max-w-sm space-y-4"
            >
            
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Name"
                required
              />
       
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Password password={password} setPassword={setPassword}/>
              <Password password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm password"/>
              
              
              <div class="float-right">
              <button type="button" onClick={()=> props.setIsSignUp(false)} class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
              <button type="submit" class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Signup</button>
             
              </div>
            </form>

            {error && (
              <p style={{ color: "red" }} className="mt-2">
                {error}
              </p>
            )}
          </div>
    </>
  );
}

export default SignupPage;
