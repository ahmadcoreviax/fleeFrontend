"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Cars", path: "/allCars" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0e1111]/95 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Image
            src={"/fullLogo.png"}
            alt="fleetx logo"
            height={150}
            width={150}
          />
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path; // 👈 check active
            return (
              <motion.span
                key={idx}
                whileHover={{ y: -2, color: "#e81828" }}
                animate={
                  isActive
                    ? { y: -2, color: "#e81828", scale: 1.05 }
                    : { y: 0, color: "#ffffff", scale: 1 }
                }
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="cursor-pointer transition-colors"
              >
                <Link href={item.path}>{item.name}</Link>
              </motion.span>
            );
          })}
        </nav>

        {/* CTA */}
        <button className="hidden md:flex bg-[#e81828] px-5 py-2 rounded-full font-medium hover:bg-red-600 transition">
          Book Now
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 h-full w-72 bg-[#0e1111] shadow-lg p-6 z-50"
          >
            <div className="flex justify-between items-center mb-8">
              <Image
                src={"/fullLogo.png"}
                height={100}
                width={100}
                alt="fleetX logo"
              />
              <X
                size={28}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <ul className="flex flex-col gap-6 text-lg font-medium">
              {menuItems.map((item, idx) => {
                const isActive = pathname === item.path;
                return (
                  <motion.li
                    key={idx}
                    animate={
                      isActive
                        ? { x: 10, color: "#e81828", scale: 1.05 }
                        : { x: 0, color: "#ffffff", scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Link
                      href={item.path}
                      className="hover:text-[#e81828] transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <button className="mt-10 w-full bg-[#e81828] py-3 rounded-full font-semibold hover:bg-red-600 transition">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
