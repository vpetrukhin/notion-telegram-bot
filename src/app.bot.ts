import { Context, Markup } from 'telegraf';
import { AppService } from './app.service';
import { Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { FinanceService } from './finance/finance.service';
import { Logger } from '@nestjs/common';

@Update()
export class AppUpdate {
    constructor(
        private readonly appService: AppService,
        private readonly financeService: FinanceService,
    ) {}

    @Start()
    async start(@Ctx() ctx: Context) {
        await ctx.reply('Выберите тип операции', Markup.keyboard(['Финансы']));
    }

    @Hears('Финансы')
    async getFinance(@Ctx() ctx: Context) {
        await ctx.reply(
            'Выберите действие',
            Markup.keyboard(['Добавить расход', 'Список расходов']),
        );
    }

    @Hears('Список расходов')
    async get(@Ctx() ctx: Context) {
        await ctx.reply('Введите расход');
        const res = await this.financeService.getExpensesList();
        await ctx.reply(res.map((e) => `${e.title}: ${e.sum}\n`).join(''));
    }
    @Hears('Добавить расход')
    async add(@Ctx() ctx: Context) {
        await ctx.reply('Введите расход');
    }

    @On('text')
    async getExpandMessage(@Ctx() ctx: Context) {
        try {
            if ('text' in ctx.message) {
                this.financeService.addExpense(ctx.message.text);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                Logger.error(e.message, e.stack);
                ctx.reply('🔴' + e.message);
            }
        }
    }

    @Hears('Задачи')
    async getTasks(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply('tasks');
    }
}
