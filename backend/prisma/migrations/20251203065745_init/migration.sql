-- CreateTable
CREATE TABLE "generals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "generals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incoming_alerts" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(10) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "incoming_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "iconId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_icons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "comment" TEXT,

    CONSTRAINT "message_icons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_styles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "htmlStyle" TEXT,
    "htmlClass" TEXT,
    "comment" TEXT,
    "sorting" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "site_styles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "generals_name_value_key" ON "generals"("name", "value");

-- CreateIndex
CREATE UNIQUE INDEX "incoming_alerts_address_text_key" ON "incoming_alerts"("address", "text");

-- CreateIndex
CREATE UNIQUE INDEX "message_icons_name_path_key" ON "message_icons"("name", "path");

-- CreateIndex
CREATE UNIQUE INDEX "site_styles_name_description_key" ON "site_styles"("name", "description");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "message_icons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
