"use client";

import NavLinks from "./nav-links";
import SideNavProfile from "./sidenavprofile";
import PowerIcon from "../../../../public/SideNavIcons/logout.svg";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function signOut() {
  const auth = getAuth();
  const router = useRouter();

  firebaseSignOut(auth)
    .then(() => {
      console.log("SignOut Successful");
      router.push("/sign-in");
      // Sign-out successful.
    })
    .catch((error) => {
      console.log("SignOut Not Successful", error);
      // An error happened.
    });
}

export default function SideNav() {
  return (
    <>
      <div className="text-xl flex flex-col flex-nowrap h-full w-full py-2 font-sans bg-gray-100">
        <SideNavProfile />
        <div className="flex grow flex-col md:justify-between md:flex-col md:space-x-0">
          <NavLinks />
          <div className="h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
          <div>
            <button
              onClick={signOut}
              className="bg-gray-100 flex h-[48px] w-full grow items-center justify-start max-md:px-4 gap-2 text-[0.8rem] font-medium hover:bg-gray-300 hover:text-black md:flex-none md:p-2 md:px-3 group"
            >
              <PowerIcon className="group-hover:fill-black" />
              <span className="md:block ">Log Out</span>
            </button>
          </div>

          {/* <p className="flex items-center justify-center text-sm text-gray-700">
            Version 0.0.2
          </p> */}
        </div>
      </div>
    </>
  );
}
