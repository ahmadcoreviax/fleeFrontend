"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random positions only on client
    const arr = Array.from({ length: 10 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 600,
    }));
    setParticles(arr);
  }, []);

  return (
    <>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#e81828]/70 shadow-[0_0_12px_2px_rgba(232,24,40,0.55)]"
          initial={{ y: p.y, x: p.x, opacity: 0.2 }}
          animate={{ y: ["0%", "-40%"], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </>
  );
}
