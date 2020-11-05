import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    let income = this.transactions.reduce((acc, curr) => {
      if (curr.type === 'income') {
        return (acc += curr.value);
      }
      return acc;
    }, 0);

    let outcome = this.transactions.reduce((acc, curr) => {
      if (curr.type === 'outcome') {
        return (acc += curr.value);
      }
      return acc;
    }, 0);

    let total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
