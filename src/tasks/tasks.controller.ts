import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  BadRequestException,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';

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

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: TaskStatus },
  ): Promise<Task | null> {
    return this.taskService.updateStatus(+id, body.status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    // Validate that id is a valid number
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('ID must be a valid positive number');
    }

    // Check if task exists before deleting
    const task = await this.taskService.findOne(numericId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${numericId} not found`);
    }

    // Delete the task
    await this.taskService.remove(numericId);

    return { message: `Task with ID ${numericId} deleted successfully` };
  }
}
