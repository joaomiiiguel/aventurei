"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Chip, Textarea } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Post } from "@/types/Post";

// Lazy load the editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray/5 rounded-2xl animate-pulse flex items-center justify-center text-gray/40">
      Cargando editor...
    </div>
  ),
});

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function BlogFormPage({ params }: PageProps) {
  const router = useRouter();
  const [resolvedId, setResolvedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Masaje Tantrico Madrid");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [published, setPublished] = useState(false);

  const isNew = resolvedId === "nuevo";

  useEffect(() => {
    useAuth();
    params.then((p) => {
      setResolvedId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (!resolvedId) return;

    if (resolvedId === "nuevo") {
      setLoading(false);
      return;
    }

    fetchPost(resolvedId);
  }, [resolvedId]);

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch("/api/blog");
      const result = await response.json();

      if (result.data) {
        const post = result.data.find((p: Post) => p.id === id);
        if (post) {
          setTitle(post.title);
          setDescription(post.description || "");
          setContent(post.content);
          setImageUrl(post.image_url || "");
          setPublished(post.published);
        } else {
          toast.error("Artículo no encontrado");
          router.push("/painel/blog");
        }
      }
    } catch (error) {
      toast.error("Error al cargar el artículo");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede superar los 5MB");
      return;
    }

    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setImageUrl("");
  }, []);

  const handleSave = async (isPublish: boolean) => {
    if (!title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setSaving(true);
    let finalImageUrl = imageUrl;

    if (imageFile) {
      try {
        const { supabase } = await import("@/services/supabase");

        const ext = imageFile.name.split(".").pop();
        const fileName = `blog_${Date.now()}.${ext}`;

        const { data, error } = await supabase.storage
          .from("blog_images")
          .upload(fileName, imageFile, { upsert: true });

        if (error) {
          toast.error("Error al subir la imagen: " + error.message);
          setSaving(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("blog_images")
          .getPublicUrl(data.path);

        finalImageUrl = urlData.publicUrl;
      } catch (error) {
        toast.error("Error al subir la imagen");
        setSaving(false);
        return;
      }
    }

    try {
      const method = isNew ? "POST" : "PUT";
      const body: Record<string, unknown> = {
        title,
        content,
        description: description || null,
        image_url: finalImageUrl || null,
        published: isPublish,
        author_name: author,
      };

      if (!isNew) {
        body.id = resolvedId;
      }

      const response = await fetch("/api/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(isNew ? "Artículo creado" : "Artículo actualizado");
        router.push("/painel/blog");
      } else {
        toast.error(result.message || "Error al guardar");
      }
    } catch (error) {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col gap-5 w-full bg-background min-h-[90vh] pl-4 py-[8vh] pr-4 animate-pulse">
        <div className="h-8 w-64 bg-gray/10 rounded mb-4"></div>
        <div className="h-12 bg-gray/10 rounded-2xl mb-4"></div>
        <div className="h-[400px] bg-gray/10 rounded-2xl"></div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full bg-background min-h-[90vh] pl-4 py-[8vh] pr-4 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            variant="light"
            color="primary"
            onPress={() => router.push("/painel/blog")}
          >
            <Icon icon="lucide:arrow-left" width="20" height="20" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {isNew ? "Nuevo Artículo" : "Editar Artículo"}
            </h1>
            <p className="text-gray text-sm mt-1">
              {isNew ? "Crea un nuevo artículo para el blog" : "Modifica el contenido del artículo"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Chip color={published ? "success" : "warning"} variant="flat">
              {published ? "Publicado" : "Rascunho"}
            </Chip>
          </div>
          <Button
            color="primary"
            size="md"
            variant="bordered"
            isLoading={saving}
            onPress={() => handleSave(false)}
            startContent={!saving && <Icon icon="lucide:save" width="18" height="18" />}
            className="font-semibold shadow-md hover:bg-primary/10"
          >
            {saving ? "Guardando..." : "Guardar Rascunho"}
          </Button>
          <Button
            color="primary"
            size="md"
            isLoading={saving}
            onPress={() => handleSave(true)}
            startContent={!published && <Icon icon="lucide:log-in" width="18" height="18" />}
            className="font-semibold shadow-md"
          >
            {saving ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
            <label className="text-sm font-semibold text-primary-dark mb-2 block">
              Título do artigo *
            </label>
            <Input
              placeholder="Um título descritivo e atrativo..."
              size="lg"
              variant="bordered"
              color="primary"
              value={title}
              onValueChange={setTitle}
              classNames={{ input: "text-lg font-semibold text-primary" }}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
            <label className="text-sm font-semibold text-primary-dark mb-2 block">
              Conteúdo
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Cover Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
            <label className="text-sm font-semibold text-primary-dark mb-3 block">
              Imagem de capa
            </label>

            {imageUrl || imagePreviewUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 group">
                <Image
                  src={imagePreviewUrl || imageUrl}
                  alt="Cover"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    isIconOnly
                    color="danger"
                    variant="solid"
                    size="sm"
                    onPress={() => {
                      setImageUrl("");
                      setImageFile(null);
                      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                      setImagePreviewUrl("");
                    }}
                  >
                    <Icon icon="lucide:trash-2" width="16" height="16" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center mb-3 text-gray/40">
                <Icon icon="lucide:image" width="32" height="32" className="mb-2" />
                <p className="text-sm">Sem imagem de capa</p>
              </div>
            )}

            <label
              className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl cursor-pointer transition-all font-medium text-sm ${saving
                ? "bg-gray/10 text-gray/60"
                : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
            >
              {saving ? (
                <>
                  <Icon icon="lucide:loader-2" width="16" height="16" className="animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Icon icon="lucide:upload" width="16" height="16" />
                  Seleccionar imagen
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={saving}
              />
            </label>

            <div className="mt-3">
              <Input
                placeholder="O pegar URL de imagen..."
                size="sm"
                variant="bordered"
                color="primary"
                value={imageUrl}
                onValueChange={(val) => {
                  setImageUrl(val);
                  setImageFile(null);
                  if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                  setImagePreviewUrl("");
                }}
                startContent={<Icon icon="lucide:link" className="text-primary/40" />}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
            <label className="text-sm font-semibold text-primary-dark mb-2 block">
              Descrição curta
            </label>
            <Textarea
              placeholder="Um breve resumo do artigo para a lista e SEO..."
              variant="bordered"
              color="primary"
              value={description}
              onValueChange={setDescription}
              minRows={4}
              maxRows={6}
            />
            <p className="text-xs text-gray/50 mt-2">
              É mostrado na lista de artigos e nos metadados SEO.
            </p>
          </div>

          {/* SEO */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
            <label className="text-sm font-semibold text-primary-dark mb-2 block">
              Autor
            </label>
            <Input
              placeholder="Autor do artigo"
              variant="bordered"
              color="primary"
              value={author}
              onValueChange={setAuthor}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
