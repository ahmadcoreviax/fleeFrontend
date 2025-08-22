"use client";

import { motion } from "framer-motion";
import { Car, Phone, MapPin } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="sticky top-0 z-50 bg-[#0e1111]/80 backdrop-blur border-b border-white/10"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-[#e81828]" />
          <span className="text-lg font-bold">Fleet X</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#fleet" className="hover:text-[#e81828]">
            Fleet
          </a>
          <a href="#features" className="hover:text-[#e81828]">
            Features
          </a>
          <a href="#pricing" className="hover:text-[#e81828]">
            Pricing
          </a>
          <a href="#contact" className="hover:text-[#e81828]">
            Contact
          </a>
        </nav>
        <div className="flex gap-2">
          <a
            href="tel:+92-300-0000000"
            className="px-3 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 flex items-center gap-1"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href="#book"
            className="px-3 py-2 text-sm rounded-lg bg-[#e81828] hover:bg-[#c41422] flex items-center gap-1"
          >
            <MapPin className="h-4 w-4" /> Book
          </a>
        </div>
      </div>
    </motion.header>
  );
}
