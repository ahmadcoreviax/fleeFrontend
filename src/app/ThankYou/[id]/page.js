"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Printer,
  Clipboard,
  ArrowLeft,
  Clock,
  AlertCircle,
} from "lucide-react";
import postReq from "@/app/Utilities/postReq";
import toast from "react-hot-toast";

export default function BookingConfirmationPage() {
  const { id } = useParams(); // route: /booking/[id]
  const router = useRouter();
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // Update endpoint to match your backend
        const result = await postReq("api/mng/getSpecificBooking", { id });
        if (result.statusCode == 200) {
          console.log(result.response);
          setBooking(result.response?.booking);
          setAddons(result.response?.selectedAddons);
        } else {
          toast.error(result.response.msg);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch booking error:", err);
          toast.error("Could not load booking details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  const handleCopyId = async () => {
    if (!id) return;
    try {
      setCopying(true);
      await navigator.clipboard.writeText(id);
      setTimeout(() => setCopying(false), 900);
    } catch {
      setCopying(false);
    }
  };

  const handlePrint = () => {
    window.print(); // simple print/receipt
  };
  const handleDownloadReceipt = async () => {
    const node = document.getElementById("receipt-section");
    if (!node) return;

    const dataUrl = await toPng(node, { cacheBust: true });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Booking-${booking.bookingNumber}.pdf`);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1111] text-white flex items-center justify-center p-6">
        <div className="space-y-3 text-center">
          <div className="mx-auto w-24 h-24 rounded-full grid place-items-center bg-[#111314] border border-[#e81828]/20 animate-pulse" />
          <div className="text-[#e81828] font-semibold">
            Loading confirmation…
          </div>
          <div className="text-sm text-white/60">Fetching booking details</div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#0e1111] text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center rounded-2xl p-8 bg-[#111314] border border-[#e81828]/20"
        >
          <AlertCircle className="mx-auto text-[#e81828] w-14 h-14" />
          <h2 className="mt-4 text-2xl font-bold">
            Oops — something went wrong
          </h2>
          <p className="mt-2 text-white/70">{error || "Booking not found."}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg bg-[#e81828] hover:bg-[#c51420] transition"
            >
              Back to home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // extract some fields (adjust according to your booking doc)
  const {
    _id,
    name,
    email,
    phone,
    address,
    fromDate,
    toDate,
    preferredTime,
    status,
    addOns,
    bookingNumber,
    carId,
    createdAt,
    totalPrice,
    basePrice,
    addonsPrice,
  } = booking;

  const niceDate = (d) => {
    if (!d) return "—";
    try {
      const dt = new Date(d);
      return dt.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(d);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1111] text-white p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        {/* Top logo / back */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/fullLogo.png"
              alt="Fleet X"
              className="h-32 w-32 object-contain"
            />
            <div>
              <div className="text-xl font-bold">Fleet X</div>
              <div className="text-xs text-white/60">Car Rental LLC</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e81828]/30 hover:bg-[#e81828]/10 transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#e81828]" />
              Back to home
            </button>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          id="receipt-section"
          className="rounded-2xl p-8 bg-gradient-to-b from-[#0f1111]/80 to-[#0e1111] border border-[#e81828]/20 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-none">
              <div className="w-28 h-28 rounded-full bg-[#0e1111] border-2 border-[#e81828] grid place-items-center shadow-xl">
                <CheckCircle2 className="w-16 h-16 text-[#e81828]" />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Booking Confirmed
              </h1>
              <p className="mt-2 text-white/70 text-sm max-w-2xl">
                Thank you{" "}
                <span className="font-semibold">{name || "Guest"}</span> — your
                ride is reserved. We’ve emailed the confirmation to{" "}
                <span className="font-semibold">{email}</span>. Show this
                confirmation to our agent at pickup. Enjoy the trip!
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-md px-3 py-2 bg-[#e81828] text-black font-semibold">
                  Booking ID: {bookingNumber}
                </div>

                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#e81828]/30 hover:bg-[#e81828]/10 transition"
                >
                  <Clipboard className="w-4 h-4 text-[#e81828]" />
                  {copying ? "Copied" : "Copy ID"}
                </button>
              </div>
            </div>

            {/* summary card small */}
            <div className="w-full md:w-64 bg-[#111214] rounded-xl p-4 border border-[#e81828]/10">
              <div className="text-sm text-white/70">Status</div>
              <div
                className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  status === "Confirmed"
                    ? "bg-green-600/20 text-green-300 border border-green-400/30"
                    : status === "Pending"
                    ? "bg-yellow-600/20 text-yellow-300 border border-yellow-400/30"
                    : "bg-red-600/20 text-red-300 border border-red-400/30"
                }`}
              >
                {status || "Pending"}
              </div>

              <div className="mt-4 text-sm text-white/70">Booked on</div>
              <div className="mt-1 font-medium">{niceDate(createdAt)}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-white/6"></div>

          {/* Details grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-[#0f1111] border border-[#e81828]/10">
              <h3 className="text-lg font-semibold text-[#e81828]">
                Pickup & Drop
              </h3>
              <div className="mt-3 text-white/80 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">From</div>
                    <div className="font-medium">{niceDate(fromDate)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">To</div>
                    <div className="font-medium">{niceDate(toDate)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Clock className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">Preferred time</div>
                    <div className="font-medium">{preferredTime || "—"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0f1111] border border-[#e81828]/10">
              <h3 className="text-lg font-semibold text-[#e81828]">
                Contact & Car
              </h3>
              <div className="mt-3 text-white/80 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">Email</div>
                    <div className="font-medium">{email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">Phone</div>
                    <div className="font-medium">{phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-[#e81828]" />
                  <div>
                    <div className="text-xs text-white/60">Address</div>
                    <div className="font-medium">{address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-white/60">Car Name</div>
                  <div className="font-medium">
                    {booking?.carId?.name || "—"}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-white/60">Car License Plate</div>
                  <div className="font-medium">
                    {booking?.carId?.licensePlate || "—"}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-xs text-white/60">Car Color</div>
                  <div className="font-medium">
                    {booking?.carId?.color || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons & Price */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-[#0f1111] border border-[#e81828]/10">
              <h3 className="text-lg font-semibold text-[#e81828]">Add-ons</h3>
              <div className="mt-3 space-y-2 text-sm text-white/80">
                {Array.isArray(addons) && addons.length > 0 ? (
                  addons.map((a) => (
                    <div
                      key={a._id || a.name}
                      className="flex items-center justify-between"
                    >
                      <div>{a.name}</div>
                      <div className="text-white/60">AED {a.price}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-white/60">No add-ons selected.</div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0f1111] border border-[#e81828]/10">
              <h3 className="text-lg font-semibold text-[#e81828]">Summary</h3>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <div>Base price</div>
                  <div className="font-medium">AED {basePrice} —</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>Add-ons</div>
                  <div className="font-medium">
                    AED{" "}
                    {Array.isArray(addons)
                      ? addons.reduce((s, x) => s + (Number(x.price) || 0), 0)
                      : 0}
                  </div>
                </div>

                <div className="border-t border-white/6 pt-3 flex items-center justify-between font-semibold">
                  <div>Total</div>
                  <div>
                    AED{" "}
                    {/* If booking.total exists you can use it, otherwise compute simple */}
                    {totalPrice ||
                      (Array.isArray(addons)
                        ? addons.reduce((s, x) => s + (Number(x.price) || 0), 0)
                        : 0)}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#e81828] hover:bg-[#c51420] transition"
                >
                  Download Receipt
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#e81828]/30 hover:bg-[#e81828]/10 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* Small footer */}
          <div className="mt-6 text-xs text-white/50">
            <div>
              Need help? Contact our support at{" "}
              <span className="text-[#e81828]">support@fleetx.example</span> or
              call <span className="text-[#e81828]">+92 300 0000000</span>.
            </div>
            <div className="mt-2">
              Booking ID <span className="font-medium">{bookingNumber}</span> —
              please keep it safe.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
