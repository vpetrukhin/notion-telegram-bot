import { Injectable } from '@nestjs/common';
import { NotionService } from 'nestjs-notion';
import { SUM_PROPERTY_NAME, TITLE_PROPERTY_NAME } from './finance.constants';
import { ConfigService } from '@nestjs/config';

interface resultItem {
    title: string;
    // category: string;
    sum: number | null;
}

@Injectable()
export class FinanceService {
    expenseDBId: string;

    constructor(
        private readonly notionService: NotionService,
        private readonly configService: ConfigService,
    ) {
        this.expenseDBId = configService.get('NOTION_EXPENSE_DB_ID');
    }

    async getExpenses() {
        const res = await this.notionService.databases.query({
            database_id: this.expenseDBId,
        });
        const results: resultItem[] = [];

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

            const expense: resultItem = {
                title,
                sum,
            };

            results.push(expense);
        }

        return results;
    }
}