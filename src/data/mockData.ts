import { Difficulty, Modality, PlaceType } from "@/types/Place";

export interface Guide {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  avatar: string; // para compatibilidad
  bio: string;    // para compatibilidad
  city: string;
  state: string;
  location: string; // para compatibilidad
  modalities: Modality[];
  rating: number;
  reviewCount: number;
  description: string;
  experience: string;
  certifications: string[];
}


export const guides: Guide[] = [
  {
    id: "g1",
    name: "Alejandro Ferrer",
    nickname: "alejandro-ferrer",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Guía experto con más de 12 años de experiencia en la Comunidad Valenciana. Especialista en barranquismo y rutas de montaña de alta dificultad.",
    city: "Montanejos",
    state: "Valencia",
    location: "Montanejos, Valencia",
    modalities: ["trilha", "rapel", "camping"],
    rating: 4.9,
    reviewCount: 145,
    description: "Guía experto con más de 12 años de experiencia en la Comunidad Valenciana. Especialista en barranquismo y rutas de montaña.",
    experience: "12 años guiando grupos por los cañones más espectaculares de Valencia y Castellón. Conocimiento profundo de la hidrografía local.",
    certifications: ["Técnico Deportivo en Barrancos", "Primeros Auxilios en Montaña", "Guía Oficial de la Comunidad Valenciana"],
  },
  {
    id: "g2",
    name: "Elena Martínez",
    nickname: "elena-martinez",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "Bióloga y guía especializada en ecoturismo. Apasionada por la conservación de la Albufera y la educación ambiental en entornos acuáticos.",
    city: "Valencia",
    state: "Valencia",
    location: "Valencia, Valencia",
    modalities: ["mergulho", "canoagem", "trilha"],
    rating: 5.0,
    reviewCount: 112,
    description: "Bióloga y guía especializada en ecoturismo. Apasionada por la conservación de la Albufera y la educación ambiental.",
    experience: "8 años liderando expediciones en kayak y rutas interpretativas por el Parque Natural de la Albufera.",
    certifications: ["Monitora de Piragüismo", "Guía de Naturaleza Certificada", "Educadora Ambiental"],
  },
  {
    id: "g3",
    name: "Marc Ribes",
    nickname: "marc-ribes",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Especialista en escalada deportiva y vías ferratas. Conoce cada rincón de las paredes de Chulilla y el Barranco de la Hoz.",
    city: "Chulilla",
    state: "Valencia",
    location: "Chulilla, Valencia",
    modalities: ["escalada", "rapel", "trilha"],
    rating: 4.8,
    reviewCount: 98,
    description: "Especialista en escalada deportiva y vías ferratas. Apasionado por el mundo vertical.",
    experience: "10 años como guía de escalada profesional. Ha abierto varias rutas en el entorno de Chulilla.",
    certifications: ["Técnico de Escalada en Roca", "Rescate en Pared", "Monitor de Ocio y Tiempo Libre"],
  },
  {
    id: "g4",
    name: "Sofía Beltrán",
    nickname: "sofia-beltran",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Montañista y ciclista apasionada por la Sierra Calderona. Experta en travesías de larga distancia y orientación.",
    city: "Serra",
    state: "Valencia",
    location: "Serra, Valencia",
    modalities: ["trilha", "mountain-bike", "camping"],
    rating: 4.7,
    reviewCount: 134,
    description: "Montañista y ciclista apasionada por la Sierra Calderona. Experta en travesías y orientación.",
    experience: "9 años como guía de montaña, especializada en rutas BTT y trekking por el Macizo del Garbí.",
    certifications: ["Guía de Bicicleta de Montaña (TD1)", "Wilderness First Responder", "Especialista en Orientación"],
  },
];

