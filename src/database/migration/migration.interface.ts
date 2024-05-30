//@info: runs either up or down at one time
export interface MigrationInterface {
    up(): Promise<void>;
    down(): Promise<void>;
}
