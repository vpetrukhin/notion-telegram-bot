import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

export function getTelegrafOptions(
  configService: ConfigService,
): Promise<TelegrafModuleOptions> | TelegrafModuleOptions {
  return {
    token: configService.get('TELEGRAM_BOT_TOKEN'),
  };
}
