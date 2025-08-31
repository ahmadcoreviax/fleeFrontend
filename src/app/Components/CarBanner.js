"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  PhoneCall,
  Gauge,
  Sparkles,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import getReq from "../Utilities/getReq";

/**
 * SingleCarShowcase
 * - Fetches a single car object from `/api/cars/featured` (adjust endpoint as needed)
 * - Displays a luxury, fully-responsive hero-like section for one car
 * - Uses Tailwind CSS, Framer Motion and Lucide icons
 * - Theme: black #0e1111, red #e81828, white
 *
 * Expected API response: one car object matching the provided Mongoose schema
 */

export default function SingleCarShowcase() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function fetchCar() {
      try {
        setLoading(true);
        const result = await getReq("api/getBannerCar");
        console.log(result.response.car);
        if (result.statusCode == 200) {
          setCar(result.response.car);
        }
        if (!mounted) return;
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCar();
    return () => {
      mounted = false;
    };
  }, []);

  const nextImg = () =>
    setImgIndex((i) =>
      car?.carImages?.length ? (i + 1) % car.carImages.length : 0
    );
  const prevImg = () =>
    setImgIndex((i) =>
      car?.carImages?.length
        ? (i - 1 + car.carImages.length) % car.carImages.length
        : 0
    );

  return (
    <section className="relative w-full bg-[#0e1111] text-white">
      {/* Floating logo top-left */}
      <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-[#e81828] grid place-items-center shadow-[0_10px_30px_rgba(232,24,40,0.28)]">
          {/* Simple logo mark */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 12 L12 3 L21 12 L12 21 Z" fill="#0e1111" />
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-white/70">
            Fleet X
          </p>
          <p className="-mt-1 font-semibold">CAR RENTAL LLC</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-gray-400">Loading premium car...</div>
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center text-red-400">
            {error}
          </div>
        ) : !car ? (
          <div className="flex h-96 items-center justify-center text-gray-400">
            No featured car found.
          </div>
        ) : (
          <div className="relative grid grid-cols-1 gap-8 rounded-3xl lg:grid-cols-2">
            {/* LEFT: Image gallery / hero visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111214] via-[#0e1111] to-black p-6 shadow-xl">
                {/* Image area */}
                <div className="relative h-[380px] sm:h-[420px] md:h-[480px] lg:h-[560px]">
                  {car?.carImages && car?.carImages.length ? (
                    <>
                      <Image
                        src={car?.carImages[imgIndex].url}
                        alt={car?.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />

                      {/* left/right controls */}
                      <button
                        onClick={prevImg}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 backdrop-blur hover:bg-black/60"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImg}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2 backdrop-blur hover:bg-black/60"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* image index badge */}
                      <div className="absolute bottom-4 left-4 z-30 rounded-full bg-black/50 px-3 py-1 text-sm text-white/80">
                        {imgIndex + 1} / {car?.carImages.length}
                      </div>
                    </>
                  ) : (
                    <div className="grid h-full place-items-center text-white/50">
                      No image
                    </div>
                  )}
                </div>

                {/* glossy reflection */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent opacity-40" />

                {/* subtle price ribbon (overlay) */}
                <div className="absolute right-6 top-6 z-30 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                  <p className="text-xs text-white/70">From</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    AED {car?.perDayCharges.toLocaleString()}{" "}
                    <span className="text-sm font-medium text-white/70">
                      / day
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Details & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="order-1 flex flex-col gap-6 lg:order-2"
            >
              <div className="rounded-2xl bg-white/3 p-6 backdrop-blur border border-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {car?.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/70">
                      {car?.model} • {car?.color}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#e81828]/10 px-3 py-1 text-xs font-medium text-[#e81828]">
                        <Sparkles className="h-4 w-4" /> Signature
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                        <ShieldCheck className="h-4 w-4" /> Fully Insured
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                        <Gauge className="h-4 w-4" /> Unlimited KM*
                      </span>
                    </div>
                  </div>

                  {/* rating */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-[#e81828]" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                    <p className="mt-1 text-xs text-white/70">2000+ reviews</p>
                  </div>
                </div>

                {/* Details list */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(car?.details || []).slice(0, 6).map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-[#e81828]" />
                      <p className="text-sm text-white/80">{d}</p>
                    </div>
                  ))}
                </div>

                {/* description */}
                {car?.description && car?.description.length ? (
                  <p className="mt-6 text-sm text-white/70">
                    {car?.description.slice(0, 2).join(" ")}
                  </p>
                ) : null}

                {/* Availability / badges */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      car?.status === "Available"
                        ? "bg-[#e81828]/10 text-[#e81828]"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    {car?.status}
                  </span>

                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                    {car?.brand?.name || "Brand"}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                    {car?.category?.name || "Premium"}
                  </span>
                </div>

                {/* CTA Row */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-white/70">Starting</p>
                      <p className="text-2xl font-bold">
                        AED {car?.perDayCharges.toLocaleString()}{" "}
                        <span className="text-sm font-medium text-white/70">
                          / day
                        </span>
                      </p>
                    </div>

                    <div className="hidden h-12 w-px bg-white/6 sm:block" />

                    <div className="flex items-center gap-3">
                      <PhoneCall className="h-5 w-5 text-white/70" />
                      <div>
                        <p className="text-xs text-white/60">Quick Call</p>
                        <a
                          href="tel:+9710000000000"
                          className="text-sm font-medium"
                        >
                          +971 00 000 0000
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/book?car=${encodeURIComponent(car.slug)}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#e81828] px-6 py-3 font-semibold shadow-lg hover:shadow-[#e81828]/40 transition-transform hover:-translate-y-0.5"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/cars/${encodeURIComponent(car.slug)}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-3 font-medium hover:bg-white/10 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Lower strip: extra features and micro-gallery */}
              <div className="-mx-6 rounded-b-3xl bg-gradient-to-r from-[#0e1111] via-[#111214] to-[#0e1111] p-6">
                <div className="mx-auto max-w-4xl">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                        <Sparkles className="h-4 w-4 text-[#e81828]" />
                        <span className="text-sm font-medium">
                          White‑glove service
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                        <MapPin className="h-4 w-4 text-white/80" />
                        <span className="text-sm">Doorstep delivery</span>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                        <ShieldCheck className="h-4 w-4 text-white/80" />
                        <span className="text-sm">Fully insured</span>
                      </div>
                    </div>

                    <div className="hidden items-center gap-4 sm:flex">
                      {(car?.carImages || []).slice(0, 4).map((img, i) => (
                        <div
                          key={i}
                          className="relative h-14 w-24 overflow-hidden rounded-lg border border-white/6"
                        >
                          <Image
                            src={img.url}
                            alt={`${car.name} ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* subtle bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-black/90 via-transparent" />
    </section>
  );
}
