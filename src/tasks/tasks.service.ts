import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(title: string, description: string): Promise<Task> {
    const task = this.taskRepo.create({ title, description });
    return this.taskRepo.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepo.findOneBy({ id });
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task | null> {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) {
      return null;
    }
    task.status = status;
    return this.taskRepo.save(task);
  }

  async remove(id:number):Promise<void>{
    await this.taskRepo.delete(id);
  }

}
