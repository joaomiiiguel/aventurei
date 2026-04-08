import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ user: null, session: null });
  }

  // Fetch profile from database (consistent with AuthContext)
  const { data: profile } = await supabase
    .from("profiles") // Using profiles as discussed in previous turns/logs
    .select("*")
    .eq("id", session.user.id)
    .single();

  return NextResponse.json({
    session,
    user: {
      ...session.user.user_metadata,
      ...profile,
      id: session.user.id,
      email: session.user.email,
      name: profile?.name || session.user.user_metadata.full_name || session.user.user_metadata.name,
      nickname: profile?.nickname || session.user.user_metadata.nickname,
      avatar: profile?.avatar || session.user.user_metadata.avatar,
      onboarded: profile?.onboarded || session.user.user_metadata.onboarded,
    },
  });
}
