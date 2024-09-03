"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const navigateToSignUp = () => {
    router.push("/sign-up"); // Navigate to the sign-up page
  };

  const navigateToSignIn = () => {
    router.push("/sign-in"); // Navigate to the sign-up page
  };

  return (
    <header className="h-16 text-gray-600 text-xl font-semibold bg-gray-100 mb-5 flex items-center justify-between px-4">
      <div>EasyDukan</div>
      <div>
        <button
          className="p-4 text-red-600 text-lg font-semibold hover:border rounded border-gray-700 hover:bg-gray-50"
          onClick={navigateToSignUp}
        >
          Sign Up
        </button>
        <button
          className="p-4 text-lg font-semibold hover:border rounded border-gray-700 hover:bg-gray-50"
          onClick={navigateToSignIn}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
