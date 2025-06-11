import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Fetching all workspaces with their users...');
    const workspaces = await prisma.workspace.findMany({
      include: {
        user: true
      }
    });

    console.log('Workspaces:', JSON.stringify(workspaces, null, 2));
  } catch (error) {
    console.error('Error fetching workspaces:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
