import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const slug = body?.record?.slug || body?.old_record?.slug;

    // Revalidate the notes index and specific note path
    revalidatePath('/notes');
    if (slug) {
      revalidatePath(`/notes/${slug}`);
    }

    return NextResponse.json(
      { revalidated: true, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
