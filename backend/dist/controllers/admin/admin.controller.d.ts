import { FastifyRequest } from 'fastify';
export declare class AdminController {
    getAll(): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
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
