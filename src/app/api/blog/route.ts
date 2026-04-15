import { slugify } from "@/lib/slugify";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


// GET all posts (admin – includes drafts)
export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ data, status: 200 });
}

// POST – create new post
export async function POST(request: NextRequest) {
    const supabase = await createClient();

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const body = await request.json();
        const { title, content, description, image_url, published } = body;

        if (!title) {
            return NextResponse.json({ message: "O título é obrigatório." }, { status: 400 });
        }

        const slug = slugify(title);

        // Check for duplicate slug
        const { data: existing } = await supabase
            .from("posts")
            .select("id")
            .eq("slug", slug)
            .single();

        if (existing) {
            return NextResponse.json(
                { message: "Já existe outro artigo com este título." },
                { status: 409 }
            );
        }

        const { data, error } = await supabase
            .from("posts")
            .insert({
                title,
                slug,
                content: content || "",
                description: description || null,
                image_url: image_url || null,
                published: published || false,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ data, status: 201 });
    } catch (error) {
        console.error("Erro no processamento da requisição:", error);
        return NextResponse.json(
            { message: "Erro interno no servidor." },
            { status: 500 }
        );
    }
}

// PUT – update existing post
export async function PUT(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, content, description, image_url, published } = body;

    if (!id) {
        return NextResponse.json({ message: "El ID del artículo es obligatorio." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) {
        updateData.title = title;
        updateData.slug = slugify(title);
    }
    if (content !== undefined) updateData.content = content;
    if (description !== undefined) updateData.description = description;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (published !== undefined) updateData.published = published;

    // If slug changed, check for duplicates
    if (updateData.slug) {
        const { data: existing } = await supabase
            .from("posts")
            .select("id")
            .eq("slug", updateData.slug as string)
            .neq("id", id)
            .single();

        if (existing) {
            return NextResponse.json(
                { message: "Já existe outro artigo com este título." },
                { status: 409 }
            );
        }
    }

    const { data, error } = await supabase
        .from("posts")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ data, status: 200 });
}

// DELETE – delete a post
export async function DELETE(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "El ID del artículo es obligatorio." }, { status: 400 });
    }

    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Artículo eliminado correctamente.", status: 200 });
}
