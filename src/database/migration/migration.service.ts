import { Injectable, Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MigrationRunner } from './migration.runner';
import { OttCollectionMigration } from './script/ott-collection.migration';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  async runMigrationScript() {
    //e.g 'mongodb://localhost:27017/ott-service';
    const uri = `${process.env.MONGO_DB_HOST}${process.env.MONGO_DB_NAME}`;
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db();
      const migrationsCollection = database.collection('migrations');

      //@ TODO: change to dynamic and support list of script files
      const migrationName = OttCollectionMigration.name;
      // Check if the script has already been run
      const scriptRun = await migrationsCollection.findOne({ migration: migrationName });
      if (scriptRun) {
        this.logger.log(`${migrationName} has already been run.`);
        return;
      }

      const migrationRunner = new MigrationRunner();
      const migration = new OttCollectionMigration();
      await migrationRunner.run(migration);
      await migrationsCollection.insertOne({ migration: migrationName, createdAt: new Date() });
    } catch (error) {
      this.logger.error(`Failed to run migration`, error);
    } finally {
      await client.close();
    }
  }
}

