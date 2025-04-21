/*
  Warnings:

  - Added the required column `contactName` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "contactName" TEXT NOT NULL;
