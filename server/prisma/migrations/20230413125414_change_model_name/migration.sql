/*
  Warnings:

  - You are about to drop the `Fruit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fruit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceUnit" REAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Product_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
