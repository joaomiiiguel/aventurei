import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  // Authorization check
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Path parameter is required' }, { status: 400 });
  }

  try {
    // Revalidates the specific path (e.g., /es/guide-nickname/adventure-slug)
    revalidatePath(path, 'page');
    
    return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        path: path
    });
  } catch (err) {
    return NextResponse.json({ message: `Error revalidating path: ${path}` }, { status: 500 });
  }
}
