"use client";

import { Chip, EmptyState, Spinner, Table } from "@heroui/react";
import { ArchiveX, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SortDescriptor } from "@heroui/react";

interface User {
    id: number;
    name: string;
    role: string;
    status: string;
    email: string;
}

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
    Active: "success",
    Inactive: "danger",
    "On Leave": "warning",
};

const allUsers: User[] = [
    { email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active" },
    { email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active" },
    { email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave" },
    { email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active" },
    {
        email: "emily@acme.com",
        id: 5,
        name: "Emily Davis",
        role: "Product Manager",
        status: "Inactive",
    },
    { email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "Lead Designer", status: "Active" },
    {
        email: "olivia@acme.com",
        id: 7,
        name: "Olivia Martinez",
        role: "Frontend Engineer",
        status: "Active",
    },
    {
        email: "james@acme.com",
        id: 8,
        name: "James Taylor",
        role: "Backend Engineer",
        status: "Active",
    },
    {
        email: "sophia@acme.com",
        id: 9,
        name: "Sophia Anderson",
        role: "QA Engineer",
        status: "On Leave",
    },
    { email: "liam@acme.com", id: 10, name: "Liam Thomas", role: "DevOps Engineer", status: "Active" },
    {
        email: "lucas@acme.com",
        id: 11,
        name: "Lucas Martinez",
        role: "Product Manager",
        status: "Active",
    },
    {
        email: "emma@acme.com",
        id: 12,
        name: "Emma Johnson",
        role: "Frontend Engineer",
        status: "Active",
    },
    { email: "noah@acme.com", id: 13, name: "Noah Davis", role: "Backend Engineer", status: "Active" },
    { email: "ava@acme.com", id: 14, name: "Ava Wilson", role: "Lead Designer", status: "Active" },
    {
        email: "oliver@acme.com",
        id: 15,
        name: "Oliver Martinez",
        role: "Frontend Engineer",
        status: "Active",
    },
    {
        email: "isabella@acme.com",
        id: 16,
        name: "Isabella Johnson",
        role: "Backend Engineer",
        status: "Active",
    },
    { email: "mia@acme.com", id: 17, name: "Mia Davis", role: "Lead Designer", status: "Active" },
    {
        email: "william@acme.com",
        id: 18,
        name: "William Wilson",
        role: "Frontend Engineer",
        status: "Active",
    },
];

const ITEMS_PER_PAGE = 10;

const columns = [
    { id: "name", name: "Name" },
    { id: "role", name: "Role" },
    { id: "status", name: "Status" },
    { id: "email", name: "Email" },
];

function SortableColumnHeader({
    children,
    sortDirection,
}: {
    children: React.ReactNode;
    sortDirection?: "ascending" | "descending";
}) {
    return (
        <span className="flex items-center justify-between">
            {children}
            {!!sortDirection && (
                <ChevronUp
                    className={`size-3 transform transition-transform duration-100 ease-out ${sortDirection === "descending" ? "rotate-180" : ""}`}
                />
            )}
        </span>
    );
}


export default function TableGuides() {
    const [items, setItems] = useState<User[]>(() => allUsers.slice(0, ITEMS_PER_PAGE));
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false);
    const hasMore = items.length < allUsers.length;
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    const loadMore = useCallback(() => {
        if (!hasMore || isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);
        setTimeout(() => {
            setItems((prev) => allUsers.slice(0, prev.length + ITEMS_PER_PAGE));
            setIsLoading(false);
            requestAnimationFrame(() => {
                isLoadingRef.current = false;
            });
        }, 1500);
    }, [hasMore]);

    const sortedUsers = useMemo(() => {
        return [...allUsers].sort((a, b) => {
            const col = sortDescriptor.column as keyof User;
            const first = String(a[col]);
            const second = String(b[col]);
            let cmp = first.localeCompare(second);
            if (sortDescriptor.direction === "descending") {
                cmp *= -1;
            }
            return cmp;
        });

    }, [sortDescriptor]);

    useEffect(() => {
        setItems(sortedUsers);
    }, [sortedUsers]);

    return (
        <section className="flex flex-col gap-4">
            <div className="w-full flex flex-row justify-between items-center gap-4 mb-4">
                <h3 className="mb-2 font-semibold text-primary">Guias</h3>
            </div>
            <Table variant="secondary">
                <Table.ScrollContainer className="h-[calc(80vh-10vh)] overflow-y-auto">
                    <Table.Content aria-label="Async loading table" className="min-w-[600px]"
                        sortDescriptor={sortDescriptor}
                        onSortChange={setSortDescriptor}  >
                        <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
                            {columns.map((col) => (
                                <Table.Column allowsSorting key={col.id} id={col.id} isRowHeader={col.id === "name"}>
                                    {({ sortDirection }) => (
                                        <SortableColumnHeader sortDirection={sortDirection}>{col.name}</SortableColumnHeader>
                                    )}
                                </Table.Column>
                            ))}
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                                    <ArchiveX className="size-6 text-muted" />
                                    <span className="text-sm text-muted">Nenhum guia encontrado</span>
                                </EmptyState>
                            )}>
                            <Table.Collection items={items}>
                                {(user) => (
                                    <Table.Row>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.role}</Table.Cell>
                                        <Table.Cell>
                                            <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                                                {user.status}
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Collection>
                            {!!hasMore && (
                                <Table.LoadMore isLoading={isLoading} scrollOffset={0} onLoadMore={loadMore}>
                                    <Table.LoadMoreContent>
                                        <Spinner size="md" />
                                    </Table.LoadMoreContent>
                                </Table.LoadMore>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </section>
    );
}