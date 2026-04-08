import { DifficultyType } from "./Difficulty";

export type Modality = 
  | "trekking" 
  | "climbing" 
  | "rafting" 
  | "diving" 
  | "canoeing" 
  | "rappelling" 
  | "mountain_bike" 
  | "camping";

export const modalityLabels: Record<Modality, string> = {
  trekking: "Trekking",
  climbing: "Climbing",
  rafting: "Rafting",
  diving: "Diving",
  canoeing: "Canoeing",
  rappelling: "Rappelling",
  mountain_bike: "Mountain Bike",
  camping: "Camping",
};

  
export type PlaceType = {
    id?: string;
    title: string
    city: string
    uf: string
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
    difficulty?: DifficultyType
    modalities?: Modality | null
    guide?: {
      name: string;
      avatar: string;
    } | null; //Usado para quando a aventura é criada por um guia (dados apenas para o front-end)
}
