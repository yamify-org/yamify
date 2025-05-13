import prisma from "@/libs/prsima";

export const userRepository = {
  findOrCreate: async (profile: any) =>
    prisma.user.upsert({
      where: { id: profile.id },
      update: { email: profile.email },
      create: { id: profile.id, email: profile.email }
    }),
};