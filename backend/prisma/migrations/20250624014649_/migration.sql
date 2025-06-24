-- CreateTable
CREATE TABLE "_AdminZones" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdminZones_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdminZones_B_index" ON "_AdminZones"("B");

-- AddForeignKey
ALTER TABLE "_AdminZones" ADD CONSTRAINT "_AdminZones_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminZones" ADD CONSTRAINT "_AdminZones_B_fkey" FOREIGN KEY ("B") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
