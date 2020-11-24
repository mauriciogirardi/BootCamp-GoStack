import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
// import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepositoty = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepositoty.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    await transactionsRepositoty.remove(transaction);
  }
}

export default DeleteTransactionService;
