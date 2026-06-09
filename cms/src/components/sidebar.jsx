"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaDonate, FaChartBar, FaExclamationTriangle } from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Users", path: "/users", icon: <FaUsers /> },
  { name: "Disasters", path: "/disasters", icon: <FaExclamationTriangle /> },
  { name: "Donations", path: "/donations", icon: <FaDonate /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed">
      <h1 className="text-xl font-bold p-4 border-b border-gray-700">
        PeduliBersama
      </h1>

      <ul className="p-2">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}