import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1. Fetch only profiles with the 'guide' role and that are active/onboarded
  const { data: guides, error } = await supabase
    .from("profiles")
    .select("id, name, nickname, avatar, banner, city, uf, phone, modalities, experience, certifications, short_description, description, rating, reviews_count")
    .eq("profile", "guide")
    .eq("status", true)

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
    const rawData = await request.json();
    
    // Filter out fields that shouldn't be updated or that are handled specifically
    const { id: _id, email: _email, created_at: _created_at, password: _password, ...updateFields } = rawData;

    // Ensure we are operating on the authenticated user's ID
    const updateData = { ...updateFields, id: user.id };

    console.log(`Upserting profile for user ${user.id}:`, updateData);

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updateData)
      .select();

    if (error) {
      console.error("Supabase Error Updating Profile:", error);
      return NextResponse.json({ error: error.message, details: error.details }, { status: 400 });
    }

    console.log("Profile updated successfully:", data);
    return NextResponse.json({ message: "Profile updated successfully.", data });
  } catch (err: any) {
    console.error("Internal Error in PATCH /api/guides:", err);
    return NextResponse.json({ error: "Invalid request data", details: err.message }, { status: 400 });
  }
}
