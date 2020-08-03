import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const emptyBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce<Balance>(
      (accBalance, transaction) => {
        const newBalance = {
          ...accBalance,
        };
        newBalance[transaction.type] += transaction.value;
        newBalance.total = newBalance.income - newBalance.outcome;
        return newBalance;
      },
      emptyBalance,
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
