"use client";

import { exit } from "process";
import { usersData } from "../hooks/userData";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";

export default function DashboardPage() {
  const [data, loading] = usersData();

  return (
    <div className="flex  w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {data.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <Avatar
                    className="mr-4"
                    alt={invoice.firstName}
                    src={invoice.imageUrl}
                  />
                  {/* <Image
                    src={invoice.imageUrl}
                    alt={`${invoice.firstName}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.firstName} {invoice.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {/* {invoice.id} */}
                      {invoice.phoneNumber}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  $123.03
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
