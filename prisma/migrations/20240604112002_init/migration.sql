-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TRX_MANAGER', 'CUSTOMER_SERVICE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER');

-- CreateTable
CREATE TABLE "BuiCollaborators" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuiCollaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuiWalletCustomers" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuiWalletCustomers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuiWalletTransactions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "type" "Type" NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuiWalletTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuiCollaborators_username_key" ON "BuiCollaborators"("username");

-- CreateIndex
CREATE UNIQUE INDEX "BuiWalletCustomers_username_key" ON "BuiWalletCustomers"("username");

-- AddForeignKey
ALTER TABLE "BuiWalletTransactions" ADD CONSTRAINT "BuiWalletTransactions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "BuiWalletCustomers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
