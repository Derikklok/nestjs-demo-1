import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsController } from './organizations/organizations.controller';

@Module({
  imports: [],
  controllers: [AppController, OrganizationsController],
  providers: [AppService],
})
export class AppModule {}
