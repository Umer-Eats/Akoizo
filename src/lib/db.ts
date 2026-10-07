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
    })().catch((error) => {
      initialization = null;
      throw error;
    });
  }
  await initialization;
}
