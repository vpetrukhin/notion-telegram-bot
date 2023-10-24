import { Injectable } from '@nestjs/common';
import { AddExpenseDto } from './expense.dto';
import { ExpenseService } from './expense.service';

/**
 * 
 * [21.10.2023 в 20:02]
Покупка Перекрёсток
2 932,03 ₽
МИР •• 7697
Баланс: 1 767,92 ₽
 * 
 * 
 */

@Injectable()
export class FinanceService {
    constructor(private readonly expenseService: ExpenseService) {}

    parseExpenseString(expenseString: string): AddExpenseDto {
        const arr = expenseString.split('\n');

        const date = arr[0].substring(1, 11);
        const billNumber = arr[3].substring(7);
        const sum = arr[2].substring(0, arr[2].length - 2).replaceAll(' ', '');
        const title = arr[1].split(' ').slice(1).join(' ');

        // @TODO: Переделать sum в number

        return {
            date,
            billNumber,
            sum,
            title,
        };
    }

    addExpense(dto: AddExpenseDto) {
        this.expenseService.addExpense(dto);
    }
}
