import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { NotionModule } from 'nestjs-notion';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getNotionConfig } from 'src/configs/notion.config';

@Module({
    imports: [
        ConfigModule,
        NotionModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getNotionConfig,
        }),
    ],
    providers: [FinanceService],
    exports: [FinanceService],
})
export class FinanceModule {}
