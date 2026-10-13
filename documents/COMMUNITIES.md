# Adding communities

Edit [`communitypasswords.json`](../communitypasswords.json) in the project root. It is saved locally and committed to GitHub. All existing communities are already listed.

Add another object before the closing `]` (put a comma after the previous object):

```json
{
  "id": "example-high",
  "name": "Example High School",
  "studentPassword": { "env": "EXAMPLE_STUDENT_JOIN_PASSWORD" },
  "instructorPassword": { "env": "EXAMPLE_INSTRUCTOR_INVITE_PASSWORD" }
}
```

1. Choose a unique lowercase `id` with hyphens. Keep existing IDs unchanged so memberships stay attached.
2. Set the two named environment variables to the actual passwords in your private `.env.local` and your hosting provider's environment settings. Each community needs a different student joining password. Instructor passwords can be shared when intended.
3. Commit the JSON change and deploy. The normal build automatically updates the signup options. Database initialization automatically accepts new community IDs. The first instructor to enroll creates its shared roster; later instructors at that community join it.

No changes to enrollment code or database SQL are needed when adding a community. To update a password later, change its private hosting setting and redeploy; existing active rosters are synchronized without changing student memberships or progress.

The `env` values are **setting names, not passwords**. Keep actual passwords in private environment settings, never this file or public documentation. The existing local password values are already preserved in `.env.local`; add the same private settings to your host before deployment.

`npm run communities:sync` regenerates `src/lib/community-directory.ts`, which contains only public names and IDs. Development, builds, type checks, and tests run this automatically. Do not edit that generated directory directly. Enrollment passwords are shared joining credentials; individual members still sign in with their own accounts.
