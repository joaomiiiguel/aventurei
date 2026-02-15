"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";

const backgroundImages = ["/capa1.jpg", "/capa2.jpg", "/capa3.jpg"];

const HeroSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    setIsFirstRender(false);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center text-center min-h-[50vh] bg-primary text-white mt-[-8vh]">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={isFirstRender ? { opacity: 0.5 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentIndex]}
              alt={`Imagem de fundo ${currentIndex + 1}`}
              className="object-cover opacity-50"
              fill
              priority={currentIndex === 0}
              quality={70}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-primary/30" />
          </motion.div>
        </AnimatePresence>
      </div>


      <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center gap-6 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-white drop-shadow-lg"
        >
          {t.discover_next_adventure?.split(' ').slice(0, 3).join(' ') || 'Descubra sua próxima'} <br />
          <span className="font-bold">
            {t.discover_next_adventure?.split(' ').slice(3).join(' ') || 'grande aventura'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md"
        >
          {t.connect_with_best_guides || 'Conecte-se com os melhores guias e explore destinos incríveis com segurança e exclusividade.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-3 rounded-full shadow-xl transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={() => document.getElementById('adventures-list')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.explore_now || 'Explorar Agora'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSession;

