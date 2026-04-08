import { Modality } from "@/types/Place";
import {
  Footprints,
  Mountain,
  Waves,
  Fish,
  Sailboat,
  ArrowDownFromLine,
  Bike,
  Tent
} from "lucide-react";


interface ModalityIconProps {
  modality: Modality;
  className?: string;
}

const iconMap: Record<Modality, React.ComponentType<{ className?: string }>> = {
  trekking: Footprints,
  climbing: Mountain,
  rafting: Waves,
  diving: Fish,
  canoeing: Sailboat,
  rappelling: ArrowDownFromLine,
  mountain_bike: Bike,
  camping: Tent,
};

export function ModalityIcon({ modality, className = "h-4 w-4" }: ModalityIconProps) {
  const Icon = iconMap[modality];
  return <Icon className={className} />;
}
