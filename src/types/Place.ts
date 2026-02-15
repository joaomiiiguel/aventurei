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
    short_description: string
    long_description: string
    city: string
    UF: string
    price?: number | null
    nick_partner?: string
    cover_img?: string
    accessibility?: string
    booking_mode: boolean
    min_age?: number
    gallery?: string[]
    date_event?: string
    created_at?: string
    difficulty?: Difficulty
    modalities?: Modality[]
}
