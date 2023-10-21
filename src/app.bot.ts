import { Context, Markup } from 'telegraf';
import { AppService } from './app.service';
import { Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { FinanceService } from './finance/finance.service';

@Update()
export class AppUpdate {
    constructor(
        private readonly appService: AppService,
        private readonly financeService: FinanceService,
    ) {}

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
        const res = await this.financeService.getExpenses();
        await ctx.reply(res.map((e) => `${e.title}: ${e.sum}\n`).join(''));
    }

    @Hears('Задачи')
    async getTasks(@Ctx() ctx: Context) {
        await ctx.reply('tasks');
    }
}
