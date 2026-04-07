import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { email, password } = await request.json();

  // 1. Log in user in Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // 2. Refresh session manually for cookies if needed (SSR templates handle most)
  return NextResponse.json({
    message: "Login successful.",
    user: data.user,
    session: data.session,
  });
}