export const adventures: PlaceType[] = [
  {
    id: "a1",
    title: "Barranquismo en Montanejos",
    slug: "barranquismo-montanejos",
    cover_img: "https://images.unsplash.com/photo-1647523609181-4e76b144042a?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1647523609181-4e76b144042a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583431754400-da52277ed91e?w=800&h=600&fit=crop",
    ],
    modalities: "rapel",
    city: "Montanejos",
    UF: "Valencia",
    nickname: "alejandro-ferrer",
    description: "Desciende por las aguas cristalinas del río Mijares. Una aventura que combina saltos, toboganes naturales y rápeles en un entorno geológico único en la Comunidad Valenciana.",
    difficulty: "moderado",
    booking_mode: true,
    price: 55,
  },
  {
    id: "a2",
    title: "Kayak al Atardecer en la Albufera",
    slug: "kayak-atardecer-albufera",
    cover_img: "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    ],
    modalities: "canoagem",
    city: "Valencia",
    UF: "Valencia",
    nickname: "elena-martinez",
    description: "Navega en kayak por los canales tranquilos del Parque Natural de la Albufera. Descubre la fauna local y disfruta de la puesta de sol más emblemática de Valencia.",
    difficulty: "fácil",
    booking_mode: true,
    price: 35,
  },
  {
    id: "a3",
    title: "Escalada en las Hoces del Turia",
    slug: "escalada-hoces-turia",
    cover_img: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=600&fit=crop",
    ],
    modalities: "escalada",
    city: "Chulilla",
    UF: "Valencia",
    nickname: "marc-ribes",
    description: "Iníciate en la escalada deportiva en uno de los mejores sectores de la región. Vistas impresionantes del cañón y los famosos puentes colgantes de Chulilla.",
    difficulty: "moderado",
    booking_mode: true,
    price: 45,
  },
  {
    id: "a4",
    title: "Ruta BTT: El balcón del Garbí",
    slug: "ruta-btt-garbi",
    cover_img: "https://images.unsplash.com/photo-1629056528325-f328b5f27ae7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1629056528325-f328b5f27ae7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=800&h=600&fit=crop",
    ],
    modalities: "mountain-bike",
    city: "Serra",
    UF: "Valencia",
    nickname: "sofia-beltran",
    description: "Recorre los senderos más técnicos de la Sierra Calderona hasta alcanzar el mirador del Garbí, con vistas panorámicas de todo el litoral valenciano.",
    difficulty: "difícil",
    booking_mode: true,
    price: 40,
  },
  {
    id: "a5",
    title: "Senderismo Geológico Sierra Espadán",
    slug: "senderismo-sierra-espadan",
    cover_img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    ],
    modalities: "trilha",
    city: "Almedíjar",
    UF: "Castellón",
    nickname: "alejandro-ferrer",
    description: "Una ruta por los bosques de alcornoques más meridionales de Europa. Descubre la geografía del 'Rodeno' y las antiguas minas de la zona.",
    difficulty: "fácil",
    booking_mode: true,
    price: 25,
  },
  {
    id: "a6",
    title: "Rafting en las Hoces del Cabriel",
    slug: "rafting-hoces-cabriel",
    cover_img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
    ],
    modalities: "rafting",
    city: "Venta del Moro",
    UF: "Valencia",
    nickname: "alejandro-ferrer",
    description: "Descenso de aguas bravas en el río más limpio de Europa. Diversión garantizada para grupos y familias en un paraje natural protegido.",
    difficulty: "moderado",
    booking_mode: true,
    price: 40,
  },
];

export const getGuideById = (id: string): Guide | undefined => {
  return guides.find((g) => g.id === id || g.nickname === id);
};

export const getAdventureById = (id: string): PlaceType | undefined => {
  return adventures.find((a) => a.id === id || a.slug === id);
};

export const getAdventuresByGuide = (nickname: string): PlaceType[] => {
  return adventures.filter((a) => a.nickname === nickname);
};

export const MockDataService = {
  getAllGuides: async (): Promise<Guide[]> => {
    return guides;
  },

  getGuideById: async (id: string): Promise<Guide | undefined> => {
    return guides.find(g => g.id === id || g.nickname === id);
  },
  
  getGuideBySlug: async (slug: string): Promise<Guide | undefined> => {
      return guides.find(g => g.nickname === slug || g.id === slug);
  },

  getAllAdventures: async (): Promise<PlaceType[]> => {
    return adventures;
  },

  getAdventureBySlug: async (slug: string): Promise<PlaceType | undefined> => {
    return adventures.find(a => a.slug === slug || a.id === slug);
  },
  
  getAdventuresByGuideId: async (nickname: string): Promise<PlaceType[]> => {
    return adventures.filter(a => a.nickname === nickname);
  }
};
