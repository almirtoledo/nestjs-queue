import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { TaskService } from './task.service';
import { ProcessService } from './process.service';
import { TestController } from './test.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.VALKEY_HOST || 'localhost',
        password: process.env.VALKEY_PASSWORD || 'dev',
        port: parseInt(process.env.VALKEY_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
  ],
  providers: [PrismaService, TaskService, ProcessService],
  controllers: [TestController],
})
export class AppModule {}
