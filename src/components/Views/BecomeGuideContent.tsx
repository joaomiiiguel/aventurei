"use client";


import { AnimatePresence, motion } from "framer-motion";
import {
    Lock, CheckCircle2, ArrowRight, X, Check,
    Phone, AlertTriangle, Sparkles, Clock, Users, ShieldCheck,
    MountainSnow,
    Percent,
    UserStar,
    CalendarRange,
    HeartHandshake,
    CircleX,
    CircleCheckBig
} from "lucide-react";
import { modalityLabels } from "@/types/Place";
import { useTranslations } from "@/contexts/LocaleContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import Select from "../ui/select";
import Label from "../ui/label";

interface BecomeGuideContentProps {
    lang: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    city: string;
    activity: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    activity?: string;
}

const backgroundImages = ["/capa1.jpg", "/capa2.jpg", "/capa3.jpg"];


const BecomeGuideContent = ({ lang }: BecomeGuideContentProps) => {
    const t = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [activity, setActivity] = useState('')

    // ── Data structures using translations ──────────────────────────────────
    const pains = [
        {
            icon: "💸",
            title: t.become_guide.pain_1_title,
            description: t.become_guide.pain_1_desc,
        },
        {
            icon: "👻",
            title: t.become_guide.pain_2_title,
            description: t.become_guide.pain_2_desc,
        },
        {
            icon: "🔗",
            title: t.become_guide.pain_3_title,
            description: t.become_guide.pain_3_desc,
        },
        {
            icon: "🎭",
            title: t.become_guide.pain_4_title,
            description: t.become_guide.pain_4_desc,
        },
    ];

    const solutions = [
        {
            icon: MountainSnow,
            title: t.become_guide.sol_1_title,
            description: t.become_guide.sol_1_desc,
        },
        {
            icon: Percent,
            title: t.become_guide.sol_2_title,
            description: t.become_guide.sol_2_desc,
        },
        {
            icon: CalendarRange,
            title: t.become_guide.sol_3_title,
            description: t.become_guide.sol_3_desc,
        },
        {
            icon: HeartHandshake,
            title: t.become_guide.sol_4_title,
            description: t.become_guide.sol_4_desc,
        },
    ];

    const benefitsOtrasPlataformas = [
        t.become_guide.comp_massive_1,
        t.become_guide.comp_massive_2,
        t.become_guide.comp_massive_3,
        t.become_guide.comp_massive_4,
    ];

    const benefitsAventurei = [
        t.become_guide.comp_aventurei_1,
        t.become_guide.comp_aventurei_2,
        t.become_guide.comp_aventurei_3,
        t.become_guide.comp_aventurei_4,
    ];

    // ── Comparison ─────────────────────────────────────────────────────────────
    const comparisons = [
        { feature: t.become_guide.comparison_feature_1, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_2, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_3, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_4, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_5, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_6, aventurei: true, masivas: false },
        { feature: t.become_guide.comparison_feature_7, aventurei: true, masivas: false },
    ];

    useEffect(() => {
        setIsFirstRender(false);
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* ── HERO ──────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-primary w-full flex flex-col justify-center items-center text-white py-24 md:py-36 mt-[-8vh] min-h-[85vh] md:h-[95vh]">
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
                                className="object-cover opacity-20"
                                fill
                                priority={currentIndex === 0}
                                quality={70}
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-primary/30" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative z-10 px-[5%]">
                    {/* Beta badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold">
                            <Sparkles className="h-4 w-4" />
                            {t.become_guide.hero_badge}
                        </div>
                    </motion.div>

                    <div className="mx-auto max-w-3xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-6 text-4xl font-black leading-tight text-primary-foreground md:text-6xl"
                        >
                            {t.become_guide.hero_title_1}{" "}
                            <span className="text-gold">{t.become_guide.hero_title_2}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mb-4 text-lg text-primary-foreground/80 md:text-xl"
                        >
                            {t.become_guide.hero_description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <a href="#formulario" className="mt-10 bg-gold rounded-full flex gap-4 items-center justify-center h-14 px-10 text-lg font-bold hover:cursor-pointer hover:bg-gold/90 transition-all hover:scale-105 active:scale-95">
                                {t.become_guide.hero_cta}
                                <ArrowRight className="h-5 w-5" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mt-10 flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 text-primary-foreground/60"
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-gold" />
                                {t.become_guide.hero_stat_plazas}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-gold" />
                                {t.become_guide.hero_stat_commission}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-gold" />
                                {t.become_guide.hero_stat_free}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── URGENCY BAR ───────────────────────────────────────────────────── */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gold/50 py-4"
            >
                <div className="flex flex-row items-center justify-center gap-2 text-center sm:flex-row px-[5%]">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-sm md:text-md font-bold text-primary">
                        {t.become_guide.urgency_bar}
                    </p>
                </div>
            </motion.section>

            {/* ── PROBLEM ───────────────────────────────────────────────────────── */}
            <section className="py-20 px-[5%]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="font-bold text-3xl md:text-4xl">
                        {t.become_guide.problem_title}
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl md:text-2xl text-muted-foreground mt-4">
                        {t.become_guide.problem_subtitle}
                    </p>
                </motion.div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {pains.map((pain, index) => (
                        <motion.div
                            key={pain.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 shadow-md hover:shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="mb-3 text-4xl group-hover:scale-110 transition-transform duration-300">{pain.icon}</div>
                            <h3 className="mb-2 font-bold text-xl text-foreground">{pain.title}</h3>
                            <p className="text-sm text-muted-foreground">{pain.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
            <section className="bg-primary text-white py-20 px-[5%] flex flex-col md:flex-row gap-8 min-h-[90vh]">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-white/40 h-64 md:h-auto w-full md:w-1/3 rounded-xl flex items-center justify-center overflow-hidden relative"
                >
                    <Image
                        src="/capa2.jpg"
                        alt="Aventurei Solution"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-primary/20" />
                    <p className="relative z-10 font-bold text-xl">{t.become_guide.solution_vision}</p>
                </motion.div>
                <div className="w-full md:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-2"
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold">{t.become_guide.solution_tag}</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold ">
                            {t.become_guide.solution_title}
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        {solutions.map((sol, index) => {
                            const IconComponent = sol.icon;

                            return (
                                <motion.div
                                    key={sol.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                    className="flex flex-row items-center max-w-3xl group"
                                >
                                    <div className="bg-white/5 rounded-full p-4 mr-4 group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                        <IconComponent className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-bold text-xl md:text-2xl">{sol.title}</h3>
                                        <p className="text-md md:text-lg font-light text-white/70">{sol.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <a href="#formulario" className="mt-10 bg-gold rounded-full flex gap-4 items-center justify-center h-14 px-10 text-lg font-bold hover:cursor-pointer hover:bg-gold/90 transition-all hover:scale-105 active:scale-95">
                            {t.become_guide.hero_cta}
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ── COMPARISON ────────────────────────────────────────────────────── */}
            <section className="bg-primary/10 py-20 overflow-hidden">
                <div className="">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 text-center"
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest text-gold">{t.become_guide.comparison_tag}</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-10 text-center"
                    >
                        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
                            {t.become_guide.comparison_title}
                        </h2>
                        <p className="mx-auto max-w-xl text-muted-foreground">
                            {t.become_guide.comparison_subtitle}
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mx-auto px-[5%]">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-lg p-8 shadow-lg md:scale-95 w-full max-w-sm"
                        >
                            <h2 className="font-black text-2xl text-gray-500 mb-4">{t.become_guide.comp_massive_title}</h2>
                            {benefitsOtrasPlataformas.map((item, i) =>
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex flex-row w-full items-center gap-2 mb-2"
                                >
                                    <CircleX className="text-red-500 shrink-0" />
                                    <p className="font-bold text-gray-500">{item}</p>
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative bg-primary rounded-lg p-8 shadow-2xl md:scale-105 overflow-hidden w-full max-w-sm"
                        >
                            <h2 className="font-black text-3xl text-white mb-4">{t.become_guide.comp_aventurei_title}</h2>
                            <span className="bg-gold text-white text-xs font-bold uppercase tracking-widest absolute top-0 right-0 p-2 rounded-bl-lg ">{t.become_guide.comp_aventurei_badge}</span>
                            {benefitsAventurei.map((item, i) =>
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex flex-row w-full items-center gap-2 mb-2"
                                >
                                    <CheckCircle2 className="text-gold shrink-0" />
                                    <p className="font-bold text-white">{item}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── URGENCY ───────────────────────────────────────────────────────── */}
            <section className="relative bg-primary text-white py-16 px-[5%] overflow-hidden">

                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-2xl text-left "
                    >
                        <div className="my-4 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold">
                            <AlertTriangle className="h-4 w-4" />
                            {t.become_guide.final_badge}
                        </div>
                        <h2 className="my-4 text-3xl font-bold text-primary-foreground md:text-5xl">
                            {t.become_guide.final_title}
                        </h2>
                        <p className="my-4 text-xl text-primary-foreground/80">
                            {t.become_guide.final_description}
                        </p>
                        <div className="flex space-x-2 items-center ml-4">
                            <Lock className="h-4 w-4 text-gold" />
                            <p className="text-lg text-primary-foreground/60">
                                {t.become_guide.final_trust_1}
                            </p>
                        </div>
                        <div className="flex space-x-2 items-center ml-4">
                            <CircleCheckBig className="h-4 w-4 text-gold" />
                            <p className="text-lg text-primary-foreground/60">
                                {t.become_guide.final_trust_2}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto bg-white text-primary rounded-lg w-full md:w-1/2 shadow-2xl py-4 border-t-8 border-gold px-10"
                    >
                        <h2 className="text-2xl font-bold mb-8">{t.become_guide.form_title}</h2>
                        <form onSubmit={(e) => e.preventDefault()} id="formulario">
                            <div className="flex flex-col gap-4 mt-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <Label>
                                        {t.become_guide.form_name}
                                    </Label>
                                    <Input placeholder={t.become_guide.form_name} value={name} onChange={(e) => setName(e.target.value)} />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-2"
                                >
                                    <Label>
                                        {t.become_guide.form_phone}
                                    </Label>
                                    <Input placeholder={t.become_guide.form_phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </motion.div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-2"
                                    >
                                        <Label>{t.become_guide.form_city}</Label>
                                        <Input placeholder={t.become_guide.form_city} value={city} onChange={(e) => setCity(e.target.value)} />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="space-y-2"
                                    >
                                        <Label>{t.become_guide.form_modality}</Label>
                                        <Select
                                            options={Object.entries(modalityLabels).map(([key, label]) => ({ value: key, label }))}
                                            value={activity}
                                            onChange={(v) => setActivity(v)}
                                        />
                                    </motion.div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="mt-8 bg-gold rounded-lg flex gap-4 text-white items-center justify-center h-12 text-lg font-bold hover:cursor-pointer hover:bg-gold/90 transition-all shadow-md hover:shadow-lg"
                                >
                                    {t.become_guide.form_submit}
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                                <span className="text-gray-500 text-xs text-center pt-4 italic">{t.become_guide.form_footer}</span>
                            </div>
                        </form>
                    </motion.div>
                </div>
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&fit=crop')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

            </section>
        </div>
    )
}

export default BecomeGuideContent   