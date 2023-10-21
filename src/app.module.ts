import { Module } from '@nestjs/common';
import { AppUpdate } from './app.bot';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegrafOptions } from './configs/telegraf.config';
import { FinanceModule } from './finance/finance.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTelegrafOptions,
        }),
        // NotionModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: getNotionConfig,
        // }),
        FinanceModule,
    ],
    controllers: [],
    providers: [AppService, AppUpdate],
})
export class AppModule {}
