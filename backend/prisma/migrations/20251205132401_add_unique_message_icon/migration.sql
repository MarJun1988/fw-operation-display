/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `message_icons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "message_icons_name_key" ON "message_icons"("name");
