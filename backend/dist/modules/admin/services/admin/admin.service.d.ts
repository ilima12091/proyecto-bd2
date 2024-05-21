import { PoolClient } from 'pg';
export declare class AdminService {
    private readonly pgClient;
    constructor(pgClient: PoolClient);
    getAll(): Promise<any[]>;
}
