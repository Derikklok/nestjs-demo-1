import { Controller, Get, Param } from '@nestjs/common';

@Controller('organizations')
export class OrganizationsController {
  @Get()
  findAll(): string {
    return 'This endpoint returns available organizations';
  }

  @Get(':slug')
  findOne(@Param() params: any): string {
    return `This returns organization no #${params.slug}`;
  }
}
