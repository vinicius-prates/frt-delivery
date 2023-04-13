/*
  Warnings:

  - You are about to drop the `fruit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "fruit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Fruit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceUnit" REAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Fruit_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
