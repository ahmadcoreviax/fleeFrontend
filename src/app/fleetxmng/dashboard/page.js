"use client";

import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Car,
  Calendar,
  Settings,
} from "lucide-react";
import Link from "next/link";
import BookingsAnalytics from "@/app/Components/Analytics";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0e1111] text-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0e1111] border-r border-[#e81828] transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#e81828]">
          <h1 className="text-xl font-bold text-[#e81828]">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>
        <nav className="mt-6 space-y-2">
          <Link
            href="/fleetxmng/dashboard"
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#e81828] hover:text-white transition rounded-xl"
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <Link
            href="/fleetxmng/allCars"
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#e81828] hover:text-white transition rounded-xl"
          >
            <Car /> Cars
          </Link>
          <Link
            href="/fleetxmng/allBookings"
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#e81828] hover:text-white transition rounded-xl"
          >
            <Calendar /> Bookings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between p-4 border-b border-[#e81828] bg-[#0e1111]">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="text-white" />
          </button>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm">Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="admin"
              className="w-8 h-8 rounded-full border-2 border-[#e81828]"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
          <BookingsAnalytics />
        </main>
      </div>
    </div>
  );
}
