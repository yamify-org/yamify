/*
  Warnings:

  - You are about to drop the `Deployment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deployment" DROP CONSTRAINT "Deployment_yamId_fkey";

-- DropTable
DROP TABLE "Deployment";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "chart" TEXT NOT NULL,
    "valuesYaml" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "yamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_yamId_fkey" FOREIGN KEY ("yamId") REFERENCES "Yam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
