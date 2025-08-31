"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  PlusCircle,
} from "lucide-react";
import postReq from "../Utilities/postReq";
import toast, { Toaster } from "react-hot-toast";
import getReq from "../Utilities/getReq";
import { useRouter } from "next/navigation";

export default function BookingModal({ isOpen, onClose, car }) {
  const { register, handleSubmit, reset } = useForm();
  const [addons, setAddons] = useState([]); // backend se addons
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // fetch addons on mount
  useEffect(() => {
    if (isOpen) {
      fetchAddons();
    }
  }, [isOpen]);

  const fetchAddons = async () => {
    try {
      setLoading(true);
      let result = await getReq("api/mng/addons/get");
      if (result.statusCode === 200) {
        setAddons(result.response.addons || []); // [{_id, name, price}]
      } else {
        toast.error(result.response.msg || "Failed to load addons");
      }
    } catch (err) {
      console.error("Error fetching addons", err);
      toast.error("Error fetching addons");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    data.carId = car?._id;

    try {
      let result = await postReq("api/mng/createBooking", { data });
      setLoading(false);
      if (result.statusCode == 200) {
        toast.success(result.response.msg);
        reset();
        let bookingId = result.response.bookingId;
        router.push(`/ThankYou/${bookingId}`);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error while creating booking", error);
      toast.error("Booking Failed!");
    }
  };

  return (
    // <AnimatePresence>
    <main>
      {isOpen && (
        <div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex h-auto  overflow-y-auto justify-center bg-black/70"
          onClick={onClose}
        >
          <Toaster />
          {/* Modal Box */}
          <div
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 20 }}
            // transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#0e1111] text-white rounded-2xl h-[125vh] p-6 w-[95%] max-w-2xl shadow-2xl border border-[#e81828]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#e81828]">
                Book {car?.name}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-[#e81828] transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* From Date */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar size={16} /> From Date
                </label>
                <input
                  type="date"
                  {...register("fromDate", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] focus:ring-[#e81828] outline-none"
                />
              </div>

              {/* To Date */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar size={16} /> To Date
                </label>
                <input
                  type="date"
                  {...register("toDate", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] focus:ring-[#e81828] outline-none"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col sm:col-span-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <User size={16} /> Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Mail size={16} /> Email
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  {...register("email", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone size={16} /> Phone
                </label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  {...register("phone", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] outline-none"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col sm:col-span-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin size={16} /> Address
                </label>
                <input
                  type="text"
                  placeholder="Your Address"
                  {...register("address", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] outline-none"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col sm:col-span-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock size={16} /> Preferred Time
                </label>
                <input
                  type="time"
                  {...register("time", { required: true })}
                  className="mt-1 p-2 rounded-lg bg-[#1a1d1d] border border-gray-600 focus:border-[#e81828] outline-none"
                />
              </div>

              {/* Add-ons (Dynamic) */}
              <div className="flex flex-col sm:col-span-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <PlusCircle size={16} /> Add-ons
                </label>

                {loading ? (
                  <p className="text-gray-400 mt-2">Loading add-ons...</p>
                ) : (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {addons.length > 0 ? (
                      addons.map((addon) => (
                        <label
                          key={addon._id}
                          className="flex items-center gap-2 bg-[#1a1d1d] px-3 py-2 rounded-lg border border-gray-700"
                        >
                          <input
                            type="checkbox"
                            {...register("addons")}
                            value={addon._id} // 👈 ID bhejna hai
                            className="accent-[#e81828]"
                          />{" "}
                          {addon.name}{" "}
                          <span className="text-gray-400 text-sm">
                            (AED {addon.price})
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-gray-400">No add-ons available</p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  type="submit"
                  className="w-full cursor-pointer bg-[#e81828] text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-[#c51420] transition"
                >
                  {loading ? "Confirming..." : "Confirm Booking"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>

    // </AnimatePresence>
  );
}
