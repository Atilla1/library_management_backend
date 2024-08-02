/*
  Warnings:

  - You are about to drop the `Articel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articel" DROP CONSTRAINT "Articel_categoryId_fkey";

-- DropTable
DROP TABLE "Articel";

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "runTimeMinute" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN DEFAULT true,
    "borrower" TEXT,
    "borrowDate" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
