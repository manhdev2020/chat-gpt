import { Logger } from '@nestjs/common';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { JobName } from '@root/config/enum/job-name.enum';
import { MailService } from '@root/common/mail/mail.service';

@Processor('mailsend')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailService: MailService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${
        job.name
      }. Data: ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(JobName.ForgotPassword)
  async sendWelcomeEmail(job: Job): Promise<any> {
    console.log('Processor:@Process - Sending forgot-password email.');

    try {
      this.mailService.sendMail(
        job.data.email,
        job.data.type,
        job.data.context,
      );
    } catch (error) {
      this.logger.error('Failed to send confirmation email.', error.stack);
      throw error;
    }
  }
}
