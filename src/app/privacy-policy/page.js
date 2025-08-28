"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText } from "lucide-react";
import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="bg-[#0e1111] mt-20 text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Privacy Policy Background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1111]/60 via-[#0e1111]/80 to-[#0e1111]" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center max-w-3xl px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#e81828] mb-4 tracking-wide">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              How Fleet X Rent a Car protects your personal and financial
              information.
            </p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-16">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-[#e81828] w-8 h-8" />
              <h2 className="text-2xl font-semibold text-[#e81828]">
                Financial Data Security
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The financial details and data associated with credit or debit
              cards will be kept strictly between Kohistan Rent a Car and you.
              This information will not be stored, shared, or sold to any third
              party or unauthorized individuals.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-[#e81828] w-8 h-8" />
              <h2 className="text-2xl font-semibold text-[#e81828]">
                Policy Updates
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Fleet X Rent a Car continuously strives to stay aligned with the
              latest practices. Our Privacy Policy and Terms & Conditions may
              change from time to time. Customers are advised to visit our
              website regularly to remain informed about updates. All amendments
              become effective as soon as they are published.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-[#e81828] w-8 h-8" />
              <h2 className="text-2xl font-semibold text-[#e81828]">
                Third-Party Advertisers
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Some third-party companies advertise on the Fleet X Rent a Car
              website, including ad networks and agencies. These companies may
              use cookies or intelligent search software to gather information
              about your browsing preferences. Fleet X Rent a Car does not share
              your data with these companies.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Please note, Fleet X Rent a Car has no authority or control over
              how these advertisers manage or use the data they collect. Such
              activities are not covered under this Privacy Policy.
            </p>
          </motion.div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 border-t border-white/10 bg-gradient-to-r from-[#0e1111] via-black to-[#0e1111]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-gray-400"
          >
            For any questions, please contact{" "}
            <span className="text-[#e81828] font-semibold">
              Fleet X Car Rental Support
            </span>
          </motion.p>
        </section>
      </div>
      <Footer />
    </>
  );
}
