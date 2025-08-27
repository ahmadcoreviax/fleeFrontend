"use client";

import { motion } from "framer-motion";
import { RotateCcw, DollarSign, Info, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function RefundPolicy() {
  const policies = [
    {
      icon: <RotateCcw className="w-8 h-8 text-red-500" />,
      title: "Early Return Policy",
      text: "If the customer decides to return the car before the due date and time, the vehicle will be returned to Fleet X Rent a Car. Fleet X Rent a Car is not obliged to make an amount due for days that are not used.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-500" />,
      title: "Refund Method",
      text: "All refunds will be processed according to the actual mode of Payment.",
    },
    {
      icon: <FileText className="w-8 h-8 text-red-500" />,
      title: "Amendments",
      text: "Customers can alter the terms and conditions of hiring the rental services only before the rental begins. Categories like duration, vehicle type, rates, pick-up, and drop-off are subject to the current rate.",
    },
    {
      icon: <Info className="w-8 h-8 text-red-500" />,
      title: "Refund Request Process",
      text: "Clients must request an identification number to submit their request for a refund. Customers must also inform us of the reason for a refund. We value your feedback to improve our services.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen mt-20 bg-[#0e1111] text-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1614377284368-a6d4f911edc7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Car"
            fill
            className="object-cover opacity-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Refund <span className="text-[#e81828]">Policy</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Our customer-first refund policies ensure clarity, fairness, and
              transparency for every transaction with Fleet X Rent a Car.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1d1d] rounded-2xl shadow-lg p-8 hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="mb-4">{policy.icon}</div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                {policy.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">{policy.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-12 bg-[#131617]"
        >
          <h3 className="text-2xl md:text-3xl font-semibold">
            Need more assistance?
          </h3>
          <p className="mt-3 text-gray-400">
            Contact our support team for any refund-related queries.
          </p>
          <Link href={"/contact"}>
            <button className="mt-6 px-8 py-3 bg-[#e81828] text-white rounded-full font-medium shadow-lg hover:bg-red-600 transition">
              Contact Support
            </button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
