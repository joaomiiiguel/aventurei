import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n-config";

/**
 * Root page - redirects to default locale
 */
export default function Home() {
  redirect(`/${defaultLocale}`);
}

