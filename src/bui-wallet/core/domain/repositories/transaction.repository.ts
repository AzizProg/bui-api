/* eslint-disable prettier/prettier */
import {  BuiWalletTransactionsEntity } from "../entities/bui-wallet-transactions.entity";

export interface ITransactionRepoSitory{
    createTransaction(Transaction:BuiWalletTransactionsEntity):Promise<BuiWalletTransactionsEntity>;
    findCustomerTransactionsById(customer_id:string):Promise<BuiWalletTransactionsEntity[] | null>;
    findById(id:number):Promise<BuiWalletTransactionsEntity | null>;
    updateTransaction(transaction_id:number,description:string):Promise<BuiWalletTransactionsEntity | null>;
    deleteTransaction(transaction_id:number):Promise<any>;
}