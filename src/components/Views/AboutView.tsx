"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";
import { Layout } from "@/components/Layout/Layout";
import { Leaf, Users, ShieldCheck, Globe } from "lucide-react";
import Image from "next/image";

const AboutView = () => {
    const t = useTranslations();
    const about = t.about_page;

    if (!about) return null;

    const valueIcons = [Leaf, Users, ShieldCheck, Globe];

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-primary py-24 text-white mt-[-8vh]">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=600&fit=crop"
                            alt="Nature Background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container relative z-10 mx-auto px-[5%] text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black md:text-6xl"
                        >
                            {about.sobre_title}
                        </motion.h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-[5%]">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                        >
                            <p>{about.sobre_p1}</p>
                            <p>{about.sobre_p2}</p>
                        </motion.div>

                        {/* Mission & Vision */}
                        <div className="mt-20 grid gap-12 md:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-primary/5 p-8"
                            >
                                <h2 className="mb-4 text-2xl font-bold text-primary">{about.mission_title}</h2>
                                <p className="text-muted-foreground">{about.mission_desc}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-primary/5 p-8"
                            >
                                <h2 className="mb-4 text-2xl font-bold text-primary">{about.vision_title}</h2>
                                <p className="text-muted-foreground">{about.vision_desc}</p>
                            </motion.div>
                        </div>

                        {/* Values */}
                        <div className="mt-20">
                            <h2 className="mb-10 text-center text-3xl font-bold">{about.values_title}</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {about.items.map((item: string, index: number) => {
                                    const Icon = valueIcons[index] || Leaf;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-4 rounded-xl border border-primary/10 p-6 hover:bg-primary/5 transition-colors"
                                        >
                                            <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground">{item}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-24 text-center space-y-4"
                        >
                            <p className="text-xl font-medium italic text-primary/80">
                                "{about.sobre_footer_1}"
                            </p>
                            <div className="pt-8 text-2xl font-bold text-foreground">
                                <p>{about.sobre_footer_2}</p>
                                <p className="text-gold mt-2">{about.sobre_footer_3}</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AboutView;
