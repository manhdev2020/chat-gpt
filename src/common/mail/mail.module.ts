import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailProcessor } from '@root/common/mail/mail.process';
import { MailController } from './mail.controller';
import { QueueName } from '@root/config/enum/queue-name.enum';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: '"Ecommerce" <manhdev@gmail.com>',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: QueueName.mailsend, // mail queue name
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
})
export class MailModule {}
