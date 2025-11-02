"use client";

import { motion } from "framer-motion";
import { ArrowRight, Car, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LuxuryCTA() {
  return (
    <section className="relative min-h-screen w-full bg-[#0e1111] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/ctaBg.webp"
          alt="Luxury Car"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0e1111]/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 py-20 flex flex-col items-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-[#e81828] text-sm uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-4 h-4" />
          Drive in Luxury
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl"
        >
          Experience the Art of Luxury Rides
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Elevate your journey with our premium fleet of cars, crafted for those
          who desire nothing but perfection.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/allCars"
            className="px-8 py-4 rounded-2xl bg-[#e81828] text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-[#c51422] transition-all shadow-lg hover:shadow-[#e81828]/40"
          >
            Book Your Ride <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/allCars"
            className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all shadow-lg"
          >
            <Car className="w-5 h-5" /> Explore Fleet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
