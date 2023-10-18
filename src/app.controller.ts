import { Context, Markup } from 'telegraf';
import { AppService } from './app.service';
import { Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { Logger } from '@nestjs/common';

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Я живой!');
    await ctx.reply(
      'Я могу',
      Markup.keyboard([
        Markup.button.callback('финансы', 'finance'),
        Markup.button.callback('Задачи', 'tasks'),
      ]),
    );
  }

  @Hears('финансы')
  async getFinance(@Ctx() ctx: Context) {
    Logger.log('log');
    await ctx.reply('финансы1');
  }

  @Hears('Задачи')
  async getTasks(@Ctx() ctx: Context) {
    await ctx.reply('tasks');
  }
}
