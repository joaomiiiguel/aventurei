export type Modality = 
  | "trilha" 
  | "escalada" 
  | "rafting" 
  | "mergulho" 
  | "canoagem" 
  | "rapel" 
  | "mountain-bike" 
  | "camping";

export interface Guide {
  id: string;
  name: string;
  photo: string;
  city: string;
  state: string;
  modalities: Modality[];
  rating: number;
  reviewCount: number;
  description: string;
  experience: string;
  certifications: string[];
}

export interface Adventure {
  id: string;
  name: string;
  coverPhoto: string;
  photos: string[];
  modality: Modality;
  city: string;
  state: string;
  guideId: string;
  description: string;
  difficulty: "fácil" | "moderado" | "difícil" | "extremo";
  duration: string;
  targetAudience: string;
  highlights: string[];
}

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

export const guides: Guide[] = [
  {
    id: "g1",
    name: "Carlos Monteiro",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    city: "Chapada Diamantina",
    state: "BA",
    modalities: ["trilha", "rapel", "camping"],
    rating: 4.9,
    reviewCount: 127,
    description: "Guia experiente com mais de 15 anos conduzindo aventureiros pela Chapada Diamantina. Especialista em trilhas longas e camping selvagem.",
    experience: "15 anos de experiência como guia profissional. Conhecimento profundo da fauna, flora e geologia da região.",
    certifications: ["Guia de Turismo Cadastur", "Primeiros Socorros Wilderness", "Técnicas de Resgate em Montanha"],
  },
  {
    id: "g2",
    name: "Marina Silva",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    city: "Bonito",
    state: "MS",
    modalities: ["mergulho", "canoagem", "trilha"],
    rating: 5.0,
    reviewCount: 89,
    description: "Bióloga e guia especializada em ecoturismo aquático. Apaixonada por conservação e educação ambiental.",
    experience: "10 anos guiando em Bonito, com foco em flutuação em rios cristalinos e mergulho em cavernas.",
    certifications: ["PADI Divemaster", "Guia de Turismo Cadastur", "Educadora Ambiental"],
  },
  {
    id: "g3",
    name: "Pedro Araújo",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    city: "Brotas",
    state: "SP",
    modalities: ["rafting", "canoagem", "rapel"],
    rating: 4.8,
    reviewCount: 203,
    description: "Especialista em esportes de aventura aquáticos. Instrutor certificado de rafting e canoagem.",
    experience: "12 anos de experiência em águas brancas. Já conduziu mais de 5.000 descidas de rafting.",
    certifications: ["IRF Level 4 Guide", "Swift Water Rescue", "Primeiros Socorros"],
  },
  {
    id: "g4",
    name: "Ana Beatriz Costa",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    city: "Serra do Cipó",
    state: "MG",
    modalities: ["trilha", "escalada", "mountain-bike"],
    rating: 4.7,
    reviewCount: 156,
    description: "Montanhista e ciclista apaixonada pela Serra do Cipó. Especialista em travessias e escaladas técnicas.",
    experience: "8 anos como guia, com experiência internacional em montanhismo nos Andes e Alpes.",
    certifications: ["UIAGM Mountain Guide", "Wilderness First Responder", "Leave No Trace Trainer"],
  },
];

