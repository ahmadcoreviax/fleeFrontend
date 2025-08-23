"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Car } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Home", "Cars", "Services", "About Us", "Contact"];

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
          {menuItems.map((item, idx) => (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ color: "#e81828" }}
              className="transition-colors"
            >
              {item}
            </motion.a>
          ))}
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
              <span className="text-xl font-bold">FleetX</span>
              <X
                size={28}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <ul className="flex flex-col gap-6 text-lg font-medium">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-[#e81828] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
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
