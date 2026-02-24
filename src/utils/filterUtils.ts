import { Modality, PlaceType } from "@/types/Place";
import { Guide } from "@/data/mockData";

export const filterAdventures = (
  adventures: PlaceType[],
  searchQuery: string,
  selectedModalities: Modality[]
): PlaceType[] => {
  return adventures.filter((adventure) => {
    const matchesSearch =
      (adventure.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (adventure.city || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality =
      selectedModalities.length === 0 ||
      (adventure.modalities && selectedModalities.includes(adventure.modalities));
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
