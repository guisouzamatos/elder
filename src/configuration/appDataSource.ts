import {DataSource} from 'typeorm';


export class AppDataSource {
    private static instance: DataSource;

    private constructor() {}

    static getInstance(): DataSource {
        if (!AppDataSource.instance) {
            throw new Error('DataSource has not been initialized yet.');
        }

        return AppDataSource.instance;
    }

    static async initialize(app): Promise<void> {
        if (AppDataSource.instance) {
            return;
        }

        AppDataSource.instance = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'gestao',
            password: 'gestao',
            database: 'gestao',
            logging: true,
            entities: ['src/models/entity/*.ts'],
            migrations: ['src/migrations/*.ts'],
            migrationsRun: false,
            dropSchema: false,
            synchronize: false
        });
    }
}