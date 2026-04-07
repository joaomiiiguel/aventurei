import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  
  // Optional filters: city, modality, guide_nickname
  const city = searchParams.get("city");
  const modality = searchParams.get("modality");
  const nickname = searchParams.get("nickname");

  let query = supabase.from("adventures").select(`
    *,
    guide:profiles!adventures_nickname_fkey (
      name,
      avatar
    )
  `);

  if (city) {
    query = query.eq("city", city);
  }
  if (modality) {
    query = query.eq("modalities", modality);
  }
  if (nickname) {
    query = query.eq("nickname", nickname);
  }

  const { data: adventures, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(adventures);
}

// Create new adventure entry
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get guide nickname first (needed for ForeignKey references)
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.nickname) {
    return NextResponse.json({ error: "Guide profile not found" }, { status: 403 });
  }

  try {
    const adventureData = await request.json();
    const { data: newAdventure, error: adventureError } = await supabase
      .from("adventures")
      .insert({
        ...adventureData,
        nickname: profile.nickname,
      })
      .select()
      .single();

    if (adventureError) {
      return NextResponse.json({ error: adventureError.message }, { status: 400 });
    }

    return NextResponse.json(newAdventure);
  } catch {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
