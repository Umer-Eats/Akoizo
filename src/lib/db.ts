import { connect } from '@tursodatabase/serverless';
import { schema, eventSeeds } from './schema.ts';
import { AppError } from './domain.ts';

export function getDb() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken)
    throw new AppError(503, 'School services are not configured yet. Please try again later.');
  // Transactions must never share a connection across requests.
  return connect({ url, authToken });
}
let initialization: Promise<void> | null = null;
export async function initializeDatabase() {
  if (!initialization) {
    initialization = (async () => {
      const db = getDb();
      await db.batch(schema, 'immediate');
      await db.batch(eventSeeds, 'immediate');
      try {
        await db.batch(
          [{ sql: 'ALTER TABLE assignments ADD COLUMN test_id TEXT', args: [] }],
          'immediate',
        );
      } catch (error) {
        if (
          !(error instanceof Error) ||
          !/duplicate column name|already exists/i.test(error.message)
        )
          throw error;
      }
    })().catch((error) => {
      initialization = null;
      throw error;
    });
  }
  await initialization;
}
