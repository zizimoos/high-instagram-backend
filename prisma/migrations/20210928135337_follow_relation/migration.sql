-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "_FollowerRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowerRelation_AB_unique" ON "_FollowerRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowerRelation_B_index" ON "_FollowerRelation"("B");

-- AddForeignKey
ALTER TABLE "_FollowerRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowerRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
