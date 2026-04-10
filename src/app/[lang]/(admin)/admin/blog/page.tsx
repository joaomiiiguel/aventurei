"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip, Input, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import useAuth from "@/hooks/useAuth";
import type { Post } from "@/types/Post";
import toast from "react-hot-toast";

const BlogAdminPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const router = useRouter();

  useEffect(() => {
    useAuth();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      const result = await response.json();
      if (result.data) {
        setPosts(result.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Error al cargar los artículos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) return;

    try {
      const response = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      const result = await response.json();

      if (response.ok) {
        toast.success("Artículo eliminado");
        setPosts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(result.message || "Error al eliminar");
      }
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      const response = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, published: !post.published }),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(post.published ? "Artículo despublicado" : "Artículo publicado");
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p))
        );
      } else {
        toast.error(result.message || "Error al actualizar");
      }
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && post.published) ||
      (filterStatus === "draft" && !post.published);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <section className="flex flex-col gap-5 w-full bg-background min-h-[90vh] pl-4 py-[8vh] animate-pulse">
        <div className="h-8 w-48 bg-gray/10 rounded mb-8"></div>
        <div className="flex flex-col gap-4 pr-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray/10 rounded-2xl"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 w-full bg-background min-h-[90vh] pl-4 py-[8vh] pr-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Gestão do Blog</h1>
          <p className="text-gray text-sm mt-1">
            {posts.length} artigo{posts.length !== 1 ? "s" : ""} em total
          </p>
        </div>
        <Button
          color="primary"
          size="lg"
          startContent={<Icon icon="lucide:plus" width="20" height="20" />}
          onPress={() => router.push("/painel/blog/nuevo")}
          className="font-semibold shadow-md"
        >
          Novo Artigo
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          placeholder="Buscar artigos..."
          size="md"
          variant="bordered"
          color="primary"
          value={searchQuery}
          onValueChange={setSearchQuery}
          isClearable
          startContent={<Icon icon="lucide:search" className="text-primary text-lg" />}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((status) => (
            <Chip
              key={status}
              variant={filterStatus === status ? "solid" : "bordered"}
              color="primary"
              className="cursor-pointer transition-all"
              onClick={() => setFilterStatus(status)}
            >
              {status === "all" ? "Todos" : status === "published" ? "Publicados" : "Rascunhos"}
            </Chip>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray/60">
          <Icon icon="lucide:file-text" width="48" height="48" className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No se han encontrado artículos</p>
          <p className="text-sm mt-1">Crea tu primer artículo haciendo clic en el botón de arriba.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-primary-light">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5">
                <th className="p-4 font-semibold text-primary-dark border-b border-primary-light">
                  Título
                </th>
                <th className="p-4 font-semibold text-primary-dark border-b border-primary-light text-center">
                  Status
                </th>
                <th className="p-4 font-semibold text-primary-dark border-b border-primary-light text-center">
                  Data
                </th>
                <th className="p-4 font-semibold text-primary-dark border-b border-primary-light text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 border-b border-primary-light">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-primary-dark line-clamp-1">
                        {post.title}
                      </span>
                      <span className="text-xs text-gray/60 line-clamp-1">/{post.slug}</span>
                    </div>
                  </td>
                  <td className="p-4 border-b border-primary-light text-center">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={post.published ? "success" : "warning"}
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </Chip>
                  </td>
                  <td className="p-4 border-b border-primary-light text-center text-sm text-gray/80">
                    {format(new Date(post.created_at), "dd/MM/yyyy")}
                  </td>
                  <td className="p-4 border-b border-primary-light">
                    <div className="flex justify-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="primary"
                        title="Editar"
                        onPress={() => router.push(`/painel/blog/${post.id}`)}
                      >
                        <Icon icon="lucide:pencil" width="16" height="16" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color={post.published ? "warning" : "success"}
                        title={post.published ? "Despublicar" : "Publicar"}
                        onPress={() => handleTogglePublish(post)}
                      >
                        <Icon
                          icon={post.published ? "lucide:eye-off" : "lucide:eye"}
                          width="16"
                          height="16"
                        />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        title="Eliminar"
                        onPress={() => handleDelete(post.id, post.title)}
                      >
                        <Icon icon="lucide:trash-2" width="16" height="16" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BlogAdminPage;
