import { DifficultyType } from "@/types/Difficulty";
import {
  SignalLow,
  SignalMedium,
  SignalHigh,
  Signal,
  Sailboat,
  ArrowDownFromLine,
  Bike,
  Tent
} from "lucide-react";


interface DifficultyIconProps {
  difficulty: DifficultyType;
  className?: string;
}

const iconMap: Record<DifficultyType, React.ComponentType<{ className?: string }>> = {
  easy: SignalLow,
  moderate: SignalMedium,
  hard: SignalHigh,
  extreme: Signal,
};

export function DifficultyIcon({ difficulty, className = "h-4 w-4" }: DifficultyIconProps) {
  const Icon = iconMap[difficulty];
  return <Icon className={className} />;
}
