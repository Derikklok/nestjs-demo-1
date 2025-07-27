import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  // Mock repository
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = { title: 'Test Task', description: 'Test Description' };
    const expectedTask = { id: 1, ...taskData, status: 'PENDING' };

    mockRepository.create.mockReturnValue(expectedTask);
    mockRepository.save.mockResolvedValue(expectedTask);

    const result = await controller.create(taskData);

    expect(mockRepository.create).toHaveBeenCalledWith(taskData);
    expect(mockRepository.save).toHaveBeenCalledWith(expectedTask);
    expect(result).toEqual(expectedTask);
  });
});
