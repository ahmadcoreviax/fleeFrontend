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
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    minDay: "",
    maxDay: "",
    minWeek: "",
    maxWeek: "",
    minMonth: "",
    maxMonth: "",
  });

  async function fetchData() {
    try {
      // Cars, Brands, Categories alag alag fetch
      let carRes = await getReq("api/getAllCars");
      let brandRes = await getReq("api/mng/getAllBrands");
      let catRes = await getReq("api/mng/getAllCategories");

      setCars(carRes.response || []);
      setBrands(brandRes.response?.brands || []);
      setCategories(catRes.response?.categories || []);
    } catch (error) {
      console.log("error fetching data", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Filter handler
  const filteredCars = cars.filter((car) => {
    const {
      brand,
      category,
      minDay,
      maxDay,
      minWeek,
      maxWeek,
      minMonth,
      maxMonth,
    } = filters;

    const brandMatch = !brand || car.brand === brand;
    const categoryMatch = !category || car.category === category;

    const dayMatch =
      (!minDay || car.perDayCharges >= parseInt(minDay)) &&
      (!maxDay || car.perDayCharges <= parseInt(maxDay));

    const weekMatch =
      (!minWeek || car.perWeekCharges >= parseInt(minWeek)) &&
      (!maxWeek || car.perWeekCharges <= parseInt(maxWeek));

    const monthMatch =
      (!minMonth || car.perMonthCharges >= parseInt(minMonth)) &&
      (!maxMonth || car.perMonthCharges <= parseInt(maxMonth));

    return brandMatch && categoryMatch && dayMatch && weekMatch && monthMatch;
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
              {/* Brand */}
              <div>
                <h4 className="font-semibold mb-2">Brand</h4>
                <select
                  className="w-full bg-[#0e1111] rounded px-3 py-2"
                  value={filters.brand}
                  onChange={(e) =>
                    setFilters({ ...filters, brand: e.target.value })
                  }
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <select
                  className="w-full bg-[#0e1111] rounded px-3 py-2"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter - Per Day */}
              <div>
                <h4 className="font-semibold mb-2">Price (Per Day)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minDay}
                    onChange={(e) =>
                      setFilters({ ...filters, minDay: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxDay}
                    onChange={(e) =>
                      setFilters({ ...filters, maxDay: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
                </div>
              </div>

              {/* Price Filter - Per Week */}
              <div>
                <h4 className="font-semibold mb-2">Price (Per Week)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minWeek}
                    onChange={(e) =>
                      setFilters({ ...filters, minWeek: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxWeek}
                    onChange={(e) =>
                      setFilters({ ...filters, maxWeek: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
                </div>
              </div>

              {/* Price Filter - Per Month */}
              <div>
                <h4 className="font-semibold mb-2">Price (Per Month)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minMonth}
                    onChange={(e) =>
                      setFilters({ ...filters, minMonth: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxMonth}
                    onChange={(e) =>
                      setFilters({ ...filters, maxMonth: e.target.value })
                    }
                    className="w-1/2 px-2 py-2 rounded bg-white/10"
                  />
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
                {filteredCars.map((car, i) => {
                  const brand = brands.find((b) => b._id === car.brand);
                  const category = categories.find(
                    (c) => c._id === car.category
                  );

                  // Discount calculation
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
                        {/* Discount Badge */}
                        {hasDiscount && (
                          <span className="absolute top-2 left-2 bg-[#e81828] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Car Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold">{car?.name}</h3>
                        <p className="text-sm text-gray-400">
                          {brand?.name} | {category?.name}
                        </p>

                        {/* Pricing */}
                        <div className="mt-3 text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#e81828]" />{" "}
                            Daily:{" "}
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
                            <Calendar className="h-4 w-4 text-[#e81828]" />{" "}
                            Weekly:{" "}
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
                            <Calendar className="h-4 w-4 text-[#e81828]" />{" "}
                            Monthly:{" "}
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
