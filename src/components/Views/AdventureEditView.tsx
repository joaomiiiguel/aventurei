import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Label from "../ui/label";
import Textarea from "../ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { Difficulty, Modality, modalityLabels, PlaceType } from "@/types/Place";
import Select from "../ui/select";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { useTranslations } from "@/contexts/LocaleContext";

interface AdventureEditViewProps {
  onClose: () => void
  editingAdventure?: PlaceType | null
}
const AdventureEditView = ({ onClose, editingAdventure }: AdventureEditViewProps) => {
  const t = useTranslations()
  const supabase = useMemo(() => createClient(), [])
  const [adventureForm, setAdventureForm] = useState<PlaceType>({
    title: editingAdventure?.title || "",
    description: editingAdventure?.description || "",
    city: editingAdventure?.city || "",
    UF: editingAdventure?.UF || "",
    price: editingAdventure?.price || null,
    nick_partner: editingAdventure?.nick_partner || "",
    cover_img: editingAdventure?.cover_img || "",
    accessibility: editingAdventure?.accessibility || "",
    min_age: editingAdventure?.min_age || 4,
    booking_mode: editingAdventure?.booking_mode || true,
    gallery: editingAdventure?.gallery || [],
    difficulty: editingAdventure?.difficulty || "moderate" as Difficulty,
    modalities: editingAdventure?.modalities || null
  });

  const handleAdventureSave = async () => {
    console.log(adventureForm)
    if (editingAdventure?.id) {
      // update
      const { error } = await supabase.from("places").update(adventureForm).eq("id", editingAdventure.id)
      if (error) {
        console.error("Error updating adventure:", error)
      }
      toast.success(t.adventure_updated_success)
    } else {
      // create
      const { error } = await supabase.from("places").insert(adventureForm)
      if (error) {
        console.error("Error creating adventure:", error)
      }
      toast.success(t.adventure_created_success)
    }
    onClose()
  }

  useEffect(() => {
    if (editingAdventure) {
      setAdventureForm(editingAdventure)
    }
  }, [editingAdventure])


  return (
    <div>
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label>{t.adventure_name}</Label>
          <Input
            value={adventureForm.title}
            onChange={(e) => setAdventureForm({ ...adventureForm, title: e.target.value })}
            placeholder={t.adventure_name_placeholder} type={""} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>{t.modality}</Label>
            <Select
              options={Object.keys(modalityLabels).map((key) => ({
                value: key,
                label: t[`modality_${key.replace('-', '_')}`] || key
              }))}
              value={adventureForm.modalities!}
              onChange={(v) => setAdventureForm({ ...adventureForm, modalities: v as Modality })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.difficulty}</Label>
            <Select
              options={[
                { value: "fácil", label: t.difficulty_easy },
                { value: "moderado", label: t.difficulty_moderate },
                { value: "difícil", label: t.difficulty_hard },
                { value: "extremo", label: t.difficulty_extreme },
              ]}
              value={adventureForm.difficulty!}
              onChange={(v) =>
                setAdventureForm({ ...adventureForm, difficulty: v as Difficulty })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>{t.city}</Label>
            <Input
              value={adventureForm.city}
              onChange={(e) => setAdventureForm({ ...adventureForm, city: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>{t.state}</Label>
            <Input
              value={adventureForm.UF}
              onChange={(e) => setAdventureForm({ ...adventureForm, UF: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div className="space-y-2">
            <Label>{t.min_age}</Label>
            <Input
              value={adventureForm.min_age?.toString() ?? "3"}
              onChange={(e) => setAdventureForm({ ...adventureForm, min_age: Number(e.target.value) })}
              placeholder={t.min_age_placeholder}
            />
          </div>

          <div className="space-y-2">
            <Label>{t.price}</Label>
            <Input
              value={adventureForm.price?.toString() ?? ""}
              onChange={(e) => setAdventureForm({ ...adventureForm, price: Number(e.target.value) })}
              placeholder={t.price_placeholder || "Ex: 150"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t.description}</Label>
          <Textarea
            rows={4}
            value={adventureForm.description}
            onChange={(e) => setAdventureForm({ ...adventureForm, description: e.target.value })}
            placeholder={t.adventure_description_placeholder}
          />
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-3">
          <div className="m-0 flex flex-row items-center justify-between">
            <Label>{t.adventure_photos}</Label>
            <span className="text-xs mb-1">{t.photo_limit}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {adventureForm?.gallery?.map((photo, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                <img src={photo} alt={`Foto ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const newPhotos = adventureForm?.gallery?.filter((_, i) => i !== index);
                    setAdventureForm({ ...adventureForm, gallery: newPhotos });
                  }}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {t.cover_badge}
                  </span>
                )}
              </div>
            ))}
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted">
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t.add_photo}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const urls = files.map((file) => URL.createObjectURL(file));
                  setAdventureForm({ ...adventureForm, cover_img: urls[0], gallery: [...adventureForm.gallery!, ...urls] });
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">{t.photo_hint}</p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={() => onClose()}>
            {t.cancel}
          </Button>
          <Button onClick={handleAdventureSave} className="btn-adventure">
            {editingAdventure ? t.save : t.create_adventure}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdventureEditView