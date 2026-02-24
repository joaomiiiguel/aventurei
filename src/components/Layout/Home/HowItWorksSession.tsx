"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";
import { Search, MapPin, Calendar, Trees } from "lucide-react";

const HowItWorksSession = () => {
    const t = useTranslations();
    const howItWorks = t.how_it_works_section;

    if (!howItWorks) return null;

    const steps = [
        {
            title: howItWorks.step1_title,
            description: howItWorks.step1_description,
            icon: <Search className="w-8 h-8 text-primary" />,
        },
        {
            title: howItWorks.step2_title,
            description: howItWorks.step2_description,
            icon: <MapPin className="w-8 h-8 text-primary" />,
        },
        {
            title: howItWorks.step3_title,
            description: howItWorks.step3_description,
            icon: <Calendar className="w-8 h-8 text-primary" />,
        },
        {
            title: howItWorks.step4_title,
            description: howItWorks.step4_description,
            icon: <Trees className="w-8 h-8 text-primary" />,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto px-[5%] 2xl:px-[10%]">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-primary mb-6"
                    >
                        {howItWorks.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        {howItWorks.description}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksSession;
