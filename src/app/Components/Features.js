"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, Map } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Trusted & Insured",
    desc: "Comprehensive coverage & safety.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "No hidden fees ever.",
  },
  { icon: Map, title: "Flexible Pickup", desc: "Pick up & drop anywhere." },
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Why <span className="text-[#e81828]">Fleet X</span>?
      </h2>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-white/10 bg-white/5"
          >
            <it.icon className="h-8 w-8 text-[#e81828] mb-3" />
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="text-white/70 mt-1">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
