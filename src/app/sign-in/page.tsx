"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import auth from "../firebase/config";
import LoginIcon from "@mui/icons-material/Login";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(email, password);
      console.log({ response });
      // setEmail('');
      // setPassword('');
      if (response && response.user) {
        // Redirect to dashboard page
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithRedirect(auth, provider);
  };

  const navigateToSignUp = () => {
    router.push("/sign-up"); // Navigate to the sign-up page
  };

  return (
    <div className="min-h-screen flex max-sm:items-start items-center justify-center overflow-hidden">
      <div className="border border-[#FF8D83] max-sm:border-0 bg-custom-bg1 bg-no-repeat bg-cover md:bg-[center_top_-5rem] bg-[center_top_-2rem] p-8 pb-1 md:rounded-3xl max-sm:rounded-none w-full max-w-lg max-sm:max-w-xl">
        <div className="pt-[240px] md:pt-48">
          <h2 className="text-3xl font-bold mb-10 md:mb-5 text-gray-800 font-source-sans">
            Sign In
            <div className="w-20 md:w-[84px] h-1 border-b-4 border-[#FF8D83] mt-1 ml-1.5 rounded-2xl"></div>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="email"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Email :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none custom-input-style block w-full text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  htmlFor="password"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full text-gray-700 custom-input-style py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF8D83] text-[#F8F8FF] md:mt-[6px] p-3 md:p-2 rounded-xl hover:bg-[#ec6a63] focus:outline-none focus:ring-2 focus:ring-[#e84940] focus:ring-opacity-50 transition duration-150"
            >
              {loading ? (
                "Processing..."
              ) : (
                <div>
                  <span className="pr-3">
                    <LoginIcon />
                  </span>
                  Sign In
                </div>
              )}
            </button>
          </form>
          {/* <div className="mt-1 text-center">
            <p className="text-gray-700">or</p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-blue-400 text-[#F8F8FF] p-3 md:p-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 transition duration-150 mt-1"
            >
              Sign In with Google
            </button> 
        </div> */}
          <div className="min-h-8 place-content-center">
            {error && (
              <p className="max-md:pt-1 text-sm text-red-600">
                {"Invalid Username or Password !"}
              </p>
            )}
          </div>
          <div className="md:mt-[10px] mt-2 text-center justify-center flex pb-5">
            <p className="text-gray-700">Don't have an account ?</p>
            <button
              onClick={navigateToSignUp}
              className="text-blue-500 font-medium text-lg hover:underline focus:outline-none pl-3 mt-[-2px]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
