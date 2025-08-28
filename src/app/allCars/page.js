"use client";

import { Suspense } from "react";
import AllCars from "./carsComponent";

export default function AllCarsPage() {
  return (
    <Suspense fallback={<p className="text-white p-10">Loading cars...</p>}>
      <AllCars />
    </Suspense>
  );
}
