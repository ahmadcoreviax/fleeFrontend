"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Ahsan R.",
    role: "Business Traveler",
    text: "Booked in minutes and car was spotless. Pricing is honest. 10/10 will rent again!",

    rating: 5,
  },
  {
    name: "Mehak K.",
    role: "Photographer",
    text: "Flexible pickup saved my shoot. Support team is super responsive.",

    rating: 5,
  },
  {
    name: "Hassan I.",
    role: "Weekend Trip",
    text: "Great rates for the Sportage. Smooth process from booking to return.",

    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 bg-[#0e1111]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Customers <span className="text-[#e81828]">love</span> Fleet X
        </motion.h2>

        {/* Scrollable row with snap */}
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[640px] sm:min-w-0">
            {reviews.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 h-full"
              >
                <Quote className="h-6 w-6 text-[#e81828]" />
                <p className="mt-3 text-white/80">{r.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-white/60">{r.role}</div>
                  </div>
                </div>
                <div className="mt-3 flex">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-4 w-4 ${
                        idx < r.rating
                          ? "text-[#e81828] fill-[#e81828]"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
