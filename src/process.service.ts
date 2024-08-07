import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from './prisma.service';

@Processor('taskQueue')
@Injectable()
export class ProcessService {
  constructor(private readonly db: PrismaService) {}

  @Process()
  async handle(job: Job<{ name: string }>): Promise<void> {
    try {
      console.log('job recebida: ', job.data);
      throw new Error('Erro ao processar job');
    } catch (error) {
      throw error;
    }
  }

  @OnQueueFailed()
  async failed(job: Job<{ name: string }>, error: Error): Promise<void> {
    if (job.attemptsMade === 3) {
      await this.db.log.create({
        data: {
          name: 'ProcessService',
          message: error.message,
          data: JSON.stringify(job.data),
        },
      });
      this.sendMail(error.message);
    }
  }

  private sendMail(message: string) {
    console.log('Mensagen enviada ao suporte: ', message);
  }
}
