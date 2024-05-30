import { MigrationInterface } from './migration.interface';
import { Logger } from '@nestjs/common';

export class MigrationRunner {
    private readonly logger = new Logger(MigrationRunner.name);

    constructor() { }

    async run(migration: MigrationInterface) {
        try {
            await migration.up();
        } catch (error) {
            this.logger.log(`Up query failed: ${migration}`, error);
            throw error;
        }
    }

    async revert(migration: MigrationInterface) {
        try {
            // await migration.down();
            this.logger.log(`Down query are disabled: ${migration}`);
        } catch (error) {
            this.logger.log(`Down query failed: ${migration}`, error);
            throw error;
        }
    }
}
