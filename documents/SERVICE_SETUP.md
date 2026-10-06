# Connecting live services later

The owner explicitly chose to complete the design preview first. **There is no hidden authentication/database switch in this release.** The variables in `.env.example` are a planning template only. Adding them will not enable accounts. Follow this document together with the P0 backlog when implementing the live application.

## Firebase

1. Create a Firebase project and register a web app.
2. Enable the chosen sign-in providers and add the eventual Vercel/custom domain to authorized domains.
3. Set the Firebase web app settings in local `.env.local`. Firebase web configuration is public project identification, not authorization.
4. Add the Firebase web SDK when wiring the forms. Add Firebase Admin SDK in server-only modules for token verification and session management.
5. Keep the Admin service-account key private. Never send it in chat, commit it, expose it with a `NEXT_PUBLIC_` prefix, or use it in a Client Component.
6. Verify the ID token before creating a school/membership, and perform all role/school checks on the server. Deny incomplete student enrollment.

References: [Firebase ID token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens), [session management](https://firebase.google.com/docs/auth/admin/manage-sessions).

## Turso

1. Create a remote database and store its URL/token as server-only environment variables.
2. Select the client for the chosen engine: `@tursodatabase/serverless` for remote Turso, or `@libsql/client` for remote libSQL. Do not put the database token in frontend code.
3. Review and apply schema migrations with foreign keys and unique constraints. Model school memberships explicitly, and use immutable attempt/points records to prevent double awards.
4. Parameterize queries. Filter every private read and write by a school membership derived from a verified session, not a caller-supplied school.
5. Test cross-school and cross-role access before deploying live data. No database has been created or modified by this preview.

Reference: [Turso TypeScript quickstart](https://docs.turso.tech/sdk/ts/quickstart).

## Enrollment secrets

Set `INSTRUCTOR_INVITE_PASSWORD` privately to the value the project owner requested. Validate it server-side and apply rate limits. Generate school passwords using cryptographic randomness and store salted hashes; never store passwords in localStorage, demo data, or source. Decide how instructors can securely reveal, rotate, and deliver the joining password.

## Vercel

The Next.js project uses the default build and does not need a `vercel.json`. Import the source repository and set the root to this folder. Add service secrets to the correct preview/production environments only when the integrations are implemented. Keep preview sample data separate from production. Use staged accounts and two distinct schools for final authorization tests.
