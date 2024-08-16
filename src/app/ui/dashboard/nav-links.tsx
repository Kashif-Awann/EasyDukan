"use client";

import Grid from "../../../../public/SideNavIcons/categories.svg";
import Cart from "../../../../public/SideNavIcons/product.svg";
import AddProduct from "../../../../public/SideNavIcons/addproduct.svg";
import Statistics from "../../../../public/SideNavIcons/statistics.svg";
import Invoices from "../../../../public/SideNavIcons/invoices.svg";
import Order from "../../../../public/SideNavIcons/order.svg";
import About from "../../../../public/SideNavIcons/about.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "All Categories",
    href: "/dashboard",
    icon: Grid,
  },
  {
    name: "All Products",
    href: "/dashboard/products",
    icon: Cart,
  },
  {
    name: "Add New Product",
    href: "/dashboard/addNewProduct",
    icon: AddProduct,
  },
  {
    name: "Report & Statistics",
    href: "/dashboard/reportAndStatistics",
    icon: Statistics,
  },
  {
    name: "All Invoices",
    href: "/dashboard/invoices",
    icon: Invoices,
  },
  {
    name: "My Orders",
    href: "/dashboard/myOrders",
    icon: Order,
  },
  {
    name: "About Us",
    href: "/dashboard/aboutUs",
    icon: About,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "font-sans flex h-[58px] w-full items-center justify-start gap-2 p-3 py-1 text-sm font-medium hover:bg-gray-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 group",
              { "bg-[#dc3545] text-[#fff]": pathname === link.href }
            )}
          >
            <LinkIcon
              className={clsx("w-6 group-hover:fill-black", {
                "fill-white": pathname === link.href,
              })}
            />
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
