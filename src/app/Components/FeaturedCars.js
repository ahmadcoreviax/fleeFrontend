"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge, Users, Fuel, Calendar, Check } from "lucide-react";
import { useEffect, useState } from "react";
import getReq from "../Utilities/getReq";
import BookingModal from "./BookingModal";

export default function FeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);

  async function getFeaturedCars() {
    try {
      let result = await getReq("api/getFeaturedCars");
      console.log(result.response?.cars);
      setFeaturedCars(result.response?.cars);
    } catch (error) {
      console.log("error in fetching featured cars", error);
    }
  }
  useEffect(() => {
    getFeaturedCars();
  }, []);
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
          {Array.isArray(featuredCars) &&
            featuredCars.length > 0 &&
            featuredCars?.map((car, i) => {
              const hasDiscount = car.discountedPercentage > 0;
              const discount = car.discountedPercentage;

              const calcDiscount = (price) =>
                hasDiscount
                  ? Math.round(price - (price * discount) / 100)
                  : price;

              const dayPrice = calcDiscount(car.perDayCharges);
              const weekPrice = calcDiscount(car.perWeekCharges);
              const monthPrice = calcDiscount(car.perMonthCharges);
              return (
                <motion.div
                  key={car?._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#e81828]/40 hover:shadow-lg hover:shadow-[#e81828]/20 transition"
                >
                  {/* Car Image */}
                  <div className="relative h-48">
                    <Image
                      src={car?.carImages[0]?.url}
                      alt={car?.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1111]/80 to-transparent" />
                    {/* Discount Badge */}
                    {hasDiscount && (
                      <span className="absolute top-2 left-2 bg-[#e81828] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Car Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{car?.name}</h3>

                    {/* Pricing */}
                    {/* Pricing */}
                    <div className="mt-3 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#e81828]" /> Daily:{" "}
                        {hasDiscount ? (
                          <span className="flex gap-2 items-center">
                            <span className="line-through text-gray-400">
                              {car?.perDayCharges} AED
                            </span>
                            <span className="text-[#e81828] font-bold">
                              {dayPrice} AED
                            </span>
                          </span>
                        ) : (
                          <span className="text-[#e81828] font-medium">
                            {car?.perDayCharges} AED
                          </span>
                        )}
                      </div>
                      {/* weekly */}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#e81828]" /> Weekly:{" "}
                        {hasDiscount ? (
                          <span className="flex gap-2 items-center">
                            <span className="line-through text-gray-400">
                              {car?.perWeekCharges} AED
                            </span>
                            <span className="text-[#e81828] font-bold">
                              {weekPrice} AED
                            </span>
                          </span>
                        ) : (
                          <span className="text-[#e81828] font-medium">
                            {car?.perWeekCharges} AED
                          </span>
                        )}
                      </div>
                      {/* monthly */}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#e81828]" /> Monthly:{" "}
                        {hasDiscount ? (
                          <span className="flex gap-2 items-center">
                            <span className="line-through text-gray-400">
                              {car?.perMonthCharges} AED
                            </span>
                            <span className="text-[#e81828] font-bold">
                              {monthPrice} AED
                            </span>
                          </span>
                        ) : (
                          <span className="text-[#e81828] font-medium">
                            {car?.perMonthCharges} AED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                      {car?.details.slice(0, 4)?.map((d, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-white/10 bg-white/5"
                        >
                          <Check className="h-4 w-4 text-[#e81828]" /> {d}
                        </span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="mt-5 flex gap-3">
                      <a
                        href="#book"
                        className="flex-1 text-center py-2 rounded-lg bg-[#e81828] hover:bg-[#c41422] transition"
                        onClick={() => {
                          setIsModalOpen(true);
                          setSelectedCar(car);
                        }}
                      >
                        Book Now
                      </a>
                      <BookingModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        car={selectedCar}
                      />
                      <a
                        href={`/viewCar/${car?.slug}`}
                        className="flex-1 text-center py-2 rounded-lg border border-white/20 hover:bg-white/10"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
