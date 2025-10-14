/*
  Warnings:

  - The `metadata` column on the `AvailableAction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableAction" DROP COLUMN "metadata",
ADD COLUMN     "metadata" TEXT[] DEFAULT ARRAY[]::TEXT[];
