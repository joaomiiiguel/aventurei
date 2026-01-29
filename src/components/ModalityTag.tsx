import { ModalityIcon } from "./ModalityIcon";
import type { Modality } from "@/data/mockData";
import { modalityLabels } from "@/data/mockData";

interface ModalityTagProps {
  modality: Modality;
  size?: "sm" | "md";
}

export function ModalityTag({ modality, size = "md" }: ModalityTagProps) {
  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs gap-1"
    : "px-3 py-1 text-sm gap-1.5";

  return (
    <span className={`tag-modality flex flex-row ${sizeClasses}`}>
      <ModalityIcon modality={modality} className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {modalityLabels[modality]}
    </span>
  );
}
