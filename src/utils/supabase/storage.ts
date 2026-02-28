
export const getStorageUrl = (bucket: 'users' | 'places', path: string | undefined | null) => {
  if (!path) return undefined;
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return path;

  // Ensure no double slashes if path starts with /
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
};
