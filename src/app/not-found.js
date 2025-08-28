"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft, Home, Search } from "lucide-react";
import Particles from "./Components/Particles";
import Image from "next/image";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Color theme (from user):
// bg: #0e1111, red: #e81828, white: #ffffff

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="relative min-h-screen mt-20 w-full overflow-hidden bg-[#0e1111] text-white">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0">
          {/* vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(232,24,40,0.18),rgba(14,17,17,0))]" />
          {/* soft noise */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-soft-light"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.15"/></svg>\')',
            }}
          />
          {/* animated grid */}
          <motion.div
            aria-hidden
            className="absolute -left-1/2 top-1/3 h-[120vh] w-[200vw] rotate-12 opacity-[0.07]"
            initial={{ x: -50 }}
            animate={{ x: 50 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating particles */}

        <Particles />

        <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-wider text-white/80 backdrop-blur-lg"
          >
            <Car className="h-4 w-4 text-[#e81828]" />
            FleetX Car Rental LLC
          </motion.div>

          {/* Card */}
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-12"
          >
            {/* glow edge */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-[#e81828]/20 to-transparent opacity-60" />

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-6">
                <div>
                  <motion.h1
                    className="text-5xl font-extrabold tracking-tight md:text-6xl"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                  >
                    404
                  </motion.h1>
                  <motion.h2
                    className="mt-2 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #ffffff 0%, #ffffff 60%, #e81828 100%)",
                    }}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  >
                    The road you’re looking for doesn’t exist.
                  </motion.h2>
                </div>

                <motion.p
                  className="max-w-prose text-sm leading-relaxed text-white/70 md:text-base"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  It seems you’ve taken a wrong turn. Let’s get you back on
                  track to explore our luxury fleet and premium services.
                </motion.p>

                {/* Actions */}
                <motion.div
                  className="flex flex-col gap-3 sm:flex-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <Link
                    href="/"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#e81828] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(232,24,40,0.6)] outline-none transition active:scale-[0.98] hover:shadow-[0_12px_32px_-6px_rgba(232,24,40,0.7)]"
                  >
                    <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Go Home
                  </Link>

                  <button
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/5 active:scale-[0.98]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </button>

                  <Link
                    href="/allCars"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e81828]/40 bg-[#e81828]/10 px-5 py-3 text-sm font-semibold text-[#e81828] transition hover:bg-[#e81828]/15 active:scale-[0.98]"
                  >
                    <Search className="h-4 w-4" />
                    Browse Fleet
                  </Link>
                </motion.div>
              </div>

              {/* Decorative logo / icon */}
              <motion.div
                className="relative mx-auto aspect-square w-40 select-none md:w-56"
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0e1111] to-[#0e2222]/50 opacity-40 blur-2xl" />
                <div className="relative z-10 grid h-full w-full place-items-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  {/* <Car className="h-16 w-16 text-white/90" /> */}
                  <Image
                    src={"/fullLogo.png"}
                    height={200}
                    width={200}
                    alt="Fleet X logo"
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-3xl"
                  initial={{ boxShadow: "0 0 0 0 rgba(232,24,40,0)" }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(232,24,40,0)",
                      "0 0 0 6px rgba(232,24,40,0.15)",
                      "0 0 0 0 rgba(232,24,40,0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
              </motion.div>
            </div>

            {/* bottom accent line */}
            <motion.div
              className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#e81828] to-transparent opacity-60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            />
          </motion.section>

          {/* Footer hint */}
          <motion.p
            className="mt-8 text-center text-xs text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tip: You can also use the navigation to find our services.
          </motion.p>
        </main>
      </div>
      <Footer />
    </>
  );
}
