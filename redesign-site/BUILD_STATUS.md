# Hotel Elisabeth redesign site

This directory is the permanent development build for the approved Hotel Elisabeth redesign.

- Development branch: `elisabeth-redesign`
- Production branch `main` remains untouched.
- Current milestone: shared site foundation, real homepage and Rooms page.
- Content source during migration: static snapshot under `redesign/legacy-content/`.
- Firebase remains unchanged as the legacy backup during development.

- CMS content layer seeded from the Firebase migration snapshot.
- Frontend reads generated static content indexes; Firebase remains only as migration backup until image migration and final QA.
- Public room/package/facility/meeting/attraction media copied from Firebase Storage into Git-managed CMS media folders; active redesign indexes no longer depend on Firebase Storage URLs.
