"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Headset,
  Car,
  Zap,
  MapPin,
  CreditCard,
} from "lucide-react";

const items = [
  {
    icon: Car,
    title: "Premium Fleet",
    desc: "Latest models, spotless interiors, perfect for every trip.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Comprehensive coverage and verified vehicles.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    desc: "We’ve got your back—anytime, anywhere.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "No hidden fees. What you see is what you pay.",
  },
  {
    icon: MapPin,
    title: "Flexible Pickup",
    desc: "Doorstep delivery or pickup from our hubs.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Reserve in seconds. Drive within minutes.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-16 md:py-20 bg-[#0e1111]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Why choose <span className="text-[#e81828]">Fleet X</span>?
        </motion.h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#e81828]/40 hover:shadow-lg hover:shadow-[#e81828]/20 transition"
            >
              <div className="h-12 w-12 rounded-xl bg-[#e81828]/15 border border-[#e81828]/30 grid place-items-center mb-3">
                <it.icon className="h-6 w-6 text-[#e81828]" />
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-1 text-white/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
