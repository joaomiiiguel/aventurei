import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { email, password, name, nickname } = await request.json();

  // 1. Sign up user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        display_name: nickname,
      },
    },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  if (authData.user) {
    // 2. Create entry in our profiles table (UserType)
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      name,
      nickname,
      email,
      profile: 'guide', // Defaulting to guide for this app context, could be dynamic
      onboarded: false,
    });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      // We don't return error here if auth was successful, but maybe we should or handle differently
    }
  }

  return NextResponse.json({
    message: "Registration successful. Please check your email for verification.",
    user: authData.user,
  });
}
