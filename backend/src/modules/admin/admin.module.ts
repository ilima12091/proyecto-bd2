import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { DatabaseModule } from '../database/database.module';
import { AdminModel } from './models/admin.model';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, AdminModel],
})
export class AdminModule {}
