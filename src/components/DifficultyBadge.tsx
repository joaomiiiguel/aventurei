import { DifficultyBadgeProps } from "@/types/Difficulty";
import { useTranslations } from "@/contexts/LocaleContext";
import { DifficultyType } from "@/types/Difficulty";
import { DifficultyIcon } from "./DifficultyIcon";

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
    const t = useTranslations();

    const getDifficultyLabel = (d: DifficultyType) => {
        const key = `difficulty_${d.replace('-', '_')}`;
        return t[key] || d;
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-medium transition-all`}>
            <DifficultyIcon difficulty={difficulty} />
            {getDifficultyLabel(difficulty)}
        </span>
    );
};

export default DifficultyBadge;