import prisma from '@/libs/prisma';

export const UserRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  delete: (id: string) => prisma.user.delete({ where: { id } }),
  create: (data: { id: string; clerkId: string; email: string; name: string }) =>
    prisma.user.create({ data }),
};
