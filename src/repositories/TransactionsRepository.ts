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

  /* Recupera todas as transações */
  public all(): Transaction[] {
    return this.transactions;
  }

  /* Usado para fazer o calculo de Deposito e retirrada devolvendo um total */
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    /* Retorno vai ser do tipo Balance */
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    /* Inicia a classe criando um const do tipo Transaction */
    const transaction = new Transaction({ title, value, type });

    /* Inseri as informações dentro do Array */
    this.transactions.push(transaction);

    /* Retorna o trasaction criada */
    return transaction;
  }
}

export default TransactionsRepository;
