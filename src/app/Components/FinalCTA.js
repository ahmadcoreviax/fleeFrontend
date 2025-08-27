"use client";

import { motion } from "framer-motion";
import { PhoneCall, CalendarClock, Star } from "lucide-react";

export default function FinalCTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#0e1111] min-h-[70vh] flex items-center">
      {/* Luxury background with gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605559424843-9e4cbb17c0c7?q=80&w=2400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-[#0e1111]/95 to-black" />

      {/* subtle glowing orb */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#e81828]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#e81828]/20 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
          >
            Ready to ride with{" "}
            <span className="text-[#e81828]">FleetX Car Rental LLC</span>?
          </motion.h3>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl text-white/80"
          >
            Book online in seconds — or let us craft a plan tailored to your
            journey. Premium cars, world-class service.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Contact button */}
            <motion.a
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur text-white inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-5 w-5" /> Contact Us
            </motion.a>

            {/* Reserve button */}
            <motion.a
              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 20px #e81828",
              }}
              whileTap={{ scale: 0.95 }}
              href="/allCars"
              className="px-6 py-3 rounded-xl bg-[#e81828] hover:bg-[#c41422] text-white font-bold inline-flex items-center justify-center gap-2"
            >
              <CalendarClock className="h-5 w-5" /> Reserve Now
            </motion.a>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm"
          >
            <Star className="h-5 w-5 text-[#e81828]" />
            Your journey starts here — FleetX Car Rental LLC, UAE.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
