"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation"; // 👈 URL params
import getReq from "@/app/Utilities/getReq";
import postReq from "@/app/Utilities/postReq";

export default function CarForm() {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [allBrands, setAllBrands] = useState([]);
  const [car, setCar] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]); // new uploads
  const [existingImages, setExistingImages] = useState([]); // already uploaded
  const [deletedImages, setDeletedImages] = useState([]); // store public_ids to delete

  async function getCATANDBRND() {
    try {
      let brdRes = await getReq("api/mng/getAllBrands");
      if (brdRes.statusCode == 200) setAllBrands(brdRes.response?.brands);

      let catRes = await getReq("api/mng/getAllCategories");
      if (catRes.statusCode == 200)
        setAllCategories(catRes.response?.categories);
    } catch (error) {
      console.log(error);
    }
  }

  // form hook
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      model: "",
      color: "",
      licensePlate: "",
      chasisNumber: "",
      category: "",
      slug: "",
      brand: "",
      discountedPercentage: 0,
      perMonthCharges: "",
      perWeekCharges: "",
      perDayCharges: "",
      availableIn: [""],
      description: [""],
      details: [""],
      faqs: [{ question: "", answer: "" }],
      videos: [""],
      status: "Available",
    },
  });

  // dynamic arrays
  const availableInArray = useFieldArray({ control, name: "availableIn" });
  const descriptionArray = useFieldArray({ control, name: "description" });
  const detailsArray = useFieldArray({ control, name: "details" });
  const videosArray = useFieldArray({ control, name: "videos" });
  const faqsArray = useFieldArray({ control, name: "faqs" });

  // fetch car details by ID
  async function getCarDetails() {
    try {
      const res = await postReq(`api/getSpecificCar`, { slug });
      if (res.statusCode === 200) {
        const car = res.response;
        setCar(res.response);
        reset({
          name: car.name,
          model: car.model,
          color: car.color,
          licensePlate: car.licensePlate,
          chasisNumber: car.chasisNumber,
          category: car.category?._id,
          slug: car.slug,
          brand: car.brand,
          discountedPercentage: car.discountedPercentage,
          perMonthCharges: car.perMonthCharges,
          perWeekCharges: car.perWeekCharges,
          perDayCharges: car.perDayCharges,
          availableIn: car.availableIn || [""],
          description: car.description || [""],
          details: car.details || [""],
          faqs: car.faqs || [{ question: "", answer: "" }],
          videos: car.videos || [""],
          status: car.status,
        });
        setExistingImages(car.carImages || []);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCATANDBRND();
    if (slug) getCarDetails();
  }, [slug]);

  // handle new image select
  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
    setSelectedImages((prev) => [...prev, ...validFiles]);
  };

  // remove new image (before upload)
  const removeNewImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteExistingImage = (public_id) => {
    // bas backend ko form submit pe bhejna hai
    setExistingImages((prev) =>
      prev.filter((img) => img.public_id !== public_id)
    );
    // delete hone wali list me add kardo
    setDeletedImages((prev) => [...prev, public_id]);
  };

  // submit update
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("color", data.color);
      formData.append("licensePlate", data.licensePlate);
      formData.append("chasisNumber", data.chasisNumber);
      formData.append("brand", data.brand);
      formData.append("category", data.category);
      formData.append("slug", data.slug);
      formData.append("perMonthCharges", data.perMonthCharges);
      formData.append("perWeekCharges", data.perWeekCharges);
      formData.append("perDayCharges", data.perDayCharges);
      formData.append("discountedPercentage", data.discountedPercentage);
      formData.append("status", data.status);
      formData.append("availableIn", JSON.stringify(data.availableIn));
      formData.append("description", JSON.stringify(data.description));
      formData.append("details", JSON.stringify(data.details));
      formData.append("faqs", JSON.stringify(data.faqs));
      formData.append("videos", JSON.stringify(data.videos));

      // append new images
      selectedImages.forEach((file) => {
        formData.append("carImages", file);
      });
      // 👇 deleted images ko bhejna zaruri hai
      if (deletedImages.length > 0) {
        formData.append("deleteImages", JSON.stringify(deletedImages));
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/mng/updateCar/${car._id}`,
        { method: "POST", body: formData }
      );

      setLoading(false);
      if (res.status == 401 || res.status == 403) {
        return router.push("/fleetxmng");
      }
      if (!res.ok) {
        toast.error("Update failed");
        return;
      }

      const result = await res.json();
      toast.success(result.msg || "Car updated successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error while updating car");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#0e1111] text-white flex justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-[#e81828]">
          Edit Car
        </h1>

        {/* Inputs same as before ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("name", { required: true })}
            placeholder="Car Name"
            className="input border-2 p-2"
          />
          <input
            {...register("model", { required: true })}
            placeholder="Car Model"
            className="input border-2 p-2"
          />
          <input
            {...register("color", { required: true })}
            placeholder="Color"
            className="input border-2 p-2"
          />
          <input
            {...register("licensePlate", { required: true })}
            placeholder="License Plate"
            className="input border-2 p-2"
          />
          <input
            {...register("chasisNumber", { required: true })}
            placeholder="Chasis Number"
            className="input border-2 p-2"
          />
          <input
            {...register("slug", { required: true })}
            placeholder="Slug"
            className="input border-2 p-2"
          />
        </div>

        {/* Charges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            {...register("perMonthCharges", { required: true })}
            placeholder="Per Month Charges"
            className="input border-2 p-2"
          />
          <input
            type="number"
            {...register("perWeekCharges", { required: true })}
            placeholder="Per Week Charges"
            className="input border-2 p-2"
          />
          <input
            type="number"
            {...register("perDayCharges", { required: true })}
            placeholder="Per Day Charges border-2 p-2"
            className="input border-2 p-2"
          />
        </div>

        {/* Discount */}
        <input
          type="number"
          {...register("discountedPercentage")}
          placeholder="Discount %"
          className="input border-2 p-2"
        />

        {/* Brands */}

        <select
          {...register("brand")}
          className="input border-2 bg-[#0e1111] p-2"
        >
          {/* Default selected option based on car.category */}
          <option value={car?.brand}>
            {allBrands.find((cat) => cat._id === car?.brand)?.name ||
              "Select Brand"}
          </option>

          {/* Other options */}
          {Array.isArray(allBrands) &&
            allBrands.length > 0 &&
            allBrands.map((cat) => (
              <option key={cat?._id} value={cat._id}>
                {cat?.name}
              </option>
            ))}
        </select>

        {/* Category */}
        <select
          {...register("category")}
          className="input border-2 bg-[#0e1111] p-2"
        >
          {/* Default selected option based on car.category */}
          <option value={car?.category}>
            {allCategories.find((cat) => cat._id === car?.category)?.name ||
              "Select Category"}
          </option>

          {/* Other options */}
          {Array.isArray(allCategories) &&
            allCategories.length > 0 &&
            allCategories.map((cat) => (
              <option key={cat?._id} value={cat._id}>
                {cat?.name}
              </option>
            ))}
        </select>

        {/* Status */}
        <select
          {...register("status")}
          className="input border-2 bg-[#0e1111] p-2"
        >
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        {/* Arrays */}
        <DynamicArray
          label="Available In"
          fieldArray={availableInArray}
          register={register}
          fieldName="availableIn"
        />
        <DynamicArray
          label="Description"
          fieldArray={descriptionArray}
          register={register}
          fieldName="description"
        />
        <DynamicArray
          label="Details"
          fieldArray={detailsArray}
          register={register}
          fieldName="details"
        />
        <DynamicArray
          label="Videos (URLs)"
          fieldArray={videosArray}
          register={register}
          fieldName="videos"
        />

        {/* FAQs */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#e81828]">FAQs</h2>
          {faqsArray.fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input
                {...register(`faqs.${index}.question`)}
                placeholder="Question"
                className="input flex-1"
              />
              <input
                {...register(`faqs.${index}.answer`)}
                placeholder="Answer"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => faqsArray.remove(index)}
                className="btn-danger"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => faqsArray.append({ question: "", answer: "" })}
            className="btn-primary flex justify-center border-2 px-3 py-1 cursor-pointer gap-2 items-center"
          >
            <Plus size={16} /> Add FAQ
          </button>
        </div>

        {/* Existing Images */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#e81828]">
            Existing Images
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((img) => (
              <div key={img.public_id} className="relative">
                <img
                  src={img.url}
                  alt="car"
                  className="w-full h-24 object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => deleteExistingImage(img.public_id)}
                  className="absolute top-1 right-1 bg-black/70 text-red-500 rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-[#e81828]">
            Add New Images
          </h2>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            className="file-input"
          />
          <div className="grid grid-cols-3 gap-3 mt-3">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-black/70 text-red-500 rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#e81828] text-white font-bold py-2 px-4 rounded-xl hover:bg-red-700 transition"
        >
          {loading ? "Updating ..." : "Update Car"}
        </button>
      </form>
    </motion.div>
  );
}

// DynamicArray same as before
function DynamicArray({ label, fieldArray, register, fieldName }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-[#e81828]">{label}</h2>
      {fieldArray.fields.map((item, index) => (
        <div key={item.id} className="flex border p-1 gap-2 mb-2">
          <input
            {...register(`${fieldName}.${index}`)}
            placeholder={label}
            className="input flex-1"
          />
          <button
            type="button"
            onClick={() => fieldArray.remove(index)}
            className="btn-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => fieldArray.append("")}
        className="btn-primary flex justify-center border-2 px-3 py-1 cursor-pointer gap-2 items-center"
      >
        <Plus size={16} /> Add {label}
      </button>
    </div>
  );
}
