"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import Image from "next/image";
import getReq from "@/app/Utilities/getReq";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import postReq from "@/app/Utilities/postReq";

export default function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const fetchCars = async () => {
    try {
      const result = await getReq("api/mng/getAllCarsForAdmin");
      if (result.statusCode == 200) {
        console.log(result.response);
        setCars(result.response);
      }
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filtered Cars based on search
  const filteredCars = cars.filter((car) => {
    const query = searchQuery.toLowerCase();
    return (
      car.name?.toLowerCase().includes(query) ||
      car.licensePlate?.toLowerCase().includes(query)
    );
  });
  async function handleDelete(data) {
    try {
      let result = await postReq("api/mng/deleteCar", data);
      if (result.statusCode == 401 || result.statusCode == 403) {
        return router.push("/fleetxmng");
      }
      if (result.statusCode == 200) {
        toast.success(result.response.msg);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      console.log("Error in deleting car", error);
      toast.error("Error occured while deleting car!");
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1111] text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#e81828]">
        Manage Cars
      </h1>
      <Toaster />

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 flex items-center gap-3 bg-[#1a1d1d] rounded-lg px-3 py-2 shadow-md">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Name or License Plate..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-[#1a1d1d] text-[#e81828]">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">License Plate</th>
              <th className="p-3 text-left">Per Day</th>
              <th className="p-3 text-left">Per Week</th>
              <th className="p-3 text-left">Per Month</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr
                key={car._id}
                className="border-b border-gray-700 hover:bg-[#1a1d1d]"
              >
                {/* Car Image */}
                <td className="p-3">
                  <Image
                    src={car.carImages?.[0]?.url || "/placeholder.png"}
                    alt={car.name}
                    width={80}
                    height={50}
                    unoptimized
                    className="rounded-lg object-cover"
                  />
                </td>

                {/* Car Name */}
                <td className="p-3 font-semibold">{car.name}</td>

                {/* Model */}
                <td className="p-3">{car.model}</td>

                {/* License Plate */}
                <td className="p-3">{car.licensePlate}</td>

                {/* Charges */}
                <td className="p-3 text-[#e81828] font-medium">
                  AED {car.perDayCharges}
                </td>
                <td className="p-3">AED {car.perWeekCharges}</td>
                <td className="p-3">AED {car.perMonthCharges}</td>

                {/* Actions */}
                <td className="p-3 text-center flex items-center justify-center gap-3">
                  <Link href={`/fleetxmng/updateCar/${car?.slug}`}>
                    <button className="p-2 bg-[#1a1d1d] rounded-lg hover:bg-[#e81828] transition">
                      <Pencil className="w-5 h-5" />
                    </button>
                  </Link>
                  <button
                    className="p-2 bg-[#1a1d1d] rounded-lg hover:bg-red-700 transition"
                    onClick={() => {
                      let pass = window.prompt(
                        "Enter Password For Deleting The Record!"
                      );
                      if (pass) {
                        handleDelete({ id: car._id, pass });
                      }
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCars.length === 0 && (
          <p className="text-center text-gray-400 py-6">No cars found.</p>
        )}
      </div>
    </div>
  );
}
