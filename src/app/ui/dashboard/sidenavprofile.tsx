import React from "react";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "../../../../public/profile.png";
import { LoginUser } from "../../hooks/userData";
import Avatar from "@mui/material/Avatar";

export default function SideNavProfile() {
  const user = LoginUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const image = user?.imageUrl;

  return (
    <Link
      className="bg-gray-100 flex gap-2 h-16 w-full items-center justify-start border-b-2  py-[20px] pl-4 mb-2 border-sky-200 hover:border hover:border-sky-400"
      href="/dashboard/profile"
    >
      <div className="w-12 h-12 relative">
        {image ? (
          <Avatar alt={firstName} src={image} />
        ) : (
          <Image
            src={UserProfile}
            alt="Profile"
            height={48}
            width={48}
            priority
            className="rounded-full"
          />
        )}
      </div>
      <p className="md:block text-[0.9rem] font-mono text-teal-600">
        {firstName} {lastName}
      </p>
    </Link>
  );
}
