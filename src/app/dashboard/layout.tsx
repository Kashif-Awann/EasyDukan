// import SideNav from "../ui/dashboard/sidenav";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
//       <div className="w-full flex-none md:w-64">
//         <SideNav />
//       </div>
//       <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
//     </div>
//   );
// }
"use client";

import DashboardHeader from "../ui/dashboard/dashboardheader";
import SideNav from "../ui/dashboard/sidenav";
import { useState } from "react";
import { useRouter } from "next/navigation";
import auth from "../firebase/config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSideNav, setShowSideNav] = useState(false);
  const router = useRouter();

  const userId = auth.currentUser?.uid;
  console.log(userId);

  function toggleSideNav() {
    setShowSideNav(!showSideNav);
  }

  if (userId) {
    return (
      <div className="max-w-[1420px] mx-auto">
        <div className="h-screen flex flex-col bg-white">
          <div>
            <DashboardHeader toggleSideNav={toggleSideNav} />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <div
              className={`w-72 flex-col items-center justify-center md:items-start ease-in-out duration-300 max-md:duration-100 
                ${
                  showSideNav
                    ? "-translate-x-full opacity-100 md:w-0 max-md:w-0 overflow-hidden"
                    : ""
                }
              `}
            >
              <SideNav />
            </div>
            <div className="w-full pl-2 md:pl-5 overflow-auto">{children}</div>
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
