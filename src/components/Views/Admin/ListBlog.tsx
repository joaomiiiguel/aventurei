'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Button,
    Chip,
    EmptyState,
    Pagination,
    Spinner,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/react";
import type { SortDescriptor } from "@heroui/react";
import { ArchiveX, ChevronUp, Plus } from "lucide-react";
import { Post } from "@/types/Post";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

const statusColorMap: Record<string, "success" | "warning"> = {
    true: "success",
    false: "warning",
};

const ITEMS_PER_PAGE = 10;

const columns = [
    { id: "title", name: "Título" },
    { id: "published", name: "Status" },
    { id: "created_at", name: "Data" },
];

function SortableColumnHeader({
    children,
    sortDirection,
}: {
    children: React.ReactNode;
    sortDirection?: "ascending" | "descending";
}) {
    return (
        <span className="flex items-center justify-between gap-1 text-primary">
            {children}
            {!!sortDirection && (
                <ChevronUp
                    className={`size-3 transform transition-transform duration-100 ease-out ${sortDirection === "descending" ? "rotate-180" : ""}`}
                />
            )}
        </span>
    );
}

export default function TableBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "created_at",
        direction: "descending",
    });

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return posts.slice(start, start + ITEMS_PER_PAGE);
    }, [page]);
    const start = (page - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(page * ITEMS_PER_PAGE, posts.length);

    const fetchPosts = useCallback(async (currentPage: number) => {
        setIsLoading(true);
        try {
            // Adicionado admin=true para ver rascunhos no painel admin
            const response = await fetch(`/api/blog/all?page=${currentPage}&limit=${ITEMS_PER_PAGE}&admin=true`);
            const result = await response.json();
            if (result.data) {
                setPosts(result.data);
                setTotalPages(result.pagination?.totalPages || 1);
                setTotalCount(result.pagination?.totalCount || 0);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Erro ao carregar os artigos");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => {
            const col = sortDescriptor.column as keyof Post;
            const first = String(a[col] || "");
            const second = String(b[col] || "");
            let cmp = first.localeCompare(second);
            if (sortDescriptor.direction === "descending") {
                cmp *= -1;
            }
            return cmp;
        });
    }, [posts, sortDescriptor]);

    const renderCell = useCallback((post: Post, columnKey: React.Key) => {
        const cellValue = post[columnKey as keyof Post];

        switch (columnKey) {
            case "published":
                return (
                    <Chip
                        color={statusColorMap[String(post.published)]}
                        size="sm"
                    >
                        {post.published ? "Publicado" : "Rascunho"}
                    </Chip>
                );
            case "created_at":
                return new Date(String(cellValue)).toLocaleDateString('pt-BR');
            default:
                return String(cellValue || "");
        }
    }, []);

    return (
        <section className="flex flex-col gap-4">
            <div className="w-full flex flex-row justify-between items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-primary">Blog</h3>
                <Button
                    size="md"
                    className="bg-primary text-white font-semibold shadow-md"
                    onPress={() => router.push("/admin/blog/new")}
                >
                    Novo Post
                </Button>
            </div>
            <Table variant="secondary">
                <Table.ScrollContainer className="h-[calc(80vh-10vh)] overflow-y-auto">
                    <Table.Content aria-label="Async loading table" className="min-w-[600px]"
                        sortDescriptor={sortDescriptor}
                        onSortChange={setSortDescriptor}  >
                        <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                            {columns.map((col) => (
                                <Table.Column allowsSorting key={col.id} id={col.id} isRowHeader={col.id === "created_at"}>
                                    {({ sortDirection }) => (
                                        <SortableColumnHeader sortDirection={sortDirection}>{col.name}</SortableColumnHeader>
                                    )}
                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center h-[40vh]">
                                    <ArchiveX className="size-6 text-muted" />
                                    <span className="text-sm text-muted">Nenhum post encontrado</span>
                                </EmptyState>
                            )}>
                            <Table.Collection items={posts || []}>
                                {(post) => (
                                    <Table.Row>
                                        <Table.Cell>{post.title}</Table.Cell>
                                        <Table.Cell>
                                            <Chip color={statusColorMap[post.published.toString()]} size="sm" variant="soft">
                                                {post.published ? "Publicado" : "Rascunho"}
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell>{new Date(post.created_at).toLocaleDateString("pt-BR")}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Collection>
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer>
                    <Pagination size="sm">
                        <Pagination.Summary>
                            {start} to {end} of {posts.length} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={page === 1}
                                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                                >
                                    <Pagination.PreviousIcon />
                                    Prev
                                </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            ))}
                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                                >
                                    Next
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </Table.Footer>
            </Table>
            <Modal isOpen={isEditPlaceOpen} onClose={() => setIsEditPlaceOpen(false)} title={"Criar Post"}>
                <p>Blog</p>
            </Modal>
        </section>
    );
}