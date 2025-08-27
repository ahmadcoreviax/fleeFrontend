"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Car, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getReq from "../Utilities/getReq";

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchData() {
    try {
      let catRes = await getReq("api/mng/getAllCategories");

      setCategories(catRes.response?.categories || []);
    } catch (error) {
      console.log("error fetching data", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = () => {
    if (!category) return;
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    router.push(`/allCars?${query.toString()}`);
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Luxury Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-[#0e1111]/95 to-black" />

      <div className="container mx-auto px-6 py-16 md:py-28 relative z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg text-center md:text-left"
        >
          <span className="text-[#e81828]">FleetX</span> Car Rental LLC
          <span className="block mt-2 text-white/90 text-2xl md:text-3xl font-light">
            Drive Luxury. Live Prestige.
          </span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed text-center md:text-left"
        >
          Premium cars, instant booking, world-class service. FleetX brings you
          the ultimate driving experience with a touch of elegance.
        </motion.p>

        {/* Filter Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-12 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Category Dropdown */}
            <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
              <label className="text-sm text-white/70 mb-2 block flex items-center gap-2">
                <Car className="h-4 w-4 text-[#e81828]" /> Select Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0e1111] border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#e81828] outline-none"
              >
                <option value="">Choose...</option>
                {Array.isArray(categories) &&
                  categories.length > 0 &&
                  categories.map((cat) => {
                    return (
                      <option value={cat._id} key={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
              </select>
            </motion.div>

            {/* Date Picker */}
            <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
              <label className="text-sm text-white/70 mb-2 block flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#e81828]" /> Booking Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0e1111] border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#e81828] outline-none"
              />
            </motion.div>

            {/* Search Button */}
            <div className="flex items-end">
              <motion.button
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 0 20px #e81828",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="w-full sm:w-auto px-8 py-3 bg-[#e81828] hover:bg-[#c41422] rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all"
              >
                Search <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex items-center justify-center md:justify-start gap-2 text-white/80 text-sm"
        >
          <Star className="h-5 w-5 text-[#e81828]" />
          Your journey starts here — FleetX Car Rental LLC, UAE.s
        </motion.div>
      </div>
    </section>
  );
}
