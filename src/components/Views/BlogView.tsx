"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/Post";
import { Input } from "@/components/ui/input";
import { FileArchive, Loader2 } from "lucide-react";
import { useTranslations } from "@/contexts/LocaleContext";
import { motion } from "framer-motion";

const BlogView = () => {
  const t = useTranslations();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const observer = useRef<IntersectionObserver | null>(null);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset when search changes
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQuery]);

  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || fetchingMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, fetchingMore, hasMore]);

  const fetchData = async (pageNum: number, query: string) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setFetchingMore(true);
    }

    try {
      const response = await fetch(`/api/list-blog?page=${pageNum}&limit=6${query ? `&query=${encodeURIComponent(query)}` : ""}`, { method: "GET" });
      const result = await response.json();

      if (result.data) {
        setPosts(prev => pageNum === 1 ? result.data : [...prev, ...result.data]);

        if (result.pagination) {
          setHasMore(result.pagination.nextPage !== null);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchData(page, debouncedQuery);
  }, [page, debouncedQuery]);

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 text-white mt-[-8vh]">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=600&fit=crop"
            alt="Nature Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-[5%] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black md:text-4xl"
          >
            Blog Aventurei
          </motion.h1>
        </div>
      </section>
      <div className="py-10 w-full px-[10%] flex flex-col gap-8">
        <div className="w-full flex flex-col text-justify gap-5">
          <p className="text-lg text-primary" dangerouslySetInnerHTML={{ __html: t.blog_page?.intro_p1 || "" }} />
          <p className="text-lg text-primary" dangerouslySetInnerHTML={{ __html: t.blog_page?.intro_p2 || "" }} />
          <p className="text-lg text-primary" dangerouslySetInnerHTML={{ __html: t.blog_page?.intro_p3 || "" }} />
        </div>

        <div className="w-full max-w-xl mx-auto">
          <Input
            placeholder={t.blog_page?.search_placeholder || "Buscar artículos..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {debouncedQuery && !loading && (
            <p className="flex flex-row items-center mt-3 text-sm text-gray/60 animate-in fade-in slide-in-from-top-1">
              {t.blog_page?.showing_results || "Mostrando resultados para:"} <span className="font-bold text-primary">&quot;{debouncedQuery}&quot;</span>
            </p>
          )}
        </div>
      </div>
      <div className="bg-primary/5 w-full px-[10%]">
        <h4 className="text-2xl font-bold tracking-tight text-primary mt-8">{t.blog_page?.latest_news || "Últimas novedades"}</h4>

        {posts.length === 0 ? (
          <div className="flex flex-row h-[30vh] py-[4vh] justify-center items-center mt-3 text-md text-gray/60 animate-in fade-in slide-in-from-top-1">
            {t.blog_page?.no_articles || "No se ha encontrado ningún artículo."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-[4vh] px-[10%]">
            {posts?.map((post: Post, index: number) => {
              const isLastElement = posts.length === index + 1;
              return (
                <div
                  className="break-words flex flex-col"
                  key={post.id}
                  ref={isLastElement ? lastPostElementRef : null}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-[16/9] relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
                      {post.image_url ? (
                        <Image
                          alt={post.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          src={post.image_url}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <FileArchive width="48" height="48" className="text-primary/20" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col gap-3 mt-6">
                    <h2 className="font-bold tracking-tight text-primary text-xl md:text-2xl line-clamp-2 hover:opacity-80 transition-opacity">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="flex flex-row gap-3 items-center text-gray/60 text-xs font-semibold uppercase tracking-wider">
                      <span>
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>
                        {post.author_name}
                      </span>
                    </div>
                    <div className="prose prose-sm leading-relaxed text-gray  line-clamp-3">
                      {post.description}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-2 text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1 group"
                    >
                      {t.blog_page?.read_more || "Leer más"}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {fetchingMore && (
          <div className="w-full py-10 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="w-full py-10 text-center text-gray italic">
            {t.blog_page?.end_of_news || "¡Has llegado al final de las novedades!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;
