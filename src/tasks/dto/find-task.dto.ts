import { IsNumberString } from 'class-validator';

export class FindTaskDto {
  @IsNumberString()
  id: string;
}