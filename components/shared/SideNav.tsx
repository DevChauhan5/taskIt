"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaFileAlt, FaHome, FaTasks } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const SideNav = () => {
    const pathname = usePathname()
  const navItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard", active: true },
    { name: "Tasks", icon: <FaTasks />, link: "/dashboard/tasks", active: true },
    { name: "Projects", icon: <FaFileAlt />, link: "/dashboard/projects", active: false },
    {
      name: "Calendar",
      icon: <FaCalendarAlt />,
      link: "/dashboard/calendar",
      active: false,
    },
  ];

  return (
    <aside className="hidden lg:flex min-h-screen bg-background border-r shadow-xl w-64 space-y-6 py-4 px-5 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out  flex-col justify-between">
      <div>
        <div className="flex flex-col items justify-center">
          <h2 className="text-5xl p-4 select-none">taskit</h2>
          <nav className="mt-6">
            <div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className={cn(
                    "p-4 hover:bg-accent hover:text-primary rounded-lg transition duration-300 flex items-center cursor-pointer gap-x-3 border-b mt-2 text-xl",
                    pathname === item.link ? "bg-accent text-primary" : null,
                  )}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <div>
        <Link
          href={"/"}
          className="p-4 hover:bg-accent hover:text-primary rounded-lg transition duration-300 flex items-center cursor-pointer gap-x-3 border-b mt-2 text-xl"
        >
          <TbLogout />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default SideNav;
