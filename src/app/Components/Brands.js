"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function BrandsSection() {
  const brands = [
    { name: "BMW", img: "/bmw.png" },
    { name: "Ferrari", img: "/ferrari.png" },
    { name: "Lexus", img: "/LexusLogo.png" },
    { name: "Lamborghini", img: "/lamborghini.png" },
    { name: "Porsche", img: "/porsche.png" },
    { name: "Tesla", img: "/tesla.png" },
    { name: "Rolls Royce", img: "/RollsRoyce.png" },
  ];

  return (
    <section className="relative bg-[#0e1111] py-16 overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-bold text-white"
      >
        <span className="text-[#e81828]">Our Premium </span> Brands
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-1 bg-[#e81828] mx-auto mt-4 rounded-full"
      />

      {/* Slider */}
      <div className="mt-12 px-6 md:px-16">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
        >
          {brands.map((brand, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-[#1a1d1d] rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 hover:shadow-red-600/40 transition duration-300 cursor-pointer"
              >
                <div className="w-24 h-24 relative mb-4">
                  <Image
                    src={brand.img}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg">
                  {brand.name}
                </h3>
                <Check className="text-[#e81828] mt-2" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
