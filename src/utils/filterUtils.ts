import { Modality, PlaceType } from "@/types/Place";
import { UserType } from "@/types/User";

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
  guides: UserType[],
  searchQuery: string,
  selectedModalities: Modality[]
): UserType[] => {
  return guides.filter((guide) => {
    const matchesSearch =
      (guide.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.city || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality =
      selectedModalities.length === 0 ||
      (guide.modalities || []).some((modality) =>
        selectedModalities.includes(modality)
      );
    return matchesSearch && matchesModality;
  });
};
