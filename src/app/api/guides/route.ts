import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Fetch only profiles with the 'guide' role and that are active/onboarded
  const { data: guides, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("profile", "guide")
    .eq("status", true)
    .order("rating", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(guides);
}

// Update own profile (guide info)
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updateData = await request.json();
    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
