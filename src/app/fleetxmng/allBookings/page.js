"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import getReq from "@/app/Utilities/getReq";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  async function getBookings() {
    try {
      let result = await getReq("api/mng/getAllBookings");
      if (result.statusCode == 200) {
        setBookings(result?.response?.bookings);
        setFilteredBookings(result?.response?.bookings);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      console.log("Error occured while fetching bookings!", error);
      toast.error("Failed While Getting All Bookings!");
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  // Filtering logic
  useEffect(() => {
    let data = [...bookings];

    // Search by name
    if (search.trim() !== "") {
      data = data.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      data = data.filter((b) => b.status === statusFilter);
    }

    // Filter by price range
    if (minPrice !== "") {
      data = data.filter((b) => b.totalPrice >= Number(minPrice));
    }
    if (maxPrice !== "") {
      data = data.filter((b) => b.totalPrice <= Number(maxPrice));
    }

    // Filter by date range
    if (fromDate !== "") {
      data = data.filter((b) => new Date(b.fromDate) >= new Date(fromDate));
    }
    if (toDate !== "") {
      data = data.filter((b) => new Date(b.toDate) <= new Date(toDate));
    }

    setFilteredBookings(data);
  }, [search, statusFilter, minPrice, maxPrice, fromDate, toDate, bookings]);

  const handleEdit = (id) => {
    alert("Edit booking: " + id);
  };

  const handleDelete = (id) => {
    alert("Delete booking: " + id);
  };

  return (
    <div className="min-h-screen bg-[#0e1111] text-white px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#e81828]"
      >
        Bookings Management
      </motion.h1>
      <Toaster />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="flex items-center bg-[#1a1d1f] rounded-xl px-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent p-2 w-full focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1d1f] p-2 rounded-xl"
        >
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="bg-[#1a1d1f] p-2 rounded-xl"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="bg-[#1a1d1f] p-2 rounded-xl"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="bg-[#1a1d1f] p-2 rounded-xl"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="bg-[#1a1d1f] p-2 rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-[#e81828]/40">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-[#e81828] text-white">
            <tr>
              <th className="p-4 text-left">Booking #</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
              filteredBookings.map((booking, idx) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-[#e81828]/20 hover:bg-[#1a1d1f]"
                >
                  <td className="p-4">{booking.bookingNumber}</td>
                  <td className="p-4">{booking.name}</td>
                  <td className="p-4">{booking.fromDate.split("T")[0]}</td>
                  <td className="p-4">{booking.toDate.split("T")[0]}</td>
                  <td className="p-4 text-[#e81828] font-semibold">
                    AED{booking.totalPrice}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-600/20 text-green-400"
                          : booking.status === "Pending"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center gap-4">
                    <Link href={`/fleetxmng/updateBooking/${booking._id}`}>
                      <button className="p-2 cursor-pointer rounded-xl bg-[#27345F] hover:bg-[#1f2849] transition">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(booking.bookingNumber)}
                      className="p-2 rounded-xl bg-[#e81828] hover:bg-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
