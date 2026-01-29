"use client";

import { FilterBar } from "@/components/FilterBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = ["/capa1.jpg", "/capa2.jpg", "/capa3.jpg"];

const HeroSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-end text-center min-h-[50vh] bg-green-950 text-white mt-[-68]">

      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, position: "absolute", inset: 0, x: 100 }}
            animate={{ opacity: 1, position: "absolute", inset: 10, x: 0 }}
            exit={{ opacity: 0, position: "absolute", inset: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentIndex]}
              alt={`Imagem de fundo ${currentIndex + 1}`}
              className="object-cover scale-110 opacity-40"
              fill
              priority={currentIndex === 0}
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <FilterBar
        searchQuery={""}
        onSearchChange={() => {}}
        selectedModalities={[]}
        onModalitiesChange={() => {}}
      />
    </div>
  );
};

export default HeroSession;
