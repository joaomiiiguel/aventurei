import { Modality } from "@/types/Place";
import { Adventure, Guide } from "@/data/mockData";

export const filterAdventures = (
  adventures: Adventure[],
  searchQuery: string,
  selectedModalities: Modality[]
): Adventure[] => {
  return adventures.filter((adventure) => {
    const matchesSearch =
      adventure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adventure.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality =
      selectedModalities.length === 0 ||
      selectedModalities.includes(adventure.modality);
    return matchesSearch && matchesModality;
  });
};

export const filterGuides = (
  guides: Guide[],
  searchQuery: string,
  selectedModalities: Modality[]
): Guide[] => {
  return guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality =
      selectedModalities.length === 0 ||
      selectedModalities.some((modality) =>
        guide.modalities.includes(modality)
      );
    return matchesSearch && matchesModality;
  });
};
