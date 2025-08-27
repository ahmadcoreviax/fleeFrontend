"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function TermsPage() {
  const terms = [
    {
      icon: <Shield className="w-8 h-8 text-[#e81828]" />,
      text: "Any dispute or claim arising on or in connection to Fleet X Rent a Car website will be resolved by the regulations and rules formulated by the UAE government in this regard.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#e81828]" />,
      text: "UAE is the source country of Fleet X Rent a Car.",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e81828]" />,
      text: "Anyone under 18 years old is not permitted to use our website. Likewise, they won’t be eligible to register here.",
    },
    {
      icon: <Lock className="w-8 h-8 text-[#e81828]" />,
      text: "If our customers choose to pay through our website, the information they provide will be sent directly to the payment service provider via a secure hyperlink.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#e81828]" />,
      text: "Customers are advised to keep copies of the transaction history and merchant rules and regulations.",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e81828]" />,
      text: "Every online transaction will be accepted by Visa and Master Cards in the AED currency.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#e81828]" />,
      text: "In line with the law in the UAE, Fleet X Rent a Car will not conduct any business or provide solutions for Office of Foreign Asset Control countries sanctioned by the UAE.",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#e81828]" />,
      text: "If any user uses the content or information on this site, it will be at his own risk, and the company is not responsible for any action taken.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#e81828]" />,
      text: "The content on this site is licensed by Fleet X Rent a Car, a licensed company. Legal action is applied to anyone who attempts to copy this content without permission.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#e81828]" />,
      text: "Any illegal use of this site could result in legal action, which could result in an amount of compensation or even criminal charges.",
    },
  ];

  return (
    <>
      <Header />
      <div className="bg-[#0e1111] mt-20 min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Car"
            fill
            className="object-cover opacity-30"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#e81828] drop-shadow-lg">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-300">
              Please read carefully before using our services
            </p>
          </motion.div>
        </div>

        {/* Terms Section */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          {terms.map((term, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-start gap-6 bg-[#1a1d1d] rounded-2xl p-6 shadow-lg hover:shadow-red-500/20 transition-shadow"
            >
              <div>{term.icon}</div>
              <p className="text-gray-300 leading-relaxed">{term.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
