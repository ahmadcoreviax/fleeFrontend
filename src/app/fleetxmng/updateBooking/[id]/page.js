"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Calendar, Phone, Mail, MapPin, User, Banknote } from "lucide-react";
import postReq from "@/app/Utilities/postReq";

export default function BookingDetailsPage() {
  const { id } = useParams(); // get id from params
  const [booking, setBooking] = useState(null);
  const [addons, setAddons] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function getBooking() {
    try {
      let result = await postReq(`api/mng/getSpecificBookingAdmin`, { id });
      if (result.statusCode == 200) {
        setBooking(result?.response?.booking);
        setAddons(result?.response?.selectedAddons);
        console.log(result?.response);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      console.log("Error fetching booking!", error);
      toast.error("Failed While Getting Booking Details!");
    }
  }
  async function updateBooking(data) {
    setLoading(true);
    try {
      let result = await postReq("api/mng/updateBooking", { data });
      setLoading(false);
      if (result.statusCode == 200) {
        toast.success(result.response.msg);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      setLoading(false);
      console.log("erro while updating booking", error);
      toast.error("Some Error Occured While Updating Booking!");
    }
  }
  useEffect(() => {
    if (id) getBooking();
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e1111] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-[#e81828] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1111] text-white px-4 py-10">
      <Toaster />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#e81828]"
      >
        Booking Details
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto bg-[#1a1d1f] rounded-2xl shadow-xl border border-[#e81828]/40 p-6 md:p-10 space-y-6"
      >
        {/* Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem icon={<User />} label="Name" value={booking.name} />
          <InfoItem icon={<Mail />} label="Email" value={booking.email} />
          <InfoItem icon={<Phone />} label="Phone" value={booking.phone} />
          <InfoItem icon={<MapPin />} label="Address" value={booking.address} />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem
            icon={<Calendar />}
            label="From Date"
            value={booking.fromDate.split("T")[0]}
          />
          <InfoItem
            icon={<Calendar />}
            label="To Date"
            value={booking.toDate.split("T")[0]}
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoItem
            icon={<Banknote />}
            label="Base Price"
            value={`AED ${booking.basePrice}`}
          />
          <InfoItem
            icon={<Banknote />}
            label="Addons Price"
            value={`AED ${booking.addonsPrice || 0}`}
          />
          <InfoItem
            icon={<Banknote />}
            label="Total Price"
            value={`AED ${booking.totalPrice}`}
          />
        </div>

        {/* Booking Status */}
        <div className="flex justify-between items-center bg-[#0e1111] rounded-xl px-4 py-3 border border-[#e81828]/40">
          <span className="text-lg font-semibold">Booking Status:</span>
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              booking.status === "Confirmed"
                ? "bg-green-600/20 text-green-400"
                : booking.status === "Pending"
                ? "bg-yellow-600/20 text-yellow-400"
                : booking.status === "Cancelled"
                ? "bg-red-600/20 text-red-400"
                : "bg-gray-600/20 text-gray-400"
            }`}
          >
            {booking.status}
          </span>
        </div>
        <div className="flex justify-between items-center bg-[#0e1111] rounded-xl px-4 py-3 border border-[#e81828]/40">
          <span className="text-lg font-semibold">Change Booking Status:</span>
          <select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            className="bg-[#0e1111] border-2 px-3 py-2"
          >
            <option>Select Status</option>
            <option value={"Confirmed"}>Confirmed</option>
            <option value={"Cancelled"}>Cancelled</option>
            <option value={"Completed"}>Completed</option>
          </select>
        </div>

        {/* Car Details */}
        <h1 className="text-2xl font-bold">Car Related Info</h1>
        <div className=" bg-[#0e1111] rounded-xl px-4 py-3 border border-[#e81828]/40">
          <div className="border-b-[1px] border-[#e81828] my-2 flex justify-between">
            <span>Car Name</span>
            <span>{booking?.carId?.name}</span>
          </div>
          <div className="border-b-[1px] border-[#e81828] my-2 flex justify-between">
            <span>Car Color</span>
            <span>{booking?.carId?.color}</span>
          </div>
          <div className="border-b-[1px] border-[#e81828] my-2 flex justify-between">
            <span>Car License Plate</span>
            <span>{booking?.carId?.licensePlate}</span>
          </div>
          <div className="border-b-[1px] border-[#e81828] my-2 flex justify-between">
            <span>Car Model</span>
            <span>{booking?.carId?.model}</span>
          </div>
          <div className="border-b-[1px] border-[#e81828] my-2 flex justify-between">
            <span>Car Brand</span>
            <span>{booking?.carId?.brand?.name}</span>
          </div>
        </div>
        {/* Addons */}
        <h1 className="text-2xl font-bold">Addons</h1>
        <div className="flex justify-between items-center bg-[#0e1111] rounded-xl px-4 py-3 border border-[#e81828]/40">
          {addons.map((a) => {
            return (
              <div key={a._id}>
                <span className="text-lg font-semibold text-[#e81828]">
                  {a.name}
                  {" : "}
                </span>
                <span className="text-lg font-semibold">{a.price} AED</span>
              </div>
            );
          })}
        </div>
        <button
          disabled={loading}
          className="px-3 py-2 cursor-pointer bg-[#e81828]"
          onClick={() => {
            updateBooking({ id, status });
          }}
        >
          {loading ? "Updating ..." : "Update"}
        </button>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col bg-[#0e1111] rounded-xl p-4 border border-[#e81828]/30 shadow-md">
      <div className="flex items-center gap-2 text-[#e81828] mb-2">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <span className="text-white text-sm md:text-base break-words">
        {value || "N/A"}
      </span>
    </div>
  );
}
