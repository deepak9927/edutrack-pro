import { prisma } from './prisma';

// Export a `db` alias for backwards compatibility with older imports
export const db = prisma;

export type DB = typeof prisma;

export default db;