export const adventures: Adventure[] = [
  {
    id: "a1",
    name: "Travessia do Vale do Pati",
    coverPhoto: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    ],
    modality: "trilha",
    city: "Chapada Diamantina",
    state: "BA",
    guideId: "g1",
    description: "Uma das trilhas mais icônicas do Brasil. A Travessia do Vale do Pati oferece paisagens de tirar o fôlego, com morros, cachoeiras e uma imersão total na natureza selvagem da Chapada Diamantina.",
    difficulty: "difícil",
    duration: "3-5 dias",
    targetAudience: "Aventureiros experientes",
    highlights: ["Morro do Castelo", "Cachoeira do Funil", "Gerais do Rio Preto", "Hospedagem em casas de nativos"],
  },
  {
    id: "a2",
    name: "Flutuação no Rio da Prata",
    coverPhoto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
    ],
    modality: "mergulho",
    city: "Bonito",
    state: "MS",
    guideId: "g2",
    description: "Flutue por águas cristalinas com visibilidade de até 50 metros. Uma experiência única de imersão na natureza, observando peixes coloridos e vegetação aquática.",
    difficulty: "fácil",
    duration: "3-4 horas",
    targetAudience: "Todos os públicos",
    highlights: ["Visibilidade impressionante", "Centenas de peixes", "Nascente natural", "Equipamento incluso"],
  },
  {
    id: "a3",
    name: "Rafting Classe III-IV",
    coverPhoto: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
    ],
    modality: "rafting",
    city: "Brotas",
    state: "SP",
    guideId: "g3",
    description: "Adrenalina pura nas corredeiras do Rio Jacaré-Pepira! Descida emocionante com quedas, curvas e muita diversão em grupo.",
    difficulty: "moderado",
    duration: "2-3 horas",
    targetAudience: "Maiores de 14 anos",
    highlights: ["7km de descida", "Corredeiras classe III-IV", "Salto de cachoeira", "Fotos e vídeos inclusos"],
  },
  {
    id: "a4",
    name: "Escalada no Pico do Breu",
    coverPhoto: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504699439244-a1d7547e7b2f?w=800&h=600&fit=crop",
    ],
    modality: "escalada",
    city: "Serra do Cipó",
    state: "MG",
    guideId: "g4",
    description: "Escalada técnica com vista panorâmica da Serra do Cipó. Uma experiência desafiadora para quem busca superar limites.",
    difficulty: "difícil",
    duration: "6-8 horas",
    targetAudience: "Escaladores iniciantes a intermediários",
    highlights: ["Vista 360°", "Rocha quartzítica", "Equipamento profissional", "Instrução personalizada"],
  },
  {
    id: "a5",
    name: "Trilha das Cachoeiras",
    coverPhoto: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
    ],
    modality: "trilha",
    city: "Serra do Cipó",
    state: "MG",
    guideId: "g4",
    description: "Percurso por 5 cachoeiras incríveis em um único dia. Ideal para quem quer combinar trilha leve com banhos refrescantes.",
    difficulty: "fácil",
    duration: "5-6 horas",
    targetAudience: "Famílias e iniciantes",
    highlights: ["5 cachoeiras", "Banhos em piscinas naturais", "Flora do cerrado", "Piquenique incluso"],
  },
  {
    id: "a6",
    name: "Canoagem no Rio Formoso",
    coverPhoto: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    ],
    modality: "canoagem",
    city: "Bonito",
    state: "MS",
    guideId: "g2",
    description: "Remada tranquila pelo Rio Formoso, passando por cenários de tirar o fôlego e observando a vida selvagem.",
    difficulty: "fácil",
    duration: "2-3 horas",
    targetAudience: "Todos os públicos",
    highlights: ["Rio de águas cristalinas", "Avistamento de animais", "Trilha curta inclusa", "Equipamento fornecido"],
  },
  {
    id: "a7",
    name: "Canoagem no Rio Formoso",
    coverPhoto: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    ],
    modality: "canoagem",
    city: "Bonito",
    state: "MS",
    guideId: "g2",
    description: "Remada tranquila pelo Rio Formoso, passando por cenários de tirar o fôlego e observando a vida selvagem.",
    difficulty: "fácil",
    duration: "2-3 horas",
    targetAudience: "Todos os públicos",
    highlights: ["Rio de águas cristalinas", "Avistamento de animais", "Trilha curta inclusa", "Equipamento fornecido"],
  },
  {
    id: "a8",
    name: "Canoagem no Rio Formoso",
    coverPhoto: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop",
    ],
    modality: "canoagem",
    city: "Bonito",
    state: "MS",
    guideId: "g2",
    description: "Remada tranquila pelo Rio Formoso, passando por cenários de tirar o fôlego e observando a vida selvagem.",
    difficulty: "fácil",
    duration: "2-3 horas",
    targetAudience: "Todos os públicos",
    highlights: ["Rio de águas cristalinas", "Avistamento de animais", "Trilha curta inclusa", "Equipamento fornecido"],
  },
];

export const getGuideById = (id: string): Guide | undefined => {
  return guides.find((g) => g.id === id);
};

export const getAdventureById = (id: string): Adventure | undefined => {
  return adventures.find((a) => a.id === id);
};

export const getAdventuresByGuide = (guideId: string): Adventure[] => {
  return adventures.filter((a) => a.guideId === guideId);
};
