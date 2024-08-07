import { Controller } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Controller()
export class TestController {
  constructor(private readonly taskService: TaskService) {}

  @Timeout(2000)
  async execute(): Promise<void> {
    await this.taskService.addEvent({ name: 'John Doe' });
  }
}
