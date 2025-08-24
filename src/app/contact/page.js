"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-[#0e1111] mt-20 text-white flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
        {/* Background Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-[#e81828] rounded-full blur-[180px] opacity-40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#e81828] rounded-full blur-[180px] opacity-30"
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 z-10"
        >
          <Image
            src="/fullLogo.png"
            alt="FleetX Logo"
            width={200}
            height={80}
            className="mx-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12 z-10"
        >
          Get in <span className="text-[#e81828]">Touch</span> with Us
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full z-10">
          {/* Left Side - Info */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {[
              {
                icon: <MapPin className="text-[#e81828]" size={28} />,
                title: "Our Location",
                desc: "123 Luxury Street, Karachi, Pakistan",
              },
              {
                icon: <Phone className="text-[#e81828]" size={28} />,
                title: "Call Us",
                desc: (
                  <a
                    href="tel:+923001234567"
                    className="text-gray-300 hover:text-[#e81828] transition"
                  >
                    +92 300 1234567
                  </a>
                ),
              },
              {
                icon: <Mail className="text-[#e81828]" size={28} />,
                title: "Email Us",
                desc: (
                  <a
                    href="mailto:contact@fleetx.com"
                    className="text-gray-300 hover:text-[#e81828] transition"
                  >
                    contact@fleetx.com
                  </a>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl transition backdrop-blur-md"
              >
                {item.icon}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Form */}
          <motion.form
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            action={`mailto:contact@fleetx.com`}
            method="post"
            encType="text/plain"
            className="bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-lg flex flex-col gap-6"
          >
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#e81828" }}
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#e81828] outline-none"
            />
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#e81828" }}
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#e81828] outline-none"
            />
            <motion.textarea
              whileFocus={{ scale: 1.02, borderColor: "#e81828" }}
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="p-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#e81828] outline-none resize-none"
            ></motion.textarea>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #e81828" }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-2 bg-[#e81828] text-white py-3 px-6 rounded-xl font-semibold shadow-lg transition"
            >
              <Send size={20} /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
}
