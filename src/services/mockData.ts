export interface Guide {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string; // URL
  location: string;
  rating: number;
  reviewCount: number;
}

export interface Adventure {
  id: string;
  guideId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

const MOCK_GUIDES: Guide[] = [
  {
    id: "g-001",
    name: "João Silva",
    slug: "joao-silva",
    bio: "Experiente guia de montanha com mais de 10 anos de prática nos Alpes e Andes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    location: "São Paulo, SP",
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "g-002",
    name: "Maria Oliveira",
    slug: "maria-oliveira",
    bio: "Especialista em trilhas costeiras e caiaque oceânico. Apaixonada pela natureza.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    location: "Rio de Janeiro, RJ",
    rating: 4.9,
    reviewCount: 89
  }
];

const MOCK_ADVENTURES: Adventure[] = [
  {
    id: "a-101",
    guideId: "g-001",
    name: "Trilha da Pedra Grande",
    slug: "trilha-pedra-grande",
    description: "Uma caminhada desafiadora com vista panorâmica da cidade. Ideal para ver o pôr do sol.",
    price: 150,
    duration: "4h",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviewCount: 45
  },
  {
    id: "a-102",
    guideId: "g-001",
    name: "Camping na Serra",
    slug: "camping-serra",
    description: "Fim de semana de imersão na natureza com fogueira e observação de estrelas.",
    price: 450,
    duration: "2 dias",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewCount: 20
  },
  {
    id: "a-201",
    guideId: "g-002",
    name: "Expedição de Caiaque",
    slug: "expedicao-caiaque",
    description: "Remada pelas ilhas tropicais com paradas para mergulho livre.",
    price: 280,
    duration: "6h",
    difficulty: "Hard",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    rating: 4.95,
    reviewCount: 32
  }
];

export const MockDataService = {
  getAllGuides: async (): Promise<Guide[]> => {
    return MOCK_GUIDES;
  },

  getGuideById: async (id: string): Promise<Guide | undefined> => {
    return MOCK_GUIDES.find(g => g.id === id || g.slug === id); // Supporting slug lookup too if needed logically, though ID is param
  },
  
  getGuideBySlug: async (slug: string): Promise<Guide | undefined> => {
      return MOCK_GUIDES.find(g => g.slug === slug || g.id === slug);
  },

  getAllAdventures: async (): Promise<Adventure[]> => {
    return MOCK_ADVENTURES;
  },

  getAdventureBySlug: async (slug: string): Promise<Adventure | undefined> => {
    return MOCK_ADVENTURES.find(a => a.slug === slug);
  },
  
  getAdventuresByGuideId: async (guideId: string): Promise<Adventure[]> => {
    return MOCK_ADVENTURES.filter(a => a.guideId === guideId);
  }
};
