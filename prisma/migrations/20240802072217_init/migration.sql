-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "runTimesMinute" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "nbrPages" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isBorrowable" BOOLEAN DEFAULT true,
    "borrower" TEXT,
    "borrowDate" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Articel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Articel" ADD CONSTRAINT "Articel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
