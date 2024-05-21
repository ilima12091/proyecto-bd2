import { FastifyRequest } from 'fastify';
import { AdminService } from '../../services/admin/admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getAll(): Promise<any[]>;
    create(req: FastifyRequest): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    delete(): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
}
