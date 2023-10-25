import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { NotionModule } from 'nestjs-notion';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getNotionConfig } from 'src/configs/notion.config';
import { ExpenseService } from './expense.service';
import { ExpenseCategoryService } from './expense-category.service';

@Module({
    imports: [
        ConfigModule,
        NotionModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getNotionConfig,
        }),
    ],
    providers: [FinanceService, ExpenseService, ExpenseCategoryService],
    exports: [FinanceService],
})
export class FinanceModule {}
