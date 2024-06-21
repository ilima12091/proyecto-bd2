import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { DatabaseModule } from '../database/database.module';
import { AdminModel } from './models/admin.model';
import { CountryController } from './controllers/country/country.controller';
import { CountryService } from './services/country/country.service';
import { CountryModel } from './models/country.model';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AdminController, 
    CountryController
  ],
  providers: [
    AdminService, AdminModel,
    CountryService, CountryModel
  ],
})
export class AdminModule {}
