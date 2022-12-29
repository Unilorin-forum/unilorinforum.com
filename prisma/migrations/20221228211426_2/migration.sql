/*
  Warnings:

  - You are about to drop the column `published` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `trashed` on the `Topic` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('PUBLISHED', 'TRASHED', 'DRAFT', 'PENDING');

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "published",
DROP COLUMN "trashed",
ADD COLUMN     "status" "TopicStatus" NOT NULL DEFAULT 'PENDING';
