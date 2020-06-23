import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

/* Cria a váriavel transactionRouter e atribui Router() assim ela passa ser um tipo Router() */
const transactionRouter = Router();

/* Cria uma constante que herda a classe AppointmentsRepository e a inicializa com new  */
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const retorno = { transactions, balance };
    return response.json(retorno);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    /* Cria uma const que recebe do corpo da requisição os dados titile, value, type */
    const { title, value, type } = request.body;

    /* Instância a classe CreateTransactionService, passando como parâmetro transactionsRepository
    e joga em uma const createtransaction */
    const createtransaction = new CreateTransactionService(transactionsRepository);

    /* Passa para o método execute() da classe createtransaction os parametro para criação da
     transaction, sendo title, value e type */
    const transaction = createtransaction.execute({ title, value, type });

    /* Retorna o response em um formato JSON */
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
