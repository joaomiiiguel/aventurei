import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { email, password, name, phone, city, activity, next = '/' } = await request.json();

  // 1. Sign up user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    phone: phone.replaceAll(' ', '').replace(/\D/g, ''),
    options: {
      data: {
        full_name: name,
        phone: phone.replaceAll(' ', '').replace(/\D/g, ''),
        city,
        activity,
      },
    },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  if (authData.user) {
    // 2. Create entries in our tables
    // Update 'users' table (used by AuthContext and Dashboard)
    const { error: usersError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      name,
      email,
      phone,
      city,
      country: 'ESP',
      profile: 'guide',
      onboarded: false,
      modalities: [activity],
      password,
    });

    if (usersError) console.error("Error creating users entry:", usersError);

  }

  return NextResponse.json({
    message: "Registration successful",
    user: authData.user,
  });
}
