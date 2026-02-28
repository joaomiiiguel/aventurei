export type Difficulty = "fácil" | "moderado" | "difícil" | "extremo";

export type Modality = 
  | "trilha" 
  | "escalada" 
  | "rafting" 
  | "mergulho" 
  | "canoagem" 
  | "rapel" 
  | "mountain-bike" 
  | "camping";


export const modalityLabels: Record<Modality, string> = {
  trilha: "Trilha",
  escalada: "Escalada",
  rafting: "Rafting",
  mergulho: "Mergulho",
  canoagem: "Canoagem",
  rapel: "Rapel",
  "mountain-bike": "Mountain Bike",
  camping: "Camping",
};

  
export type PlaceType = {
    id?: string;
    title: string
    city: string
    UF: string
    nickname: string
    cover_img?: string
    price?: number | null
    description: string
    date_event?: string
    gallery?: string[]
    booking_mode: boolean
    min_age?: number
    created_at?: string
    slug: string
    difficulty?: Difficulty
    modalities?: Modality | null
}
