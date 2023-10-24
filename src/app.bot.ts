import { Context, Markup } from 'telegraf';
import { AppService } from './app.service';
import { Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { FinanceService } from './finance/finance.service';

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
        // const res = await this.financeService.getExpenses();
        // await ctx.reply(res.map((e) => `${e.title}: ${e.sum}\n`).join(''));
        await ctx.reply(
            'Выберите действие',
            Markup.keyboard(['Добавить расход']),
        );
    }

    @Hears('Добавить расход')
    async add(@Ctx() ctx: Context) {
        await ctx.reply('Введите расход');
    }

    @On('text')
    async getExpandMessage(@Ctx() { message }: Context) {
        if ('text' in message) {
            console.log(this.financeService.parseExpenseString(message.text));
        }
    }

    @Hears('Задачи')
    async getTasks(@Ctx() ctx: Context): Promise<void> {
        await ctx.reply('tasks');
    }
}
