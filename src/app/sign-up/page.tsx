"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import auth, { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import LocalPostOfficeSharpIcon from "@mui/icons-material/LocalPostOfficeSharp";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const [CreateUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateUserWithEmailAndPassword(email, password);
      console.log("Creating User");
      const user = response?.user;
      // console.log("User", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
        });
      }
      if (response && response.user) {
        // Redirect to Profile page
        router.push("/newprofile");
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // REDIRECT TO PROFILE PAGE
      const user = result.user;
      console.log("User", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
        });
      }
      if (result && result.user) {
        // Redirect to home page
        router.push("/newprofile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToSignIn = () => {
    router.push("/sign-in"); // Navigate to the sign-in page
  };

  return (
    <div className="min-h-screen flex max-sm:items-start items-center justify-center overflow-hidden">
      <div className="border border-[#FF8D83] max-sm:border-0 bg-custom-bg1 bg-no-repeat bg-cover md:bg-[center_top_-6em]  bg-[center_top_-1.5rem] p-8 pb-1 md:rounded-3xl  max-sm:rounded-none w-full max-w-lg max-sm:max-w-xl">
        <div className="pt-[310px] md:pt-56">
          <h2 className="text-4xl md:text-3xl font-bold mb-10 md:mb-5 text-gray-800 font-source-sans">
            Sign Up
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
              className="w-full bg-[#FF8D83] text-[#F8F8FF] py-3 px-4 rounded-xl hover:bg-[#ec6a63] focus:outline-none focus:ring-2 focus:ring-[#e84940] focus:ring-opacity-50 transition duration-150"
            >
              {loading ? (
                "Processing..."
              ) : (
                <div className="flex items-center justify-center">
                  <div>
                    <LocalPostOfficeSharpIcon />
                  </div>
                  <div className="pl-3 font-semibold">Sign Up</div>
                </div>
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="my-2 text-gray-700">or</p>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-blue-400 text-[#F8F8FF] py-3 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 transition duration-150"
            >
              <div className="flex items-center justify-center">
                <div>
                  <GoogleIcon />
                </div>
                <div className="pl-3 font-semibold">Sign In with Google</div>
              </div>
            </button>
          </div>
          <div className="min-h-8 place-content-center">
            {error && (
              <p className="max-md:pt-1 text-sm text-red-500">
                {"Already in use !"}
              </p>
            )}
          </div>
          <div className="text-center justify-center flex pb-5">
            <p className="text-gray-700">Already have an account?</p>
            <button
              onClick={navigateToSignIn}
              className="text-blue-500 font-medium hover:underline focus:outline-none pl-3"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
