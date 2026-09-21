/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `generals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `site_styles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "generals_name_value_key";

-- DropIndex
DROP INDEX "site_styles_name_description_key";

-- CreateIndex
CREATE UNIQUE INDEX "generals_name_key" ON "generals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "site_styles_name_key" ON "site_styles"("name");
