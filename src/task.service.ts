import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TaskService {
  constructor(@InjectQueue('taskQueue') private readonly taskQueue: Queue) {}

  async addEvent(data: { name: string }): Promise<void> {
    await this.taskQueue.add('process', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }
}
