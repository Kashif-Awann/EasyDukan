// import Link from 'next/link';
// import NavLinks from '@/app/ui/dashboard/nav-links';

// export default function SideNav() {
//   return (
//     <div className="flex h-full flex-col px-3 py-4 md:px-2">
//       <Link
//         className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
//         href="/"
//       >
//         <div className="w-32 text-white md:w-40">
//           {/* Logo */}
//         </div>
//       </Link>
//       <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//         <NavLinks />
//         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//         <form>
//           <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//             {/* <PowerIcon className="w-6" /> */}
//             <div className="hidden md:block">Sign Out</div>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import NavLinks from "./nav-links";
import SideNavProfile from "./sidenavprofile";
import PowerIcon from "../../../../public/SideNavIcons/logout.svg";
import { getAuth, signOut  as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function signOut() {
    const auth = getAuth();
    const router = useRouter();

    firebaseSignOut(auth).then(() => {
    console.log("SignOut Successful");
    router.push('/sign-in');
    // Sign-out successful.
  }).catch((error) => {
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
          <button onClick={() => signOut()} className="bg-gray-100 flex h-[48px] w-full grow items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-gray-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 group">
            <PowerIcon className="group-hover:fill-black" />
            <span className="md:block">Log Out</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
