"use client";

import Hamburg from "../../../../public/hamburg.svg";

interface DashboardHeaderProps {
  toggleSideNav: () => void;
}

function DashboardHeader({ toggleSideNav }: DashboardHeaderProps) {
  return (
    <div className="p-1 pr-3 h-11 flex justify-center items-center overflow-hidden">
      <button
        onClick={toggleSideNav}
        className="px-4 hover:border rounded border-gray-700"
      >
        <Hamburg />
      </button>
      <div className="h-auto w-auto grow rounded bg-gray-100 md:block"></div>
      <h1 className="text-gray-600 text-xl font-bold font-source-sans">
        EasyDukan
      </h1>
    </div>
  );
}

export default DashboardHeader;
