"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";
import { Layout } from "@/components/Layout/Layout";
import { HelpCircle, ChevronDown, MessageCircle, Shield, CreditCard, CloudRain, Info } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
    return (
        <div className="border-b border-primary/10 last:border-0">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
            >
                <span className="text-xl font-semibold md:text-xl">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown className={`h-6 w-6 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-lg text-muted-foreground leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqView = () => {
    const t = useTranslations();
    const faq = t.faq_section;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faq) return null;

    const icons = [Info, MessageCircle, Shield, CreditCard, CloudRain];

    return (
        <Layout>
            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-primary py-24 text-white mt-[-8vh]">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1454165833467-1359a499e5ad?w=1920&h=600&fit=crop"
                            alt="FAQ Background"
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
                                {t.support || "Suporte"}
                            </span>
                            <h1 className="text-2xl font-black md:text-6xl">
                                {faq.title}
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                                {faq.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ List Section */}
                <section className="py-20 px-[5%]">
                    <div className="container mx-auto max-w-4xl">
                        <div className="rounded-3xl bg-card p-4 shadow-sm md:p-12 lg:p-16 border border-primary/5">
                            <div className="space-y-2">
                                {faq.questions.map((item: any, index: number) => (
                                    <FaqItem
                                        key={index}
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openIndex === index}
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-20 rounded-3xl bg-primary/5 p-10 text-center"
                        >
                            <HelpCircle className="mx-auto mb-6 h-12 w-12 text-primary" />
                            <h2 className="mb-4 text-2xl font-bold">{faq.faq_cta_title}</h2>
                            <p className="mb-8 text-muted-foreground">
                                {faq.faq_cta_desc}
                            </p>
                            <a
                                href="https://wa.me/34613032549" // Updated with a more realistic number or let it be.
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white transition-transform hover:scale-105"
                            >
                                <MessageCircle className="h-5 w-5" />
                                {t.contact_guide || "Falar com suporte"}
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Schema.org Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faq.questions.map((q: any) => ({
                                "@type": "Question",
                                "name": q.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": q.answer
                                }
                            }))
                        })
                    }}
                />
            </div>
        </Layout>
    );
};

export default FaqView;
