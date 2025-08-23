"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Check, SlidersHorizontal, ChevronDown } from "lucide-react";
import getReq from "../Utilities/getReq";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function AllCars() {
  const [cars, setCars] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    transmission: "",
    fuel: "",
    seats: "",
  });

  async function fetchCars() {
    try {
      let result = await getReq("api/getAllCars");
      console.log(result.response);
      setCars(result.response || []);
    } catch (error) {
      console.log("error fetching cars", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter handler
  const filteredCars = cars.filter((car) => {
    const { transmission, fuel, seats } = filters;
    return (
      (!transmission || car.transmission === transmission) &&
      (!fuel || car.fuelType === fuel) &&
      (!seats || car.seats === parseInt(seats))
    );
  });

  return (
    <>
      <Header />
      <section className="bg-[#0e1111] mt-20 text-white py-16 px-4">
        <div className="container mx-auto grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden w-full flex items-center justify-between bg-white/10 px-4 py-3 rounded-lg mb-6"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="font-medium flex items-center gap-2">
                <SlidersHorizontal size={18} /> Filters
              </span>
              <ChevronDown
                className={`transform transition ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              {/* Transmission */}
              <div>
                <h4 className="font-semibold mb-2">Transmission</h4>
                <div className="space-y-2 text-sm">
                  {["Auto", "Manual"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="transmission"
                        value={t}
                        checked={filters.transmission === t}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            transmission: e.target.value,
                          })
                        }
                        className="accent-[#e81828]"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div>
                <h4 className="font-semibold mb-2">Fuel Type</h4>
                <div className="space-y-2 text-sm">
                  {["Petrol", "Diesel", "Electric"].map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="fuel"
                        value={f}
                        checked={filters.fuel === f}
                        onChange={(e) =>
                          setFilters({ ...filters, fuel: e.target.value })
                        }
                        className="accent-[#e81828]"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>

              {/* Seats */}
              <div>
                <h4 className="font-semibold mb-2">Seats</h4>
                <div className="space-y-2 text-sm">
                  {[2, 4, 5, 7].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="seats"
                        value={s}
                        checked={filters.seats === String(s)}
                        onChange={(e) =>
                          setFilters({ ...filters, seats: e.target.value })
                        }
                        className="accent-[#e81828]"
                      />
                      {s} Seats
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cars grid */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-6">
              All <span className="text-[#e81828]">Cars</span>
            </h2>

            {filteredCars.length === 0 ? (
              <p className="text-gray-400">No cars match your filters.</p>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCars.map((car, i) => (
                  <motion.div
                    key={car?._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
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
                    </div>

                    {/* Car Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold">{car?.name}</h3>

                      {/* Pricing */}
                      <div className="mt-3 text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#e81828]" /> Daily:{" "}
                          <span className="text-[#e81828] font-medium">
                            {car?.perDayCharges} AED
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#e81828]" />{" "}
                          Weekly:{" "}
                          <span className="text-[#e81828] font-medium">
                            {car?.perWeekCharges} AED
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#e81828]" />{" "}
                          Monthly:{" "}
                          <span className="text-[#e81828] font-medium">
                            {car?.perMonthCharges} AED
                          </span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
                        {car?.details?.slice(0, 3)?.map((d, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-white/10 bg-white/5"
                          >
                            <Check className="h-4 w-4 text-[#e81828]" /> {d}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-5 flex gap-3">
                        <a
                          href="#book"
                          className="flex-1 text-center py-2 rounded-lg bg-[#e81828] hover:bg-[#c41422] transition"
                        >
                          Book Now
                        </a>
                        <a
                          href={`/viewCar/${car?.slug}`}
                          className="flex-1 text-center py-2 rounded-lg border border-white/20 hover:bg-white/10"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
