"use client";

import DashboardHeader from "../ui/dashboard/dashboardheader";
import SideNav from "../ui/dashboard/sidenav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import auth from "../firebase/config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSideNav, setShowSideNav] = useState(false);
  const router = useRouter();

  const userId = auth.currentUser?.uid;
  // console.log(userId);

  function toggleSideNav() {
    setShowSideNav(!showSideNav);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSideNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (userId) {
    return (
      <div className="max-w-[1600px] mx-auto relative">
        <div className="h-screen flex flex-col bg-white">
          <div>
            <DashboardHeader toggleSideNav={toggleSideNav} />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <div
              className={`max-md:fixed left-0 top-10 h-full w-64 z-50 flex-col items-center justify-center md:items-start ease-in-out duration-300 overflow-y-auto 
                ${
                  showSideNav
                    ? "-translate-x-full opacity-100 overflow-hidden"
                    : ""
                }
              `}
            >
              <SideNav />
            </div>
            <div className="w-full px-2 md:px-5 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl">Please Login In</h1>
        <div>
          <button
            onClick={() => router.push("/sign-in")}
            className="p-3 rounded mt-2 text-white bg-orange-400 border-none hover:bg-orange-600"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

//    ${showSideNav ? "block" : "hidden"
// } ${showSideNav ? "md:hidden" : "md:block"}
