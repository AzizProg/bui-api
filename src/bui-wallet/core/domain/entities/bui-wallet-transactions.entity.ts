/* eslint-disable prettier/prettier */

export enum TransactionType {
  DEPOSIT="DEPOSIT",
  WITHDRAW="WITHDRAW",
  TRANSFER="TRANSFER",
}
export interface BuiWalletTransactionsEntity {
  id?: number;
  amount: number;
  description?:string;
  type: TransactionType;
  customer_id: number;
  create_at?: Date;
}
