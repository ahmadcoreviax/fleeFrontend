"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DatePicker } from "antd"; // date picker for filter
import dayjs from "dayjs";
import getReq from "../Utilities/getReq";
import { useRouter } from "next/navigation";

export default function BookingsAnalytics() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState([]);
  const router = useRouter();
  const fetchAnalytics = async (startDate, endDate) => {
    let url = "api/mng/getBookingAnalytics";
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const res = await getReq(url);
    if (res.statusCode == 200) {
      const result = res.response;

      // Format for recharts
      const formatted = result?.analytics?.map((item) => ({
        name: `${item._id.month}/${item._id.year}`,
        bookings: item.totalBookings,
      }));

      setData(formatted);
    } else {
      router.push("/fleetxmng");
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setRange(dates);
      fetchAnalytics(
        dayjs(dates[0]).format("YYYY-MM-DD"),
        dayjs(dates[1]).format("YYYY-MM-DD")
      );
    } else {
      fetchAnalytics();
    }
  };

  return (
    <div className="bg-[#0e1111] p-6 rounded-2xl shadow-lg border border-[#e81828]">
      <h2 className="text-xl font-semibold text-[#e81828] mb-4">
        Bookings Analytics
      </h2>

      {/* Date Range Filter */}
      <div className="mb-4">
        <DatePicker.RangePicker onChange={handleDateChange} />
      </div>

      {/* Line Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0e1111",
                borderColor: "#e81828",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#e81828"
              strokeWidth={3}
              dot={{ fill: "#e81828", r: 5 }}
              activeDot={{ r: 7, fill: "#fff", stroke: "#e81828" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
