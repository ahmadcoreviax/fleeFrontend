"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CircleDollarSign,
  MapPin,
  Info,
  HelpCircle,
  Book,
  Banknote,
} from "lucide-react";
import postReq from "@/app/Utilities/postReq";
import Image from "next/image";
import BookingModal from "@/app/Components/BookingModal";

export default function CarDetailsPage() {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");

  const fetchCar = async () => {
    try {
      const result = await postReq("api/getSpecificCar", { slug });
      setCar(result.response);
      setMainImage(result?.response?.carImages?.[0]?.url || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [slug]);

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0e1111]">
        <motion.div
          animate={{ scale: 2 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-[#e81828] text-xl font-semibold"
        >
          <Image src={"/icon.png"} alt="fleetx icon" height={200} width={200} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1111] text-white p-4 md:p-8 max-w-7xl mx-auto">
      {/* Images Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* Main Image */}
        <motion.img
          key={mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={mainImage}
          alt={car.name}
          className="w-full max-h-[500px] object-cover rounded-2xl shadow-2xl border border-[#e81828]/40"
        />

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {car.carImages.map((img, idx) => (
            <motion.img
              whileHover={{ scale: 1.1 }}
              key={idx}
              src={img.url}
              alt={`thumb-${idx}`}
              className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                mainImage === img.url
                  ? "border-[#e81828] shadow-lg"
                  : "border-transparent"
              }`}
              onClick={() => setMainImage(img.url)}
            />
          ))}
        </div>
      </motion.div>

      {/* Car Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Side */}
        <div className="bg-[#1a1d1d] rounded-2xl p-6 shadow-xl border border-[#e81828]/30">
          <h1 className="text-3xl font-bold text-[#e81828]">{car.name}</h1>
          <p className="text-gray-300">Model: {car.model}</p>
          <p className="text-gray-300">Color: {car.color}</p>
          <p className="text-sm text-gray-500">
            License Plate: {car.licensePlate}
          </p>

          {/* Status + Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none bg-[#e81828] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-[#c51420] transition"
                onClick={() => setIsModalOpen(true)}
              >
                Book Now
              </motion.button>

              <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                car={car}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none border-2 border-[#e81828] text-[#e81828] font-semibold px-6 py-3 rounded-xl hover:bg-[#e81828] hover:text-white transition"
                onClick={() => alert("Contact clicked!")}
              >
                📞 Contact
              </motion.button>
            </div>
          </div>

          {/* Charges */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-[#e81828]">
              <Banknote /> <span>{car.perDayCharges}/day</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Banknote /> <span>{car.perWeekCharges}/week</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Banknote /> <span>{car.perMonthCharges}/month</span>
            </div>
          </div>

          {/* Available In */}
          <div className="flex items-center gap-2 mt-4 text-gray-300">
            <MapPin className="text-[#e81828]" /> Available in:{" "}
            {car.availableIn.join(", ")}
          </div>
        </div>

        {/* Right Side Description */}
        <div className="bg-[#1a1d1d] rounded-2xl p-6 shadow-xl border border-[#e81828]/30">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#e81828]">
            <Info /> Description
          </h2>
          <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-300">
            {car.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Car Details */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-10 bg-[#1a1d1d] p-6 rounded-2xl shadow-xl border border-[#e81828]/30"
      >
        <h2 className="text-2xl font-semibold mb-3 text-[#e81828]">
          Car Details
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          {car.details.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-10 bg-[#1a1d1d] p-6 rounded-2xl shadow-xl border border-[#e81828]/30"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-[#e81828]">
          <HelpCircle /> FAQs
        </h2>
        <div className="mt-4 space-y-4">
          {car.faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-[#0e1111] border border-[#e81828]/30"
            >
              <p className="font-semibold text-white">Q: {faq.question}</p>
              <p className="text-gray-400 mt-1">A: {faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
