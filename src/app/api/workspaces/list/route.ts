
import { NextResponse } from 'next/server';
import { workspaceModule } from '@/server/module/workspace.module';
import { currentUser } from '@clerk/nextjs/server';


export async function GET() {
    const user = await currentUser();
    if (!user) {    
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }   
  try {
    const workspaces = await workspaceModule.service.list(user.id);
    if (!workspaces || workspaces.length === 0) {
        return NextResponse.json({ message: 'No workspaces found' }, { status: 404 });
    }
    // Map the workspaces to include only necessary fields
    const formattedWorkspaces = workspaces.map(ws => ({
      id: ws.id,
      name: ws.name
    }));
    return NextResponse.json(formattedWorkspaces, { status: 200 });
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 });
  }
}
