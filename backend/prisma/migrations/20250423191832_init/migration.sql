/*
  Warnings:

  - Added the required column `priority` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ToDo" ADD COLUMN     "priority" TEXT NOT NULL;
