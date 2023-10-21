import { ConfigService } from '@nestjs/config';
import { NotionModuleOptions } from 'nestjs-notion';

export function getNotionConfig(
    configService: ConfigService,
): NotionModuleOptions {
    return {
        auth: configService.get('NOTION_SECRET'),
    };
}
