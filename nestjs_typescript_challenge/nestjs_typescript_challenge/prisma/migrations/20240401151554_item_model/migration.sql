-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "quantety" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOrders_AB_unique" ON "_ItemToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOrders_B_index" ON "_ItemToOrders"("B");

-- AddForeignKey
ALTER TABLE "_ItemToOrders" ADD CONSTRAINT "_ItemToOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrders" ADD CONSTRAINT "_ItemToOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
