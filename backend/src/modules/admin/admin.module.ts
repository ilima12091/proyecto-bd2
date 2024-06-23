import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { AdminService } from './services/admin/admin.service';
import { DatabaseModule } from '../database/database.module';
import { AdminModel } from './models/admin.model';
import { CountryController } from './controllers/country/country.controller';
import { CountryService } from './services/country/country.service';
import { CountryModel } from './models/country.model';
import { CampusController } from './controllers/campus/campus.controller';
import { CampusService } from './services/campus/campus.service';
import { CampusModel } from './models/campus.model';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AdminController, 
    CountryController,
    CampusController
  ],
  providers: [
    AdminService, AdminModel,
    CountryService, CountryModel,
    CampusService, CampusModel
  ],
})
export class AdminModule {}
