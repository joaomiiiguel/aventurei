"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/contexts/LocaleContext";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const HomeFaqSession = () => {
    const t = useTranslations();
    const faq = t.faq_section;
    const params = useParams();
    const lang = params.lang as string;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faq) return null;

    // Show only the first 4 questions on home
    const displayQuestions = faq.questions.slice(0, 4);

    return (
        <section className="w-full py-20 bg-white">
            <div className="mx-auto px-[5%] 2xl:px-[10%] max-w-6xl">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 leading-tight">
                                {faq.title}
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                {faq.description}
                            </p>
                            <Link
                                href={`/${lang}/faq`}
                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                            >
                                <HelpCircle className="w-5 h-5 text-gold" />
                                {faq.view_all_questions || "Ver todas as dúvidas"}
                            </Link>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-2/3 space-y-4">
                        {displayQuestions.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-primary/10 rounded-2xl overflow-hidden bg-primary/5 shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-primary/10"
                                >
                                    <span className="text-lg font-bold text-primary">{item.question}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className={`h-5 w-5 ${openIndex === index ? 'text-primary' : 'text-muted-foreground'}`} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-white/50"
                                        >
                                            <p className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFaqSession;
