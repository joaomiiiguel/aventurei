"use client";

import { useEffect, useState, useCallback, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Chip, Form, TextArea, TextField, Label, Description } from "@heroui/react";

import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Post } from "@/types/Post";
import { useSupabaseClient } from "@/utils/supabase/client";
import { ArrowLeft, ImageIcon, Link, Loader2, Trash2, Upload, Type, User } from "lucide-react";

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
  params: string;
};

export default function FormBlog({ params }: PageProps) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [resolvedId, setResolvedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Joao Miguel");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [published, setPublished] = useState(false);

  const isNew = resolvedId === "new";
  const publishIntentRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    setResolvedId(params);
    console.log('resolvedId', params);
  }, [params]);

  useEffect(() => {
    if (!resolvedId) return;

    if (resolvedId === "new") {
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
          router.push("/admin/blog");
        }
      }
    } catch (error) {
      toast.error("Error ao carregar o artigo");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Só são permitidos arquivos de imagem");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem não pode exceder 5MB");
      return;
    }

    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setImageUrl("");
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("O título é obrigatório");
      return;
    }

    const shouldPublish = publishIntentRef.current;

    setSaving(true);
    let finalImageUrl = imageUrl;

    if (imageFile) {
      try {

        const ext = imageFile.name.split(".").pop();
        const fileName = `blog_${Date.now()}.${ext}`;

        const { data, error } = await supabaseClient.storage
          .from("blog_images")
          .upload(fileName, imageFile, { upsert: true });

        if (error) {
          toast.error("Error al subir la imagen: " + error.message);
          setSaving(false);
          return;
        }

        const { data: urlData } = supabaseClient.storage
          .from("blog_images")
          .getPublicUrl(data.path);

        finalImageUrl = urlData.publicUrl;
      } catch (error) {
        toast.error("Erro ao subir a imagem");
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
        published: shouldPublish,
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
        setPublished(shouldPublish);
        toast.success(
          isNew
            ? shouldPublish ? "Artigo publicado" : "Rascunho guardado"
            : shouldPublish ? "Artigo publicado" : "Rascunho atualizado"
        );
        router.push("/admin/blog");
      } else {
        toast.error(result.message || "Erro ao salvar");
      }
    } catch (error) {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = (publish: boolean) => {
    publishIntentRef.current = publish;
    formRef.current?.requestSubmit();
  };

  return (
    <section className="flex flex-col gap-6 w-full bg-background pl-4 py-[8vh] pr-4 pb-20">
      <Form
        ref={formRef}
        className="contents"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              className="bg-primary text-white px-4"
              onPress={() => router.push("/admin/blog")}
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {isNew ? "Novo Artigo" : "Editar Artigo"}
              </h1>
              <p className="text-gray text-sm mt-1">
                {isNew ? "Cria um novo artigo para o blog" : "Modifica o conteúdo do artigo"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Chip variant="primary" color={published ? "success" : "warning"}>
                {published ? "Publicado" : "Rascunho"}
              </Chip>
            </div>
            <Button
              size="md"
              isPending={saving}
              onPress={() => handleSave(false)}
              className="bg-primary/80 text-white font-semibold shadow-md hover:bg-primary/60"
            >
              {saving ? "Guardando..." : "Guardar Rascunho"}
            </Button>
            <Button
              size="md"
              isPending={saving}
              onPress={() => handleSave(true)}
              className="bg-primary text-white font-semibold shadow-md hover:bg-primary/70"
            >
              {saving ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
              <TextField className="w-full" name="title" type="text" fullWidth>
                <Label>Título do Artigo</Label>
                <Input fullWidth placeholder="Um título descritivo e atrativo..." value={title} onChange={(val) => setTitle(val.target.value)} className="w-full" />
              </TextField>
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
                      size="sm"
                      onPress={() => {
                        setImageUrl("");
                        setImageFile(null);
                        if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
                        setImagePreviewUrl("");
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center mb-3 text-gray/40">
                  <ImageIcon size={32} className="mb-2" />
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
                    <Loader2 className="animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload />
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
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">
              <TextField className="w-full" name="message">
                <Label>Resumo do Artigo</Label>
                <TextArea placeholder="Um breve resumo do artigo para a lista e SEO..." rows={4} value={description} onChange={(val) => setDescription(val.target.value)} />
              </TextField>
            </div>

            {/* SEO */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-light">

              <TextField className="w-full" name="title" type="text" fullWidth>
                <Label>Autor do Artigo</Label>
                <Input fullWidth placeholder="Autor do artigo" value={author} onChange={(val) => setAuthor(val.target.value)} className="w-full" />
              </TextField>
            </div>
          </div>
        </div>
      </Form>
    </section>
  );
}
