"use client";

import { motion } from "framer-motion";
import { Check, Calendar } from "lucide-react";

const plans = [
  {
    name: "Daily",
    price: "From PKR 7,500",
    unit: "/day",
    features: ["Free cancellation (24h)", "150 KM included", "Basic insurance"],
    best: false,
  },
  {
    name: "Weekly",
    price: "From PKR 49,000",
    unit: "/week",
    features: ["Priority support", "Flexible mileage", "Full insurance"],
    best: true,
  },
  {
    name: "Monthly",
    price: "From PKR 180,000",
    unit: "/month",
    features: ["Best value", "Free concierge pickup", "Damage waiver"],
    best: false,
  },
];

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-[#0e1111]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Flexible <span className="text-[#e81828]">plans</span> for every trip
        </motion.h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.06 }}
              className={`p-6 rounded-2xl border bg-white/5 border-white/10 ${
                p.best
                  ? "ring-2 ring-[#e81828]/60 shadow-[0_0_40px_rgba(232,24,40,0.25)]"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <Calendar className="h-5 w-5 text-[#e81828]" />
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-[#e81828]">
                  {p.price}
                </span>
                <span className="text-white/60"> {p.unit}</span>
              </div>
              <ul className="mt-5 space-y-3 text-white/80">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#e81828] mt-0.5" />{" "}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className="mt-6 block text-center py-2 rounded-xl bg-[#e81828] hover:bg-[#c41422] transition"
              >
                Choose {p.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
