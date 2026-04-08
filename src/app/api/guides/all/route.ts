import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Fetch only profiles with the 'guide' role and that are active/onboarded
  const { data: guides, error } = await supabase
    .from("profiles")
    .select("id, name, nickname, avatar, city, uf, modalities, description, rating")
    .eq("profile", "guide")
    .eq("status", true)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(guides);
}
