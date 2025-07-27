import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  create(@Body() body: { title: string; description: string }): Promise<Task> {
    return this.taskService.create(body.title, body.description);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    // Validate that id is a valid number
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('ID must be a valid positive number');
    }

    const task = await this.taskService.findOne(numericId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${numericId} not found`);
    }

    return task;
  }
}
