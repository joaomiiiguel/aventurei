"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";
import { Layout } from "@/components/Layout/Layout";
import { Search, MapPin, MessageSquare, Compass, ArrowRight, Shield, Leaf, Users } from "lucide-react";
import Image from "next/image";

const StepCard = ({ number, title, description, icon: Icon, index }: { number: string, title: string, description: string, icon: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-primary/5 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
        >
            <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-black text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                {number}
            </div>
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <Icon className="h-10 w-10" />
            </div>
            <h3 className="mb-4 text-2xl font-black">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
            {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary/20" />
                </div>
            )}
        </motion.div>
    );
};

const HowItWorksView = () => {
    const t = useTranslations();
    const section = t.how_it_works_section;

    if (!section) return null;

    const steps = [
        {
            title: section.step1_title,
            description: section.step1_description,
            icon: Search,
        },
        {
            title: section.step2_title,
            description: section.step2_description,
            icon: MapPin,
        },
        {
            title: section.step3_title,
            description: section.step3_description,
            icon: MessageSquare,
        },
        {
            title: section.step4_title,
            description: section.step4_description,
            icon: Compass,
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-primary py-24 text-white mt-[-8vh]">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1517520287167-4bda6428c11b?w=1920&h=600&fit=crop"
                            alt="Adventure Planning"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container relative z-10 mx-auto px-[5%] text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                                {t.how_it_works || "Como Funciona"}
                            </span>
                            <h1 className="text-4xl font-black md:text-6xl">
                                {section.title}
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80">
                                {section.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="py-24 px-[5%]">
                    <div className="container mx-auto">
                        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                            {steps.map((step, index) => (
                                <StepCard
                                    key={index}
                                    index={index}
                                    number={`0${index + 1}`}
                                    title={step.title}
                                    description={step.description}
                                    icon={step.icon}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-primary/5 px-[5%]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="w-full md:w-1/2">
                                <div className="relative aspect-square overflow-hidden rounded-[3rem]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=800&fit=crop"
                                        alt="Safe Adventure"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-8">
                                <h2 className="text-4xl font-black">{section.benefits_title}</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 text-primary">✓</div>
                                        <div>
                                            <h4 className="font-bold text-xl">{section.benefit1_title}</h4>
                                            <p className="text-muted-foreground">{section.benefit1_desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 text-primary">✓</div>
                                        <div>
                                            <h4 className="font-bold text-xl">{section.benefit2_title}</h4>
                                            <p className="text-muted-foreground">{section.benefit2_desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 text-primary">✓</div>
                                        <div>
                                            <h4 className="font-bold text-xl">{section.benefit3_title}</h4>
                                            <p className="text-muted-foreground">{section.benefit3_desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-24 px-[5%]">
                    <div className="container mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 text-center text-4xl font-black"
                        >
                            {section.why_choose_us}
                        </motion.h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="rounded-3xl bg-card p-10 border border-primary/5 text-center shadow-sm"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Shield className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-xl font-bold">{section.trust_safety_title}</h3>
                                <p className="text-muted-foreground">{section.trust_safety_desc}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="rounded-3xl bg-primary p-10 text-center text-white shadow-xl shadow-primary/20"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
                                    <Leaf className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-xl font-bold">{section.sustainable_title}</h3>
                                <p className="text-white/80">{section.sustainable_desc}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="rounded-3xl bg-card p-10 border border-primary/5 text-center shadow-sm"
                            >
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="mb-4 text-xl font-bold">{section.community_title}</h3>
                                <p className="text-muted-foreground">{section.community_desc}</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 text-center px-[5%]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="container mx-auto max-w-4xl rounded-[3rem] bg-primary py-16 px-8 text-white shadow-2xl shadow-primary/20"
                    >
                        <h2 className="mb-6 text-4xl font-black md:text-5xl">{section.cta_ready}</h2>
                        <p className="mb-10 text-xl text-white/80">{section.cta_subtitle}</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href={`/${t.locale || 'pt-br'}`} className="rounded-full bg-white px-10 py-5 font-black text-primary hover:bg-gold hover:text-white transition-all transform hover:scale-105">
                                {t.explore_now}
                            </a>
                        </div>
                    </motion.div>
                </section>
            </div>
        </Layout>
    );
};

export default HowItWorksView;
