"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";

interface GalleryProps {
  listImg: string[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Gallery({ listImg }: GalleryProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeImageIndex = Math.abs(page % listImg.length);
  const [isOpen, setIsOpen] = useState(false);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!listImg || listImg.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[400px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2">
        <ImageIcon size={48} />
        <p>Ninguna imagen disponible</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {/* Main Image Container */}
        <div className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-xl bg-black/5 touch-none group">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              className="absolute inset-0 w-full h-full cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src={listImg[activeImageIndex]}
                alt={`Imagen ${activeImageIndex + 1} de ${listImg.length}`}
                fill
                priority
                className="object-cover pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="flex items-center justify-center bg-black/30 backdrop-blur-md text-white border-none pointer-events-auto h-12 w-12 rounded-full hover:bg-black/50 transition"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="flex items-center justify-center bg-black/30 backdrop-blur-md text-white border-none pointer-events-auto h-12 w-12 rounded-full hover:bg-black/50 transition"
              onClick={() => paginate(1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium z-10">
            {activeImageIndex + 1} / {listImg.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 no-scrollbar">
          {listImg.map((img, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-200 ${activeImageIndex === index
                ? "ring-2 ring-primary scale-95"
                : "opacity-60 hover:opacity-100"
                }`}
              onClick={() => {
                const newDirection = index > activeImageIndex ? 1 : -1;
                setPage([index, newDirection]);
              }}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Custom Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center touch-none backdrop-blur-sm"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full z-[110] transition-colors"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  className="absolute inset-x-8 inset-y-16 lg:inset-8 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={listImg[activeImageIndex]}
                    alt={`Imagen ${activeImageIndex + 1} de ${listImg.length}`}
                    fill
                    className="object-contain pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/30 backdrop-blur-md text-white border-none h-12 w-12 rounded-full hover:bg-black/50 transition z-[110]"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/30 backdrop-blur-md text-white border-none h-12 w-12 rounded-full hover:bg-black/50 transition z-[110]"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="absolute bottom-6 text-white/50 text-xs font-medium uppercase tracking-widest pointer-events-none select-none z-[110]">
              {activeImageIndex + 1} / {listImg.length} • Desliza para navegar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
