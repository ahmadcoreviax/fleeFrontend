"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Car, Clock, ShieldCheck } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="min-h-screen mt-20 bg-[#0e1111] text-white overflow-hidden relative">
        {/* Hero Banner with Background Image */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <Image
            src="/aboutBg.webp"
            alt="Luxury Car Banner"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1111]/60 to-[#0e1111]" />

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold">
              About <span className="text-[#e81828]">Fleet X</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Redefining car rentals with luxury, comfort, and unmatched
              service.
            </p>
          </motion.div>
        </section>

        {/* Company Intro */}
        <section className="grid md:grid-cols-2 gap-10 items-center px-6 lg:px-20 py-20">
          {/* Text */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Who <span className="text-[#e81828]">We Are</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Fleet X Car Rental LLC is your trusted partner for premium
              mobility solutions. From exotic sports cars to executive sedans,
              we make sure every journey reflects luxury and reliability.
            </p>
            <p className="text-gray-400">
              Whether you’re traveling for business, leisure, or special events,
              our modern fleet and exceptional service are tailored to meet your
              needs.
            </p>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <Image
              src="/aboutCol1.webp"
              alt="Car 1"
              width={400}
              height={300}
              className="rounded-2xl shadow-2xl"
            />
            <Image
              src="/aboutCol2.webp"
              alt="Car 2"
              width={400}
              height={300}
              className="rounded-2xl shadow-2xl mt-8"
            />
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 lg:px-20 py-20 bg-white/5 rounded-3xl mx-4 md:mx-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Choose <span className="text-[#e81828]">Fleet X?</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: "Luxury Fleet",
                desc: "Drive the world’s most prestigious cars.",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Always available, anytime, anywhere.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Service",
                desc: "Full insurance and top-rated service.",
              },
              {
                icon: Users,
                title: "Customer First",
                desc: "Thousands of satisfied clients worldwide.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-black/50 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-[0_0_25px_#e81828] transition"
              >
                <item.icon className="text-[#e81828] mb-4" size={50} />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center px-6 lg:px-20 py-20">
          {/* Vision Text */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-[#e81828]">Vision</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Fleet X, our vision is to redefine mobility by combining
              innovation, sustainability, and unmatched luxury. We are committed
              to providing exceptional experiences and shaping the future of
              premium car rentals worldwide.
            </p>
          </motion.div>

          {/* Vision Image */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image
              src="/aboutMain.webp"
              alt="Vision Car"
              width={500}
              height={350}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </section>

        {/* CTA */}
        {/* CTA */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#0e1111] via-[#1a1d1d] to-[#0e1111] text-center">
          {/* Floating Red Lights for Luxury Glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#e81828]/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#e81828]/30 rounded-full blur-[120px] animate-pulse" />

          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-extrabold relative z-10 mb-6"
          >
            Drive Luxury, Drive <span className="text-[#e81828]">Fleet X</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10"
          >
            Book your dream car today and experience world-class service with
            unmatched elegance.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <motion.a
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 25px rgba(232,24,40,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="bg-[#e81828] text-white font-semibold px-10 py-4 rounded-2xl shadow-lg tracking-wide"
            >
              Contact Us
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 25px rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              href="/allCars"
              className="bg-white text-[#0e1111] font-semibold px-10 py-4 rounded-2xl shadow-lg tracking-wide"
            >
              View Fleet
            </motion.a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
