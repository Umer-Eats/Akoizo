# Service setup

## Environment

Firebase Authentication and Turso are live integrations. Supply all values from `.env.example` in `.env.local` for development and in your hosting provider's environment for deployment. Never commit `.env.local`.

- `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase web app configuration.
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: private Admin service account settings. Escaped newlines in the private key are supported.
- `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`: private Turso connection settings.
- `INSTRUCTOR_INVITE_PASSWORD`: the owner-requested instructor invitation value, kept server-side. The existing local value has been verified against the request.

Enable **Email/Password** and **Google** in Firebase Authentication. Add the local and deployed hostnames to Firebase's authorized domains for Google sign-in. Password reset uses Firebase's email templates. Google popup sign-in depends on provider/domain settings and interactive Google consent.

References: [Firebase ID token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens), [Firebase web authentication](https://firebase.google.com/docs/auth/web/start), [Turso TypeScript quickstart](https://docs.turso.tech/sdk/ts/quickstart).

## Storage and authorization

`src/lib/schema.ts` defines idempotent schema creation and season event seeds. Initialization adds tables and events; it never inserts fictional users, schools, scores, or assignments. Each request uses a separate Turso connection so concurrent transactions cannot share session state. Registration writes the instructor's school and membership atomically.

`school_communities` stores the selected Pembroke Pines Charter campus for each private school group. Its creation is additive and leaves existing school records intact. Registration writes the community together with the school and instructor in one transaction. The server validates instructor selections against the four allowed choices; student enrollment inherits the community of the school password rather than accepting a caller-supplied campus.

Firebase tokens are verified server-side with revocation checks. Every private read and mutation derives the account and school from the verified UID. Students cannot create assignments, inspect rosters, rotate school passwords, or bypass unfinished enrollment. Instructor event choices and assignment writes use the student's saved division. Mutations use bearer tokens, not ambient authentication cookies.

Instructor enrollment fails closed if the invitation setting is absent. Email signup first checks the enrollment password; registration checks it again. Google sign-in and interrupted signup can leave a Firebase identity without a school membership. This identity must finish enrollment before using the dashboard. Existing membership cannot be promoted to another role by repeating registration.

School joining passwords combine a lookup identifier with 144 bits of random secret. Only salted scrypt hashes are stored. The plaintext is returned on creation/rotation and held in React memory; it is not saved to browser storage or logs. Reloading loses the reveal, and the instructor can create a new password. Existing students are unaffected by rotation.

Enrollment attempts have a database-backed 20-per-15-minute limit by authenticated UID or preflight client identity. On Vercel, preflight uses its overwritten `x-vercel-forwarded-for` header. Other hosts use a shared fallback limiter until their trusted proxy header is configured.

Public rankings display generated learner aliases, generated school names, division, and earned points; they do not publish email addresses or display names. They show at most 500 positive-point students, ordered by points then stable ID.

## Assignment contract

A saved assignment asks the student to complete any one test matching its event, division, and Practice/Ranked type. Due dates are calendar dates; validation uses the instructor browser's IANA time zone. Duplicate pending assignments for the same student/event/type/date are rejected. Only the assigning instructor can remove a pending assignment. Old-division assignments retain their original event and division after a student changes division.

Test and lesson engines remain unimplemented. Future completion must be recorded server-side and validate assignment creation time, matching event/type, and an eligible completed attempt. There is deliberately no browser-controlled completion or points endpoint.

## Deployment

Use the Next.js server build on Vercel or another Node host. Set service values in that environment and rebuild to embed the public Firebase settings. Configure the Firebase domain before testing Google sign-in.

On Vercel, also set the non-secret environment variable `NODE_OPTIONS=--experimental-require-module` and redeploy. Firebase Admin 14 uses `jwks-rsa` 4, which requires the ESM-only `jose` package. Vercel disables this Node capability by default; without the setting, API functions crash during module loading with `ERR_REQUIRE_ESM`, before their error handlers can run. See [Vercel's documented runtime setting](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration#experimental-node.js-require-of-es-module). Local Node can load the same code successfully because its default differs from Vercel's. Apply the setting to each Vercel environment where authentication is deployed.
