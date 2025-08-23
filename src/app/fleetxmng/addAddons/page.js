"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  DollarSign,
  List,
  CheckCircle2,
  AlertCircle,
  Banknote,
} from "lucide-react";
import postReq from "@/app/Utilities/postReq";
import toast, { Toaster } from "react-hot-toast";
import getReq from "@/app/Utilities/getReq";

export default function AddonsPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      addons: [{ name: "", price: "" }],
    },
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addons",
  });

  const values = watch("addons");
  const total = useMemo(() => {
    return (values || []).reduce((acc, cur) => {
      const priceNum = Number(cur?.price || 0);
      return acc + (isNaN(priceNum) ? 0 : priceNum);
    }, 0);
  }, [values]);
  // ✅ fetch existing addons on mount

  const fetchAddons = async () => {
    try {
      const result = await getReq("api/mng/addons/get"); // backend GET route

      if (result.response?.addons) {
        reset({ addons: result.response.addons }); // populate form with db addons
      }
    } catch (error) {
      console.error("Error fetching addons:", error);
      toast.error("Failed to fetch addons from server");
    }
  };
  useEffect(() => {
    fetchAddons();
  }, [reset]);
  const onSubmit = async (data) => {
    // sanitize numeric prices
    setLoading(true);
    const payload = {
      addons: data.addons
        .filter((a) => a.name?.trim())
        .map((a) => ({ name: a.name.trim(), price: Number(a.price) || 0 })),
    };

    try {
      let result = await postReq("api/mng/addons/add", { payload });
      setLoading(false);
      if (result.statusCode == 200) {
        toast.success(result.response.msg);
      } else {
        toast.error(result.response.msg);
      }

      // success UI: soft reset (keep rows)
      //   reset({ addons: [{ name: "", price: "" }] });
    } catch (e) {
      setLoading(false);
      console.error(e);
      toast.error(result.response.msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1111] text-white">
      <Toaster />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header / Banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 border border-[#e81828]/30 bg-[#141818] shadow-xl"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#e81828]/15 border border-[#e81828]/30">
                <List />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Manage Add-ons
                </h1>
                <p className="text-sm text-neutral-300">
                  Create, update and remove additional services for bookings
                  (GPS, Baby Seat, Extra Insurance, etc.)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-xl px-3 py-2 border border-[#e81828]/40 bg-[#0e1111] text-sm">
                <span className="inline-flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total:{" "}
                  <span className="font-semibold">
                    PKR {total.toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 rounded-2xl p-6 border border-[#e81828]/30 bg-[#1a1d1d] shadow-2xl"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Add-on Items
            </h2>
            <button
              type="button"
              onClick={() => append({ name: "", price: "" })}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-[#e81828] hover:bg-[#c51420] transition border border-[#e81828]/40 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>
          </div>

          {/* Table / List */}
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 rounded-xl p-4 bg-[#0e1111] border border-[#e81828]/20"
                >
                  {/* Name */}
                  <div className="md:col-span-6">
                    <label className="text-sm text-neutral-300">
                      Add-on Name
                    </label>
                    <input
                      {...register(`addons.${index}.name`, {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 60,
                          message: "Maximum 60 characters",
                        },
                      })}
                      placeholder="e.g., GPS, Baby Seat, Extra Insurance"
                      className="mt-1 w-full rounded-lg bg-[#141818] border border-neutral-700 focus:border-[#e81828] outline-none px-3 py-2 placeholder:text-neutral-500"
                    />
                    {errors.addons?.[index]?.name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.addons[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="md:col-span-4">
                    <label className="text-sm text-neutral-300">
                      Price (AED)
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="rounded-lg bg-[#141818] border border-neutral-700 px-2 py-2">
                        <Banknote className="w-4 h-4 text-neutral-300" />
                      </div>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        {...register(`addons.${index}.price`, {
                          required: "Price is required",
                          validate: (v) =>
                            Number(v) >= 0 || "Price must be 0 or greater",
                        })}
                        placeholder="e.g., 1000"
                        className="w-full rounded-lg bg-[#141818] border border-neutral-700 focus:border-[#e81828] outline-none px-3 py-2 placeholder:text-neutral-500"
                      />
                    </div>
                    {errors.addons?.[index]?.price && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.addons[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  {/* Remove */}
                  <div className="md:col-span-2 flex md:items-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 bg-transparent border border-red-500/40 text-red-300 hover:bg-red-600/10 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty state */}
            {fields.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl p-6 text-center border border-dashed border-[#e81828]/30 bg-[#0e1111]"
              >
                <p className="text-neutral-300">
                  No add-ons yet. Click{" "}
                  <span className="text-[#e81828] font-semibold">Add Row</span>{" "}
                  to create one.
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm text-neutral-300">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Total Items: <b>{fields.length}</b>
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => reset({ addons: [{ name: "", price: "" }] })}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-transparent border border-[#e81828]/40 hover:bg-[#e81828]/10 transition"
              >
                Reset
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting || fields.length === 0}
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#e81828] hover:bg-[#c51420] transition border border-[#e81828]/40 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? "Adding..." : "Add Add-ons"}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
