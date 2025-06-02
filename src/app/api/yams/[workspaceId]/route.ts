import { NextResponse } from 'next/server';
import { yamModule } from '@/server/module/yam.module';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(_: Request, {
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { workspaceId } = await params;

  try {
    const yams = await yamModule.service.list(workspaceId);
    if (!yams || yams.length === 0) {
      return NextResponse.json({ message: 'No yams found' }, { status: 404 });
    }

    return NextResponse.json(yams, { status: 200 });
  } catch (error) {
    console.error('Error fetching yams:', error);
    return NextResponse.json({ error: 'Failed to fetch yams' }, { status: 500 });
  }
}