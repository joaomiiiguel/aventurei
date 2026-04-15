import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") || "";
    const admin = searchParams.get("admin") === "true";

    const supabase = await createClient();
    const offset = (page - 1) * limit;

    let queryBuilder = supabase
        .from("posts")
        .select("*", { count: "exact" });

    // Se não for admin, mostra apenas publicados
    if (!admin) {
        queryBuilder = queryBuilder.eq("published", true);
    }

    if (query) {
        queryBuilder = queryBuilder.ilike("title", `%${query}%`);
    }

    const { data, error, count } = await queryBuilder
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        return NextResponse.json({ status: 400, message: error.message });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
        data,
        pagination: {
            page,
            limit,
            totalPages,
            totalCount: count,
        },
        status: 200,
    });
}
