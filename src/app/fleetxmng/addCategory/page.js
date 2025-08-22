"use client";
import postReq from "@/app/Utilities/postReq";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    try {
      setLoading(true);
      let result = await postReq("api/mng/addCategory", data);
      if (result.statusCode == 200) {
        toast.success(result.response.msg);
      } else {
        toast.error(result.response.msg);
      }
    } catch (error) {
      console.log("Error in adding category", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main>
      <Toaster />
      <div className="flex justify-center my-9">
        <h1 className="text-7xl font-bold">Add Category</h1>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Enter Category's Name"
          className="min-w-lg border-2 p-2 border-white"
          {...register("categoryName")}
        />
        <input
          type="text"
          placeholder="Enter Category's Slug"
          className="min-w-lg my-3 border-2 p-2 border-white"
          {...register("categorySlug")}
        />
        <button
          className={`${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } bg-[#e81828] px-3 py-2`}
        >
          {loading ? "Adding" : "Add Category"}
        </button>
      </form>
    </main>
  );
};

export default Page;
