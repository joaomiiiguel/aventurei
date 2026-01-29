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
  import type { Modality } from "../data/mockData";
  
  interface ModalityIconProps {
    modality: Modality;
    className?: string;
  }
  
  const iconMap: Record<Modality, React.ComponentType<{ className?: string }>> = {
    trilha: Footprints,
    escalada: Mountain,
    rafting: Waves,
    mergulho: Fish,
    canoagem: Sailboat,
    rapel: ArrowDownFromLine,
    "mountain-bike": Bike,
    camping: Tent,
  };
  
  export function ModalityIcon({ modality, className = "h-4 w-4" }: ModalityIconProps) {
    const Icon = iconMap[modality];
    return <Icon className={className} />;
  }
  