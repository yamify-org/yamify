import { NextResponse } from 'next/server';
import { yamModule } from '@/server/module/yam.module';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_: Request, {
  params,
}: {
  params: Promise<{ workspaceId: string, name: string }>
}) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await params;

  try {
    const yam = await yamModule.service.getByName(name);
    if (!yam) {
      return NextResponse.json({ message: 'No yam found' }, { status: 404 });
    }

    return NextResponse.json(yam, { status: 200 });
  } catch (error) {
    console.error('Error fetching yam:', error);
    return NextResponse.json({ error: 'Failed to fetch yam' }, { status: 500 });
  }
}