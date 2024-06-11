export interface ICollaboratorRepository {
  findCollaborator(name: string, password: string): Promise<any>;
  findAllTransactions(): Promise<any>;
  findAllCustomers(): Promise<any>;
  createCollaborator(username: string, password): Promise<any>;
  findTransactionById(transaction_id:number):Promise<any>;
  findCustomerById(customer_id:number):Promise<any>;
}
