"use client";

import { ArrowLeft, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/contexts/LocaleContext";
import { useEffect, useState } from "react";
import type { Post } from "@/types/Post";
import Image from "next/image";

type PageProps = {
  slug: string;
};

export default function BlogPost({ slug }: PageProps) {
  const t = useTranslations();
  const [dataPost, setDataPost] = useState<Post | undefined>();
  const [loading, setLoading] = useState(true);


  const fetchDataBlog = async () => {
    try {
      const response = await fetch(`/api/blog-post?slug=${slug}`, {
        method: "GET",
      });
      const result = await response.json();
      setDataPost(result.data);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch post data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBlog();
  }, []);

  return (
    <article className="flex flex-col items-start gap-5 w-full bg-background min-h-[90vh] py-[5vh] px-[10%]">
      <Button
        onClick={() => window.history.back()}
        variant="ghost"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.blog_page?.back || "Volver"}
      </Button>
      {!dataPost ? (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center text-gray/60">
          <FileX className="w-12 h-12 mb-4 opacity-40" />
          <p className="text-lg font-medium">{t.blog_page?.article_not_found || "Artículo no encontrado"}</p>
        </div>
      ) : (
        <>
          {dataPost.image_url && (
            <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden shadow-lg mb-4">
              <Image
                src={dataPost.image_url}
                alt={dataPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          )}
          <h1 className="font-semibold text-primary text-2xl md:text-3xl">
            {dataPost.title}
          </h1>
          <div className="flex flex-row gap-2 items-center text-primary opacity-40">
            <div className="text-xs md:text-sm">
              {t.blog_page?.published_on || "Publicado el:"}{" "}
              <strong>
                {new Date(dataPost.created_at).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </div>
            <span>•</span>
            <span className="text-xs md:text-sm">
              {dataPost.author_name}
            </span>
          </div>
          <div
            id="blog-page"
            className="blog-content mx-auto w-full"
            dangerouslySetInnerHTML={{
              __html: dataPost.content,
            }}
          />
        </>
      )}
    </article>
  );
}
