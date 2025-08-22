"use client";

import { motion } from "framer-motion";
import { Search, CalendarClock, CreditCard, Circle } from "lucide-react";
const steps = [
  {
    icon: Search,
    title: "Browse Cars",
    desc: "Find the perfect ride for your plan.",
  },
  {
    icon: CalendarClock,
    title: "Choose Plan",
    desc: "Daily, weekly or monthly—your call.",
  },
  {
    icon: CreditCard,
    title: "Book Securely",
    desc: "Fast checkout, instant confirmation.",
  },
  {
    icon: Circle,
    title: "Pick & Drive",
    desc: "Collect the car & hit the road.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-[#0e1111]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          How it <span className="text-[#e81828]">works</span>
        </motion.h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-[#e81828]/15 border border-[#e81828]/30 grid place-items-center">
                  <s.icon className="h-5 w-5 text-[#e81828]" />
                </div>
                <div className="text-2xl font-extrabold text-white/30 leading-none">{`0${
                  i + 1
                }`}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="text-white/70">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 w-10 h-[2px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
