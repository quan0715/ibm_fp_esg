"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavItem {
  name: string;
  path: string;
}

interface MidNavbarProps {
  navItems: NavItem[];
}

const MidNavbar: React.FC<MidNavbarProps> = ({ navItems }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams?.get("date") || "";


  return (
    <div className="w-full px-6  sticky">
      <div className="h-fit  flex items-center justify-between relative">
        <div className="flex  items-end gap-1">
          {navItems.map((item) => (
            <Link key={item.name} href={`${item.path}?date=${date}`}>
              <div
                className={`inline-flex h-fit items-center px-4 pb-2 pt-4  ${
                  pathname === item.path ? "mid_nav_active" : "mid_nav_unactive"
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

      </div>

    
    </div>
  );
};

export default MidNavbar;
