export interface ICollaboratorDB{
createCollaborator(username:string,password:string):Promise<any>;
getCollabotor(username:string):Promise<any>;
findAllCustomers():Promise<any>;
findAllTransactions():Promise<any>;
findTransactionById(transaction_id:number):Promise<any>;
findCustomerById(customer_id:number):Promise<any>;
}