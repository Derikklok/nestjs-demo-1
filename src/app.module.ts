import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsController } from './organizations/organizations.controller';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:Sachin1605%23@db.agurdgitkcaunzeuhwvv.supabase.co:5432/postgres',
      synchronize: true, // ⚠️ Use only in dev
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TasksModule,
  ],
  controllers: [AppController, OrganizationsController],
  providers: [AppService],
})
export class AppModule {}
