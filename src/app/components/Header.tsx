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
    <header className="h-16 bg-slate-500">
      <button className="p-4" onClick={navigateToSignUp}>
        Sign Up
      </button>
      <button className="p-4" onClick={navigateToSignIn}>
        Sign In
      </button>
    </header>
  );
}
