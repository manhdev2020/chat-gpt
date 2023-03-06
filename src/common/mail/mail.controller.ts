import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailType } from '@root/config/enum/email-type.enum';
import { JobName } from '@root/config/enum/job-name.enum';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-mail-test')
  async sendmail() {
    return await this.mailService.addMailToQueue(
      JobName.ForgotPassword,
      'tongxuanmanh8888@gmail.com',
      EmailType.ForgotPassword,
      {
        username: 'Duy Manh',
        code: 123456,
      },
    );
  }
}
