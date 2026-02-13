import { DifficultyBadgeProps } from "@/types/Difficulty";
import { useTranslations } from "@/contexts/LocaleContext";

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    const t = useTranslations();

    const difficultyConfig = {
        fácil: { label: t.difficulty_easy || "Fácil", className: "bg-green-100 text-green-700" },
        moderado: { label: t.difficulty_moderate || "Moderado", className: "bg-yellow-100 text-yellow-700" },
        difícil: { label: t.difficulty_hard || "Difícil", className: "bg-orange-100 text-orange-700" },
        extremo: { label: t.difficulty_extreme || "Extremo", className: "bg-red-100 text-red-700" },
    };

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium transition-all ${difficultyConfig[difficulty].className}`}>
            {difficultyConfig[difficulty].label}
        </span>
    );
};

export default DifficultyBadge;