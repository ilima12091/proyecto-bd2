"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const pg_1 = require("pg");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'PG_CONNECTION',
                useFactory: async (configService) => {
                    const pool = new pg_1.Pool({
                        user: configService.get('DATABASE_USER'),
                        host: configService.get('DATABASE_HOST'),
                        database: configService.get('DATABASE_NAME'),
                        password: configService.get('DATABASE_PASSWORD'),
                        port: configService.get('DATABASE_PORT'),
                    });
                    return pool;
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: ['PG_CONNECTION'],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map