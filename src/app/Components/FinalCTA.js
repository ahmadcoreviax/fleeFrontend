"use client";

import { motion } from "framer-motion";
import { PhoneCall, CalendarClock } from "lucide-react";

export default function FinalCTABanner() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#0e1111]">
      {/* subtle red glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#e81828]/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
          className="p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Ready to ride with <span className="text-[#e81828]">Fleet X</span>?
          </h3>
          <p className="mt-2 text-white/75">
            Book online in seconds, or contact us for a custom plan.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 inline-flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-5 w-5" /> Contact
            </a>
            <a
              href="#book"
              className="px-5 py-3 rounded-xl bg-[#e81828] hover:bg-[#c41422] inline-flex items-center justify-center gap-2"
            >
              <CalendarClock className="h-5 w-5" /> Reserve Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
