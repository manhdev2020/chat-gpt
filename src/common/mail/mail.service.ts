import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { EmailType } from '@root/config/enum/email-type.enum';
import { JobName } from '@root/config/enum/job-name.enum';
import { MessageCode } from '@root/config/enum/message-code.enum';
import { QueueName } from '@root/config/enum/queue-name.enum';
import { Queue } from 'bull';

export interface User {
  email: string;
}

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(QueueName.mailsend)
    private mailQueue: Queue,

    private readonly mailerService: MailerService,
  ) {}

  public async addMailToQueue(
    jobName: JobName,
    email: string,
    type: EmailType,
    context: object,
  ): Promise<any> {
    try {
      const result = await this.mailQueue.add(jobName, {
        email,
        type,
        context,
      });
      return result;
    } catch (err) {
      console.log('Error queueing confirmation email to user.');
      return false;
    }
  }

  public async sendMail(email: string, type: EmailType, context: object) {
    this.mailerService
      .sendMail(this.mappingDataSendMail(email, type, context))
      .then((success) => {
        console.log(success, MessageCode.EMAIL_SEND_SUCCESS);
        return success;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public mappingDataSendMail(email: string, type: EmailType, context: object) {
    const dataMapping = {
      [EmailType.ForgotPassword]: {
        to: email,
        subject: 'Forgot Password',
        template: './forgot-password.hbs',
        context,
      },
      [EmailType.RegisterSuccess]: {
        to: email,
        subject: 'Register Success',
        template: './register-successfuly.hbs',
        context,
      },
    };

    return dataMapping[type];
  }
}
