import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotionService } from 'nestjs-notion';
import { TITLE_PROPERTY_NAME, SUM_PROPERTY_NAME } from './finance.constants';
import { AddExpenseDto } from './expense.dto';
import { ExpenseResultItemType } from './finance.interfaces';
import { ExpenseCategoryService } from './expense-category.service';
import { formatISO, parse } from 'date-fns';

@Injectable()
export class ExpenseService {
    expenseDBId: string;

    constructor(
        private readonly notionService: NotionService,
        private readonly configService: ConfigService,
        private readonly expenseCategoryService: ExpenseCategoryService,
    ) {
        this.expenseDBId = this.configService.get('NOTION_EXPENSE_DB_ID');
    }

    public async getExpenses() {
        const res = await this.notionService.databases.query({
            database_id: this.expenseDBId,
        });
        Logger.log(res);
        const results: ExpenseResultItemType[] = [];

        for (const page of res.results) {
            const title: string =
                TITLE_PROPERTY_NAME in page.properties &&
                page.properties[TITLE_PROPERTY_NAME].type === 'title'
                    ? page.properties[TITLE_PROPERTY_NAME].title[0].plain_text
                    : '';
            const sum =
                SUM_PROPERTY_NAME in page.properties &&
                page.properties[SUM_PROPERTY_NAME].type === 'number'
                    ? page.properties[SUM_PROPERTY_NAME].number
                    : null;

            const expense: ExpenseResultItemType = {
                title,
                sum,
            };

            results.push(expense);
        }

        return results;
    }

    async addExpense(dto: AddExpenseDto) {
        // console.log(dto);

        // const category = await this.expenseCategoryService.getCategoryByText(
        //     dto.billNumber,
        // );

        const newPage = await this.notionService.pages.create({
            parent: {
                database_id: this.expenseDBId,
            },
            properties: {
                Заголовок: {
                    type: 'title',
                    title: [{ type: 'text', text: { content: dto.title } }],
                },
                Дата: {
                    type: 'date',
                    date: {
                        start: formatISO(
                            parse(dto.date, 'dd.MM.yyyy', new Date()),
                        ),
                    },
                },
                Сумма: {
                    type: 'number',
                    number: dto.sum,
                },
                // Счет: category.results[0].id,
            },
        });

        Logger.log(newPage);
    }
}
