"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What documents are required?",
    a: "Valid CNIC/Passport, driving license, and a refundable security deposit depending on the car class.",
  },
  {
    q: "Is fuel included?",
    a: "Fuel is not included. You return the car with the same level as at pickup.",
  },
  {
    q: "Can I rent without a credit card?",
    a: "Yes, we accept multiple payment methods including cash, debit card, and bank transfer.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes, doorstep delivery and pickup are available within city limits for a small fee.",
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`h-5 w-5 transition ${
            open ? "rotate-180 text-[#e81828]" : "text-white/70"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-4 text-white/75"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
          Frequently asked <span className="text-[#e81828]">questions</span>
        </motion.h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
