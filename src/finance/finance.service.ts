import { Injectable } from '@nestjs/common';
import { AddExpenseDto } from './expense.dto';
import { ExpenseService } from './expense.service';
import {
    EXPENSE_REGEXP,
    NOT_VALID_EXPENSE_STRING_ERROR,
} from './finance.constants';

@Injectable()
export class FinanceService {
    constructor(private readonly expenseService: ExpenseService) {}

    validationExpenseString(expenseString: string): boolean {
        // TODO: Поправить регулярку расхода
        return EXPENSE_REGEXP.test(expenseString);
    }

    parseExpenseString(expenseString: string): AddExpenseDto {
        const arr = expenseString.split('\n');

        const date = arr[0].substring(1, 11);
        const billNumber = arr[3].substring(7);
        const sum = parseFloat(
            arr[2].replace(/[^\d.,]/g, '').replace(',', '.'),
        );
        const title = arr[1].split(' ').slice(1).join(' ');

        return {
            date,
            billNumber,
            sum,
            title,
        };
    }

    addExpense(expenseString: string) {
        if (!this.validationExpenseString(expenseString)) {
            throw new Error(NOT_VALID_EXPENSE_STRING_ERROR);
        }
        const dto = this.parseExpenseString(expenseString);

        return this.expenseService.addExpense(dto);
    }

    public getExpensesList() {
        return this.expenseService.getExpenses();
    }
}
