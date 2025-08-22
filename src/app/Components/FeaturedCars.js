"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge, Users, Fuel, Calendar } from "lucide-react";

const cars = [
  {
    name: "Tesla Model 3",
    img: "https://images.unsplash.com/photo-1511390429071-42e63a123f7c?q=80&w=1600",
    prices: {
      daily: "PKR 18,000",
      weekly: "PKR 110,000",
      monthly: "PKR 400,000",
    },
    specs: [
      { icon: Gauge, label: "Auto" },
      { icon: Users, label: "5 seats" },
      { icon: Fuel, label: "Electric" },
    ],
  },
  {
    name: "Toyota Corolla",
    img: "https://images.unsplash.com/photo-1549921296-3a6b5b2eb06b?q=80&w=1600",
    prices: {
      daily: "PKR 9,500",
      weekly: "PKR 60,000",
      monthly: "PKR 210,000",
    },
    specs: [
      { icon: Gauge, label: "Manual" },
      { icon: Users, label: "5 seats" },
      { icon: Fuel, label: "Petrol" },
    ],
  },
  {
    name: "Kia Sportage",
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1600",
    prices: {
      daily: "PKR 14,500",
      weekly: "PKR 95,000",
      monthly: "PKR 350,000",
    },
    specs: [
      { icon: Gauge, label: "Auto" },
      { icon: Users, label: "5 seats" },
      { icon: Fuel, label: "Diesel" },
    ],
  },
];

export default function FeaturedCars() {
  return (
    <section id="fleet" className="py-16 px-4 bg-[#0e1111]">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Featured <span className="text-[#e81828]">Cars</span>
        </h2>
        <p className="mt-2 text-center text-white/70">
          Choose from our top vehicles available for daily, weekly, or monthly
          rentals.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#e81828]/40 hover:shadow-lg hover:shadow-[#e81828]/20 transition"
            >
              {/* Car Image */}
              <div className="relative h-48">
                <Image
                  src={car.img}
                  alt={car.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1111]/80 to-transparent" />
              </div>

              {/* Car Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold">{car.name}</h3>

                {/* Pricing */}
                <div className="mt-3 text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#e81828]" /> Daily:{" "}
                    <span className="text-[#e81828] font-medium">
                      {car.prices.daily}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#e81828]" /> Weekly:{" "}
                    <span className="text-[#e81828] font-medium">
                      {car.prices.weekly}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#e81828]" /> Monthly:{" "}
                    <span className="text-[#e81828] font-medium">
                      {car.prices.monthly}
                    </span>
                  </div>
                </div>

                {/* Specs */}
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                  {car.specs.map((s) => (
                    <span
                      key={s.label}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-white/10 bg-white/5"
                    >
                      <s.icon className="h-4 w-4 text-[#e81828]" /> {s.label}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="mt-5 flex gap-3">
                  <a
                    href="#book"
                    className="flex-1 text-center py-2 rounded-lg bg-[#e81828] hover:bg-[#c41422] transition"
                  >
                    Book Now
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 text-center py-2 rounded-lg border border-white/20 hover:bg-white/10"
                  >
                    Details
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
