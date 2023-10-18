import { Module } from '@nestjs/common';
import { AppUpdate } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegrafOptions } from './configs/telegraf.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegrafOptions,
    }),
  ],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
