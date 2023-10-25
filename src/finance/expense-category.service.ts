import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotionService } from 'nestjs-notion';

@Injectable()
export class ExpenseCategoryService {
    categoryDbId: string;

    constructor(
        private readonly notionService: NotionService,
        private readonly configService: ConfigService,
    ) {
        this.categoryDbId = this.configService.getOrThrow(
            'NOTION_EXPENSE_CATEGORY_DB_ID',
        );
    }

    getCategoryByText(text: string) {
        return this.notionService.databases.query({
            database_id: this.categoryDbId,
            filter: {
                property: 'Номер',
                text: {
                    equals: text,
                },
            },
        });
    }
}
