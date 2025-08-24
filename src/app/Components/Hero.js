"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 to-[#0e1111]" />

      <div className="container mx-auto px-4 pt-20 pb-24 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Rent premium cars in minutes.
          <span className="block text-[#e81828]">Drive the difference.</span>
        </motion.h1>

        <p className="mt-4 text-white/80 max-w-2xl">
          From city compacts to luxury SUVs — instant booking, transparent
          pricing, and 24/7 support.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <span className="px-6 py-3 rounded-lg bg-[#e81828] hover:bg-[#c41422] flex items-center gap-2 justify-center">
            Book Your Ride With <span className="font-extrabold">FLEET X</span>
            <ArrowRight className="h-5 w-5" />
          </span>
          <Link
            href="/allCars"
            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 justify-center flex"
          >
            Explore Fleet
          </Link>
        </div>
      </div>
    </section>
  );
}
