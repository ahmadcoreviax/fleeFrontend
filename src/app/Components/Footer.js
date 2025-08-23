"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0e1111] text-white mt-20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Image
            src={"/fullLogo.png"}
            height={150}
            width={150}
            alt="fleetx logo"
          />
          {/* <h2 className="text-2xl font-bold mb-4 text-[#e81828]">FleetX</h2> */}
          <p className="text-gray-400 leading-relaxed">
            Premium Rent a Car services with top-class vehicles and hassle-free
            booking. <br />
            <span className="italic">"Car Rental LLC"</span>
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-[#e81828]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#e81828]">
                Cars
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#e81828]">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#e81828]">
                About Us
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold text-lg mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Luxury Cars</li>
            <li>Corporate Rentals</li>
            <li>Wedding Packages</li>
            <li>City Transfers</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <Phone className="text-[#e81828]" size={18} /> +1 234 567 890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-[#e81828]" size={18} /> support@fleetx.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="text-[#e81828]" size={18} /> Dubai, UAE
            </li>
          </ul>
          <div className="flex gap-4 mt-6">
            <Facebook className="hover:text-[#e81828] cursor-pointer" />
            <Instagram className="hover:text-[#e81828] cursor-pointer" />
            <Twitter className="hover:text-[#e81828] cursor-pointer" />
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FleetX Car Rental LLC. All Rights Reserved.
      </div>
    </footer>
  );
}
