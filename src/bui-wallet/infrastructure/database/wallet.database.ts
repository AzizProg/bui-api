import { BuiWalletCustomersEntity } from "src/bui-wallet/core/domain/entities/bui-wallet-customers.entity";
import { BuiWalletTransactionsEntity } from "src/bui-wallet/core/domain/entities/bui-wallet-transactions.entity";

export interface IWalletDatabase{
    createCustomer(username:string,password:string):Promise<any>;
    getCustomer(username):Promise<BuiWalletCustomersEntity>;
    saveTransaction(buiWalletTransactions:BuiWalletTransactionsEntity):Promise<any>;
    findTransactionById(transaction_id:string):Promise<BuiWalletTransactionsEntity>;
    findCustomerTransactions(token_id:string):Promise<BuiWalletTransactionsEntity[]>;
    updateTransaction(transaction_id:number,transaction:string):Promise<BuiWalletTransactionsEntity>;
    deleteTransaction(transaction_id:number):Promise<BuiWalletTransactionsEntity>;
}